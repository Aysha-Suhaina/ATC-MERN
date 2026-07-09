import { io } from "socket.io-client";

const socket = io(
  "http://localhost:4000",
  {
    autoConnect: false,
    withCredentials: true,
  }
);

socket.on("connect", () => {
  console.log(
    " Connected:",
    socket.id
  );
});

socket.on("disconnect", () => {
  console.log(" Disconnected");
});

export default socket;