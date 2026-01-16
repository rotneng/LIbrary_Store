import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`/api/books/${id}`);
        setBook(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Book deleted!");
      navigate("/");
    } catch (err) {
      alert("Delete failed.");
    }
  };

  if (loading) return <div style={styles.center}>Loading details...</div>;
  if (!book) return <div style={styles.center}>Book not found</div>;

  const isOutOfStock = book.stock <= 0;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backBtn}>
        ← Back
      </button>

      <div style={styles.contentWrapper}>
        <div style={styles.imageSection}>
          <img
            src={book.coverImage || "https://via.placeholder.com/400x600"}
            alt={book.title}
            style={styles.image}
          />
        </div>

        <div style={styles.infoSection}>
          <h1 style={styles.title}>{book.title}</h1>
          <h3 style={styles.author}>by {book.author}</h3>

          <div style={styles.priceTag}>₦{book.price.toLocaleString()}</div>

          <p style={styles.description}>
            {book.description || "No description available for this book."}
          </p>

          <div style={styles.meta}>
            <p>
              <strong>Category:</strong> {book.category}
            </p>

            <p
              style={{
                marginTop: "10px",
                color: isOutOfStock ? "#e74c3c" : "#27ae60",
                fontWeight: "bold",
              }}
            >
              <strong>Availability: </strong>
              {isOutOfStock ? "Sold Out" : `${book.stock} copies in stock`}
            </p>
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
              <button
                onClick={() => addToCart(book)}
                disabled={isOutOfStock}
                style={isOutOfStock ? styles.disabledBtn : styles.buyBtn}
              >
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </button>
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
    fontSize: "1.2rem",
    cursor: "pointer",
    marginBottom: "20px",
    color: "#555",
  },

  contentWrapper: { display: "flex", gap: "50px", flexWrap: "wrap" },

  imageSection: { flex: "1", minWidth: "300px" },
  image: {
    width: "100%",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  },

  infoSection: { flex: "1.5", minWidth: "300px" },
  title: { fontSize: "2.5rem", margin: "0 0 10px 0", color: "#333" },
  author: { fontSize: "1.2rem", color: "#777", marginBottom: "20px" },
  priceTag: {
    fontSize: "2rem",
    color: "#27ae60",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  description: { lineHeight: "1.6", color: "#555", fontSize: "1.1rem" },
  meta: { marginTop: "20px", color: "#888", fontSize: "0.9rem" },
  divider: { margin: "30px 0", border: "none", borderTop: "1px solid #eee" },

  actionArea: { marginTop: "20px" },

  buyBtn: {
    width: "100%",
    padding: "15px",
    fontSize: "1.2rem",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s",
  },

  disabledBtn: {
    width: "100%",
    padding: "15px",
    fontSize: "1.2rem",
    backgroundColor: "#bdc3c7",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "not-allowed",
  },

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
  },
};

export default BookDetails;
