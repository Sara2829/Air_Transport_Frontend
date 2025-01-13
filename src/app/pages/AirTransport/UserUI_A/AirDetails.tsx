import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for API calls

const AirDetailsPage: React.FC = () => {
  const location = useLocation();
  const flightDetails = location.state as {
    name: string;
    image: string;
    description: string;
    price: number;
    source: string;
    destination: string;
    flightId: string;
    gallery: string[];
  };

  const [travellerCount, settravellerCount] = useState<number>(1);
  const navigate = useNavigate();

  const handleNavigateToPassengerEntry = async () => {
    console.log("Flight ID:", flightDetails.flightId);
    console.log("Number of Travelers:", travellerCount);
    try {
      // Call backend API to create a booking
      const response = await axios.post("http://localhost:8080/bookings", {
        flightId: flightDetails.flightId,
        travellerCount,
      });

      const bookingId = response.data.bookingId; // Assuming backend returns { bookingId }
      console.log("Generated Booking ID:", bookingId);

      // Navigate to Passenger Entry page with flight details, travelers, and booking ID
      navigate("/AirDetails/passengerEntry", {
        state: { flightDetails, travellerCount, bookingId },
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header">
          <h3 className="card-title">Airline Details</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <img
                src={flightDetails.image || "https://img.freepik.com/free-photo/planes-wing-cuts-through-sky-cotton-candy-clouds-radiant-sunset_91128-4456.jpg"}
                alt={flightDetails.name}
                className="img-fluid rounded-start"
                style={{ height: "300px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-6">
              <h5>{flightDetails.name}</h5>
              <p>{flightDetails.description}</p>
              <p><strong>Price: ₹{flightDetails.price}</strong></p>
              <p><strong>Source:</strong> {flightDetails.source}</p>
              <p><strong>Destination:</strong> {flightDetails.destination}</p>

              <div className="mb-3">
                <label>Number of Travelers</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={travellerCount}
                  onChange={(e) => settravellerCount(Number(e.target.value))}
                />
              </div>

              <button className="btn btn-primary float-end" onClick={handleNavigateToPassengerEntry}>
                Proceed to Passenger Entry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirDetailsPage;
