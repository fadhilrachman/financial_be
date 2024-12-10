const express = require("express");
const router = express.Router();
const {
  getWishlistTransaction,
  postWishlistTransaction,
} = require("../controller/wishlist-transaction.controller");

router.get("/api/wishlist", function (req, res, next) {
  return getWishlist({ req, res });
});

router.post("/api/wishlist", function (req, res, next) {
  return postWishlist({ req, res });
});

module.exports = router;
