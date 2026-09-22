import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/documents`;

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Get logged-in employee documents
export const getMyDocuments = async () => {
  const response = await axios.get(
    `${API_URL}/my`,
    getAuthHeader()
  );

  return response;
};

// Upload actual file
export const uploadDocument = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await axios.post(
    `${API_URL}/upload`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};

// Existing URL-based document method
export const addDocument = async (documentData) => {
  const response = await axios.post(
    API_URL,
    documentData,
    getAuthHeader()
  );

  return response;
};