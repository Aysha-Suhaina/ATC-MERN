import express from "express";
import {
  submitAttendance,
  getAllAttendance,
  getMyAttendance,
  getAttendanceById,
  getPendingAttendance,
  approveAttendance,
  rejectAttendance,
  resubmitAttendance,
  deleteAttendance,
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
  "/",
  authenticate,
  authorize(
    "admin",
    "manager"
  ),
  getAllAttendance
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

router.get(
  "/:attendanceId",
  authenticate,
  getAttendanceById
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
);

router.delete(
  "/:attendanceId",
  authenticate,
  authorize("admin"),
  deleteAttendance
);

export default router;