const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "올바른 이메일 형식이 아닙니다"],
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  admin: {
    type: Number,
    default: 0, // default: 일반 사용자 (관리자가 아님)
  },
  sid: {
    // socket 통신을 위한 id
    type: String,
    default: "default",

  },
  profile: {
    type: String,
    default: "/profile/9334178.jpg",
  },
});

userSchema.statics.signUp = async function (userInfo) {
  const { email, password, name, phone, admin } = userInfo;
  const salt = await bcrypt.genSalt();
  // console.log(salt);
  try {
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await this.create({
      email,
      password: hashedPassword,
      name,
      phone,
    });
    return {
      _id: user._id,
      email: user.email,
    };
  } catch (err) {
    throw err;
  }
};

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user.visibleUser;
    }
    throw Error("잘못된 패스워드입니다.");
  }
  throw Error("잘못된 이메일입니다.");
};


// socket
userSchema.statics.setSid = async function (email, sid) {
  const user = await this.findOne({ email });


  if (user) {
    user.sid = sid;
    await user.save();
    // console.log("USER.SID", user.sid);
    return user.visibleUser;
  }
};

userSchema.statics.checkUserBySid = async function (sid) {
  const user = await this.findOne({ sid });
  if (user) {
    console.log("찾았습니다.", sid, user.sid);
    return user.visibleUser;
  }
};

const visibleUser = userSchema.virtual("visibleUser");
visibleUser.get(function (values, virtual, doc) {
  return {
    _id: doc._id,
    email: doc.email,
    name: doc.name,
    phone: doc.phone,
    admin: doc.admin,
    sid: doc.sid,
    profile: doc.profile,
  };
});

userSchema.statics.setSid = async function (email, sid) {
  const user = await this.findOne({ email });
  if (user) {
    user.sid = sid;

    await user.save();
    console.log("저장완료", user.sid);
    return user.visibleUser;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
