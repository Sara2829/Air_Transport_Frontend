import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const MyBooking = () => {
  const [bookingDetails, setBookingDetails] = useState<any[]>([]);
  const [passengerDetails, setPassengerDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "canceled">("upcoming");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("No user ID found in local storage.");
        setLoading(false);
        return;
      }

      try {
        // Fetch bookings and their associated flight details
        const bookingsResponse = await axios.get(`${API_URL}/bookings/user/${userId}`);
        console.log("Bookings Response:", bookingsResponse.data);
        const bookingsWithFlights = await Promise.all(
          bookingsResponse.data.map(async (booking: any) => {
            try {
              const flightResponse = await axios.get(`${API_URL}/flights/${booking.flightId}`);
              return { ...booking, flight: flightResponse.data };
            } catch (error) {
              console.error(`Error fetching flight for booking ${booking.id}:`, error);
              return { ...booking, flight: null };
            }
          })
        );

        // Fetch passengers
        const passengersResponse = await axios.get(`${API_URL}/passengers/user/${userId}`);
        
        setBookingDetails(bookingsWithFlights);
        setPassengerDetails(passengersResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching details:", error);
        alert("Failed to fetch booking or passenger details. Please try again.");
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  const filterBookings = () => {
    const currentDate = new Date();
    return bookingDetails.filter((booking) => {
      if (!booking.flight) return false;
      
      const departureDate = new Date(booking.flight.departureDate);
      
      switch (activeTab) {
        case "upcoming":
          return departureDate > currentDate && booking.status !== "canceled";
        case "completed":
          return departureDate <= currentDate && booking.status !== "canceled";
        case "canceled":
          return booking.status === "canceled";
        default:
          return false;
      }
    });
  };

  const handleCompleteBooking = async (booking: any) => {
    try {
      navigate("/AirDetails/Seat-selection", {
        state: {
          flightDetails: booking.flight,
          travellerCount: booking.travellerCount,
          bookingId: booking.id,
        },
      });
    } catch (error) {
      console.error("Error navigating to seat selection:", error);
      alert("Failed to proceed to seat selection. Please try again.");
    }
  };

  if (loading) return <div>Loading booking and passenger details...</div>;
  if (bookingDetails.length === 0) return <div>No bookings found for the user.</div>;

  const filteredBookings = filterBookings();

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Booking Details</h3>
      
      <div className="mb-4">
        <button
          className={`btn ${activeTab === "upcoming" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`btn mx-2 ${activeTab === "completed" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
        <button
          className={`btn ${activeTab === "canceled" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("canceled")}
        >
          Canceled
        </button>
      </div>

      {filteredBookings.length === 0 ? (
        <div>No bookings found in the {activeTab} category.</div>
      ) : (
        filteredBookings.map((booking) => {
          const relatedPassengers = passengerDetails.filter(
            (passenger) => passenger.bookingId === booking.id
          );

          return (
            <div key={booking.id} className="card shadow-sm mb-4">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">Booking ID: {booking.id}</h5>
                <small className="text-light">
                  Status: {booking.status || "confirmed"} | 
                  Departure: {booking.flight?.departureDate || "N/A"}
                </small>
              </div>
              <div className="card-body">
                {booking.flight && (
                  <>
                    <p><strong>Flight Number:</strong> {booking.flight.flightNumber}</p>
                    <p><strong>Route:</strong> {booking.flight.origin} → {booking.flight.destination}</p>
                  </>
                )}
                <p><strong>Traveler Count:</strong> {booking.travellerCount}</p>

                {activeTab !== "canceled" && (
                  <>
                    <h6 className="mt-3">Passenger Details:</h6>
                    {relatedPassengers.length > 0 ? (
                      <ul className="list-group">
                        {relatedPassengers.map((passenger) => (
                          <li key={passenger.id} className="list-group-item">
                            <p><strong>Name:</strong> {passenger.name}</p>
                            <p><strong>Email:</strong> {passenger.email}</p>
                            <p><strong>Phone:</strong> {passenger.phone}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      activeTab === "upcoming" && (
                        <button
                          className="btn btn-primary mt-2"
                          onClick={() => handleCompleteBooking(booking)}
                        >
                          Complete Booking (Add Passengers)
                        </button>
                      )
                    )}
                  </>
                )}

                {activeTab === "canceled" && (
                  <div className="alert alert-warning mt-3">
                    This booking was canceled on {new Date(booking.updatedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};