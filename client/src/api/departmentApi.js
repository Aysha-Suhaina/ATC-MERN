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
  employeeId
) =>
  axios.patch(
    `${API}/${departmentId}/assign-manager`,
    { employeeId },
    {
      withCredentials: true,
    }
  );

  export const getDepartmentEmployees = (
  departmentId
) =>
  axios.get(
    `${API}/${departmentId}/employees`,
    {
      withCredentials: true,
    }
  );

export const changeManager = (
  departmentId,
  employeeId
) =>
  axios.patch(
    `${API}/${departmentId}/change-manager`,
    { employeeId },
    {
      withCredentials: true,
    }
  );

export const removeManager = (
  departmentId
) =>
  axios.patch(
    `${API}/${departmentId}/remove-manager`,
    {},
    {
      withCredentials: true,
    }
  );
export const getMyDepartment = () =>
axios.get(`${API}/my`, {
  withCredentials: true,
});

export const updateMyDepartment = (data) =>
  axios.put(`${API}/my`, data, {
    withCredentials: true,
  });