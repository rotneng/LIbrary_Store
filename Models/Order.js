const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    email: { type: String, required: true },
    bookTitle: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Paid" },
    reference: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
