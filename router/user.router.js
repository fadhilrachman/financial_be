const express = require("express");
const router = express.Router();
const { postLogin } = require("../controller/auth.controller");

router.post("/api/login", function (req, res, next) {
  return postLogin({ req, res });
});

module.exports = router;
