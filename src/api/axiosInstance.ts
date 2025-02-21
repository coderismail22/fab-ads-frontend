// axiosInstance.ts
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/v1";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensures cookies are sent with requests (useful for sessions)
});

// Add request interceptor to attach token if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
