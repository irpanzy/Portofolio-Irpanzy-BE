import { Router } from "express";
import { serviceController } from "../controllers";
import { authenticate, generalLimiter, validateBody } from "../middleware";
import { createServiceSchema, updateServiceSchema } from "../validations";

export const serviceRouter = Router();

// Public routes
serviceRouter.get("/", generalLimiter, serviceController.getServices);
serviceRouter.get("/:id", generalLimiter, serviceController.getService);

// Admin routes
serviceRouter.get("/trash/all", authenticate, serviceController.getTrash);
serviceRouter.post(
  "/",
  authenticate,
  validateBody(createServiceSchema),
  serviceController.createService
);
serviceRouter.put(
  "/:id",
  authenticate,
  validateBody(updateServiceSchema),
  serviceController.updateService
);
serviceRouter.delete("/:id", authenticate, serviceController.deleteService);
serviceRouter.post(
  "/:id/restore",
  authenticate,
  serviceController.restoreService
);
serviceRouter.delete(
  "/:id/force",
  authenticate,
  serviceController.forceDeleteService
);
