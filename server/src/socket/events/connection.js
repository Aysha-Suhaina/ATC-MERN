import {
  userToSocket,
  socketToUser,
} from "../utils/socketStore.js";

export const registerConnection = (
  io,
  socket
) => {

  console.log(
    "Connected:",
    socket.id
  );

  socket.on(
    "register_user",
    (userId) => {

      userToSocket.set(userId, socket.id);

socketToUser.set(socket.id, userId);

      console.log(
        "Online Users:",
        [...userToSocket]
      );

    }
  );

  socket.on(
    "disconnect",
    () => {

      const userId =
        socketToUser.get(socket.id);

        if (userId) {
        userToSocket.delete(userId);

        socketToUser.delete(socket.id);
        }

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