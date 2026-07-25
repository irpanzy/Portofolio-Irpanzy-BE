import { imagekit } from "../config";
import { ApiError } from "../utils";

export interface UploadResult {
  url: string;
  fileId: string;
  name: string;
  size: number;
}

export interface OptimizedUrlOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: "webp" | "avif" | "auto" | "jpg" | "png";
  crop?: "maintain_ratio" | "force" | "at_max" | "at_least";
  focus?: "auto" | "center" | "top" | "left" | "bottom" | "right";
}

export enum UploadFolder {
  PROJECTS = "/portfolio/projects",
  EXPERIENCES = "/portfolio/experiences",
  SERVICES = "/portfolio/services",
  TECHSTACKS = "/portfolio/techstacks",
  ABOUT = "/portfolio/about",
  GENERAL = "/portfolio",
}

export class ImageKitService {
  async upload(
    file: Buffer,
    fileName: string,
    folder: string = UploadFolder.GENERAL
  ): Promise<UploadResult> {
    try {
      const response = await imagekit.upload({
        file,
        fileName,
        folder,
        useUniqueFileName: true,
        tags: ["portfolio"],
      });

      return {
        url: response.url,
        fileId: response.fileId,
        name: response.name,
        size: response.size,
      };
    } catch (error: any) {
      console.error("ImageKit upload error:", error);
      throw new ApiError(500, `Failed to upload image: ${error.message}`);
    }
  }

  async uploadFromMulter(
    file: Express.Multer.File,
    folder: string = UploadFolder.GENERAL
  ): Promise<UploadResult> {
    return this.upload(file.buffer, file.originalname, folder);
  }

  async uploadMultiple(
    files: Buffer[] | Express.Multer.File[],
    folder: string = UploadFolder.GENERAL
  ): Promise<UploadResult[]> {
    const uploadPromises = files.map((file) => {
      if (Buffer.isBuffer(file)) {
        return this.upload(file, `file-${Date.now()}`, folder);
      } else {
        return this.uploadFromMulter(file, folder);
      }
    });

    try {
      return await Promise.all(uploadPromises);
    } catch (error: any) {
      throw new ApiError(
        500,
        `Failed to upload multiple images: ${error.message}`
      );
    }
  }

  async delete(fileId: string): Promise<void> {
    try {
      await imagekit.deleteFile(fileId);
    } catch (error: any) {
      console.error("ImageKit delete error:", error);
      throw new ApiError(500, `Failed to delete image: ${error.message}`);
    }
  }

  async deleteMultiple(fileIds: string[]): Promise<void> {
    const deletePromises = fileIds.map((fileId) => this.delete(fileId));

    try {
      await Promise.all(deletePromises);
    } catch (error: any) {
      throw new ApiError(
        500,
        `Failed to delete multiple images: ${error.message}`
      );
    }
  }

  getOptimizedUrl(path: string, options?: OptimizedUrlOptions): string {
    const transformation: any[] = [];

    if (options) {
      const transform: any = {};

      if (options.width) transform.width = options.width.toString();
      if (options.height) transform.height = options.height.toString();
      if (options.quality) transform.quality = options.quality.toString();
      if (options.format) transform.format = options.format;
      if (options.crop) transform.crop = options.crop;
      if (options.focus) transform.focus = options.focus;

      transformation.push(transform);
    }

    return imagekit.url({
      path,
      transformation: transformation.length > 0 ? transformation : undefined,
    });
  }

  getResponsiveUrls(path: string): {
    mobile: string;
    tablet: string;
    desktop: string;
    original: string;
  } {
    return {
      mobile: this.getOptimizedUrl(path, {
        width: 640,
        quality: 80,
        format: "webp",
      }),
      tablet: this.getOptimizedUrl(path, {
        width: 1024,
        quality: 85,
        format: "webp",
      }),
      desktop: this.getOptimizedUrl(path, {
        width: 1920,
        quality: 90,
        format: "webp",
      }),
      original: path,
    };
  }

  async getFileDetails(fileId: string) {
    try {
      return await imagekit.getFileDetails(fileId);
    } catch (error: any) {
      throw new ApiError(404, `File not found: ${error.message}`);
    }
  }

  async listFiles(folder: string = UploadFolder.GENERAL, limit: number = 100) {
    try {
      return await imagekit.listFiles({
        path: folder,
        limit,
      });
    } catch (error: any) {
      throw new ApiError(500, `Failed to list files: ${error.message}`);
    }
  }

  async purgeCache(url: string): Promise<void> {
    try {
      await imagekit.purgeCache(url);
    } catch (error: any) {
      console.error("ImageKit purge cache error:", error);
      throw new ApiError(500, `Failed to purge cache: ${error.message}`);
    }
  }

  async createFolder(
    folderName: string,
    parentFolderPath: string = "/"
  ): Promise<void> {
    try {
      await imagekit.createFolder({
        folderName,
        parentFolderPath,
      });
    } catch (error: any) {
      if (!error.message?.includes("already exists")) {
        console.error("ImageKit create folder error:", error);
        throw new ApiError(500, `Failed to create folder: ${error.message}`);
      }
    }
  }

  /**
   * Initialize all portfolio folders in ImageKit
   * This creates the entire folder structure if it doesn't exist
   * Safe to call multiple times - will skip existing folders
   */
  async initializePortfolioFolders(): Promise<void> {
    const folders = [
      { name: "portfolio", parent: "/" },
      { name: "projects", parent: "/portfolio" },
      { name: "experiences", parent: "/portfolio" },
      { name: "services", parent: "/portfolio" },
      { name: "techstacks", parent: "/portfolio" },
      { name: "about", parent: "/portfolio" },
    ];

    for (const folder of folders) {
      try {
        await this.createFolder(folder.name, folder.parent);
        console.log(
          `✓ Folder created/verified: ${folder.parent}/${folder.name}`
        );
      } catch (error: any) {
        console.error(
          `✗ Failed to create folder ${folder.parent}/${folder.name}:`,
          error.message
        );
      }
    }
  }
}

export const imagekitService = new ImageKitService();
