import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState("Verifying payment...");

  const { clearCart } = useCart();

  useEffect(() => {
    const verifyTransaction = async () => {
      if (!reference) {
        setStatus("No reference found.");
        return;
      }

      try {
        const token = localStorage.getItem("token");

        await axios.post(
          "/api/payment/verify",
          { reference },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setStatus("Payment Successful! Order Saved.");
        clearCart();

        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (err) {
        console.error(err);
        setStatus("Payment verification failed. Please contact support.");
      }
    };

    verifyTransaction();
  }, [reference, navigate, clearCart]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>{status}</h1>
      <p>Reference: {reference}</p>
      {status.includes("Successful") && <p>Redirecting you home...</p>}
    </div>
  );
};

export default PaymentSuccess;
