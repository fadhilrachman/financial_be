const express = require("express");
const router = express.Router();
const {
  getWishlist,
  postWishlist,
  putWishlist,
  deleteWishlist,
  getWishlistDetail,
} = require("../controller/wishlist.controller");

router.get("/api/wishlist", function (req, res, next) {
  return getWishlist({ req, res });
});

router.post("/api/wishlist", function (req, res, next) {
  return postWishlist({ req, res });
});

router.delete("/api/wishlist/:wishlist_id", function (req, res, next) {
  return deleteWishlist({ res, wishlist_id: req.params.wishlist_id });
});

router.put("/api/wishlist/:wishlist_id", function (req, res, next) {
  return putWishlist({ req, res, wishlist_id: req.params.wishlist_id });
});

router.get("/api/wishlist/:wishlist_id", function (req, res, next) {
  return getWishlistDetail({ res, wishlist_id: req.params.wishlist_id });
});

module.exports = router;
