const express = require("express");
const router = express.Router();
const { uploadImg } = require("../controller/img.controller");
const { upload, s3 } = require("../lib/aws-config");

router.post("/api/img", upload.single("file"), (req, res) => {
  uploadImg({ req, res });
});

module.exports = router;
