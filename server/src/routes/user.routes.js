import express from "express";

import {
  getProfile,
  updateProfile,getAllEmployees,getEmployeeById,createEmployee,
  updateEmployee,deactivateEmployee,getAllAttendance,deleteAttendance,
  getManagers
} from "../controller/user.controller.js";

import { authenticate } from "../middleware/authenticate.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const router = express.Router();

// route path : /api/users

router.get(
  "/profile",
  authenticate,
  getProfile
);

router.put(
  "/profile",
  authenticate,
  updateProfile
);

router.get(
  "/employees",
  authenticate,
  authorize("admin"),
  getAllEmployees
);

router.get(
  "/employees/:id",
  authenticate,
  authorize("admin"),
  getEmployeeById
);

router.post(
  "/employees",
  authenticate,
  authorize("admin"),
  createEmployee
);

router.put(
  "/employees/:id",
  authenticate,
  authorize("admin"),
  updateEmployee
);
router.patch(
  "/employees/:id/deactivate",
  authenticate,
  authorize("admin"),
  deactivateEmployee
);

router.get(
  "/attendance",
  authenticate,
  authorize("admin"),
  getAllAttendance
);



export default router;
router.get(
  "/managers",
  authenticate,
  authorize("admin"),
  getManagers
);