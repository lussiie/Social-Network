import axios from "axios";

export const Http = axios.create({
  baseURL: "http://localhost:4002",
});

Http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});