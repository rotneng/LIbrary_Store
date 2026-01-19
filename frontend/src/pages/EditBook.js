import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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
        alert("Error loading book details");
        navigate("/");
      }
    };
    fetchBook();
  }, [id, navigate, API_BASE_URL]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API_BASE_URL}/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Book Updated Successfully!");
      navigate(`/book/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update book. Are you an admin?");
    }
  };

  if (loading) return <h2>Loading Book Details...</h2>;

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <h2 style={{ textAlign: "center" }}>Edit Book Details</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <label>Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label>Author</label>
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label>Category</label>
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={styles.input}
        />

        <label>Shelf Location (Optional)</label>
        <input
          name="location"
          placeholder="e.g. Aisle 5, Shelf B"
          value={formData.location}
          onChange={handleChange}
          style={styles.input}
        />

        <label>Stock Quantity</label>
        <input
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          style={{ ...styles.input, height: "100px" }}
        />

        <label>Image URL</label>
        <input
          name="image"
          placeholder="https://..."
          value={formData.image}
          onChange={handleChange}
          style={styles.input}
        />

        <button
          type="submit"
          style={{
            padding: "15px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            borderRadius: "5px",
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

const styles = {
  input: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
};

export default EditBook;
