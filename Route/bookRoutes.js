const express = require("express");
const router = express.Router();

// 1. Matches your "Controller" folder
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../Controller/bookController"); 

// 2. Matches your "Middlewares" folder
const { verifyToken, verifyAdmin } = require("../Middlewares/authMiddleware"); 

router.get("/", getAllBooks);
router.get("/:id", getBookById);

router.post("/", verifyToken, verifyAdmin, createBook);
router.put("/:id", verifyToken, verifyAdmin, updateBook);
router.delete("/:id", verifyToken, verifyAdmin, deleteBook);

module.exports = router;