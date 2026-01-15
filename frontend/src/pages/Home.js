import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("/api/books");
        setBooks(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch books.");
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this book completely?")
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBooks(books.filter((book) => book._id !== id));
      alert("Book deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete. Are you logged in?");
    }
  };

  const handleBuy = async (book) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please Login to buy a book!");
      navigate("/login");
      return;
    }

    try {
      const userRes = await axios.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userEmail = userRes.data.email;
      const paymentRes = await axios.post(
        "/api/payment/initialize",
        {
          email: userEmail,
          amount: book.price,
          bookTitle: book.title,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      window.location.href = paymentRes.data.authorization_url;
    } catch (err) {
      console.error(err);
      alert("Payment initialization failed. Check console.");
    }
  };

  if (loading)
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Loading Books...
      </h2>
    );
  if (error)
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        {error}
      </h2>
    );

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        Our Collection
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "30px",
        }}
      >
        {books.map((book) => (
          <div
            key={book._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={book.coverImage || "https://via.placeholder.com/250x150"}
              alt={book.title}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{ padding: "20px" }}>
              <h3 style={{ margin: "0 0 10px 0", fontSize: "1.2rem" }}>
                {book.title}
              </h3>
              <p style={{ color: "#555", margin: "0 0 10px 0" }}>
                by {book.author}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              >
                <span
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#2ecc71",
                  }}
                >
                  ₦{book.price.toLocaleString()}
                </span>

                <button
                  onClick={() => handleBuy(book)}
                  style={{
                    backgroundColor: "#333",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Buy Now
                </button>
              </div>

              {role === "admin" && (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "15px",
                    paddingTop: "10px",
                    borderTop: "1px solid #eee",
                  }}
                >
                  <Link to={`/edit-book/${book._id}`} style={{ flex: 1 }}>
                    <button
                      style={{
                        width: "100%",
                        backgroundColor: "#f39c12",
                        color: "white",
                        border: "none",
                        padding: "8px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(book._id)}
                    style={{
                      flex: 1,
                      backgroundColor: "#e74c3c",
                      color: "white",
                      border: "none",
                      padding: "8px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
