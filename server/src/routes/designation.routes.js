import express from "express";

import {
  createDesignation,
  getAllDesignations,
  getDesignationById,
  updateDesignation,
  deleteDesignation,
} from "../controller/designation.controller.js";

import { authenticate } from "../middleware/authenticate.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const router = express.Router();

// Create Designation (Admin only)
router.post(
  "/",
  //authenticate,
  //authorize("admin"),
  createDesignation
);

// Get All Designations
router.get(
  "/",
  //authenticate,
  getAllDesignations
);

// Get Designation By ID
router.get(
  "/:id",
  //authenticate,
  getDesignationById
);

// Update Designation (Admin only)
router.put(
  "/:id",
  //authenticate,
  //authorize("admin"),
  updateDesignation
);

// Delete Designation (Admin only)
router.delete(
  "/:id",
  //authenticate,
  //authorize("admin"),
  deleteDesignation
);

export default router;