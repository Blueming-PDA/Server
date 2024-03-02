const jwt = require("jsonwebtoken");

function createToken(visibleUser, maxAge = 60 * 60 * 24 * 3) {
  return jwt.sign(visibleUser, process.env.JWT_SECRET || "MyJWT", {
    expiresIn: maxAge,
  });
}

function verifyToken(_token) {
  if (!_token) {
    return null;
  }
  const verfiiedToken = jwt.verify(_token, process.env.JWT_SECRET || "MyJWT");
  return verfiiedToken;
}

module.exports = {
  createToken,
  verifyToken,
};
