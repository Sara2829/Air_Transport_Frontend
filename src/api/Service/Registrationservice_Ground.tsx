import axios from "axios";
import {RegisterBasicInfo } from "../Model/Registerinterface";

const API_URL = import.meta.env.VITE_APP_API_URL;
axios.defaults.withCredentials = true;

export const AuthService_Ground = {
  register: async (registerData: RegisterBasicInfo): Promise<RegisterBasicInfo> => {
    try {
      const response = await axios.post<RegisterBasicInfo>(
        `${API_URL}/signup`,
        registerData
      );
      return response.data;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  },
};
