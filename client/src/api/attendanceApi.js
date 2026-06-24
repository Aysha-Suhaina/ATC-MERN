import axios from "axios";

const API = "http://localhost:4000/api/attendance";

export const submitAttendance = async (data) => {
  return axios.post(API, data, {
    withCredentials: true,
  });
};

export const getMyAttendance = async () => {
  return axios.get(`${API}/me`, {
    withCredentials: true,
  });
};

export const getPendingAttendance = async () => {
  return axios.get(`${API}/pending`, {
    withCredentials: true,
  });
};

export const approveAttendance = async (
  attendanceId,
  remarks
) => {
  return axios.patch(
    `${API}/${attendanceId}/approve`,
    { remarks },
    {
      withCredentials: true,
    }
  );
};

export const rejectAttendance = async (
  attendanceId,
  remarks
) => {
  return axios.patch(
    `${API}/${attendanceId}/reject`,
    { remarks },
    {
      withCredentials: true,
    }
  );
};
export const getAllAttendance = async () => {
  return axios.get(API, {
    withCredentials: true,
  });
};

export const deleteAttendance = async (id) => {
  return axios.delete(`${API}/${id}`, {
    withCredentials: true,
  });
};