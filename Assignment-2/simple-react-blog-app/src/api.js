// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "blog-backend-zeta-blond.vercel.app", // ✅ add /api
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
