

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SuccessfulPayment: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
        <p className="mt-4">Thank you for your purchase.</p>
        <button
          className="mt-6 bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/AirUserDashBoard")}
        >
          Go to Dashboard
        </button>
        
        
      </div>
    </div>
  );
};

export default SuccessfulPayment;