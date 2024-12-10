const express = require("express");
const router = express.Router();
const {
  getCategory,
  postCategory,
  putCategory,
} = require("../controller/category.controller");
const verifyToken = require("../lib/middleware-token");

router.get("/api/category", verifyToken, function (req, res, next) {
  return getCategory({ req, res });
});

router.post("/api/category", verifyToken, function (req, res, next) {
  return postCategory({ req, res });
});

router.put(
  "/api/category/:category_id",
  verifyToken,
  function (req, res, next) {
    return putCategory({ req, res, category_id: req.params.category_id });
  }
);

module.exports = router;
