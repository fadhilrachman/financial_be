const express = require("express");
const router = express.Router();
const {
  getWallet,
  postWallet,
  putWallet,
  deleteWallet,
  getWalletDetail,
} = require("../controller/wallet.controller");

router.get("/api/wallet", function (req, res, next) {
  return getWallet({ req, res });
});

router.post("/api/wallet", function (req, res, next) {
  return postWallet({ req, res });
});

router.delete("/api/wallet/:wallet_id", function (req, res, next) {
  return deleteWallet({ res, wallet_id: req.params.wallet_id });
});

router.put("/api/wallet/:wallet_id", function (req, res, next) {
  return putWallet({ req, res, wallet_id: req.params.wallet_id });
});

router.get("/api/wallet/:wallet_id", function (req, res, next) {
  return getWalletDetail({ res, wallet_id: req.params.wallet_id });
});

module.exports = router;
