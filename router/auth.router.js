const express = require("express");
const router = express.Router();
const {
  deleteUser,
  getUser,
  postUser,
  getUserDetail,
} = require("../controller/user.controller");

router.get("/api/user", function (req, res, next) {
  return getUser({ req, res });
});

router.post("/api/user", function (req, res, next) {
  return postUser({ req, res });
});

router.delete("/api/user/:user_id", function (req, res, next) {
  return deleteUser({ res, user_id: req.params.user_id });
});

router.get("/api/user/:user_id", function (req, res, next) {
  return getUserDetail({ res, user_id: req.params.user_id });
});
module.exports = router;
