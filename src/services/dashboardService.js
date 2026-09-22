import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/dashboard`;

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getDashboardSummary = async () => {
  const response = await axios.get(
    `${API_URL}/summary`,
    getAuthHeader()
  );

  return response;
};