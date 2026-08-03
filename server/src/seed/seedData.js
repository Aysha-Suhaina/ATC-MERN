import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";

import connectDB from "../config/db.js";

import User from "../model/User.js";
import Department from "../model/Department.js";
import Designation from "../model/Designation.js";

const DEFAULT_PASSWORD = "Employee@123";

// -----------------------------
// Department definitions
// -----------------------------

const DEPARTMENTS = [
  {
    name: "Engineering",
    description:
      "Designs, builds, and maintains the company's software products and technical infrastructure.",
  },
  {
    name: "Human Resources",
    description:
      "Manages recruitment, employee relations, benefits, and organizational policies.",
  },
  {
    name: "Finance",
    description:
      "Oversees budgeting, accounting, financial planning, and regulatory compliance.",
  },
  {
    name: "Marketing",
    description:
      "Drives brand strategy, campaigns, and market research to grow customer reach.",
  },
  {
    name: "Sales",
    description:
      "Manages client relationships, revenue generation, and business development.",
  },
  {
    name: "Production",
    description:
      "Oversees manufacturing operations, quality control, and production scheduling.",
  },
  {
    name: "Research & Development",
    description:
      "Explores new technologies and innovations to support long-term product growth.",
  },
];

// -----------------------------
// Designation definitions (per department)
// -----------------------------

const DESIGNATIONS_BY_DEPARTMENT = {
  Engineering: [
    "Engineering Manager",
    "Senior Developer",
    "Software Engineer",
    "DevOps Engineer",
    "QA Engineer",
  ],
  "Human Resources": ["HR Manager", "HR Executive", "Recruiter"],
  Finance: ["Finance Manager", "Accountant", "Financial Analyst"],
  Marketing: ["Marketing Manager", "Marketing Executive", "Content Strategist"],
  Sales: ["Sales Manager", "Sales Executive", "Account Manager"],
  Production: [
    "Production Manager",
    "Production Supervisor",
    "Machine Operator",
  ],
  "Research & Development": [
    "R&D Manager",
    "Research Scientist",
    "Lab Technician",
  ],
};

// -----------------------------
// User definitions (per department)
// -----------------------------

const USERS_BY_DEPARTMENT = {
  Engineering: [
    { name: "Michael Chen", email: "michael.chen@hrms.com", role: "manager", designation: "Engineering Manager" },
    { name: "John Carter", email: "john.carter@hrms.com", role: "employee", designation: "Software Engineer" },
    { name: "Sarah Johnson", email: "sarah.johnson@hrms.com", role: "employee", designation: "Software Engineer" },
    { name: "Elena Petrova", email: "elena.petrova@hrms.com", role: "employee", designation: "Senior Developer" },
    { name: "Kenji Yamamoto", email: "kenji.yamamoto@hrms.com", role: "employee", designation: "DevOps Engineer" },
    { name: "Fatima Al-Sayed", email: "fatima.alsayed@hrms.com", role: "employee", designation: "QA Engineer" },
  ],
  "Human Resources": [
    { name: "Emma Williams", email: "emma.williams@hrms.com", role: "manager", designation: "HR Manager" },
    { name: "Sophia Martinez", email: "sophia.martinez@hrms.com", role: "employee", designation: "HR Executive" },
    { name: "Liam O'Connor", email: "liam.oconnor@hrms.com", role: "employee", designation: "HR Executive" },
    { name: "Aisha Khan", email: "aisha.khan@hrms.com", role: "employee", designation: "Recruiter" },
  ],
  Finance: [
    { name: "David Okafor", email: "david.okafor@hrms.com", role: "manager", designation: "Finance Manager" },
    { name: "Priya Sharma", email: "priya.sharma@hrms.com", role: "employee", designation: "Accountant" },
    { name: "Lucas Silva", email: "lucas.silva@hrms.com", role: "employee", designation: "Accountant" },
    { name: "Nina Kowalski", email: "nina.kowalski@hrms.com", role: "employee", designation: "Financial Analyst" },
  ],
  Marketing: [
    { name: "Isabella Rossi", email: "isabella.rossi@hrms.com", role: "manager", designation: "Marketing Manager" },
    { name: "Ahmed Hassan", email: "ahmed.hassan@hrms.com", role: "employee", designation: "Marketing Executive" },
    { name: "Chloe Dubois", email: "chloe.dubois@hrms.com", role: "employee", designation: "Marketing Executive" },
    { name: "Ravi Patel", email: "ravi.patel@hrms.com", role: "employee", designation: "Content Strategist" },
  ],
  Sales: [
    { name: "Daniel Kim", email: "daniel.kim@hrms.com", role: "manager", designation: "Sales Manager" },
    { name: "Grace Mensah", email: "grace.mensah@hrms.com", role: "employee", designation: "Sales Executive" },
    { name: "Thomas Novak", email: "thomas.novak@hrms.com", role: "employee", designation: "Sales Executive" },
    { name: "Mia Andersson", email: "mia.andersson@hrms.com", role: "employee", designation: "Account Manager" },
    { name: "Carlos Mendoza", email: "carlos.mendoza@hrms.com", role: "employee", designation: "Account Manager" },
  ],
  Production: [
    { name: "Robert Nguyen", email: "robert.nguyen@hrms.com", role: "manager", designation: "Production Manager" },
    { name: "Olga Ivanova", email: "olga.ivanova@hrms.com", role: "employee", designation: "Production Supervisor" },
    { name: "Hassan Ali", email: "hassan.ali@hrms.com", role: "employee", designation: "Production Supervisor" },
    { name: "Ingrid Larsen", email: "ingrid.larsen@hrms.com", role: "employee", designation: "Machine Operator" },
    { name: "Diego Fernandez", email: "diego.fernandez@hrms.com", role: "employee", designation: "Machine Operator" },
  ],
  "Research & Development": [
    { name: "Anna Kowalczyk", email: "anna.kowalczyk@hrms.com", role: "manager", designation: "R&D Manager" },
    { name: "Yusuf Demir", email: "yusuf.demir@hrms.com", role: "employee", designation: "Research Scientist" },
    { name: "Wei Zhang", email: "wei.zhang@hrms.com", role: "employee", designation: "Research Scientist" },
    { name: "Camila Torres", email: "camila.torres@hrms.com", role: "employee", designation: "Lab Technician" },
  ],
};

