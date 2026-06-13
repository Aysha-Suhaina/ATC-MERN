import express from "express";
import cors from "cors";

import attendanceRoutes from "./src/routes/attendance.routes.js";
import userRoutes from "./src/routes/user.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/attendance",
  attendanceRoutes
);

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({
    message:
      "Attendance Management API Running",
  });
});

export default app;