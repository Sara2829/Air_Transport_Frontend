import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const AirCard: React.FC = () => {
  const location = useLocation();
  const { source, destination, departureDate, returnDate, numPassengers, travelClass } =
    location.state || {};
  const [planes, setPlanes] = useState<any[]>([]);
  const [filteredPlanes, setFilteredPlanes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
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
        setFilteredPlanes(response.data); // Set the initial filtered list
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Error fetching plane data. Please try again later.");
        setIsLoading(false);
      });
  }, [source, destination, departureDate, returnDate, numPassengers, travelClass]);

  const applyFilters = () => {
    const filtered = planes.filter((plane) => {
      const matchesAirline =
        selectedAirlines.length > 0 ? selectedAirlines.includes(plane.airline) : true;
      const matchesPrice =
        (minPrice === 0 || plane.price >= minPrice) &&
        (maxPrice === 0 || plane.price <= maxPrice);

      return matchesAirline && matchesPrice;
    });

    setFilteredPlanes(filtered);
  };

  const handleAirlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedAirlines((prev) =>
      checked ? [...prev, value] : prev.filter((airline) => airline !== value)
    );
  };

  const handlePriceChange = (type: "min" | "max", value: number) => {
    if (type === "min") setMinPrice(value);
    if (type === "max") setMaxPrice(value);
  };

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
      flightId,
    };
    navigate("/AirDetails", { state: bookingDetails });
  };

  if (isLoading) return <div>Loading planes...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f9f9f9" }}>
      <div style={{ maxWidth: "1200px", margin: "auto", display: "flex", gap: "2rem" }}>
        {/* Filters Section */}
        <div
          style={{
            flex: "1 0 300px",
            backgroundColor: "#fff",
            padding: "1.5rem",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            height: "fit-content",
          }}
        >
          <h4 style={{ marginBottom: "1rem", fontWeight: "bold", color: "#333" }}>Filters</h4>
          <div style={{ marginBottom: "1.5rem" }}>
            <h5 style={{ marginBottom: "0.5rem", color: "#555" }}>Airlines</h5>
            {["Vistara", "SpiceJet", "Indigo", "5-Star"].map((airline) => (
              <div key={airline} style={{ marginBottom: "0.5rem" }}>
                <input
                  type="checkbox"
                  id={airline}
                  value={airline}
                  onChange={handleAirlineChange}
                  style={{ marginRight: "0.5rem" }}
                />
                <label htmlFor={airline} style={{ color: "#666" }}>
                  {airline}
                </label>
              </div>
            ))}
          </div>
          <div>
            <h5 style={{ marginBottom: "0.5rem", color: "#555" }}>Price Range</h5>
            <div style={{ marginBottom: "0.5rem" }}>
              <label style={{ marginRight: "0.5rem", color: "#666" }}>Min Price:</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => handlePriceChange("min", Number(e.target.value))}
                style={{
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "100px",
                }}
              />
            </div>
            <div>
              <label style={{ marginRight: "0.5rem", color: "#666" }}>Max Price:</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => handlePriceChange("max", Number(e.target.value))}
                style={{
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "100px",
                }}
              />
            </div>
          </div>
          <button
            onClick={applyFilters}
            style={{
              marginTop: "1rem",
              backgroundColor: "#007BFF",
              color: "#fff",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Apply Filters
          </button>
        </div>

        {/* Planes List */}
        <div
          style={{
            flex: "3",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredPlanes.map((plane, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={
                  plane.image ||
                  "https://img.freepik.com/free-photo/planes-wing-cuts-through-sky-cotton-candy-clouds-radiant-sunset_91128-4456.jpg"
                }
                alt={plane.name}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <div style={{ padding: "1rem" }}>
                <h3>{plane.name}</h3>
                <p>{plane.description}</p>
                <p>
                  <strong>Price:</strong> ₹{plane.price}
                </p>
                <button
                  onClick={() => handleBookNow(plane)}
                  style={{
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    padding: "0.5rem 1rem",
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
    </div>
  );
};

export default AirCard;
