const axios = require("axios");
const nodemailer = require("nodemailer");
const Order = require("../Models/Order");

const initializePayment = async (req, res) => {
  const { email, amount, bookTitle } = req.body;

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100,
        metadata: { bookTitle },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data.data);
  } catch (error) {
    console.error(error);
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
      const newOrder = await Order.create({
        user: req.user.id,
        email: data.customer.email,
        bookTitle: data.metadata ? data.metadata.bookTitle : "Book Purchase",
        amount: data.amount / 100,
        reference: data.reference,
      });
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: data.customer.email,
        subject: "Bookstore Receipt",
        text: `Payment Successful!\n\nReference: ${data.reference}\nBook: ${newOrder.bookTitle}\nAmount: ₦${newOrder.amount}\n\nThank you!`,
      };

      await transporter.sendMail(mailOptions);

      res.json({ status: "success", order: newOrder });
    } else {
      res
        .status(400)
        .json({ status: "failed", message: "Verification failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { initializePayment, verifyPayment };
