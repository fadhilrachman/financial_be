const express = require("express");
const router = express.Router();
const {
  getWishlist,
  postWishlist,
  putWishlist,
  deleteWishlist,
  getWishlistDetail,
} = require("../controller/wishlist.controller");
const verifyToken = require("../lib/middleware-token");

router.get("/api/wishlist", verifyToken, function (req, res, next) {
  return getWishlist({ req, res, user_id: req.user.id });
});

router.post("/api/wishlist", verifyToken, function (req, res, next) {
  return postWishlist({ req, res, user_id: req.user.id });
});

router.delete(
  "/api/wishlist/:wishlist_id",
  verifyToken,
  function (req, res, next) {
    return deleteWishlist({ res, wishlist_id: req.params.wishlist_id });
  }
);

router.put(
  "/api/wishlist/:wishlist_id",
  verifyToken,
  function (req, res, next) {
    return putWishlist({
      req,
      res,
      wishlist_id: req.params.wishlist_id,
      user_id: req.user.id,
    });
  }
);

router.get(
  "/api/wishlist/:wishlist_id",
  verifyToken,
  function (req, res, next) {
    return getWishlistDetail({ res, wishlist_id: req.params.wishlist_id });
  }
);

module.exports = router;
