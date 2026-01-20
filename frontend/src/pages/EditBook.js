import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const API_BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api/books"
      : "https://book-store-1esd.onrender.com/api/books";

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    image: "",
    stock: "",
    location: "",
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/${id}`);
        const data = res.data;
        setFormData({
          title: data.title,
          author: data.author,
          category: data.category,
          description: data.description,
          stock: data.stock,
          image: data.image || data.coverImage || "",
          location: data.location || "",
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error loading book details.");
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, API_BASE_URL]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API_BASE_URL}/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess("Book Updated Successfully! Redirecting...");

      setTimeout(() => {
        navigate(`/`);
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Failed to update book. Are you logged in as Admin?");
    }
  };

  if (loading)
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Loading Book Details...
      </h2>
    );

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Edit Book Details</h2>

        {error && <div style={styles.errorMessage}>{error}</div>}
        {success && <div style={styles.successMessage}>{success}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Title</label>
            <input
              name="title"
              value={formData.title}
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
                value={formData.author}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Category</label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Shelf Location</label>
              <input
                name="location"
                placeholder="e.g. Aisle 5"
                value={formData.location}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Stock</label>
              <input
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              style={styles.textarea}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Image URL</label>
            <input
              name="image"
              placeholder="https://..."
              value={formData.image}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            Save Changes
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
    margin: "0 0 20px 0",
    color: "#2c3e50",
    fontSize: "1.8rem",
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
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    color: "#34495e",
    fontWeight: "600",
    fontSize: "0.9rem",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #dfe6e9",
    outline: "none",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #dfe6e9",
    outline: "none",
    height: "100px",
    fontFamily: "inherit",
    resize: "vertical",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.3s",
  },
};

export default EditBook;
