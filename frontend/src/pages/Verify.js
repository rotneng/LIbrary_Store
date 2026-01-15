import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("Verifying...");

  const reference = searchParams.get("reference");

  useEffect(() => {
    if (!reference) {
      setStatus("Invalid Payment Reference.");
      return;
    }

    const verifyPayment = async () => {
      try {
        const token = localStorage.getItem("token");

        await axios.post(
          "/api/payment/verify",
          { reference },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setStatus("Success! Payment Verified.");

        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (err) {
        console.error(err);
        setStatus("Verification Failed. Please contact support.");
      }
    };

    verifyPayment();
  }, [reference, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Payment Status</h1>
      <h2 style={{ color: status.includes("Success") ? "green" : "red" }}>
        {status}
      </h2>

      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          backgroundColor: "#333",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Back to Shop
      </button>
    </div>
  );
};

export default Verify;
