const express = require("express");
const router = express.Router();
const { uploadImg } = require("../controller/img.controller");
const { upload, s3 } = require("../lib/aws-config");
const verifyToken = require("../lib/middleware-token");

router.post("/api/img", verifyToken, upload.single("file"), (req, res) => {
  uploadImg({ req, res });
});

module.exports = router;
