import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure axios is installed

const AirDetailsPage: React.FC = () => {
  const location = useLocation();
  const flightDetails = location.state as {
    name: string;
    image: string;
    description: string;
    price: number;
    source: string;
    destination: string;
    travelDate: string;
    gallery: string[];
  };

  const [travelDate, setTravelDate] = useState<string>(flightDetails.travelDate || "");
  const [numTravelers, setNumTravelers] = useState<number>(1);

  // State for user information
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleSaveBooking = async () => {
    // Create BookingDTO object
    const bookingDTO = {
      passengerName: userInfo.name,
      flightName: flightDetails.name,
      bookingDate: new Date().toISOString(),  // current date as booking date
      travelDate,  // travel date from state
      status: "Pending", // Status can be "Pending" initially or based on your needs
    };

    try {
      // Make API request to create booking
      const response = await axios.post("http://localhost:8080/bookings", bookingDTO, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Booking created successfully:", response.data);

      // Navigate to summary page (optional)
      navigate("/summaryAir", { state: bookingDTO });
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header">
          <h3 className="card-title">Airline Details</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <img
                src={flightDetails.image || "https://img.freepik.com/free-photo/planes-wing-cuts-through-sky-cotton-candy-clouds-radiant-sunset_91128-4456.jpg?t=st=1736572556~exp=1736576156~hmac=491d3d288ba194849824f090134a7ddc9f21134fbc65010773baf4bb616221a3&w=1380"}
                alt={flightDetails.name}
                className="img-fluid rounded-start"
                style={{ height: "300px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-6">
              <h5 className="card-title">{flightDetails.name}</h5>
              <p className="card-text">{flightDetails.description}</p>
              <p className="card-text">
                <strong>Price: ₹{flightDetails.price}</strong>
              </p>

              {/* Source and Destination */}
              <p><strong>Source:</strong> {flightDetails.source}</p>
              <p><strong>Destination:</strong> {flightDetails.destination}</p>

              {/* User Information */}
              <div>
                <div>
                  <h3>Name:</h3>
                  <input
                    type="text"
                    className="form-control"
                    value={userInfo.name}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, name: e.target.value })
                    }
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <h3>Mobile No:</h3>
                  <input
                    type="text"
                    className="form-control"
                    value={userInfo.phone}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, phone: e.target.value })
                    }
                    placeholder="Enter your mobile number"
                  />
                </div>

                <div>
                  <h3>Email id:</h3>
                  <input
                    type="email"
                    className="form-control"
                    value={userInfo.email}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-3">
                <label className="form-label">Travel Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                />
              </div>

              {/* Number of Travelers */}
              <div className="mb-3">
                <label className="form-label">Number of Travelers</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={numTravelers}
                  onChange={(e) => setNumTravelers(Number(e.target.value))}
                />
              </div>

              {/* Gallery */}
              <div>
                <h3>Image Gallery</h3>
                <div className="gallery">
                  {flightDetails.gallery && flightDetails.gallery.length > 0 ? (
                    <div className="row justify-content-start">
                      {flightDetails.gallery.map((image, index) => (
                        <div key={index} className="col-md-4 mb-3">
                          <img
                            src={image}
                            alt={`Gallery Image ${index + 1}`}
                            className="img-fluid"
                            style={{ height: "200px", objectFit: "cover" }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No gallery images available.</p>
                  )}
                </div>
              </div>

              {/* Save Booking Button */}
              <button
                className="btn btn-primary float-end"
                onClick={handleSaveBooking}
              >
                Save Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirDetailsPage;
