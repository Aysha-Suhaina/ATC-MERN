export const emitOnlineUsers = (io, userToSocket) => {
  const users = [...userToSocket.keys()];

  console.log("Broadcasting online users:", users);

  io.emit("online_users", users);
};