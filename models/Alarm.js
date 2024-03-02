const mongoose = require("mongoose");

const alarmSchema = new mongoose.Schema({
  alarmTitle: {
    type: String,
    required: true,
  },
  alarmContent: {
    type: String,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userName: {
    type: String,
    required: true,
  },
  confirmed: {
    type: Boolean,
    default: false, //
  },
});

alarmSchema.set("timestamps", {
  createdAt: "alarmCreatedAt",
  updatedAt: "alarmUpdatedAt",
});

alarmSchema.statics.saveAlarm = async function (alarmContent, user) {
  const alarm = await this.create({
    alarmTitle: alarmContent.title,
    alarmContent: alarmContent.content,
    userId: user._id,
    userName: user.name,
  });
  return alarm;
};

const Alarm = mongoose.model("Alarm", alarmSchema);

module.exports = Alarm;
