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
  createDepartment
);

router.get(
  "/",
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
