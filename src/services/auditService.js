import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/audit-logs`;

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAllAuditLogs = async () => {
  const response = await axios.get(API_URL, getAuthHeader());
  return response;
};