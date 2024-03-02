const express = require("express");
const router = express.Router();
const Alarm = require("../models/Alarm");
const { authenticate } = require("../middlewares/auth_middleware");

//모든 알람 조회하기
router.get("/", (req, res, next) => {
  Alarm.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

//모든 알람 조회하기 :: 확인 안한 것만
router.get("/unconfirmed/", (req, res, next) => {
  Alarm.find({ confirmed: false })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

// 알람 수정하기 :: 알람 확인하면 checked true로 바꿈
router.put("/:alarmId/", authenticate, (req, res, next) => {
  Alarm.findByIdAndUpdate(req.params.alarmId, {
    ...req.body,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
});

//알람 삭제하기
router.delete("/:alarmId", authenticate, function (req, res, next) {
  Alarm.findByIdAndDelete(req.params.alarmId)
    .then(() => {
      //res.json(data);
      res.json({ message: "삭제 완료" });
    })
    .catch((err) => {
      next(err);
    });
});

//알람 조회하기
router.get("/:alarmId", function (req, res, next) {
  Alarm.findById(req.params.alarmId)
    .then((board) => {
      res.json(board);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
