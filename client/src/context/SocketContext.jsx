import { createContext, useCallback, useContext, useEffect, useState } from "react";
import socket from "../socket/socket";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [onlineUsers, setOnlineUsers] = useState([]);

  const connectSocket = useCallback(() => {
    if (!socket.connected) socket.connect();
  }, []);

  const disconnectSocket = useCallback(() => {
    socket.disconnect();
    setOnlineUsers([]);
  }, []);

  useEffect(() => {
    const handleOnlineUsers = (userIds) => setOnlineUsers(userIds);
    const handleConnectError = (error) => console.error("Socket connection failed:", error.message);

    // Register these before connecting. Presence is state owned at the root,
    // so route changes can never cause a presence broadcast to be missed.
    socket.on("online_users", handleOnlineUsers);
    socket.on("connect_error", handleConnectError);

    if (localStorage.getItem("userId")) connectSocket();

    return () => {
      socket.off("online_users", handleOnlineUsers);
      socket.off("connect_error", handleConnectError);
      socket.disconnect();
    };
  }, [connectSocket]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, connectSocket, disconnectSocket }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) throw new Error("useSocket must be used inside SocketProvider");
  return context;
}
