import { io } from "socket.io-client";

// This is the only Socket.IO client instance in the application.  The
// SocketProvider owns its lifecycle and all application-wide event listeners.
const socket = io("http://localhost:4000", {
  autoConnect: false,
  withCredentials: true,
});

export default socket;
