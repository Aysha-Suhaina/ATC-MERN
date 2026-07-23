import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import connectDB from "../config/db.js";

import User from "../model/User.js";
import Department from "../model/Department.js";
import Designation from "../model/Designation.js";
import Attendance from "../model/Attendance.js";


const createSeedData = async () => {
  try {
    await connectDB();

    console.log("Starting seed...");


    // -----------------------------
    // 1. Create Departments
    // -----------------------------

    let engineering =
      await Department.findOne({
        name: "Engineering",
      });

    if (!engineering) {
      engineering =
        await Department.create({
          name: "Engineering",
          description:
            "Software development and technology department.",
        });
    }


    let hr =
      await Department.findOne({
        name: "Human Resources",
      });

    if (!hr) {
      hr =
        await Department.create({
          name: "Human Resources",
          description:
            "Employee management and recruitment.",
        });
    }


    let finance =
      await Department.findOne({
        name: "Finance",
      });

    if (!finance) {
      finance =
        await Department.create({
          name: "Finance",
          description:
            "Finance and accounting department.",
        });
    }


    console.log("Departments ready");


    // -----------------------------
    // 2. Create Designations
    // -----------------------------

    const createDesignation = async (
      name,
      department
    ) => {
      let designation =
        await Designation.findOne({
          name,
          department: department._id,
        });

      if (!designation) {
        designation =
          await Designation.create({
            name,
            department:
              department._id,
          });
      }

      return designation;
    };


    const softwareEngineer =
      await createDesignation(
        "Software Engineer",
        engineering
      );


    const seniorDeveloper =
      await createDesignation(
        "Senior Developer",
        engineering
      );


    const hrExecutive =
      await createDesignation(
        "HR Executive",
        hr
      );


    const hrManagerDesignation =
      await createDesignation(
        "HR Manager",
        hr
      );


    const accountant =
      await createDesignation(
        "Accountant",
        finance
      );


    console.log(
      "Designations ready"
    );


    // -----------------------------
    // 3. Password helper
    // -----------------------------

    const password =
      await bcrypt.hash(
        "Employee@123",
        10
      );


    // -----------------------------
    // 4. Create users
    // -----------------------------

    const createUser = async ({
      name,
      email,
      role,
      department,
      designation,
    }) => {

      let user =
        await User.findOne({
          email,
        });


      if (!user) {
        user =
          await User.create({
            name,
            email,
            password,
            role,
            department,
            designation,
          });
      }


      return user;
    };


    const engineeringManager =
      await createUser({
        name:
          "Engineering Manager",
        email:
          "manager.engineering@hrms.com",
        role:
          "manager",
        department:
          engineering._id,
        designation:
          seniorDeveloper._id,
      });


    const developerOne =
      await createUser({
        name:
          "John Developer",
        email:
          "john@hrms.com",
        role:
          "employee",
        department:
          engineering._id,
        designation:
          softwareEngineer._id,
      });


    const developerTwo =
      await createUser({
        name:
          "Sarah Developer",
        email:
          "sarah@hrms.com",
        role:
          "employee",
        department:
          engineering._id,
        designation:
          softwareEngineer._id,
      });


    const hrManager =
      await createUser({
        name:
          "HR Manager",
        email:
          "manager.hr@hrms.com",
        role:
          "manager",
        department:
          hr._id,
        designation:
          hrManagerDesignation._id,
      });


    const hrEmployee =
      await createUser({
        name:
          "HR Executive",
        email:
          "hr.employee@hrms.com",
        role:
          "employee",
        department:
          hr._id,
        designation:
          hrExecutive._id,
      });


    console.log(
      "Users ready"
    );


    // -----------------------------
    // 5. Attach managers
    // -----------------------------

    if (
      !engineering.manager
    ) {
      engineering.manager =
        engineeringManager._id;

      await engineering.save();
    }


    if (
      !hr.manager
    ) {
      hr.manager =
        hrManager._id;

      await hr.save();
    }


    console.log(
      "Managers assigned"
    );


    // -----------------------------
    // 6. Attendance
    // -----------------------------

    const createAttendance =
      async ({
        user,
        manager,
        approvalStatus,
        daysAgo,
      }) => {

        const date =
          new Date();

        date.setDate(
          date.getDate() - daysAgo
        );

        date.setHours(
          0,
          0,
          0,
          0
        );


        const exists =
          await Attendance.findOne({
            user,
            date,
          });


        if (exists) {
          return;
        }


        const checkIn =
          new Date(date);

        checkIn.setHours(
          9,
          0,
          0,
          0
        );


        const checkOut =
          new Date(date);

        checkOut.setHours(
          17,
          0,
          0,
          0
        );


        await Attendance.create({
          user,
          date,
          checkInTime:
            checkIn,
          checkOutTime:
            checkOut,
          totalHours:
            8,
          attendanceStatus:
            "present",
          approvalStatus,
          approvedBy:
            approvalStatus === "approved"
              ? manager
              : undefined,
          approvedAt:
            approvalStatus === "approved"
              ? new Date()
              : undefined,
          rejectedAt:
            approvalStatus === "rejected"
              ? new Date()
              : undefined,
        });
      };


    await createAttendance({
      user:
        developerOne._id,
      manager:
        engineeringManager._id,
      approvalStatus:
        "pending",
      daysAgo:
        0,
    });


    await createAttendance({
      user:
        developerTwo._id,
      manager:
        engineeringManager._id,
      approvalStatus:
        "approved",
      daysAgo:
        1,
    });


    await createAttendance({
      user:
        hrEmployee._id,
      manager:
        hrManager._id,
      approvalStatus:
        "rejected",
      daysAgo:
        2,
    });


    console.log(
      "Attendance ready"
    );


    console.log(
      "Seed completed successfully"
    );


    process.exit(0);


  } catch (error) {

    console.error(
      "Seed failed:",
      error.message
    );

    process.exit(1);
  }
};


createSeedData();