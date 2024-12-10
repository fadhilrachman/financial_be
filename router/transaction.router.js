const express = require("express");
const router = express.Router();
const {
  getTransaction,
  postTransaction,
  putTransaction,
  getTransactionDetail,
  deleteTransaction,
} = require("../controller/transaction.controller");
const verifyToken = require("../lib/middleware-token");

router.get("/api/transaction", verifyToken, function (req, res, next) {
  return getTransaction({ req, res });
});

router.post("/api/transaction", verifyToken, function (req, res, next) {
  return postTransaction({ req, res });
});

router.delete(
  "/api/transaction/:transaction_id",
  verifyToken,
  function (req, res, next) {
    return deleteTransaction({
      res,
      transaction_id: req.params.transaction_id,
    });
  }
);

router.put(
  "/api/transaction/:transaction_id",
  verifyToken,
  function (req, res, next) {
    return putTransaction({
      req,
      res,
      transaction_id: req.params.transaction_id,
    });
  }
);

router.get(
  "/api/transaction/:transaction_id",
  verifyToken,
  function (req, res, next) {
    return getTransactionDetail({
      res,
      transaction_id: req.params.transaction_id,
      user_id: req.user.id,
    });
  }
);

module.exports = router;
