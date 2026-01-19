import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books");
        setBooks(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) return <div style={styles.center}>Loading Dashboard...</div>;

  const totalBooks = books.length;
  const totalStock = books.reduce((acc, book) => acc + (book.stock || 0), 0);
  const lowStockBooks = books.filter((book) => book.stock < 5);

  const recentBooks = [...books].reverse().slice(0, 5);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Admin Dashboard</h1>

      <div style={styles.statsGrid}>
        <div style={styles.card}>
          <h3>Total Books</h3>
          <p style={styles.bigNumber}>{totalBooks}</p>
        </div>
        <div style={styles.card}>
          <h3>Total Stock (Copies)</h3>
          <p style={styles.bigNumber}>{totalStock}</p>
        </div>
        <div style={styles.card}>
          <h3>Low Stock Alerts</h3>
          <p
            style={{
              ...styles.bigNumber,
              color: lowStockBooks.length > 0 ? "red" : "green",
            }}
          >
            {lowStockBooks.length}
          </p>
        </div>
      </div>

      <div style={styles.section}>
        <h2>Action Center</h2>
        <div style={styles.actionRow}>
          <Link to="/add-book">
            <button style={styles.addBtn}>➕ Add New Book</button>
          </Link>
        </div>
      </div>

      <div style={styles.section}>
        <h2>Recently Added Books</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Author</th>
              <th style={styles.th}>Stock</th>
              <th style={styles.th}>Date Added</th>
            </tr>
          </thead>
          <tbody>
            {recentBooks.map((book) => (
              <tr key={book._id}>
                <td style={styles.td}>{book.title}</td>
                <td style={styles.td}>{book.author}</td>
                <td style={styles.td}>
                  <span
                    style={book.stock < 5 ? styles.lowStock : styles.okStock}
                  >
                    {book.stock}
                  </span>
                </td>
                <td style={styles.td}>
                  {book.createdAt
                    ? new Date(book.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "40px", maxWidth: "1000px", margin: "0 auto" },
  header: { marginBottom: "30px", color: "#2c3e50" },
  center: { textAlign: "center", marginTop: "50px" },

  statsGrid: {
    display: "flex",
    gap: "20px",
    marginBottom: "40px",
    flexWrap: "wrap",
  },
  card: {
    flex: 1,
    minWidth: "200px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  bigNumber: {
    fontSize: "3rem",
    margin: "10px 0",
    fontWeight: "bold",
    color: "#3498db",
  },

  section: { marginBottom: "40px" },
  actionRow: { marginBottom: "20px" },

  addBtn: {
    padding: "15px 30px",
    backgroundColor: "#27ae60",
    color: "white",
    fontSize: "1.1rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  th: {
    padding: "15px",
    backgroundColor: "#f8f9fa",
    textAlign: "left",
    borderBottom: "2px solid #eee",
  },
  td: { padding: "15px", borderBottom: "1px solid #eee" },

  lowStock: { color: "red", fontWeight: "bold" },
  okStock: { color: "green" },
};

export default AdminDashboard;
