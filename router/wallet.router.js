const express = require("express");
const router = express.Router();
const {
  getWallet,
  postWallet,
  putWallet,
  deleteWallet,
  getWalletDetail,
} = require("../controller/wallet.controller");
const verifyToken = require("../lib/middleware-token");

router.get("/api/wallet", verifyToken, function (req, res, next) {
  return getWallet({ req, res, user_id: req.user.id });
});

router.post("/api/wallet", verifyToken, function (req, res, next) {
  return postWallet({ req, res, user_id: req.user.id });
});

router.delete("/api/wallet/:wallet_id", verifyToken, function (req, res, next) {
  return deleteWallet({ res, wallet_id: req.params.wallet_id });
});

router.put("/api/wallet/:wallet_id", verifyToken, function (req, res, next) {
  return putWallet({
    req,
    res,
    wallet_id: req.params.wallet_id,
    user_id: req.user.id,
  });
});

router.get("/api/wallet/:wallet_id", verifyToken, function (req, res, next) {
  return getWalletDetail({ res, wallet_id: req.params.wallet_id });
});

module.exports = router;
