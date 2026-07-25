import { Request, Response } from "express";
import { imagekitService } from "../services";
import { asyncHandler, ApiResponse, ApiError } from "../utils";

export const uploadSingle = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.file) throw new ApiError(400, "No file uploaded");

    const folder = (req.body.folder as string) || "/portfolio";
    const result = await imagekitService.uploadFromMulter(req.file, folder);

    res
      .status(201)
      .json(new ApiResponse(201, "File uploaded successfully", result));
  }
);

export const uploadMultiple = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      throw new ApiError(400, "No files uploaded");
    }

    const folder = (req.body.folder as string) || "/portfolio";
    const results = await imagekitService.uploadMultiple(req.files, folder);

    res
      .status(201)
      .json(new ApiResponse(201, "Files uploaded successfully", results));
  }
);

export const deleteFile = asyncHandler(async (req: Request, res: Response) => {
  const { fileId } = req.params;
  if (typeof fileId !== "string") {
    throw new ApiError(400, "Invalid fileId");
  }
  await imagekitService.delete(fileId);
  res.json(new ApiResponse(200, "File deleted successfully", { fileId }));
});

export const getOptimizedUrl = asyncHandler(
  async (req: Request, res: Response) => {
    const { path } = req.body;
    const options = {
      width: req.body.width ? parseInt(req.body.width) : undefined,
      height: req.body.height ? parseInt(req.body.height) : undefined,
      quality: req.body.quality ? parseInt(req.body.quality) : undefined,
      format: req.body.format,
    };

    const url = imagekitService.getOptimizedUrl(path, options);
    res.json(new ApiResponse(200, "Optimized URL generated", { url }));
  }
);
