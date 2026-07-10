import axios from "axios";

const API = axios.create({
  baseURL:
    "http://localhost:4000/api/messages",
  withCredentials: true,
});

export const getMessages = (
  conversationId
) =>
  API.get(`/${conversationId}`);

export const sendMessage = (
  data
) =>
  API.post("/", data);