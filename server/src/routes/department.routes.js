import express from "express";

import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  assignManager,
} from "../controller/department.controller.js";

const router = express.Router();

router.post(
  "/",
  createDepartment
);

router.get(
  "/",
  getDepartments
);

router.get(
  "/:id",
  getDepartmentById
);

router.put(
  "/:id",
  updateDepartment
);

router.delete(
  "/:id",
  deleteDepartment
);

router.patch(
  "/:id/assign-manager",
  assignManager
);

export default router;