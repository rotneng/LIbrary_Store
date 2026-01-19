const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../Controller/bookController"); 

const { verifyToken, verifyAdmin } = require("../Middlewares/authMiddleware"); 

router.get("/", getAllBooks);
router.get("/:id", getBookById);

router.post("/", verifyToken, verifyAdmin, createBook);
router.put("/:id", verifyToken, verifyAdmin, updateBook);
router.delete("/:id", verifyToken, verifyAdmin, deleteBook);

module.exports = router;