import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    description: "",
    stock: "",
    coverImage: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.post("/api/books", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Book Added Successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to add book. Are you logged in as Admin?");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <h2 style={{ textAlign: "center" }}>Add a New Book</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
          style={{ padding: "10px" }}
        />
        <input
          name="author"
          placeholder="Author"
          onChange={handleChange}
          required
          style={{ padding: "10px" }}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          required
          style={{ padding: "10px" }}
        />
        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
          style={{ padding: "10px" }}
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock Quantity"
          onChange={handleChange}
          required
          style={{ padding: "10px" }}
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
          style={{ padding: "10px", height: "100px" }}
        />

        <input
          name="coverImage"
          placeholder="Image URL (e.g. https://...)"
          onChange={handleChange}
          style={{ padding: "10px" }}
        />

        <button
          type="submit"
          style={{
            padding: "15px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Publish Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
