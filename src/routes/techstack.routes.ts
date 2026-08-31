import { Router } from "express";
import { techstackController } from "../controllers";
import { authenticate, generalLimiter, validateBody } from "../middleware";
import { createTechStackSchema, updateTechStackSchema } from "../validations";

export const techstackRouter = Router();

techstackRouter.get("/", generalLimiter, techstackController.getTechStacks);
techstackRouter.get("/:id", generalLimiter, techstackController.getTechStack);

techstackRouter.get("/trash/all", authenticate, techstackController.getTrash);

techstackRouter.patch(
  "/reorder",
  authenticate,
  techstackController.reorderTechStacks
);

techstackRouter.post(
  "/",
  authenticate,
  validateBody(createTechStackSchema),
  techstackController.createTechStack
);
techstackRouter.put(
  "/:id",
  authenticate,
  validateBody(updateTechStackSchema),
  techstackController.updateTechStack
);
techstackRouter.delete(
  "/:id",
  authenticate,
  techstackController.deleteTechStack
);
techstackRouter.post(
  "/:id/restore",
  authenticate,
  techstackController.restoreTechStack
);
techstackRouter.delete(
  "/:id/force",
  authenticate,
  techstackController.forceDeleteTechStack
);
