import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api/designations",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Get all
export const getAllDesignations = () =>
  API.get("/");

// Get one
export const getDesignationById = (id) =>
  API.get(`/${id}`);

// Create
export const createDesignation = (data) =>
  API.post("/", data);

// Update
export const updateDesignation = (id, data) =>
  API.put(`/${id}`, data);

// Delete
export const deleteDesignation = (id) =>
  API.delete(`/${id}`);