import { Request, Response } from "express";
import { imagekitService, UploadFolder } from "../services";
import { asyncHandler, ApiResponse, ApiError } from "../utils";

const getFileType = (mimeType: string): "image" | "document" => {
  return mimeType.startsWith("image/") ? "image" : "document";
};

const generatePreviewUrl = (url: string, mimeType: string): string => {
  if (mimeType === "application/pdf") {
    return `${url}#view=FitH`;
  }
  return url;
};

export const uploadSingle = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.file) throw new ApiError(400, "No file uploaded");

    const folderCategory = req.body.folder as
      keyof typeof UploadFolder | undefined;
    const folder =
      folderCategory && UploadFolder[folderCategory]
        ? UploadFolder[folderCategory]
        : UploadFolder.GENERAL;

    const result = await imagekitService.uploadFromMulter(req.file, folder);

    const fileType = getFileType(req.file.mimetype);
    const previewUrl = generatePreviewUrl(result.url, req.file.mimetype);

    const enhancedResult = {
      ...result,
      folder,
      originalName: req.file.originalname,
      uploadedAt: new Date().toISOString(),
      fileType,
      mimeType: req.file.mimetype,
      previewUrl: fileType === "document" ? previewUrl : result.url,
      isViewableInBrowser:
        req.file.mimetype === "application/pdf" || fileType === "image",
      isPDF: req.file.mimetype === "application/pdf",
    };

    const message =
      fileType === "document"
        ? `Document uploaded successfully (${req.file.mimetype})`
        : "Image uploaded successfully";

    res.status(201).json(new ApiResponse(201, message, enhancedResult));
  }
);

export const uploadMultiple = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      throw new ApiError(400, "No files uploaded");
    }

    const folderCategory = req.body.folder as
      keyof typeof UploadFolder | undefined;
    const folder =
      folderCategory && UploadFolder[folderCategory]
        ? UploadFolder[folderCategory]
        : UploadFolder.GENERAL;

    const filesArray = req.files as Express.Multer.File[];
    const results = await imagekitService.uploadMultiple(filesArray, folder);

    const resultsWithMetadata = results.map((result, index) => {
      const file = filesArray[index];
      const fileType = getFileType(file.mimetype);
      const previewUrl = generatePreviewUrl(result.url, file.mimetype);

      return {
        ...result,
        originalName: file.originalname,
        uploadedAt: new Date().toISOString(),
        fileType,
        mimeType: file.mimetype,
        previewUrl: fileType === "document" ? previewUrl : result.url,
        isViewableInBrowser:
          file.mimetype === "application/pdf" || fileType === "image",
        isPDF: file.mimetype === "application/pdf",
      };
    });

    res.status(201).json(
      new ApiResponse(201, "Files uploaded successfully", {
        results: resultsWithMetadata,
        folder,
        totalFiles: results.length,
      })
    );
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

export const initializeFolders = asyncHandler(
  async (_req: Request, res: Response) => {
    await imagekitService.initializePortfolioFolders();
    res.json(
      new ApiResponse(
        200,
        "Portfolio folder structure initialized successfully",
        {
          folders: Object.values(UploadFolder),
        }
      )
    );
  }
);
