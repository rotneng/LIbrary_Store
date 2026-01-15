const express = require("express");
const router = express.Router();
const {
  initializePayment,
  verifyPayment,
} = require("../Controller/paymentController");
const { verifyToken } = require("../Middlewares/authMiddleware");

router.post("/initialize", verifyToken, initializePayment);

router.post("/verify", verifyToken, verifyPayment);

module.exports = router;
