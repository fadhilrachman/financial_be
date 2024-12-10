const express = require("express");
const router = express.Router();
const {
  getWishlistTransaction,
  postWishlistTransaction,
} = require("../controller/wishlist-transaction.controller");
const verifyToken = require("../lib/middleware-token");

router.get("/api/wishlist-transaction", verifyToken, function (req, res, next) {
  return getWishlistTransaction({ req, res });
});

router.post(
  "/api/wishlist-transaction",
  verifyToken,
  function (req, res, next) {
    return postWishlistTransaction({ req, res });
  }
);

module.exports = router;
