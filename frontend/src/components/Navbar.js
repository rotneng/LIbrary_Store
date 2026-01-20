import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      <style>
        {`
          .nav-link {
            color: #cbd5e1;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease, transform 0.2s ease;
            font-size: 0.95rem;
          }
          .nav-link:hover {
            color: #38bdf8;
            transform: translateY(-1px);
          }
          .nav-btn {
            transition: all 0.2s ease;
            cursor: pointer;
          }
          .nav-btn:hover {
            filter: brightness(1.1);
            transform: translateY(-1px);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .mobile-menu-item {
            border-bottom: 1px solid #334155;
          }
          .mobile-menu-item:last-child {
            border-bottom: none;
          }
        `}
      </style>

      <nav style={styles.nav}>
        <div style={styles.container}>
          <div style={styles.brandContainer}>
            <Link to="/" style={styles.brand}>
              <span style={{ fontSize: "1.5rem", marginRight: "8px" }}>📚</span>
              Library<span style={{ color: "#38bdf8" }}>Store</span>
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
              className="nav-link"
              style={isMobile ? styles.mobileLink : styles.link}
              onClick={() => setMenuOpen(false)}
            >
              Catalog
            </Link>

            {isLoggedIn ? (
              <>
                {role === "admin" && (
                  <>
                    <Link
                      to="/admin-dashboard"
                      className="nav-link"
                      style={isMobile ? styles.mobileLink : styles.link}
                      onClick={() => setMenuOpen(false)}
                    >
                      Dashboard
                    </Link>

                    <Link
                      to="/add-book"
                      className="nav-btn"
                      style={isMobile ? styles.mobileLink : styles.addButton}
                      onClick={() => setMenuOpen(false)}
                    >
                      + Add Book
                    </Link>
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className="nav-btn"
                  style={isMobile ? styles.mobileLogoutBtn : styles.logoutBtn}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="nav-link"
                  style={isMobile ? styles.mobileLink : styles.link}
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="nav-btn"
                  style={isMobile ? styles.mobilePrimaryBtn : styles.primaryBtn}
                  onClick={() => setMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

const styles = {
  nav: {
    backgroundColor: "#1e293b",
    color: "#f8fafc",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    fontFamily: "'Inter', sans-serif",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "70px",
    flexWrap: "wrap",
  },
  brandContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  brand: {
    color: "#f8fafc",
    textDecoration: "none",
    fontSize: "1.4rem",
    fontWeight: "700",
    letterSpacing: "-0.5px",
    display: "flex",
    alignItems: "center",
  },
  hamburger: {
    background: "transparent",
    border: "1px solid #475569",
    borderRadius: "8px",
    color: "#cbd5e1",
    fontSize: "1.2rem",
    cursor: "pointer",
    padding: "5px 10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  menu: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
  },
  link: {
    padding: "5px 0",
  },
  addButton: {
    backgroundColor: "#f59e0b",
    color: "#fff",
    textDecoration: "none",
    padding: "8px 20px",
    borderRadius: "50px",
    fontSize: "0.9rem",
    fontWeight: "600",
    border: "none",
    boxShadow: "0 2px 4px rgba(245, 158, 11, 0.3)",
  },
  primaryBtn: {
    backgroundColor: "#38bdf8",
    color: "#0f172a",
    textDecoration: "none",
    padding: "10px 24px",
    borderRadius: "50px",
    fontSize: "0.9rem",
    fontWeight: "700",
    boxShadow: "0 2px 10px rgba(56, 189, 248, 0.2)",
  },
  logoutBtn: {
    backgroundColor: "transparent",
    color: "#ef4444",
    border: "1px solid #ef4444",
    padding: "8px 20px",
    borderRadius: "50px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: "600",
  },

  mobileMenu: {
    flexBasis: "100%",
    flexDirection: "column",
    gap: "0",
    backgroundColor: "#0f172a",
    borderTop: "1px solid #334155",
    padding: "0",
    marginTop: "15px",
    overflow: "hidden",
    borderRadius: "0 0 8px 8px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  },
  hideMenu: {
    display: "none",
  },
  mobileLink: {
    display: "block",
    width: "100%",
    padding: "15px 20px",
    color: "#cbd5e1",
    textDecoration: "none",
    borderBottom: "1px solid #1e293b",
    fontSize: "1rem",
  },
  mobilePrimaryBtn: {
    display: "block",
    textAlign: "center",
    backgroundColor: "#38bdf8",
    color: "#0f172a",
    padding: "12px",
    margin: "15px 20px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  mobileLogoutBtn: {
    width: "calc(100% - 40px)",
    margin: "10px 20px 20px 20px",
    padding: "12px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
  },
};

export default Navbar;
