const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: { type: String, required: true },
    bookTitle: { type: String, required: true },
    amount: { type: Number, required: true }, 
    reference: { type: String, required: true }, 
    status: { type: String, default: "success" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
