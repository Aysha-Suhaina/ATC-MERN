import express from "express";

import { authenticate } from "../middleware/authenticate.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

import {getMessages,sendMessage} from "../controller/message.controller.js";
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

export default router;
