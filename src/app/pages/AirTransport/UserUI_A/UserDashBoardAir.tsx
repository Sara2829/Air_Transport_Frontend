import React, { useEffect, useState } from "react";

const UserDashBoardAir = () => {
  // State for flight, hotel, meal, and airport data
  const [flights, setFlights] = useState<any[]>([]);
  const [hotels, setHotels] = useState<any[]>([]);
  const [meals, setMeals] = useState<any[]>([]);
  const [airports, setAirports] = useState<any[]>([]);

  // Simulating data fetch
  useEffect(() => {
    // Hardcoded flight data
    setFlights([
      {
        flightName: "Airbus A320",
        destination: "Mumbai to Delhi",
        price: 4500,
        seatsAvailable: 120,
        image:
          "https://flybitlux.com/wp-content/uploads/2023/12/plane-that-has-word-sa-it.jpg",
      },
      {
        flightName: "Boeing 737",
        destination: "Bangalore to Kolkata",
        price: 6200,
        seatsAvailable: 85,
        image:
          "https://img.freepik.com/free-photo/planes-wing-cuts-through-sky-cotton-candy-clouds-radiant-sunset_91128-4456.jpg?t=st=1736415680~exp=1736419280~hmac=4f4572cf66bcdf47b7568064074f82b7502d0c1456ccc8090cc75d22d4b36f82&w=1380",
      },

      {
        flightName: "Embraer E175",
        destination: "Chennai to Hyderabad",
        price: 4000,
        seatsAvailable: 100,
        image:
          "https://i.abcnewsfe.com/a/29ad17e0-4dec-488a-9c27-bdc2424ba5a5/electric-plane-ht-ml-240110_1704902584341_hpMain_16x9.jpg?w=992",
      },
      {
        flightName: "Bombardier CRJ900",
        destination: "Pune to Jaipur",
        price: 5500,
        seatsAvailable: 90,
        image:
          "https://cdn.prod.website-files.com/64a82b76a134891a5b8e23fb/64da261534441abee9652521_why-do-planes-use-kerosene-main.jpg",
      },
      {
        flightName: "Airbus A320",
        destination: "Mumbai to Delhi",
        price: 4500,
        seatsAvailable: 120,
        image:
          "https://flybitlux.com/wp-content/uploads/2023/12/plane-that-has-word-sa-it.jpg",
      },
      {
        flightName: "Boeing 737",
        destination: "Bangalore to Kolkata",
        price: 6200,
        seatsAvailable: 85,
        image:
          "https://img.freepik.com/free-photo/planes-wing-cuts-through-sky-cotton-candy-clouds-radiant-sunset_91128-4456.jpg?t=st=1736415680~exp=1736419280~hmac=4f4572cf66bcdf47b7568064074f82b7502d0c1456ccc8090cc75d22d4b36f82&w=1380",
      },
      {
        flightName: "Bombardier CRJ900",
        destination: "Pune to Jaipur",
        price: 5500,
        seatsAvailable: 90,
        image:
          "https://cdn.prod.website-files.com/64a82b76a134891a5b8e23fb/64da261534441abee9652521_why-do-planes-use-kerosene-main.jpg",
      },
      {
        flightName: "Bombardier CRJ900",
        destination: "Pune to Jaipur",
        price: 5500,
        seatsAvailable: 90,
        image:
          "https://cdn.prod.website-files.com/64a82b76a134891a5b8e23fb/64da261534441abee9652521_why-do-planes-use-kerosene-main.jpg",
      },
      {
        flightName: "Bombardier CRJ900",
        destination: "Pune to Jaipur",
        price: 5500,
        seatsAvailable: 90,
        image:
          "https://cdn.prod.website-files.com/64a82b76a134891a5b8e23fb/64da261534441abee9652521_why-do-planes-use-kerosene-main.jpg",
      },
      
    ]);

    // Hardcoded hotel data
    setHotels([
      {
        hotelName: "The Oberoi",
        location: "Mumbai",
        price: 12000,
        roomsAvailable: 15,
        image:
          "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?crop=entropy&cs=tinysrgb&w=800&h=400&fit=crop",
      },
      {
        hotelName: "ITC Grand",
        location: "Bangalore",
        price: 9000,
        roomsAvailable: 20,
        image:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/24/3e/74/itc-grand-central.jpg?w=1200&h=-1&s=1",
      },
      {
        hotelName: "The Oberoi",
        location: "Mumbai",
        price: 12000,
        roomsAvailable: 15,
        image:
          "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?crop=entropy&cs=tinysrgb&w=800&h=400&fit=crop",
      },
      {
        hotelName: "The Oberoi",
        location: "Mumbai",
        price: 12000,
        roomsAvailable: 15,
        image:
          "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?crop=entropy&cs=tinysrgb&w=800&h=400&fit=crop",
      },
      {
        hotelName: "The Oberoi",
        location: "Mumbai",
        price: 12000,
        roomsAvailable: 15,
        image:
          "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?crop=entropy&cs=tinysrgb&w=800&h=400&fit=crop",
      },
      {
        hotelName: "ITC Grand",
        location: "Bangalore",
        price: 9000,
        roomsAvailable: 20,
        image:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/24/3e/74/itc-grand-central.jpg?w=1200&h=-1&s=1",
      },
      {
        hotelName: "ITC Grand",
        location: "Bangalore",
        price: 9000,
        roomsAvailable: 20,
        image:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/24/3e/74/itc-grand-central.jpg?w=1200&h=-1&s=1",
      },
      {
        hotelName: "ITC Grand",
        location: "Bangalore",
        price: 9000,
        roomsAvailable: 20,
        image:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/24/3e/74/itc-grand-central.jpg?w=1200&h=-1&s=1",
      },
      {
        hotelName: "ITC Grand",
        location: "Bangalore",
        price: 9000,
        roomsAvailable: 20,
        image:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/24/3e/74/itc-grand-central.jpg?w=1200&h=-1&s=1",
      },
    ]);

    // Hardcoded meal data
    setMeals([
      {
        mealName: "Continental Breakfast",
        price: 500,
        description: "Includes bread, eggs, and beverages.",
        image:
          "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/stock%2FGettyImages-531183292",
      },
      {
        mealName: "Indian Thali",
        price: 350,
        description: "Includes rice, curry, and desserts.",
        image:
          "https://i.ndtvimg.com/i/2017-10/thali_620x350_71507031336.jpg",
      },
      {
        mealName: "Continental Breakfast",
        price: 500,
        description: "Includes bread, eggs, and beverages.",
        image:
          "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/stock%2FGettyImages-531183292",
      },
      {
        mealName: "Continental Breakfast",
        price: 500,
        description: "Includes bread, eggs, and beverages.",
        image:
          "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/stock%2FGettyImages-531183292",
      },
      {
        mealName: "Continental Breakfast",
        price: 500,
        description: "Includes bread, eggs, and beverages.",
        image:
          "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/stock%2FGettyImages-531183292",
      },
    ]);

    // Hardcoded airport info
    setAirports([
      { name: "Chhatrapati Shivaji Airport", location: "Mumbai", code: "BOM" },
      { name: "Kempegowda Airport", location: "Bangalore", code: "BLR" },
    ]);
  }, []);

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f7f9fc" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#333" }}>
        Air User Dashboard
      </h1>

      {/* Section 1: Flights Info */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "#007bff", marginBottom: "1rem" }}>Flights Info</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {flights.map((flight, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
              }}
            >
              <img
                src={flight.image}
                alt={flight.flightName}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "1rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                  {flight.flightName}
                </h3>
                <p style={{ margin: "0.5rem 0", color: "#666" }}>
                  Destination: {flight.destination}
                </p>
                <p style={{ margin: "0.5rem 0", color: "#666" }}>
                  Seats Available: {flight.seatsAvailable}
                </p>
                <p style={{ fontWeight: "bold", color: "#007bff" }}>
                  Price: ₹{flight.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Hotel Info */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "#007bff", marginBottom: "1rem" }}>Hotel Info</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {hotels.map((hotel, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
              }}
            >
              <img
                src={hotel.image}
                alt={hotel.hotelName}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "1rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                  {hotel.hotelName}
                </h3>
                <p style={{ margin: "0.5rem 0", color: "#666" }}>
                  Location: {hotel.location}
                </p>
                <p style={{ margin: "0.5rem 0", color: "#666" }}>
                  Rooms Available: {hotel.roomsAvailable}
                </p>
                <p style={{ fontWeight: "bold", color: "#007bff" }}>
                  Price: ₹{hotel.price}/night
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Meal Info */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "#007bff", marginBottom: "1rem" }}>Meal Info</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {meals.map((meal, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
              }}
            >
              <img
                src={meal.image}
                alt={meal.mealName}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "1rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                  {meal.mealName}
                </h3>
                <p style={{ margin: "0.5rem 0", color: "#666" }}>
                  {meal.description}
                </p>
                <p style={{ fontWeight: "bold", color: "#007bff" }}>
                  Price: ₹{meal.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Airport Info */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "#007bff", marginBottom: "1rem" }}>
          Airport Info
        </h2>
        <ul style={{ listStyle: "none", padding: "0" }}>
          {airports.map((airport, index) => (
            <li
              key={index}
              style={{
                backgroundColor: "#fff",
                marginBottom: "1rem",
                padding: "1rem",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                {airport.name} ({airport.code})
              </h3>
              <p style={{ margin: "0.5rem 0", color: "#666" }}>
                Location: {airport.location}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashBoardAir;
