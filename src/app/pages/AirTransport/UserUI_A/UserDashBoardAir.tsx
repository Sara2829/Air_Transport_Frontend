import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const UserDashBoardAir: React.FC = () => {
  const [flights, setFlights] = useState<any[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(`${API_URL}/flights/all`);

        // Map flight data with additional image
        const flightsWithImages = response.data.map((flight: any) => ({
          ...flight,
          image:
            "https://flybitlux.com/wp-content/uploads/2023/12/plane-that-has-word-sa-it.jpg",
        }));

        setFlights(flightsWithImages);
      } catch (error) {
        console.error("Error while fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  const handleBookNow = (flight: any) => {
    console.log("Flight selected:", flight);
    navigate("/AirDetails", {
      state: {
        name: flight.flightName,
        image: flight.image,
        description: `From ${flight.source} to ${flight.destination}`,
        price: flight.price,
        source: flight.source,
        destination: flight.destination,
        flightId: flight.flightId,
        gallery: [
          flight.image,
          "https://example.com/gallery1.jpg",
          "https://example.com/gallery2.jpg",
        ], // Example gallery images
      },
    });
  };

  const handleCardClick = (flight: any) => {
    setSelectedFlight(flight);
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f7f9fc" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#333" }}>
        Air User Dashboard
      </h1>

      <div style={{ display: "flex", gap: "2rem" }}>
        {/* Left Column: Flight Cards */}
        <div style={{ flex: 1 }}>
          <h2 style={{ color: "#007bff", marginBottom: "1rem" }}>
            Flights Info
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1.5rem",
            }}
          >
            {flights.map((flight, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(flight)}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <img
                  src={flight.image}
                  alt={flight.flightName}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ padding: "1rem" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                    {flight.flightName}
                  </h3>
                  <p style={{ margin: "0.5rem 0", color: "#666" }}>
                    From: {flight.source} to {flight.destination}
                  </p>
                  <p style={{ margin: "0.5rem 0", color: "#666" }}>
                    Airline: {flight.airline}
                  </p>
                  <p style={{ margin: "0.5rem 0", color: "#666" }}>
                    Departure: {new Date(flight.departure).toLocaleString()}
                  </p>
                  <p style={{ margin: "0.5rem 0", color: "#666" }}>
                    Arrival: {new Date(flight.arrival).toLocaleString()}
                  </p>
                  <p style={{ fontWeight: "bold", color: "#007bff" }}>
                    Price: ₹{flight.price}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the card click
                      handleBookNow(flight);
                    }}
                    style={{
                      marginTop: "1rem",
                      padding: "0.5rem 1rem",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Map */}
        <div style={{ flex: 1 }}>
          <div style={{ position: "relative", height: "500px" }}>
            {/* Message at the top, only visible when no flight is selected */}
            {!selectedFlight && (
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(255, 255, 255, 0.7)",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                Click on a flight card to view the source, destination, and path on Google Map.
              </div>
            )}

            {/* Google Map iframe */}
            {selectedFlight && (
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  selectedFlight.source
                )}+to+${encodeURIComponent(selectedFlight.destination)}&output=embed`}
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashBoardAir;