import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const AirCard: React.FC = () => {
  const location = useLocation();
  const { source, destination, departureDate, returnDate, numPassengers, travelClass } = location.state || {};
  const [planes, setPlanes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!source || !destination) {
      setError("Source and Destination airports are required.");
      setIsLoading(false);
      return;
    }

    // Assuming API call is based on search criteria
    axios
      .get("http://localhost:8080/flights/search", {
        params: {
          source,
          destination,
          departureDate,
          returnDate,
          numPassengers,
          travelClass,
        },
      })
      .then((response) => {
        console.log("Server Response:", response.data);  // Log the server response
        setPlanes(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Error fetching plane data. Please try again later.");
        setIsLoading(false);
      });
  }, [source, destination, departureDate, returnDate, numPassengers, travelClass]);

  const handleBookNow = (plane: any) => {
    // Log the selected plane to ensure the correct data is passed
    console.log("Selected Plane:", plane);
  
    // Assuming you have access to the source, destination, and dates
    const { source, destination, departure, arrival, price, flight_name, image, description, flight_class } = plane;
  
    // Collect all relevant details into an object
    const bookingDetails = {
      source,
      destination,
      departure,
      arrival,
      price,
      flight_name,
      image,
      description,
      flight_class,
      // Add any other relevant data here
    };
  
    // Navigate to the AirDetails page and pass the booking details as state
    navigate("/AirDetails", { state: bookingDetails });
  };
  

  if (isLoading) {
    return <div>Loading planes...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f9f9f9" }}>
      <div style={{ maxWidth: "1200px", margin: "auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem", fontWeight: "bold", color: "#333" }}>
          Planes Available
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {planes.map((plane, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                transition: "transform 0.2s ease-in-out",
              }}
            >
              {/* Plane Image (Use placeholder image for now) */}
              <img
                src={plane.image || "https://img.freepik.com/free-photo/planes-wing-cuts-through-sky-cotton-candy-clouds-radiant-sunset_91128-4456.jpg?t=st=1736572556~exp=1736576156~hmac=491d3d288ba194849824f090134a7ddc9f21134fbc65010773baf4bb616221a3&w=1380"} // Placeholder image URL
                alt={plane.name}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <div style={{ padding: "1rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>{plane.name}</h3>
                <p style={{ fontSize: "0.9rem", color: "#666", margin: "0.5rem 0" }}>{plane.description}</p>
                <p style={{ fontSize: "0.9rem", color: "#999" }}>
                  <strong>Rating:</strong> {plane.rating}
                </p>
                <p style={{ fontSize: "1rem", fontWeight: "bold" }}>Price: ₹{plane.price}</p>
                <button
                  onClick={() => handleBookNow(plane)}
                  style={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "0.5rem 1rem",
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
    </div>
  );
};

export default AirCard;
