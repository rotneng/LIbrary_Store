import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");

  const API_BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api/books"
      : "https://book-store-1esd.onrender.com/api/books";

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/${id}`);
        setBook(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, API_BASE_URL]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      const token = localStorage.getItem("token");
      // Use dynamic URL
      await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Book deleted!");
      navigate("/");
    } catch (err) {
      alert("Delete failed. You might not be an admin.");
    }
  };

  if (loading) return <div style={styles.center}>Loading details...</div>;
  if (!book) return <div style={styles.center}>Book not found</div>;

  const isOutOfStock = book.stock <= 0;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backBtn}>
        ← Back to Catalog
      </button>

      <div style={styles.contentWrapper}>
        <div style={styles.imageSection}>
          <img
            src={
              book.image ||
              book.coverImage ||
              "https://via.placeholder.com/400x600"
            }
            alt={book.title}
            style={styles.image}
          />
        </div>

        <div style={styles.infoSection}>
          <h1 style={styles.title}>{book.title}</h1>
          <h3 style={styles.author}>by {book.author}</h3>

          <p style={styles.description}>
            {book.description || "No description available for this book."}
          </p>

          <div style={styles.meta}>
            <p>
              <strong>Category:</strong> {book.category}
            </p>
            <p>
              <strong>Shelf Location:</strong>{" "}
              {book.location || "General Section"}
            </p>
          </div>

          <div style={styles.statusContainer}>
            <span style={isOutOfStock ? styles.statusOut : styles.statusIn}>
              {isOutOfStock
                ? "🔴 Checked Out / Unavailable"
                : "🟢 Available in Library"}
            </span>
            {!isOutOfStock && (
              <span style={styles.stockCount}>({book.stock} copies)</span>
            )}
          </div>

          <hr style={styles.divider} />

          <div style={styles.actionArea}>
            {role === "admin" ? (
              <div style={styles.adminButtons}>
                <Link to={`/edit-book/${book._id}`} style={{ flex: 1 }}>
                  <button style={styles.editBtn}>Edit Book</button>
                </Link>
                <button onClick={handleDelete} style={styles.deleteBtn}>
                  Delete Book
                </button>
              </div>
            ) : (
              <div style={styles.note}>
                Visit the library desk to borrow this book.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "40px", maxWidth: "1000px", margin: "0 auto" },
  center: { textAlign: "center", marginTop: "50px", fontSize: "1.5rem" },

  backBtn: {
    background: "none",
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
    marginBottom: "20px",
    color: "#2980b9",
    fontWeight: "bold",
  },

  contentWrapper: { display: "flex", gap: "50px", flexWrap: "wrap" },

  imageSection: { flex: "1", minWidth: "300px" },
  image: {
    width: "100%",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    objectFit: "cover",
  },

  infoSection: { flex: "1.5", minWidth: "300px" },
  title: { fontSize: "2.5rem", margin: "0 0 10px 0", color: "#2c3e50" },
  author: { fontSize: "1.2rem", color: "#7f8c8d", marginBottom: "20px" },

  description: {
    lineHeight: "1.6",
    color: "#34495e",
    fontSize: "1.1rem",
    marginBottom: "20px",
  },

  meta: { marginTop: "20px", color: "#7f8c8d", fontSize: "0.95rem" },

  statusContainer: {
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  statusIn: {
    padding: "8px 15px",
    backgroundColor: "#d4edda",
    color: "#155724",
    borderRadius: "20px",
    fontWeight: "bold",
    border: "1px solid #c3e6cb",
  },
  statusOut: {
    padding: "8px 15px",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    borderRadius: "20px",
    fontWeight: "bold",
    border: "1px solid #f5c6cb",
  },
  stockCount: { color: "#7f8c8d" },

  divider: { margin: "30px 0", border: "none", borderTop: "1px solid #eee" },

  actionArea: { marginTop: "20px" },

  note: { fontStyle: "italic", color: "#7f8c8d" },

  adminButtons: { display: "flex", gap: "15px" },
  editBtn: {
    width: "100%",
    padding: "15px",
    fontSize: "1rem",
    backgroundColor: "#f39c12",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  deleteBtn: {
    flex: 1,
    padding: "15px",
    fontSize: "1rem",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default BookDetails;
