import axios, { AxiosInstance } from "axios";
import { API_URL } from "../api/api";

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const contentType =
        error.response.headers && error.response.headers["content-type"]
          ? error.response.headers["content-type"]
          : "";
      let message = `HTTP ${error.response.status}`;
      try {
        if (contentType.includes("application/json") && error.response.data) {
          message = JSON.stringify(error.response.data);
        } else if (typeof error.response.data === "string") {
          message = error.response.data;
        }
      } catch (e) {
      
      }
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error);
  }
);

export default api;
