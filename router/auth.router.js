const express = require("express");
const router = express.Router();
const { postLogin, postRegister } = require("../controller/auth.controller");
const verifyToken = require("../lib/middleware-token");

router.post("/api/login", function (req, res, next) {
  return postLogin({ req, res });
});

router.post("/api/register", function (req, res, next) {
  return postRegister({ req, res });
});

module.exports = router;
