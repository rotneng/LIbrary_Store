const axios = require("axios");
const nodemailer = require("nodemailer");
const Order = require("../Models/Order");
const Book = require("../Models/Book");

const initializePayment = async (req, res) => {
  const { email, amount, orderId } = req.body;

  if (!email || !amount || !orderId) {
    return res
      .status(400)
      .json({ error: "Missing email, amount, or order ID" });
  }

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100,
        callback_url: "http://localhost:3000/payment-success",
        metadata: {
          order_id: orderId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const paystackRef = response.data.data.reference;

    await Order.findByIdAndUpdate(orderId, { reference: paystackRef });

    res.json(response.data.data);
  } catch (error) {
    console.error("Paystack Init Error:", error);
    res.status(500).json({ error: "Payment initialization failed" });
  }
};

const verifyPayment = async (req, res) => {
  const { reference } = req.body;

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = response.data.data;

    if (data.status === "success") {
      const order = await Order.findOne({ reference });

      if (!order) return res.status(404).json({ error: "Order not found" });

      if (order.status === "Paid") {
        return res.status(200).json({
          status: "success",
          message: "Order already processed",
          order,
        });
      }

      order.status = "Paid";
      order.isPaid = true;
      order.paidAt = Date.now();
      await order.save();

      for (const item of order.orderItems) {
        await Book.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.qty },
        });
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        family: 4,
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: order.email,
        subject: "Bookstore Receipt",
        text: `Payment Successful!\n\nReference: ${order.reference}\nAmount: ₦${order.amount}\n\nYour books have been reserved. Thank you for your patronage!`,
      };

      await transporter.sendMail(mailOptions);

      res.json({ status: "success", order });
    } else {
      res
        .status(400)
        .json({ status: "failed", message: "Verification failed" });
    }
  } catch (error) {
    console.error("Verification Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { initializePayment, verifyPayment };
