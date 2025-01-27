import axios from "axios";
import { LoginBasicInfo } from "../Model/AuthInterfaceWater";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const AirService = {
  login: async (loginData: LoginBasicInfo): Promise<LoginBasicInfo> => {
    try {
      const response = await axios.post<LoginBasicInfo>(
        `http://localhost:8080/auth/login`,
        loginData
      );

      console.log("Air login response:", response);

      // Clear previous local storage
      localStorage.clear();

      // Map 'id' to 'userId' and store it in local storage
      const userId = response.data.id;
      if (userId) {
        localStorage.setItem("userId", userId.toString());
        console.log("Local storage updated: ", localStorage.getItem("userId")); // Logs the stored value for 'userId'
      } else {
        console.error("No userId found in the response");
      }

      return response.data;
    } catch (error) {
      console.error("Error during Air login:", error);
      throw error;
    }
  },
};
