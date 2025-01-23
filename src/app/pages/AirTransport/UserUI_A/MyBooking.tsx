import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const MyBooking = () => {
  const [bookingDetails, setBookingDetails] = useState<any[]>([]); // Booking details array
  const [passengerDetails, setPassengerDetails] = useState<any[]>([]); // Passenger details array
  const [loading, setLoading] = useState(true);
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
        // Fetch bookings based on userId
        const bookingsResponse = await axios.get(`${API_URL}/bookings/user/${userId}`);
        console.log("Bookings Response:", bookingsResponse.data);
        setBookingDetails(bookingsResponse.data);

        // Fetch passengers related to the userId
        const passengersResponse = await axios.get(`${API_URL}/passengers/user/${userId}`);
        console.log("Passengers Response:", passengersResponse.data);
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

  const handleCompleteBooking = async (booking: any) => {
    try {
      // Fetch flight details using flightId
      const flightResponse = await axios.get(`${API_URL}/flights/${booking.flightId}`);
      const flightDetails = flightResponse.data;

      console.log("Flight Details:", flightDetails);

      // Redirect to PlaneSeating page with required data
      navigate("/AirDetails/Seat-selection", {
        state: {
          flightDetails,
          travellerCount: booking.travellerCount,
          bookingId: booking.id,
        },
      });
    } catch (error) {
      console.error("Error fetching flight details:", error);
      alert("Failed to fetch flight details. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading booking and passenger details...</div>;
  }

  if (bookingDetails.length === 0) {
    return <div>No bookings found for the user.</div>;
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Booking Details</h3>

      {bookingDetails.map((booking) => {
        // Filter passengers related to the current booking
        const relatedPassengers = passengerDetails.filter(
          (passenger) => passenger.bookingId === booking.id
        );

        return (
          <div key={booking.id} className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">Booking ID: {booking.id}</h5>
            </div>
            <div className="card-body">
              <p><strong>Flight ID:</strong> {booking.flightId}</p>
              <p><strong>Traveler Count:</strong> {booking.travellerCount}</p>

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
                <>
                  <p>No passengers found for this booking.</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleCompleteBooking(booking)}
                  >
                    Complete Booking
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
