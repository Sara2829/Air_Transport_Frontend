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
        setPlanes(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Error fetching plane data. Please try again later.");
        setIsLoading(false);
      });
  }, [source, destination, departureDate, returnDate, numPassengers, travelClass]);

  const handleBookNow = (plane: any) => {
    const { source, destination, departure, arrival, price, flight_name, image, description, flight_class, flightId } = plane;

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
      flightId, // Include flight_id in the booking details
    };
    console.log("Flight Id:",bookingDetails.flightId);

    navigate("/AirDetails", { state: bookingDetails });
  };

  if (isLoading) return <div>Loading planes...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f9f9f9" }}>
      <div style={{ maxWidth: "1200px", margin: "auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem", fontWeight: "bold", color: "#333" }}>
          Planes Available
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {planes.map((plane, index) => (
            <div key={index} style={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
              <img
                src={plane.image || "https://img.freepik.com/free-photo/planes-wing-cuts-through-sky-cotton-candy-clouds-radiant-sunset_91128-4456.jpg"}
                alt={plane.name}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <div style={{ padding: "1rem" }}>
                <h3>{plane.name}</h3>
                <p>{plane.description}</p>
                <p><strong>Price:</strong> ₹{plane.price}</p>
                <button onClick={() => handleBookNow(plane)}>Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AirCard;
