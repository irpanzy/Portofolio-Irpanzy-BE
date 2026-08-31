import { Request, Response } from "express";
import { Experience } from "../models";
import { asyncHandler, ApiResponse, ApiError } from "../utils";

export const getExperiences = asyncHandler(
  async (req: Request, res: Response) => {
    const experiences = await Experience.find({ deletedAt: null }).sort({
      order: 1,
    });
    res.json(new ApiResponse(200, "Experiences retrieved", experiences));
  }
);

export const getExperience = asyncHandler(
  async (req: Request, res: Response) => {
    const experience = await Experience.findOne({
      _id: req.params.id,
      deletedAt: null,
    });
    if (!experience) throw new ApiError(404, "Experience not found");
    res.json(new ApiResponse(200, "Experience retrieved", experience));
  }
);

export const createExperience = asyncHandler(
  async (req: Request, res: Response) => {
    const experience = await Experience.create(req.body);
    res
      .status(201)
      .json(new ApiResponse(201, "Experience created", experience));
  }
);

export const updateExperience = asyncHandler(
  async (req: Request, res: Response) => {
    const experience = await Experience.findOneAndUpdate(
      { _id: req.params.id, deletedAt: null },
      req.body,
      { new: true, runValidators: true }
    );
    if (!experience) throw new ApiError(404, "Experience not found");
    res.json(new ApiResponse(200, "Experience updated", experience));
  }
);

export const deleteExperience = asyncHandler(
  async (req: Request, res: Response) => {
    const experience = await Experience.findOneAndUpdate(
      { _id: req.params.id, deletedAt: null },
      { deletedAt: new Date(), deletedBy: req.admin!.id },
      { new: true }
    );
    if (!experience) throw new ApiError(404, "Experience not found");
    res.json(new ApiResponse(200, "Experience moved to trash", experience));
  }
);

export const getTrash = asyncHandler(async (req: Request, res: Response) => {
  const experiences = await Experience.find({ deletedAt: { $ne: null } }).sort({
    deletedAt: -1,
  });
  res.json(new ApiResponse(200, "Trash retrieved", experiences));
});

export const restoreExperience = asyncHandler(
  async (req: Request, res: Response) => {
    const experience = await Experience.findOneAndUpdate(
      { _id: req.params.id, deletedAt: { $ne: null } },
      { deletedAt: null, deletedBy: null },
      { new: true }
    );
    if (!experience) throw new ApiError(404, "Experience not found in trash");
    res.json(new ApiResponse(200, "Experience restored", experience));
  }
);

export const forceDeleteExperience = asyncHandler(
  async (req: Request, res: Response) => {
    const experience = await Experience.findOneAndDelete({
      _id: req.params.id,
      deletedAt: { $ne: null },
    });
    if (!experience) throw new ApiError(404, "Experience not found in trash");
    res.json(
      new ApiResponse(200, "Experience permanently deleted", {
        id: experience._id,
      })
    );
  }
);

export const reorderExperiences = asyncHandler(
  async (req: Request, res: Response) => {
    const { orders } = req.body;

    if (!Array.isArray(orders) || orders.length === 0) {
      throw new ApiError(400, "Orders array is required");
    }

    const bulkOps = orders.map((item: { id: string; order: number }) => ({
      updateOne: {
        filter: { _id: item.id, deletedAt: null },
        update: { $set: { order: item.order } },
      },
    }));

    await Experience.bulkWrite(bulkOps);

    const experiences = await Experience.find({ deletedAt: null }).sort({
      order: 1,
    });

    res.json(
      new ApiResponse(200, "Experiences reordered successfully", experiences)
    );
  }
);
