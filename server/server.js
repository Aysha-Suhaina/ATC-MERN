import dotenv from "dotenv";
import http from "http";

import {
  initializeSocket,
} from "./src/socket/socket.js";

import {
  registerSocketEvents,
} from "./src/socket/socketHandler.js";

dotenv.config();

import app from "./app.js";

import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 4000;

connectDB();

const server = http.createServer(app);

const io = initializeSocket(server);

registerSocketEvents(io);


server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});

