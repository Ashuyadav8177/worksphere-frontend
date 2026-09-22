import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/tasks`;

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData, getAuthHeader());
  return response;
};

export const getMyTasks = async () => {
  const response = await axios.get(`${API_URL}/my`, getAuthHeader());
  return response;
};

export const getAllTasks = async () => {
  const response = await axios.get(API_URL, getAuthHeader());
  return response;
};

export const updateTaskStatus = async (id, status) => {
  const response = await axios.put(`${API_URL}/${id}/status?status=${status}`, {}, getAuthHeader());
  return response;
};

export const updateTask = async (id, taskData) => {
  const response = await axios.put(`${API_URL}/${id}`, taskData, getAuthHeader());
  return response;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
  return response;
};