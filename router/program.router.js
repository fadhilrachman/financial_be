const express = require("express");
const router = express.Router();
const {
  postProgram,
  deleteProgram,
  getProgram,
  putProgram,
  getProgramDetail,
} = require("../controller/program.controller");

router.get("/api/program", function (req, res, next) {
  return getProgram({ req, res });
});

router.get("/api/program/:program_id", function (req, res, next) {
  return getProgramDetail({ req, res, program_id: req.params.program_id });
});

router.post("/api/program", function (req, res, next) {
  return postProgram({ req, res });
});

router.delete("/api/program/:program_id", function (req, res, next) {
  return deleteProgram({ res, program_id: req.params.program_id });
});

router.put("/api/program/:program_id", function (req, res, next) {
  return putProgram({ req, res, program_id: req.params.program_id });
});

module.exports = router;
