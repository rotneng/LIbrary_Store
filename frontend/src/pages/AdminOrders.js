import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const renderOrderItems = (order) => {
    if (order.orderItems && order.orderItems.length > 0) {
      return (
        <div style={styles.bookList}>
          {order.orderItems.map((item, index) => (
            <div key={index} style={styles.bookItem}>
              • {item.title} <span style={styles.qty}>x{item.qty}</span>
            </div>
          ))}
        </div>
      );
    }

    if (order.bookTitle) {
      return <span>{order.bookTitle}</span>;
    }

    return <span style={{ color: "#999", fontStyle: "italic" }}>No items</span>;
  };

  if (loading) return <div style={styles.center}>Loading Orders...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>All Orders ({orders.length})</h1>

      {orders.length === 0 ? (
        <p style={styles.center}>No orders found.</p>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={styles.th}>Order ID</th>
                <th style={styles.th}>Customer</th>
                <th style={styles.th}>Books Purchased</th>
                <th style={styles.th}>Total</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} style={styles.row}>
                  {/* ID */}
                  <td style={styles.td}>
                    <span style={styles.idText}>
                      {order._id.substring(0, 10).toUpperCase()}
                    </span>
                  </td>

                  <td style={styles.td}>
                    {order.user ? (
                      <strong>{order.user.email}</strong>
                    ) : (
                      <span style={{ color: "#999" }}>Guest/Deleted</span>
                    )}
                  </td>

                  <td style={styles.td}>{renderOrderItems(order)}</td>

                  <td style={styles.td}>
                    ₦{(order.totalPrice || order.amount || 0).toLocaleString()}
                  </td>

                  <td style={styles.td}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td style={styles.td}>
                    <span
                      style={
                        order.isPaid ? styles.paidBadge : styles.pendingBadge
                      }
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
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
  container: { padding: "40px", maxWidth: "1200px", margin: "0 auto" },
  header: { marginBottom: "30px", color: "#2c3e50" },
  center: { textAlign: "center", fontSize: "1.2rem", marginTop: "50px" },

  tableWrapper: {
    overflowX: "auto",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "800px" },

  headerRow: { backgroundColor: "#34495e", color: "white" },
  th: { padding: "15px", textAlign: "left", fontWeight: "600" },

  row: { borderBottom: "1px solid #eee", backgroundColor: "#fff" },
  td: { padding: "15px", color: "#555", verticalAlign: "top" },

  idText: { fontFamily: "monospace", color: "#888" },

  bookList: { display: "flex", flexDirection: "column", gap: "5px" },
  bookItem: { fontSize: "0.9rem" },
  qty: { color: "#888", fontSize: "0.8rem", marginLeft: "5px" },

  paidBadge: {
    padding: "5px 10px",
    borderRadius: "15px",
    backgroundColor: "#d1e7dd",
    color: "#0f5132",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
  pendingBadge: {
    padding: "5px 10px",
    borderRadius: "15px",
    backgroundColor: "#fff3cd",
    color: "#856404",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
};

export default AdminOrders;
