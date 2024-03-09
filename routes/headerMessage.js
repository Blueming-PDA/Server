const express = require("express");
const router = express.Router();
const HeaderMessage = require("../models/HeaderMessage");

//헤더메시지 작성하기
router.post("/", (req, res, next) => {
  HeaderMessage.create({ ...req.body })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
});

// 최근에 작성한 헤더메시지 조회하기
router.get("/", function (req, res, next) {
  HeaderMessage.findOne({})
    .sort({ createdAt: -1 })
    .then((headerMessage) => {
      res.json(headerMessage.headerMessage);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
