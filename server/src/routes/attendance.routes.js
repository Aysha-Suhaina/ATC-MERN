import express from "express";
import {
  submitAttendance,
  getMyAttendance,
  getPendingAttendance,
  approveAttendance,
  rejectAttendance,
  resubmitAttendance
} from "../controller/attendance.controller.js";
import { authenticate } from "../middleware/authenticate.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";
import {
  validateAttendanceSubmission,
} from "../validators/attendance.validator.js";

const router = express.Router();

//route path: /api/attendance


router.post(
  "/",
  authenticate,
  validateAttendanceSubmission,
  submitAttendance
);

router.get(
  "/me",
  authenticate,
  getMyAttendance
);

router.get(
  "/pending",
  authenticate,
  authorize(
    "admin",
    "manager"
  ),
  getPendingAttendance
);

router.patch(
  "/:attendanceId/approve",
  authenticate,
  authorize(
    "admin",
    "manager"
  ),
  approveAttendance
);

router.patch(
  "/:attendanceId/reject",
  authenticate,
  authorize(
    "admin",
    "manager"
  ),
  rejectAttendance
);

router.put(
  "/:id/resubmit",
  authenticate,
  authorize("employee"),
  validateAttendanceSubmission,
  resubmitAttendance
)

export default router;