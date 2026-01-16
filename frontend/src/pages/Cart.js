import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const { cart, removeFromCart, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to checkout");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const userEmail = localStorage.getItem("userEmail") || "user@example.com";
      const tempRef = `TEMP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      const orderItems = cart.map((item) => ({
        product: item._id,
        title: item.title,
        price: item.price,
        qty: item.qty || 1,
      }));

      const orderResponse = await axios.post(
        "http://localhost:5000/api/orders",
        {
          orderItems: orderItems,
          totalPrice: totalPrice,
          amount: totalPrice,
          email: userEmail,
          reference: tempRef,
        },
        config
      );

      const createdOrderId = orderResponse.data._id;

      const bookTitles = cart.map((item) => item.title).join(", ");

      const paymentRes = await axios.post(
        "http://localhost:5000/api/payment/initialize",
        {
          email: userEmail,
          amount: totalPrice,
          orderId: createdOrderId,
          bookTitle: `Bulk Order: ${bookTitles}`,
        },
        config
      );

      window.location.href = paymentRes.data.authorization_url;
    } catch (err) {
      console.error("Checkout Error:", err);
      const errorMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : "Checkout failed. Please try again.";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div style={styles.container}>
        <h2>Your Cart is Empty</h2>
        <Link to="/" style={styles.shopBtn}>
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Shopping Cart ({cart.length})</h2>

      <div style={styles.list}>
        {cart.map((item) => (
          <div key={item._id} style={styles.item}>
            <div>
              <h3>{item.title}</h3>
              <p>by {item.author}</p>
            </div>
            <div style={styles.actions}>
              <span style={styles.price}>₦{item.price.toLocaleString()}</span>
              <button
                onClick={() => removeFromCart(item._id)}
                style={styles.removeBtn}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.summary}>
        <h3>Total: ₦{totalPrice.toLocaleString()}</h3>
        <button
          onClick={handleCheckout}
          disabled={loading}
          style={styles.checkoutBtn}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "40px", maxWidth: "800px", margin: "0 auto" },
  header: {
    borderBottom: "1px solid #ddd",
    paddingBottom: "15px",
    marginBottom: "20px",
  },
  list: { marginBottom: "30px" },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 0",
    borderBottom: "1px solid #eee",
  },
  actions: { display: "flex", alignItems: "center", gap: "20px" },
  price: { fontWeight: "bold", fontSize: "1.2rem", color: "#2c3e50" },
  removeBtn: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  summary: { textAlign: "right", marginTop: "20px" },
  checkoutBtn: {
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    padding: "15px 30px",
    borderRadius: "5px",
    fontSize: "1.2rem",
    cursor: "pointer",
    fontWeight: "bold",
  },
  shopBtn: {
    display: "inline-block",
    marginTop: "20px",
    color: "#3498db",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Cart;
