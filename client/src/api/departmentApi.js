import axios from "axios";

const API = "/api/departments";

export const getDepartments = () =>
  axios.get(API, {
    withCredentials: true,
  });

export const getDepartment = (id) =>
  axios.get(`${API}/${id}`, {
    withCredentials: true,
  });

export const createDepartment = (data) =>
  axios.post(API, data, {
    withCredentials: true,
  });

export const updateDepartment = (id, data) =>
  axios.put(`${API}/${id}`, data, {
    withCredentials: true,
  });

export const deleteDepartment = (id) =>
  axios.delete(`${API}/${id}`, {
    withCredentials: true,
  });

export const assignManager = (
  departmentId,
  managerId
) =>
  axios.patch(
    `${API}/${departmentId}/assign-manager`,
    { managerId },
    {
      withCredentials: true,
    }
  );