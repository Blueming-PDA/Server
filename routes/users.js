var express = require("express");
var router = express.Router();

const User = require("../models/User");
const { createToken } = require("../utils/auth");
const { authenticate } = require("../middlewares/auth_middleware");
const bcrypt = require("bcrypt");
const Board = require("../models/Board");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//회원가입
router.post("/signup", async (req, res, next) => {
  try {
    // console.log(req.body);
    const user = await User.signUp(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).send("BAD REQUEST");
    next(error);
  }
});

//로그인
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.login(email, password);
    const tokenMaxAge = 60 * 60 * 24 * 3; //3일
    const token = createToken(user, tokenMaxAge);
    user.token = token;

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: tokenMaxAge * 1000,
    });

    // console.log(user);
    return res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(401).send("UNAUTHORIZED");
  }
});

//로그아웃
router.all("/logout", async (req, res, next) => {
  // 'authToken' 쿠키를 클라이언트에서 제거
  res.clearCookie("authToken");
  // 로그아웃 처리에 대한 응답을 클라이언트로 전송
  res.status(200).json({ message: "로그아웃 되었습니다." });
});

//회원 탈퇴
router.delete("/:userId", authenticate, async (req, res, next) => {
  const userId = req.params.userId;
  User.findByIdAndDelete(userId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

//내 정보 보기
router.get("/:userId/mypage", authenticate, async (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

//비밀번호 수정
router.put("/:userId", authenticate, async (req, res, next) => {
  console.log(req.body);
  const userId = req.params.userId;
  const { password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  User.findByIdAndUpdate(userId, {
    password: hashedPassword,
  })
    .then((data) => {
      // console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log(err.message);
      next(err);
    });
});

//내가 쓴 게시글 보기
router.get("/:userId/boards", authenticate, async (req, res, next) => {
  const userId = req.params.userId;
  console.log(userId);
  Board.find({ userId: userId })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

//프로필 이미지 변경
router.put("/:userId/profile", authenticate, async (req, res, next) => {
  const userId = req.params.userId;
  const { profile } = req.body;
  User.findByIdAndUpdate(userId, {
    profile: profile,
  })
    .then((data) => {
      res.json({ message: "프로필 변경" });
    })
    .catch((error) => {
      next(error);
    });
});

//프로필 이미지 조회
router.get("/:userId/profile", authenticate, async (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((data) => {
      console.log("프로필 이미지 조회");
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
