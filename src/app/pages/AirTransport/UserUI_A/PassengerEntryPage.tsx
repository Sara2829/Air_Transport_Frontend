import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PassengerEntryPage: React.FC = () => {
  const location = useLocation();
  const { flightDetails, numTravelers } = location.state as {
    flightDetails: {
      name: string;
      image: string;
      description: string;
      price: number;
      source: string;
      destination: string;
    };
    numTravelers: number;
  };

  const [passengerInfo, setPassengerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [passengers, setPassengers] = useState<any[]>([]); // To keep track of added passengers
  const navigate = useNavigate();

  const handleAddPassenger = async () => {
    // Create a passenger object
    const passenger = {
      name: passengerInfo.name,
      email: passengerInfo.email,
      phone: passengerInfo.phone,
      flightName: flightDetails.name, // Associate with flight
    };

    try {
      // Make API request to add passenger
      const response = await axios.post("http://localhost:8080/passengers", passenger, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Passenger added successfully:", response.data);

      // Update the passenger list
      setPassengers([...passengers, response.data]);

      // Clear input fields
      setPassengerInfo({ name: "", email: "", phone: "" });

      // Check if all passengers are added
      if (passengers.length + 1 === numTravelers) {
        alert("All passengers added successfully!");
        navigate("/bookingSummary", { state: { flightDetails, passengers } });
      }
    } catch (error) {
      console.error("Error adding passenger:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header">
          <h3 className="card-title">Passenger Entry</h3>
          <p>
            Flight: <strong>{flightDetails.name}</strong> | From:{" "}
            <strong>{flightDetails.source}</strong> To:{" "}
            <strong>{flightDetails.destination}</strong>
          </p>
        </div>
        <div className="card-body">
          {/* Passenger Form */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={passengerInfo.name}
              onChange={(e) =>
                setPassengerInfo({ ...passengerInfo, name: e.target.value })
              }
              placeholder="Enter passenger's name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={passengerInfo.email}
              onChange={(e) =>
                setPassengerInfo({ ...passengerInfo, email: e.target.value })
              }
              placeholder="Enter passenger's email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              value={passengerInfo.phone}
              onChange={(e) =>
                setPassengerInfo({ ...passengerInfo, phone: e.target.value })
              }
              placeholder="Enter passenger's phone number"
            />
          </div>

          {/* Add Passenger Button */}
          <button
            className="btn btn-success"
            onClick={handleAddPassenger}
          >
            Add Passenger
          </button>

          {/* Passenger List */}
          <div className="mt-4">
            <h5>Passengers Added:</h5>
            {passengers.length > 0 ? (
              <ul className="list-group">
                {passengers.map((passenger, index) => (
                  <li key={index} className="list-group-item">
                    {index + 1}. {passenger.name} - {passenger.email} -{" "}
                    {passenger.phone}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No passengers added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerEntryPage;
