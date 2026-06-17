import express from "express";

import {
  getProfile,
  updateProfile,
} from "../controller/user.controller.js";

import { authenticate } from "../middleware/authenticate.middleware.js";

const router = express.Router();

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

export default router;