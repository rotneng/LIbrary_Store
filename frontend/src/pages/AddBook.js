import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const navigate = useNavigate();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const API_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api/books"
      : "https://book-store-1esd.onrender.com/api/books";

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    stock: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      await axios.post(API_URL, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess("Book Added Successfully! Redirecting...");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Failed to add book. Are you logged in as Admin?");
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Add a New Book</h2>
        <p style={styles.subHeading}>Fill in the details to publish a book</p>

        {error && <div style={styles.errorMessage}>{error}</div>}
        {success && <div style={styles.successMessage}>{success}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Book Title</label>
            <input
              name="title"
              placeholder="e.g. The Great Gatsby"
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Author</label>
              <input
                name="author"
                placeholder="Author Name"
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Category</label>
              <input
                name="category"
                placeholder="Fiction, Sci-Fi..."
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Stock Quantity</label>
            <input
              name="stock"
              type="number"
              placeholder="0"
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              name="description"
              placeholder="Write a short summary..."
              onChange={handleChange}
              required
              style={styles.textarea}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Cover Image URL</label>
            <input
              name="image"
              placeholder="https://example.com/image.jpg"
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            Publish Book
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
    padding: "20px",
    backgroundColor: "#f5f7fa",
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  },
  heading: {
    margin: "0 0 5px 0",
    color: "#2c3e50",
    fontSize: "1.8rem",
    textAlign: "center",
  },
  subHeading: {
    margin: "0 0 25px 0",
    color: "#7f8c8d",
    fontSize: "0.95rem",
    textAlign: "center",
  },

  successMessage: {
    backgroundColor: "#e8f5e9",
    color: "#27ae60",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "0.9rem",
    border: "1px solid #c8e6c9",
    textAlign: "center",
  },
  errorMessage: {
    backgroundColor: "#ffebee",
    color: "#c0392b",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "0.9rem",
    border: "1px solid #ffcdd2",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },
  label: {
    marginBottom: "5px",
    color: "#34495e",
    fontWeight: "600",
    fontSize: "0.9rem",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #dfe6e9",
    outline: "none",
    backgroundColor: "#fdfdfd",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #dfe6e9",
    outline: "none",
    backgroundColor: "#fdfdfd",
    minHeight: "100px",
    fontFamily: "inherit",
    resize: "vertical",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "0 4px 6px rgba(39, 174, 96, 0.2)",
  },
};

export default AddBook;
