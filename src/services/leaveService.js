import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/leaves`;

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const applyLeave = async (leaveData) => {
  const response = await axios.post(`${API_URL}/apply`, leaveData, getAuthHeader());
  return response;
};

export const getMyLeaves = async () => {
  const response = await axios.get(`${API_URL}/my`, getAuthHeader());
  return response;
};

export const getAllLeaves = async () => {
  const response = await axios.get(API_URL, getAuthHeader());
  return response;
};

export const approveLeave = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/approve`, {}, getAuthHeader());
  return response;
};

export const rejectLeave = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/reject`, {}, getAuthHeader());
  return response;
};

export const cancelLeave = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/cancel`, {}, getAuthHeader());
  return response;
};