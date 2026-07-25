import multer from "multer";
import { Request } from "express";
import { env } from "../config";
import { ApiError } from "../utils";

const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/svg+xml",
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        400,
        "Invalid file type. Only JPEG, PNG, WebP, and SVG are allowed."
      )
    );
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: env.MAX_FILE_SIZE, 
  },
  fileFilter,
});

export const uploadSingle = (fieldName: string) => upload.single(fieldName);
export const uploadMultiple = (fieldName: string, maxCount: number = 10) =>
  upload.array(fieldName, maxCount);
