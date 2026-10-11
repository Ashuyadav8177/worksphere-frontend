import axios from "axios";
const API_URL = "https://worksphere-backend-1ula.onrender.com/api/auth";

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response;
};

const authService = {
  login,

  register: async (userData) => {
    const response = await axios.post(
      `${API_URL}/register`,
      userData
    );

    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await axios.post(
      `${API_URL}/forgot-password`,
      { email }
    );

    return response.data;
  },

  resetPassword: async (data) => {
    const response = await axios.post(
      `${API_URL}/reset-password`,
      data
    );

    return response.data;
  },
};

export default authService;