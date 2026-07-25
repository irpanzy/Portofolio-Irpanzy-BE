import { Router } from "express";
import { aboutController } from "../controllers";
import { authenticate, generalLimiter, validateBody } from "../middleware";
import { updateAboutSchema } from "../validations";

export const aboutRouter = Router();

// Public route
aboutRouter.get("/", generalLimiter, aboutController.getAbout);

// Admin route
aboutRouter.put(
  "/",
  authenticate,
  validateBody(updateAboutSchema),
  aboutController.updateAbout
);
