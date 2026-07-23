import { Server } from "socket.io";
import jwt from "jsonwebtoken";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const cookies = Object.fromEntries(
      (socket.handshake.headers.cookie || "").split(";").filter(Boolean).map((part) => {
        const [key, ...value] = part.trim().split("=");
        return [key, decodeURIComponent(value.join("="))];
      }),
    );

    try {
      const payload = jwt.verify(cookies.token, process.env.JWT_SECRET);
      socket.data.userId = payload.id;
      next();
    } catch {
      next(new Error("Unauthorized socket connection"));
    }
  });

  return io;
};

export const getIO = () => io;
