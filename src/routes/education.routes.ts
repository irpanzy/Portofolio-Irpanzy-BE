import { Router } from "express";
import {
  getEducations,
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
  getTrash,
  restoreEducation,
  forceDeleteEducation,
} from "../controllers/education.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validation.middleware";
import {
  createEducationSchema,
  updateEducationSchema,
} from "../validations/education.validation";

export const educationRouter = Router();

educationRouter.get("/", getEducations);
educationRouter.get("/:id", getEducation);

educationRouter.post(
  "/",
  authenticate,
  validateBody(createEducationSchema),
  createEducation
);

educationRouter.put(
  "/:id",
  authenticate,
  validateBody(updateEducationSchema),
  updateEducation
);

educationRouter.delete("/:id", authenticate, deleteEducation);

educationRouter.get("/trash/all", authenticate, getTrash);
educationRouter.patch("/:id/restore", authenticate, restoreEducation);
educationRouter.delete("/:id/force", authenticate, forceDeleteEducation);
