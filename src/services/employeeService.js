import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/employees`;

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const getEmployees = async () => {
  const response = await axios.get(`${API_URL}?size=100`, getAuthHeader());
  return response;
};

export const createEmployee = async (employeeData) => {
  const response = await axios.post(API_URL, employeeData, getAuthHeader());
  return response;
};

export const updateEmployee = async (id, employeeData) => {
  const response = await axios.put(`${API_URL}/${id}`, employeeData, getAuthHeader());
  return response;
};

export const deleteEmployee = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
  return response;
};