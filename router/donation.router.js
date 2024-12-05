const express = require("express");
const router = express.Router();
const {
  getDonation,
  postDonation,
} = require("../controller/donation.controller");
const verifyToken = require("../lib/middleware-token");

router.get("/api/donation/", verifyToken, function (req, res, next) {
  return getDonation({ req, res });
});

router.post(
  "/api/donation/:program_id",
  verifyToken,
  function (req, res, next) {
    return postDonation({ req, res, program_id: req.params.program_id });
  }
);

module.exports = router;
