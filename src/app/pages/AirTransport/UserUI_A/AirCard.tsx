import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AirCard: React.FC = () => {
  const [planes, setPlanes] = useState<any[]>([]); // State to hold plane data
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching data from the API
    axios
      .get("http://localhost:8080/flights/all") // Replace with your actual API endpoint
      .then((response) => {
        // Assuming the API response is an array of planes
        const fetchedPlanes = response.data.map((plane: any) => ({
          name: plane.flightName, // Mapping 'flightName' from API to 'name'
          image: plane.imageUrl || "https://i.ndtvimg.com/i/2018-02/vistara_650x400_81519372774.jpg?downsize=773:435", // Default image
          description: plane.description || "Description not available", // Ensure description is not undefined
          rating: plane.rating || 4.5, // Default rating if not available
          price: plane.price,
        }));
        setPlanes(fetchedPlanes);
        console.log("Planes fetched:", fetchedPlanes);
      })
      .catch((error) => {
        console.error("Error fetching planes:", error);
      });
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  const handleBookNow = (plane: any) => {
    navigate("/AirDetails", { state: plane }); // Passing selected plane details to the new page
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f9f9f9" }}>
      <div style={{ maxWidth: "1200px", margin: "auto" }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            fontWeight: "bold",
            color: "#333",
          }}
        >
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
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <img
                src={plane.image}
                alt={plane.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "1rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                  {plane.name}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#666",
                    margin: "0.5rem 0",
                  }}
                >
                  {plane.description}
                </p>
                <p style={{ fontSize: "0.9rem", color: "#999" }}>
                  <strong>Rating:</strong> {plane.rating}
                </p>
                <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
                  Price: ₹{plane.price}
                </p>
                <button
                  onClick={() => handleBookNow(plane)}
                  style={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease-in-out",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0056b3")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#007bff")
                  }
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
