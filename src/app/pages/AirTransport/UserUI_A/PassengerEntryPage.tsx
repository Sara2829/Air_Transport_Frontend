import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const PassengerEntryPage: React.FC = () => {
  const location = useLocation();
  const { flightDetails, bookingId, travellerCount, selectedSeats } = location.state as {
    flightDetails: {
      name: string;
      image: string;
      description: string;
      price: number;
      source: string;
      destination: string;
      flightId: string;
    };
    bookingId: string;
    travellerCount: number; // Expected number of passengers
    selectedSeats: string[]; // Seats passed from the Plane Seating page
  };

  console.log("Flight Details:", flightDetails);
  console.log("Booking ID:", bookingId);
  console.log("Traveller Count:", travellerCount);  
  console.log("Selected Seats:", selectedSeats);

  const [passengerInfo, setPassengerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    seat: "", // Selected seat for the passenger
  });
  const [passengers, setPassengers] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [assignedSeats, setAssignedSeats] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleAddPassenger = () => {
    // Validate passenger details
    if (!passengerInfo.name || !passengerInfo.email || !passengerInfo.phone || !passengerInfo.seat) {
      setErrorMessage("Please fill in all fields for the passenger, including seat selection.");
      return;
    }

    // Check if the seat is already assigned
    if (assignedSeats.includes(passengerInfo.seat)) {
      setErrorMessage("The selected seat is already assigned to another passenger.");
      return;
    }

    // Add passenger to the local array
    setPassengers([...passengers, { ...passengerInfo }]);
    setAssignedSeats([...assignedSeats, passengerInfo.seat]);
    setPassengerInfo({ name: "", email: "", phone: "", seat: "" });
    setErrorMessage(""); // Clear any previous error messages
  };

  const handleSubmitPassengers = async () => {
    const userId = localStorage.getItem("userId"); // Get userId from localStorage

    if (!userId) {
      alert("User not logged in.");
      return;
    }

    try {
      // Send passengers array to the backend with userId as a path variable
      const response = await axios.post(
        `${API_URL}/passengers/add/${bookingId}/${userId}`,
        passengers,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Passengers successfully added:", response.data);
      alert("Passengers successfully registered!");

      // Navigate to the baggage page with relevant details
      navigate("/AirDetails/baggage", {
        state: {
          flightDetails,
          passengers,
          bookingId,
          passengerCount: passengers.length,
        },
      });
    } catch (error) {
      console.error("Error submitting passengers:", error);
      alert("Failed to submit passengers. Please try again.");
    }
  };

  const handleDeletePassenger = (index: number) => {
    const passengerToRemove = passengers[index];
    setAssignedSeats(assignedSeats.filter((seat) => seat !== passengerToRemove.seat));
    setPassengers(passengers.filter((_, i) => i !== index));
  };

  const handleEditPassenger = (index: number) => {
    const passenger = passengers[index];
    setPassengerInfo({ ...passenger });
    handleDeletePassenger(index); // Remove the passenger from the list to allow re-editing
  };

  const isSubmitDisabled = passengers.length !== travellerCount;

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
              onChange={(e) => setPassengerInfo({ ...passengerInfo, name: e.target.value })}
              placeholder="Enter passenger's name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={passengerInfo.email}
              onChange={(e) => setPassengerInfo({ ...passengerInfo, email: e.target.value })}
              placeholder="Enter passenger's email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              value={passengerInfo.phone}
              onChange={(e) => setPassengerInfo({ ...passengerInfo, phone: e.target.value })}
              placeholder="Enter passenger's phone number"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Seat</label>
            <select
              className="form-select"
              value={passengerInfo.seat}
              onChange={(e) => setPassengerInfo({ ...passengerInfo, seat: e.target.value })}
            >
              <option value="">Select a seat</option>
              {selectedSeats.map((seat) =>
                assignedSeats.includes(seat) ? null : (
                  <option key={seat} value={seat}>
                    {seat}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Add Passenger Button */}
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-success me-2" onClick={handleAddPassenger}>
              Add Passenger
            </button>

            {/* Submit Button */}
            <button
              className="btn btn-primary"
              onClick={handleSubmitPassengers}
              disabled={isSubmitDisabled}
            >
              Submit Passengers
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && <p className="text-danger">{errorMessage}</p>}

          {/* Passenger List */}
          <div className="mt-4">
            <h5>Passengers Added:</h5>
            {passengers.length > 0 ? (
              <ul className="list-group">
                {passengers.map((passenger, index) => (
                  <li key={index} className="list-group-item">
                    {index + 1}. {passenger.name} - {passenger.email} - {passenger.phone} - Seat:{" "}
                    {passenger.seat}
                    <button
                      className="btn btn-warning btn-sm ms-2"
                      onClick={() => handleEditPassenger(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => handleDeletePassenger(index)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No passengers added yet.</p>
            )}
          </div>

          {/* Validation Message */}
          {passengers.length !== travellerCount && passengers.length > 0 && (
            <p className="text-warning">
              You need to add {travellerCount - passengers.length} more passengers to match the
              traveler count.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PassengerEntryPage;
