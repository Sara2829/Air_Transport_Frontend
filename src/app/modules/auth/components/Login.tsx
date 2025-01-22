

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/core/Auth";
import { AuthService } from "../../../../api/Service/AuthServicewater";
import { AirService } from "../../../../api/Service/AuthServiceAir";
import { GroundService } from "../../../../api/Service/AuthServiceGround";
import { LoginBasicInfo } from "../../../../api/Model/AuthInterfaceWater";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("air");
  const [error, setError] = useState<string | null>(null);
  const { saveAuth } = useAuth();
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!type || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const loginData: LoginBasicInfo = { email, password, id: 0 };
    console.log(loginData);

    try {
      let userData: LoginBasicInfo;

      // Admin email configuration
      const adminEmails = {
        water: "adminwater@gmail.com",
        air: "adminair@gmail.com",
        ground: "adminground@gmail.com",
      };

      // Store the type in localStorage

      localStorage.setItem("type", type);
      

      // Service and navigation based on type
      switch (type) {
        case "air":
          userData = await AirService.login(loginData);
          console.log(userData);
           localStorage.setItem("userId", String(userData.id)); // Save userId
            console.log("User ID:", userData.id);
          if (userData) {
            const role = email === adminEmails.air ? "admin" : "user";
            localStorage.setItem("type", type);
            console.log(type);
            localStorage.setItem("role", role);
            console.log(role);
           
            navigate(
              role === "admin" ? "/Air/AdminDashboard" : "/AirUserDashBoard"
            );
          }
          break;

        case "ground":
          userData = await GroundService.login(loginData);
          if (userData) {
            const role = email === adminEmails.ground ? "admin" : "user";
            localStorage.setItem("type", type);
            console.log(type);
            localStorage.setItem("role", role);
            console.log(role);
            navigate(
              role === "admin"
                ? "/Ground/AdminDashboard"
                : "/UserDashBoardGround"
            );
          }
          break;

        case "water":
          userData = await AuthService.login(loginData);
          if (userData) {
            const role = email === adminEmails.water ? "admin" : "user";
            localStorage.setItem("type", type);
            console.log(type);
            localStorage.setItem("role", role);
            console.log(role);
            navigate(
              role === "admin" ? "/Water/Admindashboard" : "/waterUserDashboard"
            );
          }
          break;

        default:
          // Default case for unsupported types
          setError("Invalid service type selected.");
          return;
      }

      // Save user state after successful login
      saveAuth(userData);
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid credentials or login error.");
    }
  };

  
  return (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f7f9fc",
            padding: "20px",
        }}
    >
        <form
            onSubmit={handleLogin}
            style={{
                maxWidth: "400px",
                width: "100%",
                backgroundColor: "#ffffff",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
            }}
        >
            <h2
                className="text-center"
                style={{
                    color: "#007bff",
                    marginBottom: "20px",
                    fontWeight: "bold",
                }}
            >
                Login
            </h2>

            <div className="form-group">
                <label
                    htmlFor="email"
                    style={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        marginBottom: "8px",
                        display: "block",
                    }}
                >
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                    }}
                    className="form-control"
                    style={{
                        marginBottom: "15px",
                        padding: "10px",
                        border: "1px solid #ced4da",
                        borderRadius: "8px",
                        width: "100%",
                    }}
                />
            </div>

            <div className="form-group">
                <label
                    htmlFor="password"
                    style={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        marginBottom: "8px",
                        display: "block",
                    }}
                >
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                    }}
                    className="form-control"
                    style={{
                        marginBottom: "15px",
                        padding: "10px",
                        border: "1px solid #ced4da",
                        borderRadius: "8px",
                        width: "100%",
                    }}
                />
            </div>

            <div className="form-group">
                <p style={{fontWeight: "bold", marginBottom: "10px"}}>
                    Select an Option:
                </p>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "10px",
                    }}
                >
                    {["Water", "Air", "Ground"].map((option) => (
                        <button
                            type="button"
                            key={option}
                            className={`btn ${
                                selectedOption === option
                                    ? "btn-primary"
                                    : "btn-outline-primary"
                            }`}
                            onClick={() => setSelectedOption(option)}
                            style={{
                                flex: "1",
                                padding: "10px",
                                borderRadius: "8px",
                                transition: "all 0.3s ease",
                                fontWeight: "bold",
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            {error && (
                <div
                    className="alert alert-danger"
                    style={{
                        marginTop: "15px",
                        padding: "10px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        textAlign: "center",
                    }}
                >
                    {error}
                </div>
            )}

            <div className="text-center" style={{marginTop: "20px"}}>
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        fontWeight: "bold",
                    }}
                >
                    Login
                </button>
            </div>

            <div className="text-center mt-4" style={{marginTop: "20px"}}>
                <p style={{fontSize: "14px"}}>
                    Don't have an account?{" "}
                    <a
                        href="auth/registration"
                        style={{
                            color: "#007bff",
                            textDecoration: "none",
                            fontWeight: "bold",
                        }}
                    >
                        Register here
                    </a>
                </p>
            </div>
        </form>
    </div>
);
};

export default Login;
