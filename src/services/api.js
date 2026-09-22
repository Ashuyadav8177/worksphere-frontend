import axios from "axios";

// ==========================================
// AXIOS INSTANCE
// ==========================================

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================================
// REQUEST INTERCEPTOR
// ==========================================

api.interceptors.request.use(
  (config) => {
    // Get JWT token from localStorage
    const token = localStorage.getItem("token");

    // Attach token to request
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// ==========================================
// RESPONSE INTERCEPTOR
// ==========================================

api.interceptors.response.use(
  // Successful response
  (response) => {
    return response;
  },

  // Error response
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // ==========================================
      // 401 - UNAUTHORIZED
      // ==========================================

      if (status === 401) {
        localStorage.removeItem("token");

        window.location.href = "/login";
      }

      // ==========================================
      // 403 - FORBIDDEN
      // ==========================================

      if (status === 403) {
        console.error(
          "You do not have permission to perform this action."
        );
      }

      // ==========================================
      // 404 - NOT FOUND
      // ==========================================

      if (status === 404) {
        console.error(
          "Requested resource was not found."
        );
      }

      // ==========================================
      // 500+ - SERVER ERROR
      // ==========================================

      if (status >= 500) {
        console.error(
          "Server error. Please try again later."
        );
      }
    }

    // ==========================================
    // NETWORK ERROR
    // ==========================================

    else if (error.request) {
      console.error(
        "Unable to connect to the server."
      );
    }

    // ==========================================
    // OTHER ERROR
    // ==========================================

    else {
      console.error(
        "An unexpected error occurred."
      );
    }

    return Promise.reject(error);
  }
);

// ==========================================
// EXPORT
// ==========================================

export default api;