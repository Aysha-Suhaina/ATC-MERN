import express from "express";

import { authenticate } from "../middleware/authenticate.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

import {getMessages,sendMessage,markAsRead} from "../controller/message.controller.js";
const router = express.Router();

router.get(
  "/:conversationId",
  authenticate,
  getMessages
);
router.post(
  "/",
  authenticate,
  sendMessage
);
router.patch(
  "/:conversationId/read",
  authenticate,
  markAsRead
);

export default router;
