import jwt from "jsonwebtoken";
import User from "../model/User.js";

export const authenticate = async (
  req,
  res,
  next
) => {
  try {
    // const authHeader =
    //   req.headers.authorization;

    // if (
    //   !authHeader ||
    //   !authHeader.startsWith("Bearer ")
    // ) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Access token required",
    //   });
    // } 
    // *** *** 
    // disabled for testing purposes

    const token = jwt.sign(
      {
        userId: "mongodb_user_id"
      },
      process.env.JWT_SECRET
    );

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(
      decoded.userId
    ).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "User account disabled",
      });
    }

    req.user = {
      id: user._id,
      role: user.role,
      email: user.email,
      name: user.name,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};