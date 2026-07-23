import { addUserSocket, removeUserSocket } from "../utils/socketStore.js";
import { emitOnlineUsers } from "./onlineUsers.js";

export const userRoom = (userId) => `user:${userId}`;

export const registerConnection = (io, socket) => {
  const userId = socket.data.userId;
  socket.join(userRoom(userId));
  addUserSocket(userId, socket.id);
  emitOnlineUsers(io);

  socket.on("disconnect", () => {
    removeUserSocket(socket.id);
    emitOnlineUsers(io);
  });
};
