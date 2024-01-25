const jwt = require("jsonwebtoken");

const privateKey = "hasahihanghoheng";

const createToken = (object) => {
  return jwt.sign(object, privateKey);
};

const verifyToken = (token) => {
  return jwt.verify(token, privateKey);
};

module.exports = { createToken, verifyToken };