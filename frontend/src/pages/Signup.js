import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const API_BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://book-store-1esd.onrender.com";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/signup`, formData);

      console.log("Signup Success:", res.data);
      alert("Signup Successful! Please Login.");

      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Create Account</h2>
        <p style={styles.subHeading}>Join our library today</p>

        {error && <div style={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <span
            style={{ color: "#3498db", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    padding: "20px",
    backgroundColor: "#f5f7fa",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    textAlign: "center",
  },
  heading: {
    margin: "0 0 10px 0",
    color: "#2c3e50",
    fontSize: "2rem",
  },
  subHeading: {
    margin: "0 0 30px 0",
    color: "#7f8c8d",
    fontSize: "1rem",
  },
  errorMessage: {
    backgroundColor: "#ffebee",
    color: "#c0392b",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "0.9rem",
    border: "1px solid #ffcdd2",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#34495e",
    fontWeight: "600",
    fontSize: "0.9rem",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #dfe6e9",
    outline: "none",
    transition: "border-color 0.3s",
    boxSizing: "border-box",
    backgroundColor: "#fdfdfd",
  },
  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "10px",
  },
  footerText: {
    marginTop: "20px",
    color: "#7f8c8d",
    fontSize: "0.9rem",
  },
};

export default Signup;
