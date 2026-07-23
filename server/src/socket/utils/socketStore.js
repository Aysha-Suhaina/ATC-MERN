export const userToSockets = new Map();
export const socketToUser = new Map();

export const addUserSocket = (userId, socketId) => {
  const sockets = userToSockets.get(userId) ?? new Set();
  sockets.add(socketId);
  userToSockets.set(userId, sockets);
  socketToUser.set(socketId, userId);
};

// Returns true only when the user's final tab/device connection is gone.
export const removeUserSocket = (socketId) => {
  const userId = socketToUser.get(socketId);
  if (!userId) return false;

  socketToUser.delete(socketId);
  const sockets = userToSockets.get(userId);
  sockets?.delete(socketId);
  if (sockets?.size) return false;

  userToSockets.delete(userId);
  return true;
};
