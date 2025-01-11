import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const AirAdmindashboard: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [flights, setFlights] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingFlights, setLoadingFlights] = useState(true);

  // Hardcoded Employee and FAQ data
  const employees = [
    { id: 1, name: "John Doe", position: "Pilot", email: "johndoe@airline.com" },
    { id: 2, name: "Jane Smith", position: "Flight Attendant", email: "janesmith@airline.com" },
    { id: 3, name: "Michael Johnson", position: "Manager", email: "michaelj@airline.com" },
    { id: 4, name: "Sarah Lee", position: "Ground Staff", email: "sarahlee@airline.com" },
    { id: 5, name: "Tommy Harris", position: "Security", email: "tommyh@airline.com" },
    { id: 6, name: "Emily Roberts", position: "Ticketing Agent", email: "emilyroberts@airline.com" },
    { id: 7, name: "Rachel Adams", position: "Flight Attendant", email: "racheladams@airline.com" },
    { id: 8, name: "David Brown", position: "Manager", email: "davidbrown@airline.com" },
    { id: 9, name: "Laura Green", position: "Pilot", email: "lauragreen@airline.com" },
  ];

  const faqs = [
    { id: 1, question: "What is the baggage allowance?", answer: "Each passenger is allowed 2 pieces of baggage, up to 23kg each." },
    { id: 2, question: "How can I cancel my flight?", answer: "You can cancel your flight by visiting our 'Manage Booking' section on the website." },
    { id: 3, question: "What documents do I need to travel?", answer: "You need a valid passport, visa (if applicable), and a flight ticket." },
    { id: 4, question: "What is the check-in process?", answer: "Check-in opens 2 hours before the scheduled departure time. You can check-in online or at the airport." },
    { id: 5, question: "Can I bring pets on the flight?", answer: "Yes, pets are allowed in the cabin or cargo hold depending on the airline's policy." },
    { id: 6, question: "How do I change my flight?", answer: "You can change your flight via the 'Manage Booking' section or contact customer service." },
    { id: 7, question: "How do I check in online?", answer: "You can check in online through our website or mobile app 24 hours before your flight." },
    { id: 8, question: "Are meals included?", answer: "Yes, meals are included in all international flights and select domestic flights." },
    { id: 9, question: "Do you offer travel insurance?", answer: "Yes, we offer travel insurance during booking, including flight delay and baggage loss coverage." },
  ];

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/all`);
        setUsers(response.data);
        console.log("Users response:", response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  // Fetch flights from the API
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(`${API_URL}/flights/all`);
        setFlights(response.data);
        console.log("Flights response:", response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setLoadingFlights(false);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      {/* Dashboard Grid for 4 Boxes */}
      <div className="row" style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {/* User Section */}
        <div className="col" style={{ flex: '1 1 30%', maxWidth: '33.33%' }}>
          <div
            className="card"
            style={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              border: '1px solid #ddd',
              overflow: 'hidden',
              height: '400px', // Set height to be consistent
            }}
          >
            <div className="card-header text-center" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px' }}>
              <h3 className="card-title">Air Users</h3>
              <p>Total Users: {users.length}</p>
            </div>
            <div className="card-body" style={{ padding: '15px', maxHeight: '300px', overflowY: 'auto' }}>
              {loadingUsers ? (
                <div>Loading Users...</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr className="fw-bold">
                        <th>Username</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user: { id: number; username: string; email: string }) => (
                        <tr key={user.id}>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Employee Section */}
        <div className="col" style={{ flex: '1 1 30%', maxWidth: '33.33%' }}>
          <div
            className="card"
            style={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              border: '1px solid #ddd',
              overflow: 'hidden',
              height: '400px', // Set height to be consistent
            }}
          >
            <div className="card-header text-center" style={{ backgroundColor: '#28a745', color: 'white', padding: '10px' }}>
              <h3 className="card-title">Employees</h3>
            </div>
            <div className="card-body" style={{ padding: '15px', maxHeight: '300px', overflowY: 'auto' }}>
              <ul style={{ listStyleType: 'none', padding: '0' }}>
                {employees.map((employee) => (
                  <li key={employee.id} style={{ marginBottom: '10px', backgroundColor: '#f8f9fa', padding: '8px', borderRadius: '5px' }}>
                    <strong>{employee.name}</strong> ({employee.position}) <br />
                    Email: {employee.email}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="col" style={{ flex: '1 1 30%', maxWidth: '33.33%' }}>
          <div
            className="card"
            style={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              border: '1px solid #ddd',
              overflow: 'hidden',
              height: '400px', // Set height to be consistent
            }}
          >
            <div className="card-header text-center" style={{ backgroundColor: '#ffc107', color: 'white', padding: '10px' }}>
              <h3 className="card-title">FAQs</h3>
            </div>
            <div className="card-body" style={{ padding: '15px', maxHeight: '300px', overflowY: 'auto' }}>
              <ul style={{ listStyleType: 'none', padding: '0' }}>
                {faqs.map((faq) => (
                  <li key={faq.id} style={{ marginBottom: '10px', backgroundColor: '#f8f9fa', padding: '8px', borderRadius: '5px' }}>
                    <strong>{faq.question}</strong> <br />
                    {faq.answer}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Flight Section Below */}
      <div
        className="card"
        style={{
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          border: '1px solid #ddd',
          overflow: 'hidden',
          marginTop: '20px',
        }}
      >
        <div className="card-header text-center" style={{ backgroundColor: '#17a2b8', color: 'white', padding: '10px' }}>
          <h3 className="card-title">Flights</h3>
        </div>
        <div className="card-body" style={{ padding: '15px' }}>
          {loadingFlights ? (
            <div>Loading Flights...</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-bordered">
                <thead>
                  <tr className="fw-bold">
                    <th>Name</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Price</th>
                    <th>Airline</th>
                    <th>Class</th>
                  </tr>
                </thead>
                <tbody>
                  {flights.map((flight: { id: number; flightName: string; departure: string; arrival: string; source: string; destination: string; price: string; airline: string; flightClass: string }) => (
                    <tr key={flight.id}>
                      <td>{flight.flightName || "N/A"}</td>
                      <td>{flight.departure}</td>
                      <td>{flight.arrival}</td>
                      <td>{flight.source}</td>
                      <td>{flight.destination}</td>
                      <td>{flight.price}</td>
                      <td>{flight.airline}</td>
                      <td>{flight.flightClass}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AirAdmindashboard;
