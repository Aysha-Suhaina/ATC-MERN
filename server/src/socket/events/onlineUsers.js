import { userToSockets } from "../utils/socketStore.js";

export const emitOnlineUsers = (io) => {
  io.emit("online_users", [...userToSockets.keys()]);
};
