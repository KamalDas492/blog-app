require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id, username) => {
  return jwt.sign({ userId: id, user: username}, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};