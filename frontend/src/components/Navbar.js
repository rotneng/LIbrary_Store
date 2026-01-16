import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <nav style={styles.nav}>
      <div>
        <Link to="/" style={styles.brand}>
          📚Bookstore
        </Link>
      </div>

      <div style={styles.menu}>
        <Link to="/" style={styles.link}>
          Home
        </Link>

        {isLoggedIn ? (
          <>
            {role === "admin" && (
              <Link to="/add-book" style={styles.addButton}>
                + Add Book
              </Link>
            )}

            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/signup" style={styles.primaryBtn}>
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    padding: "15px 40px",
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  brand: {
    color: "#ecf0f1",
    textDecoration: "none",
    fontSize: "1.5rem",
    fontWeight: "800",
    letterSpacing: "1px",
  },

  menu: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  link: {
    color: "#bdc3c7",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "color 0.3s",
  },

  addButton: {
    color: "#2c3e50",
    backgroundColor: "#f1c40f",
    textDecoration: "none",
    fontWeight: "bold",
    padding: "8px 15px",
    borderRadius: "20px",
    fontSize: "0.9rem",
  },

  primaryBtn: {
    color: "#fff",
    backgroundColor: "#2980b9",
    textDecoration: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    fontWeight: "bold",
  },

  logoutBtn: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "0.9rem",
  },
};

export default Navbar;
