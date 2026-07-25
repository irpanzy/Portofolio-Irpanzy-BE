import { Router } from "express";
import { uploadController } from "../controllers";
import { authenticate, uploadSingle, uploadMultiple } from "../middleware";

export const uploadRouter = Router();

// Admin routes (all upload operations require authentication)
uploadRouter.post(
  "/single",
  authenticate,
  uploadSingle("file"),
  uploadController.uploadSingle
);
uploadRouter.post(
  "/multiple",
  authenticate,
  uploadMultiple("files", 10),
  uploadController.uploadMultiple
);
uploadRouter.delete("/:fileId", authenticate, uploadController.deleteFile);
uploadRouter.get(
  "/optimize/:fileId",
  authenticate,
  uploadController.getOptimizedUrl
);
uploadRouter.post(
  "/initialize-folders",
  authenticate,
  uploadController.initializeFolders
);
