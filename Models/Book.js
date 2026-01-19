const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please enter the book title"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Please enter the author name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter a description"],
    },
    category: {
      type: String,
      default: "General",
    },
    image: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Book", bookSchema);
