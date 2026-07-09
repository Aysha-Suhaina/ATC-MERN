import axios from "axios";

const API = axios.create({
  baseURL: "/api/conversations",
  withCredentials: true,
});


export const getConversations = () =>
  API.get("/");

export const getMessages = (id) =>
  API.get(`/${id}/messages`);



export const openConversation = (
  receiverId
) =>
  axios.post(
    `${API}/open`,
    { receiverId },
    {
      withCredentials: true,
    }
  );