// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://pixerfect-internship.vercel.app/",
});

// Add token to headers if logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
