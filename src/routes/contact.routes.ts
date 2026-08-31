import { Router } from "express";
import { contactController } from "../controllers";
import {
  authenticate,
  contactLimiter,
  generalLimiter,
  validateBody,
} from "../middleware";
import { createContactSchema } from "../validations";

export const contactRouter = Router();

// Public route
contactRouter.post(
  "/",
  contactLimiter,
  validateBody(createContactSchema),
  contactController.createContact
);

// Admin routes
contactRouter.get(
  "/",
  authenticate,
  generalLimiter,
  contactController.getContacts
);
contactRouter.get("/:id", authenticate, contactController.getContact);
contactRouter.patch("/:id/read", authenticate, contactController.markAsRead);
contactRouter.delete("/:id", authenticate, contactController.deleteContact);
