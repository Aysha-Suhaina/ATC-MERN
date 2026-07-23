import express from "express";
import {
  authenticate,
} from "../middleware/authenticate.middleware.js";
import {
  authorize,
} from "../middleware/authorize.middleware.js";
import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  assignManager,getDepartmentEmployees,changeManager,
removeManager,getMyDepartment,
updateMyDepartment
} from "../controller/department.controller.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("admin"),
  createDepartment
);

router.get(
  "/",
  authenticate,
  getDepartments
);
router.get(
  "/my",
  authenticate,
  authorize("manager"),
  getMyDepartment
);

router.put(
  "/my",
  authenticate,
  authorize("manager"),
  updateMyDepartment
);

router.get(
  "/:id",
  getDepartmentById
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  updateDepartment
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  deleteDepartment
);

router.patch(
  "/:id/assign-manager",
  authenticate,
  authorize("admin"),
  assignManager
);


router.get(
  "/:id/employees",
  authenticate,
  getDepartmentEmployees
);

router.patch(
  "/:id/change-manager",
  authenticate,
  authorize("admin"),
  changeManager
);

router.patch(
  "/:id/remove-manager",
  authenticate,
  authorize("admin"),
  removeManager
);


export default router;
