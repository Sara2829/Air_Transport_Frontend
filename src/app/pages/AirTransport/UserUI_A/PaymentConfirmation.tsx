import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { jsPDF } from 'jspdf';

const API_URL = import.meta.env.VITE_APP_API_URL;

const PaymentConfirmation: React.FC = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const totalAmount = parseFloat(searchParams.get('totalAmount') || '0');
  const [paymentStatus, setPaymentStatus] = useState<string>('PENDING');
  const [paymentId, setPaymentId] = useState<string | null>(null);

  useEffect(() => {
    const processPaymentStatus = async () => {
        if (bookingId) {
            try {
                const response = await axios.get(`${API_URL}/payments/status/${bookingId}`, {
                    headers: { "Content-Type": "application/json" },
                });

                // Destructure and update state
                const { status, paymentId: receivedPaymentId } = response.data;

                // Update state in a single operation
                setPaymentStatus(status || 'PENDING');
                setPaymentId(receivedPaymentId || 'Processing');

                if (status === 'SUCCESS') {
                    generateReceipt(receivedPaymentId);
                }
            } catch (error) {
                console.error('Error confirming payment:', error);
                alert('Failed to confirm payment. Please try again.');
            }
        }
    };

    processPaymentStatus();
}, [bookingId]);

  // Function to generate and download the payment receipt
  const generateReceipt = (paymentId: string | null) => {
    const doc = new jsPDF();

    // Add Title
    doc.setFontSize(20);
    doc.text('Payment Receipt', 20, 20);

    // Add Payment Details
    doc.setFontSize(14);
    doc.text(`Booking ID: ${bookingId}`, 20, 40);
    doc.text(`Payment Status: SUCCESS`, 20, 50);
    doc.text(`Total Amount: ₹${totalAmount.toFixed(2)}`, 20, 60);
    doc.text(`Payment ID: ${paymentId || 'N/A'}`, 20, 70);

    // Add a footer
    doc.setFontSize(10);
    doc.text('Thank you for your payment!', 20, 150);

    // Save the PDF as 'payment_receipt.pdf'
    doc.save('payment_receipt.pdf');
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header">
          <h3 className="card-title">Payment Confirmation</h3>
          <p>Booking ID: <strong>{bookingId}</strong></p>
        </div>
        <div className="card-body">
          <p><strong>Payment Status:</strong> {paymentStatus}</p>
          <p><strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}</p>
          <p><strong>Payment ID:</strong> {paymentId || 'Processing...'}</p>

          {/* Optionally, you can provide a success message */}
          {paymentStatus === 'SUCCESS' ? (
            <div className="alert alert-success" role="alert">
              Your payment has been successfully processed! The receipt has been downloaded.
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