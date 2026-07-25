import { Router } from "express";
import { experienceController } from "../controllers";
import { authenticate, generalLimiter, validateBody } from "../middleware";
import { createExperienceSchema, updateExperienceSchema } from "../validations";

export const experienceRouter = Router();

// Public routes
experienceRouter.get("/", generalLimiter, experienceController.getExperiences);
experienceRouter.get(
  "/:id",
  generalLimiter,
  experienceController.getExperience
);

// Admin routes
experienceRouter.get("/trash/all", authenticate, experienceController.getTrash);
experienceRouter.post(
  "/",
  authenticate,
  validateBody(createExperienceSchema),
  experienceController.createExperience
);
experienceRouter.put(
  "/:id",
  authenticate,
  validateBody(updateExperienceSchema),
  experienceController.updateExperience
);
experienceRouter.delete(
  "/:id",
  authenticate,
  experienceController.deleteExperience
);
experienceRouter.post(
  "/:id/restore",
  authenticate,
  experienceController.restoreExperience
);
experienceRouter.delete(
  "/:id/force",
  authenticate,
  experienceController.forceDeleteExperience
);
