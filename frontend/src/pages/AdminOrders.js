import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/orders", {
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
                <th style={styles.th}>Customer Email</th>
                <th style={styles.th}>Book Title</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} style={styles.row}>
                  <td style={styles.td}>{order._id.substring(0, 10)}...</td>
                  <td style={styles.td}>
                    {order.user ? order.user.email : "Unknown User"}
                  </td>
                  <td style={styles.td}>{order.bookTitle}</td>
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
  container: { padding: "40px", maxWidth: "1200px", margin: "0 auto" },
  header: { marginBottom: "30px", color: "#2c3e50" },
  center: { textAlign: "center", fontSize: "1.2rem", marginTop: "50px" },

  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "600px" },

  headerRow: { backgroundColor: "#34495e", color: "white" },
  th: { padding: "15px", textAlign: "left", borderBottom: "1px solid #ddd" },

  row: { borderBottom: "1px solid #eee" },
  td: { padding: "15px", color: "#555" },

  statusBadge: {
    padding: "5px 10px",
    borderRadius: "15px",
    backgroundColor: "#27ae60",
    color: "white",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
};

export default AdminOrders;
