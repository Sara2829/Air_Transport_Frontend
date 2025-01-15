import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentConfirmation: React.FC = () => {
  const location = useLocation();
  const { bookingId, totalAmount, paymentStatus: initialPaymentStatus, paymentId } = location.state as {
    bookingId: string;
    totalAmount: number;
    paymentStatus: string;
    paymentId: string;
  };

  const [paymentStatus, setPaymentStatus] = useState(initialPaymentStatus);

  useEffect(() => {
    const processPaymentStatus = async () => {
      if (paymentId) {
        try {
          // Update the payment status to SUCCESS on the backend
          const response = await axios.put(
            `http://localhost:8080/payments/${paymentId}`, // API endpoint to confirm payment
            {
              amount: totalAmount,
              status: 'SUCCESS',
              bookingId: bookingId,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          console.log("Payment confirmed:", response.data);

          // Update the payment status based on the API response
          setPaymentStatus(response.data.status || 'UNKNOWN');
          alert("Payment confirmed! Your booking is now completed.");
        } catch (error) {
          console.error("Error confirming payment:", error);
          alert("Failed to confirm payment. Please try again.");
        }
      }
    };

    processPaymentStatus();
  }, [bookingId, totalAmount, paymentId]);

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header">
          <h3 className="card-title">Payment Confirmation</h3>
          <p>Booking ID: <strong>{bookingId}</strong></p>
        </div>
        <div className="card-body">
          <p><strong>Payment Status:</strong> {paymentStatus}</p>
          <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
          <p><strong>Payment ID:</strong> {paymentId}</p>
          
          {/* Optionally, you can provide a success message */}
          {paymentStatus === 'SUCCESS' ? (
            <div className="alert alert-success" role="alert">
              Your payment has been successfully processed!
            </div>
          ) : (
            <div className="alert alert-warning" role="alert">
              Your payment is being processed. Please wait.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
