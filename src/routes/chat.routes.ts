import { Router } from "express";
import { chatController } from "../controllers";
import { chatLimiter, validateBody } from "../middleware";
import { chatRequestSchema } from "../validations";

export const chatRouter = Router();

// Public routes (rate limited for chat)
chatRouter.post(
  "/",
  chatLimiter,
  validateBody(chatRequestSchema),
  chatController.chat
);
chatRouter.get(
  "/history/:sessionId",
  chatLimiter,
  chatController.getChatHistory
);
chatRouter.delete(
  "/history/:sessionId",
  chatLimiter,
  chatController.deleteChatHistory
);
