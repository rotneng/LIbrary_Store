import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brandContainer}>
        <Link to="/" style={styles.brand}>
          📚Bookstore
        </Link>

        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={styles.hamburger}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        )}
      </div>

      <div
        style={{
          ...styles.menu,
          ...(isMobile ? styles.mobileMenu : {}),
          ...(isMobile && !menuOpen ? styles.hideMenu : {}),
        }}
      >
        <Link
          to="/"
          style={isMobile ? styles.mobileLink : styles.link}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>

        {isLoggedIn ? (
          <>
            {role === "admin" && (
              <Link
                to="/add-book"
                style={isMobile ? styles.mobileLink : styles.addButton}
                onClick={() => setMenuOpen(false)}
              >
                + Add Book
              </Link>
            )}

            <button
              onClick={handleLogout}
              style={isMobile ? styles.mobileLogoutBtn : styles.logoutBtn}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={isMobile ? styles.mobileLink : styles.link}
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              style={isMobile ? styles.mobilePrimaryBtn : styles.primaryBtn}
              onClick={() => setMenuOpen(false)}
            >
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
    flexWrap: "wrap",
  },

  brandContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "auto",
    flex: 1,
  },

  brand: {
    color: "#ecf0f1",
    textDecoration: "none",
    fontSize: "1.5rem",
    fontWeight: "800",
    letterSpacing: "1px",
    whiteSpace: "nowrap",
  },

  hamburger: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "1.8rem",
    cursor: "pointer",
    marginLeft: "auto",
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

  mobileMenu: {
    flexDirection: "column",
    width: "100%",
    marginTop: "20px",
    gap: "15px",
    alignItems: "flex-start",
    borderTop: "1px solid #34495e",
    paddingTop: "20px",
  },

  hideMenu: {
    display: "none",
  },

  mobileLink: {
    color: "#bdc3c7",
    textDecoration: "none",
    fontSize: "1.1rem",
    display: "block",
    width: "100%",
    padding: "10px 0",
  },

  mobilePrimaryBtn: {
    color: "#fff",
    backgroundColor: "#2980b9",
    textDecoration: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },

  mobileLogoutBtn: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1rem",
    width: "100%",
  },
};

export default Navbar;
