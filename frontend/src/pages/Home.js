import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { addToCart } = useCart();

  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books");
        setBooks(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this book completely?")
    )
      return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks((prev) => prev.filter((book) => book._id !== id));
      alert("Book deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete. Are you logged in?");
    }
  };

  if (loading) return <div style={styles.centerMessage}>Loading Books...</div>;
  if (error)
    return <div style={{ ...styles.centerMessage, color: "red" }}>{error}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h1 style={styles.header}>Our Collection</h1>
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchBar}
        />
      </div>

      {filteredBooks.length === 0 ? (
        <div style={styles.centerMessage}>
          No books found matching "{searchQuery}"
        </div>
      ) : (
        <div style={styles.grid}>
          {filteredBooks.map((book) => {
            const isOutOfStock = book.stock <= 0;

            return (
              <div key={book._id} style={styles.card}>
                <Link
                  to={`/book/${book._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={
                      book.coverImage || "https://via.placeholder.com/250x150"
                    }
                    alt={book.title}
                    style={styles.image}
                  />
                </Link>

                <div style={styles.cardContent}>
                  <Link
                    to={`/book/${book._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <h3 style={styles.bookTitle}>{book.title}</h3>
                  </Link>

                  <p style={styles.author}>by {book.author}</p>

                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: isOutOfStock ? "#e74c3c" : "#27ae60",
                      marginBottom: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {isOutOfStock ? "Sold Out" : `${book.stock} left in stock`}
                  </p>

                  <div style={styles.actionRow}>
                    <span style={styles.price}>
                      ₦{book.price.toLocaleString()}
                    </span>

                    {role !== "admin" && (
                      <button
                        onClick={() => addToCart(book)}
                        disabled={isOutOfStock}
                        style={
                          isOutOfStock
                            ? styles.disabledBtn
                            : styles.addToCartBtn
                        }
                      >
                        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                      </button>
                    )}
                  </div>

                  {role === "admin" && (
                    <div style={styles.adminRow}>
                      <Link to={`/edit-book/${book._id}`} style={{ flex: 1 }}>
                        <button style={styles.editBtn}>Edit</button>
                      </Link>
                      <button
                        onClick={() => handleDelete(book._id)}
                        style={styles.deleteBtn}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: "40px", maxWidth: "1200px", margin: "0 auto" },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    flexWrap: "wrap",
    gap: "20px",
  },
  header: { margin: 0, fontSize: "2.5rem", color: "#333", fontWeight: "bold" },
  searchBar: {
    padding: "12px 20px",
    width: "300px",
    borderRadius: "25px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    outline: "none",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
    transition: "box-shadow 0.3s",
  },
  centerMessage: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "1.5rem",
    color: "#777",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "30px",
  },
  card: {
    border: "1px solid #eee",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    cursor: "pointer",
  },
  cardContent: { padding: "20px" },
  bookTitle: {
    margin: "0 0 5px 0",
    fontSize: "1.25rem",
    color: "#2c3e50",
    cursor: "pointer",
  },
  author: { color: "#7f8c8d", margin: "0 0 10px 0", fontSize: "0.9rem" },
  actionRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  price: { fontSize: "1.2rem", fontWeight: "bold", color: "#27ae60" },

  addToCartBtn: {
    backgroundColor: "#f39c12",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background 0.3s",
  },

  disabledBtn: {
    backgroundColor: "#bdc3c7",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "not-allowed",
    fontWeight: "600",
  },

  editBtn: {
    width: "100%",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
  deleteBtn: {
    flex: 1,
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
  adminRow: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
    paddingTop: "15px",
    borderTop: "1px solid #f0f0f0",
  },
};

export default Home;
