import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";   

import authRouter from './src/routes/auth.routes.js'

import attendanceRoutes from "./src/routes/attendance.routes.js";
import userRoutes from "./src/routes/user.routes.js";

import chatRoutes from "./src/routes/conversation.routes.js";
import conversationRoutes from "./src/routes/conversation.routes.js";

import departmentRoutes from "./src/routes/department.routes.js";
import designationRoutes from "./src/routes/designation.routes.js";

import messageRoutes from "./src/routes/message.routes.js";

import dashboardRoutes from "./src/routes/dashboard.routes.js";

import reportRoutes
from "./src/routes/report.routes.js";

const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));


app.use(express.json());

app.use(cookieParser());


//to console log the incoming requests
app.use((req, res, next) => {
    console.log(` ${req.method} request made to: " ${req.url} " `);
    next(); 
});

//routes

app.use('/api/auth',authRouter)

app.use(
  "/api/attendance",
  attendanceRoutes
);

app.use("/api/users", userRoutes);

app.use(
  "/api/departments",departmentRoutes
);

app.use(
  "/api/designations",
  designationRoutes
);

app.use("/api/chat", chatRoutes);
app.use(
  "/api/conversations",
  conversationRoutes
);

app.use(
  "/api/messages",
  messageRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/reports",
  reportRoutes
);

//sample route for the app
app.get("/", (req, res) => {
  res.json({
    message:
      "Attendance Management API Running",
  });
});

export default app;