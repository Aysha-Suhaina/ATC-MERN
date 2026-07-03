import express from "express";

import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  assignManager,getDepartmentEmployees,changeManager,
removeManager,
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


router.get(
  "/:id/employees",
  getDepartmentEmployees
);

router.patch(
  "/:id/change-manager",
  changeManager
);

router.patch(
  "/:id/remove-manager",
  removeManager
);

export default router;
