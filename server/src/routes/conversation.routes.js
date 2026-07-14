import express from "express";

import { authenticate } from "../middleware/authenticate.middleware.js";

import {
  getConversations,
  getMessages,openConversation,getMyConversations
} from "../controller/conversation.controller.js";

const router = express.Router();

router.get(
  "/",
  authenticate,
  getConversations
);

router.post(
  "/open",
  authenticate,
  openConversation
);

router.get(
  "/:id/messages",
  authenticate,
  getMessages
);

router.get(
  "/my",
  authenticate,
  getMyConversations
);


export default router;