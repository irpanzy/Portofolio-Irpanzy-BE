import { Request, Response } from "express";
import { Project } from "../models";
import { asyncHandler, ApiResponse, ApiError } from "../utils";

export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  const projects = await Project.find({ deletedAt: null })
    .sort({ order: 1 })
    .select("-deletedBy");

  res.json(new ApiResponse(200, "Projects retrieved successfully", projects));
});

export const getProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.findOne({
    _id: req.params.id,
    deletedAt: null,
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  res.json(new ApiResponse(200, "Project retrieved successfully", project));
});

export const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await Project.create(req.body);
    res
      .status(201)
      .json(new ApiResponse(201, "Project created successfully", project));
  }
);

export const updateProject = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, deletedAt: null },
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    res.json(new ApiResponse(200, "Project updated successfully", project));
  }
);

export const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, deletedAt: null },
      {
        deletedAt: new Date(),
        deletedBy: req.admin!.id,
      },
      { new: true }
    );

    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    res.json(new ApiResponse(200, "Project moved to trash", project));
  }
);

export const getTrash = asyncHandler(async (req: Request, res: Response) => {
  const projects = await Project.find({ deletedAt: { $ne: null } }).sort({
    deletedAt: -1,
  });

  res.json(new ApiResponse(200, "Trash retrieved successfully", projects));
});

export const restoreProject = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, deletedAt: { $ne: null } },
      {
        deletedAt: null,
        deletedBy: null,
      },
      { new: true }
    );

    if (!project) {
      throw new ApiError(404, "Project not found in trash");
    }

    res.json(new ApiResponse(200, "Project restored successfully", project));
  }
);

export const forceDeleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      deletedAt: { $ne: null },
    });

    if (!project) {
      throw new ApiError(404, "Project not found in trash");
    }

    res.json(
      new ApiResponse(200, "Project permanently deleted", { id: project._id })
    );
  }
);

export const reorderProjects = asyncHandler(
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

    await Project.bulkWrite(bulkOps);

    const projects = await Project.find({ deletedAt: null }).sort({ order: 1 });

    res.json(new ApiResponse(200, "Projects reordered successfully", projects));
  }
);
