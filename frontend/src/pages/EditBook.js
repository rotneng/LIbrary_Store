import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    description: "",
    coverImage: "",
    stock: "",
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`/api/books/${id}`);
        setFormData(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Error loading book details");
        navigate("/");
      }
    };
    fetchBook();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/books/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Book Updated Successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to update book.");
    }
  };

  if (loading) return <h2>Loading Book Details...</h2>;

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <h2 style={{ textAlign: "center" }}>Edit Book</h2>
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
          style={{ padding: "10px" }}
        />

        <label>Author</label>
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          style={{ padding: "10px" }}
        />

        <label>Price</label>
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
          style={{ padding: "10px" }}
        />

        <label>Category</label>
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={{ padding: "10px" }}
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          style={{ padding: "10px", height: "100px" }}
        />

        <label>Cover Image URL</label>
        <input
          name="coverImage"
          value={formData.coverImage}
          onChange={handleChange}
          style={{ padding: "10px" }}
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
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBook;
