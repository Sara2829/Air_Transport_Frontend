import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

interface Seat {
  seatId: number;
  seatNumber: string;
  passenger: {
    id: number;
    name: string;
    email: string;
    phone: string;
  } | null;
  available: boolean;
}

export const PlaneSeating: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { flightDetails, travellerCount, bookingId } = location.state || {};
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedSeatIds, setSelectedSeatIds] = useState<number[]>([]);
  const [occupiedSeats, setOccupiedSeats] = useState<string[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);

  useEffect(() => {
    if (!flightDetails) {
      console.error("Flight details are missing.");
      return;
    }

    const fetchSeats = async () => {
      try {
        const response = await axios.get<Seat[]>(`${API_URL}/seats/flight/${flightDetails.flightId}`);
        console.log("Seat data:", response.data);
        setSeats(response.data);
        setOccupiedSeats(response.data.filter((seat) => !seat.available).map((seat) => seat.seatNumber));
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    fetchSeats();
  }, [flightDetails]);

  const handleSeatClick = (seat: Seat) => {
    if (occupiedSeats.includes(seat.seatNumber)) return;

    if (selectedSeats.includes(seat.seatNumber)) {
      setSelectedSeats((prev) => prev.filter((s) => s !== seat.seatNumber));
      setSelectedSeatIds((prev) => prev.filter((id) => id !== seat.seatId));
    } else {
      setSelectedSeats((prev) => [...prev, seat.seatNumber]);
      setSelectedSeatIds((prev) => [...prev, seat.seatId]);
    }
  };

  const handleProceed = () => {
    if (!selectedSeats.length) {
      alert("Please select at least one seat to proceed.");
      return;
    }

    navigate("/AirDetails/passengerEntry", {
      state: {
        flightDetails,
        travellerCount,
        bookingId,
        selectedSeats,
        selectedSeatIds,
      },
    });
  };

  const getSeatStyle = (seat: string) => {
    if (occupiedSeats.includes(seat)) {
      return {
        width: "40px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5px",
        backgroundColor: "#A9A9A9",
        color: "#fff",
        cursor: "not-allowed",
      };
    }
    if (selectedSeats.includes(seat)) {
      return {
        width: "40px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        cursor: "pointer",
      };
    }
    return {
      width: "40px",
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "5px",
      backgroundColor: "#F42536",
      color: "#fff",
      cursor: "pointer",
    };
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Plane Seating</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* Group seats by rows dynamically */}
        {seats.length > 0
          ? Array.from({ length: Math.ceil(seats.length / 4) }, (_, rowIndex) => (
              <div
                key={rowIndex}
                style={{ display: "flex", justifyContent: "center", gap: "10px" }}
              >
                {seats
                  .slice(rowIndex * 4, rowIndex * 4 + 4) // Get 4 seats per row
                  .map((seat) => (
                    <div
                      key={seat.seatId}
                      style={getSeatStyle(seat.seatNumber)}
                      onClick={() => handleSeatClick(seat)}
                    >
                      {seat.seatNumber}
                    </div>
                  ))}
              </div>
            ))
          : "No seats available."}
      </div>

      <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div style={{ width: "20px", height: "20px", backgroundColor: "#F42536" }}></div> Free
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div style={{ width: "20px", height: "20px", backgroundColor: "#4CAF50" }}></div> Selected
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div style={{ width: "20px", height: "20px", backgroundColor: "#A9A9A9" }}></div> Occupied
        </div>
      </div>

      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handleProceed}
      >
        Proceed to Passenger Entry
      </button>
    </div>
  );
};
