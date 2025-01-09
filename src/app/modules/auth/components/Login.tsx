// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../auth/core/Auth";

// interface LoginBasicInfo {
//   email: string;
//   password: string;
// }

// const Login: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [type, setType] = useState("water");
//   const [error, setError] = useState<string | null>(null);
//   const { saveAuth } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     if (!type || !email || !password) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     const loginData: LoginBasicInfo = { email, password };

//     try {
//       // Mock API response
//       const userData = {
//         api_token: "dummy-token",
//         isAuthenticated: true,
//       };

//       // Save user state
//       saveAuth(userData);

//       // Navigate based on the service type
//       switch (type) {
//         case "water":
//           navigate("/home");
//           break;
//         case "air":
//           navigate("/Air/Homepage");
//           break;
//         case "ground":
//           navigate("/Ground/homepage");
//           break;
//         default:
//           navigate("/");
//       }
//     } catch (err) {
//       console.error("Login failed:", err);
//       setError("Invalid credentials or login error.");
//     }
//   };

//   return (
//     <div>
//       <form
//         className="form w-100"
//         id="kt_login_signin_form"
//         onSubmit={handleLogin}
//       >
//         <div className="text-center mb-11">
//           <h1 className="text-gray-900 fw-bolder mb-3">Sign In</h1>

//           <div className="text-gray-500 fw-semibold fs-6">
//             Your Social Campaigns
//           </div>
//         </div>

//         <label className="form-label fs-6 fw-bolder text-gray-900">
//           Email:
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </label>
//         <label className="form-label fs-6 fw-bolder text-gray-900">
//           Password:
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         {/* <label>
//           Service Type:
//           <select value={type} onChange={(e) => setType(e.target.value)}>
//             <option value="water">Water</option>
//             <option value="air">Air</option>
//             <option value="ground">Ground</option>
//           </select>
//         </label> */}

//         <div>
//           <label>
//             <span>Service Type:</span>
//             <div>
//               <label>
//                 <input
//                   type="radio"
//                   value="water"
//                   checked={type === "water"}
//                   onChange={(e) => setType(e.target.value)}
//                 />
//                 Water
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   value="air"
//                   checked={type === "air"}
//                   onChange={(e) => setType(e.target.value)}
//                 />
//                 Air
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   value="ground"
//                   checked={type === "ground"}
//                   onChange={(e) => setType(e.target.value)}
//                 />
//                 Ground
//               </label>
//             </div>
//           </label>
//         </div>

//         {error && <p style={{ color: "red" }}>{error}</p>}
//         <button type="submit">Login</button>

//         <div className="text-gray-500 text-center fw-semibold fs-6">
//           Not a Member yet?{" "}
//           <Link to="/auth/registration" className="link-primary">
//             Sign up
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;

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
  const [type, setType] = useState("water");
  const [error, setError] = useState<string | null>(null);
  const { saveAuth } = useAuth();
  const navigate = useNavigate();

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError(null);

  //   if (!type || !email || !password) {
  //     setError("Please fill in all fields.");
  //     return;
  //   }

  //   const loginData: LoginBasicInfo = { email, password };

  //   try {
  //     let userData: LoginBasicInfo;

  //     // Determine the service based on the selected type

  //     const adminEmails = {
  //       water: "adminwater@gmail.com",
  //       air: "adminair@gmail.com",
  //       ground: "adminground@gmail.com",
  //     };

  //     switch (type) {
  //       case "air":
  //         userData = await AirService.login(loginData);
  //         if (email === adminEmails.air) {
  //           navigate("/Air/AdminDashboard");
  //         } else {
  //           navigate("/Air/Homepage");
  //         }
  //         break;
  //       case "ground":
  //         userData = await GroundService.login(loginData);
  //         if (email === adminEmails.ground) {
  //           navigate("/Ground/AdminDashboard");
  //         } else {
  //           navigate("/Ground/Homepage");
  //         }
  //         break;
  //       case "water":
  //         userData = await AuthService.login(loginData);
  //         if (email === adminEmails.ground) {
  //           navigate("/Ground/AdminDashboard");
  //         } else {
  //           navigate("/Ground/Homepage");
  //         }
  //       default:
  //         userData = await AuthService.login(loginData); // Default to AuthService (water)
  //     }

  //     // Save user state and redirect based on the service type
  //     saveAuth(userData);

  //     // switch (type) {
  //     //   case "air":
  //     //     navigate("/Air/Homepage");
  //     //     break;
  //     //   case "ground":
  //     //     navigate("/Ground/homepage");
  //     //     break;
  //     //   default:
  //     //     navigate("/home");
  //     // }
  //   } catch (err) {
  //     console.error("Login failed:", err);
  //     setError("Invalid credentials or login error.");
  //   }
  // };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!type || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const loginData: LoginBasicInfo = { email, password };

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
      console.log(localStorage);

      // Service and navigation based on type
      switch (type) {
        case "air":
          userData = await AirService.login(loginData);
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
    <div>
      <form
        className="form w-100"
        id="kt_login_signin_form"
        onSubmit={handleLogin}
      >
        <div className="text-center mb-11">
          <h1 className="text-gray-900 fw-bolder mb-3">Sign In</h1>
          <div className="text-gray-500 fw-semibold fs-6">
            Your Social Campaigns
          </div>
        </div>

        <label className="form-label fs-6 fw-bolder text-gray-900">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="form-label fs-6 fw-bolder text-gray-900">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <div>
          <label>
            <span>Service Type:</span>
            <div>
              <label>
                <input
                  type="radio"
                  value="water"
                  checked={type === "water"}
                  onChange={(e) => setType(e.target.value)}
                />
                Water
              </label>
              <label>
                <input
                  type="radio"
                  value="air"
                  checked={type === "air"}
                  onChange={(e) => setType(e.target.value)}
                />
                Air
              </label>
              <label>
                <input
                  type="radio"
                  value="ground"
                  checked={type === "ground"}
                  onChange={(e) => setType(e.target.value)}
                />
                Ground
              </label>
            </div>
          </label>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>

        <div className="text-gray-500 text-center fw-semibold fs-6">
          Not a Member yet?{" "}
          <Link to="/auth/registration" className="link-primary">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
