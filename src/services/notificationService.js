import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/notifications`;

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getMyNotifications = async () => {
  const response = await axios.get(`${API_URL}/my`, getAuthHeader());
  return response;
};

export const markNotificationAsRead = async (id) => {
  const response = await axios.put(
    `${API_URL}/${id}/read`,
    {},
    getAuthHeader()
  );
  return response;
};
