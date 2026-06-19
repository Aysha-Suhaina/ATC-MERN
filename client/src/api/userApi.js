import axios from "axios";

const API = "http://localhost:4000/api/users";

export const getProfile = async () => {
  return axios.get(`${API}/profile`, {
    withCredentials: true,
  });
};

export const updateProfile = async (data) => {
  return axios.put(
    `${API}/profile`,
    data,
    {
      withCredentials: true,
    }
  );
};