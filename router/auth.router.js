const express = require("express");
const router = express.Router();
const {
  deleteUser,
  getUser,
  postUser,
  getUserDetail,
} = require("../controller/user.controller");
const verifyToken = require("../lib/middleware-token");

router.post("/api/login", function (req, res, next) {
  return postLogin({ req, res });
});

router.post("/api/register", verifyToken, function (req, res, next) {
  return postUser({ req, res });
});

module.exports = router;
