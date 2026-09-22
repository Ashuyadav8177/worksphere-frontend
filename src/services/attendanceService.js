import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/attendance`;

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Check-In
export const checkIn = async () => {
  const response = await axios.post(
    `${API_URL}/check-in`,
    {},
    getAuthHeader()
  );

  return response;
};

// Check-Out
export const checkOut = async () => {
  const response = await axios.put(
    `${API_URL}/check-out`,
    {},
    getAuthHeader()
  );

  return response;
};

// Get My Attendance History
export const getMyAttendance = async () => {
  const response = await axios.get(
    `${API_URL}/my`,
    getAuthHeader()
  );

  return response;
};

// Get All Attendance Records
// ADMIN / MANAGER only
export const getAllAttendance = async () => {
  const response = await axios.get(
    API_URL,
    getAuthHeader()
  );

  return response;
};