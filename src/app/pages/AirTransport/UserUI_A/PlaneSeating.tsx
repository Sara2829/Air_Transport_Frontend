import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Define TypeScript types for seats, sections, and props
type Seat = string | null;
type Section = Seat[][];


export const PlaneSeating: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Destructure the state passed from the AirDetails page
  const { flightDetails, travellerCount, bookingId } = location.state;

  // Seat rows data with two columns on each side
  const sections: Section[] = [
    [
      ["1A", "1B", null, "1C", "1D"],
      ["2A", "2B", null, "2C", "2D"],
      ["3A", "3B", null, "3C", "3D"],
      ["4A", "4B", null, "4C", "4D"],
    ],
    [
      ["5A", "5B", null, "5C", "5D"],
      ["6A", "6B", null, "6C", "6D"],
      ["7A", "7B", null, "7C", "7D"],
      ["8A", "8B", null, "8C", "8D"],
    ],
    [
      ["9A", "9B", null, "9C", "9D"],
      ["10A", "10B", null, "10C", "10D"],
      ["11A", "11B", null, "11C", "11D"],
      ["12A", "12B", null, "12C", "12D"],
    ],
    [
      ["13A", "13B", null, "13C"],
      ["14A", "14B", null, "14C"],
      ["15A", "15B", null, "15C"],
      ["16A", "16B", null, "16C"],
    ],
  ];

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [occupiedSeats, setOccupiedSeats] = useState<string[]>(["3A", "6C", "9D"]); // Example occupied seats

  // Handle seat selection
  const handleSeatClick = (seat: string) => {
    if (occupiedSeats.includes(seat)) return; // Prevent selecting occupied seats
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat)); // Deselect seat
    } else {
      setSelectedSeats([...selectedSeats, seat]); // Select seat
    }
  };

  // Handle proceeding to Passenger Entry page
  const handleProceed = () => {
    navigate("/AirDetails/passengerEntry", {
      state: {
        flightDetails,
        travellerCount,
        bookingId,
        selectedSeats,
      },
    });
  };

  // Styles
  const styles = {
    container: {
      margin: "20px auto",
      fontFamily: "Arial, sans-serif",
      fontSize: "12px",
      maxWidth: "90%",
      position: "relative" as const,
    },
    header: {
      textAlign: "center" as const,
      color: "#333",
      marginBottom: "20px",
    },
    legend: {
      position: "fixed" as const,
      bottom: "20px",
      right: "20px",
      display: "flex",
      gap: "15px",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    },
    legendItem: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    legendBox: (color: string) => ({
      width: "15px",
      height: "15px",
      backgroundColor: color,
      borderRadius: "3px",
      display: "inline-block",
    }),
    selectedSeats: {
      textAlign: "center" as const,
      margin: "10px 0",
      color: "#555",
      fontSize: "14px",
    },
    plane: {
      display: "flex",
      flexDirection: "row" as const,
      alignItems: "center",
      border: "5px solid #d8d8d8",
      borderRadius: "30px",
      padding: "20px",
      overflow: "hidden",
      backgroundColor: "#E0F7FA",
      position: "relative" as const,
    },
    exit: {
      position: "absolute" as const,
      top: "50%",
      transform: "translateY(-50%)",
      textAlign: "center" as const,
    },
    exitStart: {
      left: "-50px",
    },
    exitEnd: {
      right: "-50px",
    },
    exitText: {
      fontSize: "12px",
      fontWeight: "bold" as const,
      color: "white",
      backgroundColor: "#4CAF50",
      padding: "5px 10px",
      borderRadius: "5px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    },
    section: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      margin: "0 10px",
      position: "relative" as const,
    },
    row: {
      listStyle: "none",
      padding: 0,
      margin: "10px 0",
      display: "flex",
      justifyContent: "space-between",
    },
    seatContainer: {
      display: "flex",
      flex: "0 0 18%",
      padding: "5px",
      position: "relative" as const,
    },
    seatLabel: (seat: string) => ({
      display: "block",
      position: "relative" as const,
      width: "40px",
      height: "40px",
      textAlign: "center" as const,
      fontSize: "12px",
      fontWeight: "bold" as const,
      lineHeight: "40px",
      color: "white",
      background: occupiedSeats.includes(seat)
        ? "#A9A9A9" // Occupied
        : selectedSeats.includes(seat)
        ? "#4CAF50" // Selected
        : "#F42536", // Free
      borderRadius: "8px",
      cursor: "pointer",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      transition: "background 0.3s ease",
    }),
    proceedButton: {
      display: "block",
      margin: "20px auto",
      padding: "10px 20px",
      backgroundColor: "#4CAF50",
      color: "#fff",
      fontSize: "14px",
      fontWeight: "bold" as const,
      textAlign: "center" as const,
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Plane Seating</h1>

      <div style={styles.selectedSeats}>
        Selected Seats: <strong>{selectedSeats.join(", ") || "None"}</strong>
      </div>

      {/* Plane Layout */}
      <div style={styles.plane}>
        {/* Start Exit */}
        <div style={{ ...styles.exit, ...styles.exitStart }}>
          <span style={styles.exitText}>EXIT</span>
        </div>

        {/* Sections */}
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} style={styles.section}>
            {section.map((row, rowIndex) => (
              <ol key={rowIndex} style={styles.row}>
                {row.map((seat, seatIndex) => (
                  <li key={seatIndex} style={styles.seatContainer}>
                    {seat ? (
                      <label
                        style={styles.seatLabel(seat)}
                        onClick={() => handleSeatClick(seat)}
                      >
                        {seat}
                      </label>
                    ) : (
                      <div style={{ width: "40px" }}></div> // Empty space for aisle
                    )}
                  </li>
                ))}
              </ol>
            ))}
          </div>
        ))}

        {/* End Exit */}
        <div style={{ ...styles.exit, ...styles.exitEnd }}>
          <span style={styles.exitText}>EXIT</span>
        </div>
      </div>

      {/* Legend */}
      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <span style={styles.legendBox("#F42536")}></span> Free
        </div>
        <div style={styles.legendItem}>
          <span style={styles.legendBox("#4CAF50")}></span> Selected
        </div>
        <div style={styles.legendItem}>
          <span style={styles.legendBox("#A9A9A9")}></span> Occupied
        </div>
      </div>

      {/* Proceed Button */}
      <button style={styles.proceedButton} onClick={handleProceed}>
        Proceed to Passenger Entry
      </button>
    </div>
  );
};
