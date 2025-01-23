import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

const Payment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId, passengerCount, price } = location.state as {
    bookingId: string;
    passengerCount: number;
    price: number;
  };

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const calculatedAmount = passengerCount * price;
    setTotalAmount(calculatedAmount);
  }, [passengerCount, price]);

  const handleProceedToPayment = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/payments/proceed/${bookingId}`,
        { headers: { "Content-Type": "application/json" } }
      );

      const { sessionUrl } = response.data;
      if (sessionUrl) {
        window.location.href = sessionUrl;
      } else {
        alert("Payment session could not be created. Please try again.");
      }
    } catch (error) {
      console.error("Error creating payment session:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header">
          <h3 className="card-title">Payment Details</h3>
          <p>Booking ID: <strong>{bookingId}</strong></p>
        </div>
        <div className="card-body">
          <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
          <button className="btn btn-success" onClick={handleProceedToPayment}>
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;