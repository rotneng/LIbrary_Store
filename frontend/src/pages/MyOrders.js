import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/orders/my-orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, []);

  if (loading) return <div style={styles.center}>Loading your orders...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>My Purchase History</h1>

      {orders.length === 0 ? (
        <div style={styles.emptyState}>
          <p>You haven't bought any books yet.</p>
          <Link to="/" style={styles.shopBtn}>
            Browse Books
          </Link>
        </div>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={styles.th}>Order Ref</th>
                <th style={styles.th}>Book Title</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} style={styles.row}>
                  <td style={styles.td}>
                    {order.reference || order._id.substring(0, 8)}
                  </td>
                  <td style={styles.td}>**{order.bookTitle}**</td>
                  <td style={styles.td}>₦{order.amount.toLocaleString()}</td>
                  <td style={styles.td}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td style={styles.td}>
                    <span style={styles.statusBadge}>{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: "40px", maxWidth: "1000px", margin: "0 auto" },
  header: { marginBottom: "30px", color: "#2c3e50" },
  center: { textAlign: "center", marginTop: "50px", fontSize: "1.2rem" },

  emptyState: { textAlign: "center", marginTop: "50px", color: "#777" },
  shopBtn: {
    display: "inline-block",
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
  },

  tableWrapper: {
    overflowX: "auto",
    border: "1px solid #eee",
    borderRadius: "8px",
  },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "600px" },

  headerRow: { backgroundColor: "#f8f9fa", color: "#333", textAlign: "left" },
  th: { padding: "15px", borderBottom: "2px solid #ddd" },

  row: { borderBottom: "1px solid #eee" },
  td: { padding: "15px", color: "#555" },

  statusBadge: {
    padding: "5px 12px",
    borderRadius: "15px",
    backgroundColor: "#e1f5fe",
    color: "#0288d1",
    fontSize: "0.85rem",
    fontWeight: "bold",
  },
};

export default MyOrders;
