import axios from "axios";


const API_URL = `${import.meta.env.VITE_API_BASE_URL}/departments`;

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const getDepartments = async () => {
  const response = await axios.get(API_URL, getAuthHeader());
  return response;
};

export const createDepartment = async (departmentData) => {
  const response = await axios.post(API_URL, departmentData, getAuthHeader());
  return response;
};

export const updateDepartment = async (id, departmentData) => {
  const response = await axios.put(`${API_URL}/${id}`, departmentData, getAuthHeader());
  return response;
};

export const deleteDepartment = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
  return response;
};