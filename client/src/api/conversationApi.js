import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api/conversations",
  withCredentials: true,
});

export const getConversations = () =>
  API.get("/");

export const getMessages = (id) =>
  API.get(`/${id}/messages`);

export const openConversation = (receiverId) =>
  API.post("/open", {
    receiverId,
  });