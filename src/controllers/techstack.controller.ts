import { Request, Response } from "express";
import { TechStack } from "../models";
import { asyncHandler, ApiResponse, ApiError } from "../utils";

export const getTechStacks = asyncHandler(
  async (req: Request, res: Response) => {
    const { category } = req.query;
    const filter: any = { deletedAt: null };

    if (category) filter.category = category;

    const techStacks = await TechStack.find(filter).sort({
      category: 1,
      order: 1,
    });
    res.json(new ApiResponse(200, "Tech stacks retrieved", techStacks));
  }
);

export const getTechStack = asyncHandler(
  async (req: Request, res: Response) => {
    const techStack = await TechStack.findOne({
      _id: req.params.id,
      deletedAt: null,
    });
    if (!techStack) throw new ApiError(404, "Tech stack not found");
    res.json(new ApiResponse(200, "Tech stack retrieved", techStack));
  }
);

export const createTechStack = asyncHandler(
  async (req: Request, res: Response) => {
    const techStack = await TechStack.create(req.body);
    res.status(201).json(new ApiResponse(201, "Tech stack created", techStack));
  }
);

export const updateTechStack = asyncHandler(
  async (req: Request, res: Response) => {
    const techStack = await TechStack.findOneAndUpdate(
      { _id: req.params.id, deletedAt: null },
      req.body,
      { new: true, runValidators: true }
    );
    if (!techStack) throw new ApiError(404, "Tech stack not found");
    res.json(new ApiResponse(200, "Tech stack updated", techStack));
  }
);

export const deleteTechStack = asyncHandler(
  async (req: Request, res: Response) => {
    const techStack = await TechStack.findOneAndUpdate(
      { _id: req.params.id, deletedAt: null },
      { deletedAt: new Date(), deletedBy: req.admin!.id },
      { new: true }
    );
    if (!techStack) throw new ApiError(404, "Tech stack not found");
    res.json(new ApiResponse(200, "Tech stack moved to trash", techStack));
  }
);

export const getTrash = asyncHandler(async (req: Request, res: Response) => {
  const techStacks = await TechStack.find({ deletedAt: { $ne: null } }).sort({
    deletedAt: -1,
  });
  res.json(new ApiResponse(200, "Trash retrieved", techStacks));
});

export const restoreTechStack = asyncHandler(
  async (req: Request, res: Response) => {
    const techStack = await TechStack.findOneAndUpdate(
      { _id: req.params.id, deletedAt: { $ne: null } },
      { deletedAt: null, deletedBy: null },
      { new: true }
    );
    if (!techStack) throw new ApiError(404, "Tech stack not found in trash");
    res.json(new ApiResponse(200, "Tech stack restored", techStack));
  }
);

export const forceDeleteTechStack = asyncHandler(
  async (req: Request, res: Response) => {
    const techStack = await TechStack.findOneAndDelete({
      _id: req.params.id,
      deletedAt: { $ne: null },
    });
    if (!techStack) throw new ApiError(404, "Tech stack not found in trash");
    res.json(
      new ApiResponse(200, "Tech stack permanently deleted", {
        id: techStack._id,
      })
    );
  }
);

export const reorderTechStacks = asyncHandler(
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

    await TechStack.bulkWrite(bulkOps);

    const techStacks = await TechStack.find({ deletedAt: null }).sort({
      category: 1,
      order: 1,
    });

    res.json(
      new ApiResponse(200, "Tech stacks reordered successfully", techStacks)
    );
  }
);
