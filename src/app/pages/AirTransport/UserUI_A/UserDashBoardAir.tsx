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
        ],
      },
    });
  };

  const handleCardClick = (flight: any) => {
    setSelectedFlight(flight);
  };

  return (
    <div style={{ padding: "1rem", backgroundColor: "#f7f9fc" }}>
      {/* Main Heading */}
      <h1
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "#333",
          fontSize: "2rem",
        }}
      >
        Air User Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          flexDirection: window.innerWidth <= 768 ? "column" : "row",
        }}
      >
        {/* Left Column: Flight Cards */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {/* Flights Info Heading - Steady */}
          <div
            style={{
              position: "sticky",
              top: "1rem",
              backgroundColor: "#f7f9fc",
              zIndex: 10,
              paddingBottom: "1rem",
            }}
          >
            <h2 style={{ color: "#007bff", marginBottom: "0rem", fontSize: "1.5rem" }}>
              Flights Info
            </h2>
          </div>

          {/* Scrollable Flight Cards */}
          <div
            style={{
              overflowY: "auto",
              maxHeight: "calc(100vh - 6rem)",
              paddingRight: "1rem",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: window.innerWidth <= 768
                  ? "1fr"
                  : "repeat(3, 1fr)", // Three cards per row on larger screens
                gap: window.innerWidth <= 768 ? "1.5rem" : "1rem", // Increased gap on small devices
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
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    width: "100%", // Cards take full width of their grid cell
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)"; // Reduced hover scale
                    e.currentTarget.style.boxShadow =
                      "0 8px 16px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <img
                    src={flight.image}
                    alt={flight.flightName}
                    style={{
                      width: "100%",
                      height: "150px", // Reduced image height
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ padding: "1rem" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: "600" }}>
                      {flight.flightName}
                    </h3>
                    <p style={{ margin: "0.5rem 0", color: "#666", fontSize: "0.8rem" }}>
                      From: {flight.source} to {flight.destination}
                    </p>
                    <p style={{ margin: "0.5rem 0", color: "#666", fontSize: "0.8rem" }}>
                      Airline: {flight.airline}
                    </p>
                    <p style={{ margin: "0.5rem 0", color: "#666", fontSize: "0.8rem" }}>
                      Departure: {new Date(flight.departure).toLocaleString()}
                    </p>
                    <p style={{ margin: "0.5rem 0", color: "#666", fontSize: "0.8rem" }}>
                      Arrival: {new Date(flight.arrival).toLocaleString()}
                    </p>
                    <p style={{ fontWeight: "bold", color: "#007bff", fontSize: "0.9rem" }}>
                      Price: ₹{flight.price}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
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
                        fontSize: "0.8rem",
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Google Map */}
        {selectedFlight && (
          <div
            style={{
              flex: 1,
              position: window.innerWidth <= 768 ? "relative" : "sticky",
              top: "1rem",
              animation: window.innerWidth <= 768
                ? "slideUp 0.5s ease-out"
                : "slideIn 0.5s ease-out",
              marginTop: window.innerWidth <= 768 ? "1.5rem" : "0", // Added margin on small devices
            }}
          >
            <h2 style={{ color: "#007bff", marginBottom: "1rem", fontSize: "1.5rem" }}>
              Google Map
            </h2>
            <div
              style={{
                position: "relative",
                height: window.innerWidth <= 768 ? "300px" : "580px", // Reduced map height on small devices
                backgroundColor: "#d0e8f2", // Light blue resembling Google Maps
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
              }}
            >
              {/* Google Map iframe */}
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{
                  border: 0,
                  borderRadius: "8px",
                }}
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  selectedFlight.source
                )}+to+${encodeURIComponent(
                  selectedFlight.destination
                )}&output=embed`}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>

      {/* Inline CSS for animations */}
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(100%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(100%);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default UserDashBoardAir;