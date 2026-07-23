import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api/dashboard",
  withCredentials: true,
});

export const getAdminDashboardStats = () =>
  API.get("/admin");