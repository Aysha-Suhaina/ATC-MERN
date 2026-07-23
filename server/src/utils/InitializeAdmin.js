import bcrypt from 'bcryptjs';
import User from "../model/User.js";

const initializeAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({
  email: process.env.ADMIN_EMAIL
})

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    const admin = new User({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();

    console.log("Default admin created successfully");
  } catch (error) {
    console.error(
      "Admin initialization failed:",
      error.message
    );
  }
};

export default initializeAdmin;