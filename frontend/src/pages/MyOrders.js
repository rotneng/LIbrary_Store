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
        const res = await axios.get(
          "http://localhost:5000/api/orders/my-orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, []);

  const renderBookNames = (order) => {
    if (order.orderItems && order.orderItems.length > 0) {
      return (
        <div style={styles.bookList}>
          {order.orderItems.map((item, index) => (
            <div key={index}>
              • {item.title} <span style={styles.qty}>x{item.qty}</span>
            </div>
          ))}
        </div>
      );
    }

    if (order.bookTitle) {
      let cleanText = order.bookTitle
        .replace(/\*\*Bulk Order:\s*/gi, "")
        .replace(/\*\*/g, "")
        .trim();

      if (!cleanText)
        return <span style={{ color: "red" }}>Unknown Title</span>;

      return <div>{cleanText}</div>;
    }

    return <span style={{ color: "#999" }}>No details available</span>;
  };

  const isOrderPaid = (order) => {
    return order.isPaid === true || order.status === "Paid";
  };

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
                <th style={styles.th}>Books Purchased</th>
                <th style={styles.th}>Total Amount</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const paid = isOrderPaid(order);
                return (
                  <tr key={order._id} style={styles.row}>
                    <td style={styles.td}>
                      <span style={{ color: "#888", fontFamily: "monospace" }}>
                        {order._id.substring(0, 8).toUpperCase()}
                      </span>
                    </td>

                    <td style={styles.td}>{renderBookNames(order)}</td>

                    <td style={styles.td}>
                      ₦
                      {(order.totalPrice || order.amount || 0).toLocaleString()}
                    </td>

                    <td style={styles.td}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    <td style={styles.td}>
                      <span style={paid ? styles.paid : styles.pending}>
                        {paid ? "Paid" : "Pending"}
                      </span>
                    </td>
                  </tr>
                );
              })}
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
  center: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "1.2rem",
    color: "#666",
  },
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
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "600px" },
  headerRow: { backgroundColor: "#f8f9fa", color: "#333", textAlign: "left" },
  th: { padding: "15px", borderBottom: "2px solid #ddd", fontWeight: "600" },
  row: { borderBottom: "1px solid #eee", backgroundColor: "#fff" },
  td: { padding: "15px", color: "#555", verticalAlign: "top" },

  bookList: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    fontSize: "0.95rem",
  },
  qty: { color: "#999", fontSize: "0.85rem", marginLeft: "5px" },

  paid: {
    padding: "5px 12px",
    borderRadius: "15px",
    backgroundColor: "#d4edda",
    color: "#155724",
    fontSize: "0.85rem",
    fontWeight: "bold",
  },
  pending: {
    padding: "5px 12px",
    borderRadius: "15px",
    backgroundColor: "#fff3cd",
    color: "#856404",
    fontSize: "0.85rem",
    fontWeight: "bold",
  },
};

export default MyOrders;
