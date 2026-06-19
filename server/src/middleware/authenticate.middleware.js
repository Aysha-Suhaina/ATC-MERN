import jwt from "jsonwebtoken";
import User from "../model/User.js";
import dotenv from "dotenv";

dotenv.config();

export const authenticate = async (
  req,
  res,
  next
) => {
  try {
    const authHeader = req.headers.authorization || "";
    const cookieToken = req.cookies?.token;
    const token =
      cookieToken ||
      (authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Login required",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const userId = decoded?.id || decoded?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    const user = await User.findById(userId).select(
      "-password"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    const message =
      err.name === "TokenExpiredError"
        ? "Session expired. Please login again."
        : "Invalid token or unauthorized";

    return res.status(401).json({
      success: false,
      message,
    });
  }
};