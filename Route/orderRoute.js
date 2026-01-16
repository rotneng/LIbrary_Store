const express = require("express");
const router = express.Router();
const Order = require("../Models/Order");
const { verifyToken, verifyAdmin } = require("../Middlewares/authMiddleware");

router.get("/my-orders", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "email name")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", verifyToken, async (req, res) => {
  const { orderItems, totalPrice, amount, email, reference } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: "No order items found" });
  }

  try {
    const order = new Order({
      user: req.user.id,
      orderItems,
      amount: amount || totalPrice,
      email: email,
      reference: reference,
      isPaid: false,
      status: "Pending",
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (err) {
    console.error("Error creating order:", err);
    res
      .status(500)
      .json({ message: "Failed to create order", error: err.message });
  }
});

router.put("/:id/pay", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.status = "Paid";

      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
