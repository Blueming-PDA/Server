var express = require("express");
const { createToken, verifyToken } = require("../utils/auth");

async function authenticate(req, res, next) {
  let token = req.cookies.authToken;
  const user = verifyToken(token);
  req.user = user;

  if (!user) {
    console.log("로그인된 유저가 아닙니다.");
    const error = new Error("Authorization Failed");
    error.status = 403;

    next(error);
  }
  next();
}

module.exports = {
  authenticate,
};
