const express = require("express");
const router = express.Router();
const CodeLink = require("../models/CodeLink");
const { authenticate } = require("../middlewares/auth_middleware");

// 전체 코드 링크 조회하기
router.get("/", (req, res, next) => {
  CodeLink.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

// 코드 링크 조회하기 :: 활성화 된것 하나
router.get("/activate/", (req, res, next) => {
  CodeLink.findOne({ activate: true })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

// 코드 링크 저장하기
router.post("/", authenticate, (req, res, next) => {
  console.log(req.body);
  CodeLink.create({ ...req.body })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
});

// 코드 링크 수정하기 :: 공유 중지하기 누르면 activate false로 바꾸기
router.put("/:codeLinkId/", authenticate, (req, res, next) => {
  console.log("LINK :::: ", req.params.codeLinkId);
  CodeLink.findByIdAndUpdate(
    req.params.codeLinkId,
    {
      ...req.body,
    },
    { new: true } // 업데이트된 문서를 반환
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
});

// 링크 삭제하기
router.delete("/:codeLinkId", authenticate, function (req, res, next) {
  CodeLink.findByIdAndDelete(req.params.codeLinkId)
    .then(() => {
      //res.json(data);
      res.json({ message: "삭제 완료" });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
