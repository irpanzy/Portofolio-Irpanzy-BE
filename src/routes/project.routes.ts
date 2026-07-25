import { Router } from "express";
import { projectController } from "../controllers";
import { authenticate, generalLimiter, validateBody } from "../middleware";
import { createProjectSchema, updateProjectSchema } from "../validations";

export const projectRouter = Router();

// Public routes
projectRouter.get("/", generalLimiter, projectController.getProjects);
projectRouter.get("/:id", generalLimiter, projectController.getProject);

// Admin routes
projectRouter.get("/trash/all", authenticate, projectController.getTrash);
projectRouter.post(
  "/",
  authenticate,
  validateBody(createProjectSchema),
  projectController.createProject
);
projectRouter.put(
  "/:id",
  authenticate,
  validateBody(updateProjectSchema),
  projectController.updateProject
);
projectRouter.delete("/:id", authenticate, projectController.deleteProject);
projectRouter.post(
  "/:id/restore",
  authenticate,
  projectController.restoreProject
);
projectRouter.delete(
  "/:id/force",
  authenticate,
  projectController.forceDeleteProject
);
