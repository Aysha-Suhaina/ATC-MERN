import axios from "axios";

const API = "/api/designations";

// Get all
export const getAllDesignations = () =>
  axios.get(API, {
    withCredentials: true,
  });

// Get one
export const getDesignationById = (id) =>
  axios.get(`${API}/${id}`, {
    withCredentials: true,
  });

// Get Designations By Department
export const getDesignationsByDepartment = (departmentId) =>
  axios.get(`${API}/department/${departmentId}`, {
    withCredentials: true,
  });

// Create
export const createDesignation = (data) =>
  axios.post(API, data, {
    withCredentials: true,
  });

// Update
export const updateDesignation = (id, data) =>
  axios.put(`${API}/${id}`, data, {
    withCredentials: true,
  });

// Delete
export const deleteDesignation = (id) =>
  axios.delete(`${API}/${id}`, {
    withCredentials: true,
  });

// Manager
export const getMyDepartmentDesignations = () =>
  axios.get(`${API}/my`, {
    withCredentials: true,
  });