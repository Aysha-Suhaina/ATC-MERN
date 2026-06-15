import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";   
import connectDB from './src/config/db.js'

import authRouter from './src/routes/auth.routes.js'

import attendanceRoutes from "./src/routes/attendance.routes.js";
import userRoutes from "./src/routes/user.routes.js";

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


//sample route for the app
app.get("/", (req, res) => {
  res.json({
    message:
      "Attendance Management API Running",
  });
});

export default app;