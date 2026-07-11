import {
  userToSocket,
  socketToUser,
} from "../utils/socketStore.js";
import { emitOnlineUsers } from "./onlineUsers.js";

export const registerConnection = (
  io,
  socket
) => {

  console.log(
    "Connected:",
    socket.id
  );

 socket.on("register_user", (userId) => {
  console.log("REGISTER:", userId, socket.id);

  userToSocket.set(userId, socket.id);
  socketToUser.set(socket.id, userId);

  emitOnlineUsers(io, userToSocket);
});

  socket.on(
    "disconnect",
    () => {

      const userId =
        socketToUser.get(socket.id);

        if (userId) {
        userToSocket.delete(userId);

        socketToUser.delete(socket.id);
        }
        emitOnlineUsers(io, userToSocket);

        console.log(
        "Online Users:",
        [...userToSocket]
        );

      console.log(
        "Disconnected:",
        socket.id
      );

    }
  );

};