// -----------------------------
// Helper: upsert a department
// -----------------------------

const upsertDepartment = async ({ name, description }) => {
  let department = await Department.findOne({ name });

  if (!department) {
    department = await Department.create({ name, description });
    console.log(`  [+] Created department: ${name}`);
  } else {
    department.description = description;
    await department.save();
    console.log(`  [=] Updated department: ${name}`);
  }

  return department;
};

// -----------------------------
// Helper: upsert a designation
// -----------------------------

const upsertDesignation = async (name, department) => {
  let designation = await Designation.findOne({
    name,
    department: department._id,
  });

  if (!designation) {
    designation = await Designation.create({
      name,
      department: department._id,
    });
    console.log(`    [+] Created designation: ${name} (${department.name})`);
  }

  return designation;
};

// -----------------------------
// Helper: upsert a user
// -----------------------------

const upsertUser = async ({
  name,
  email,
  role,
  department,
  designation,
  passwordHash,
}) => {
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      password: passwordHash,
      role,
      department,
      designation,
    });
    console.log(`    [+] Created user: ${name} <${email}>`);
  } else {
    user.name = name;
    user.role = role;
    user.department = department;
    user.designation = designation;
    await user.save();
    console.log(`    [=] Updated user: ${name} <${email}>`);
  }

  return user;
};

// -----------------------------
// Main seed routine
// -----------------------------

const createSeedData = async () => {
  try {
    await connectDB();

    console.log("Starting seed...\n");

    const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 10);

    // 1. Departments
    console.log("Seeding departments...");
    const departmentMap = {};

    for (const dept of DEPARTMENTS) {
      departmentMap[dept.name] = await upsertDepartment(dept);
    }

    console.log("Departments ready\n");

    // 2. Designations
    console.log("Seeding designations...");
    const designationMap = {};

    for (const [departmentName, designationNames] of Object.entries(
      DESIGNATIONS_BY_DEPARTMENT,
    )) {
      const department = departmentMap[departmentName];
      designationMap[departmentName] = {};

      for (const designationName of designationNames) {
        designationMap[departmentName][designationName] =
          await upsertDesignation(designationName, department);
      }
    }

    console.log("Designations ready\n");

    // 3. Users
    console.log("Seeding users...");
    const userMap = {};
    const managerMap = {};

    for (const [departmentName, users] of Object.entries(
      USERS_BY_DEPARTMENT,
    )) {
      const department = departmentMap[departmentName];

      for (const userDef of users) {
        const designation =
          designationMap[departmentName][userDef.designation];

        const user = await upsertUser({
          name: userDef.name,
          email: userDef.email,
          role: userDef.role,
          department: department._id,
          designation: designation._id,
          passwordHash,
        });

        userMap[userDef.email] = user;

        if (userDef.role === "manager") {
          managerMap[departmentName] = user;
        }
      }
    }

    console.log("Users ready\n");

    // 4. Attach managers to departments
    console.log("Assigning department managers...");

    for (const [departmentName, manager] of Object.entries(managerMap)) {
      const department = departmentMap[departmentName];

      if (!department.manager || String(department.manager) !== String(manager._id)) {
        department.manager = manager._id;
        await department.save();
        console.log(`  [+] ${manager.name} set as manager of ${departmentName}`);
      }
    }

    console.log("Managers assigned\n");

    console.log("Seed completed successfully");

    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

createSeedData();
