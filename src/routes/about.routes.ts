import { Router } from "express";
import { aboutController } from "../controllers";
import { authenticate, generalLimiter, validateBody } from "../middleware";
import { createAboutSchema, updateAboutSchema } from "../validations";

export const aboutRouter = Router();

// Public route
aboutRouter.get("/", generalLimiter, aboutController.getAbout);

// Admin routes
aboutRouter.post(
  "/",
  authenticate,
  validateBody(createAboutSchema),
  aboutController.createAbout
);

aboutRouter.put(
  "/",
  authenticate,
  validateBody(updateAboutSchema),
  aboutController.updateAbout
);

aboutRouter.patch(
  "/",
  authenticate,
  validateBody(updateAboutSchema),
  aboutController.upsertAbout
); // Deprecated - for backward compatibility
