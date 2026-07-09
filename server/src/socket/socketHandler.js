import { registerConnection } from "./events/connection.js";
import { registerPrivateChat } from "./events/privateChat.js";

export const registerSocketEvents = (io) => {

  io.on("connection", (socket) => {

    registerConnection(io, socket);

    registerPrivateChat(io, socket);

  });

};