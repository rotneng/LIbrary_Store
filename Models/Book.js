const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
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
    price: {
      type: Number,
      required: [true, "Please enter the price"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      default: "General",
    },
    coverImage: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
