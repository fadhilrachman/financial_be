const express = require("express");
const router = express.Router();
const {
  postNews,
  deleteNews,
  getNews,
  putNews,
} = require("../controller/news.controller");

router.get("/api/news", function (req, res, next) {
  return getNews({ req, res });
});

router.post("/api/news", function (req, res, next) {
  return postNews({ req, res });
});

router.delete("/api/news/:news_id", function (req, res, next) {
  return deleteNews({ res, news_id: req.params.news_id });
});

router.put("/api/news/:news_id", function (req, res, next) {
  return putNews({ req, res, news_id: req.params.news_id });
});

module.exports = router;
