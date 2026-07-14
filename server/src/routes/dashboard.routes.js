import express from "express";

import { authenticate } from "../middleware/authenticate.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

import {
  getAdminDashboard,getDailyReport
} from "../controller/dashboard.controller.js";

const router = express.Router();

router.get(
  "/admin",
  authenticate,
  authorize("admin"),
  getAdminDashboard
);

router.get(
  "/report/daily",
  authenticate,
  authorize("admin"),
  getDailyReport
);

export default router;