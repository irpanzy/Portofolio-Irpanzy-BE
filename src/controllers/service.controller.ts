import { Request, Response } from "express";
import { Service } from "../models";
import { asyncHandler, ApiResponse, ApiError } from "../utils";

export const getServices = asyncHandler(async (req: Request, res: Response) => {
  const services = await Service.find({ deletedAt: null }).sort({ order: 1 });
  res.json(new ApiResponse(200, "Services retrieved", services));
});

export const getService = asyncHandler(async (req: Request, res: Response) => {
  const service = await Service.findOne({
    _id: req.params.id,
    deletedAt: null,
  });
  if (!service) throw new ApiError(404, "Service not found");
  res.json(new ApiResponse(200, "Service retrieved", service));
});

export const createService = asyncHandler(
  async (req: Request, res: Response) => {
    const service = await Service.create(req.body);
    res.status(201).json(new ApiResponse(201, "Service created", service));
  }
);

export const updateService = asyncHandler(
  async (req: Request, res: Response) => {
    const service = await Service.findOneAndUpdate(
      { _id: req.params.id, deletedAt: null },
      req.body,
      { new: true, runValidators: true }
    );
    if (!service) throw new ApiError(404, "Service not found");
    res.json(new ApiResponse(200, "Service updated", service));
  }
);

export const deleteService = asyncHandler(
  async (req: Request, res: Response) => {
    const service = await Service.findOneAndUpdate(
      { _id: req.params.id, deletedAt: null },
      { deletedAt: new Date(), deletedBy: req.admin!.id },
      { new: true }
    );
    if (!service) throw new ApiError(404, "Service not found");
    res.json(new ApiResponse(200, "Service moved to trash", service));
  }
);

export const getTrash = asyncHandler(async (req: Request, res: Response) => {
  const services = await Service.find({ deletedAt: { $ne: null } }).sort({
    deletedAt: -1,
  });
  res.json(new ApiResponse(200, "Trash retrieved", services));
});

export const restoreService = asyncHandler(
  async (req: Request, res: Response) => {
    const service = await Service.findOneAndUpdate(
      { _id: req.params.id, deletedAt: { $ne: null } },
      { deletedAt: null, deletedBy: null },
      { new: true }
    );
    if (!service) throw new ApiError(404, "Service not found in trash");
    res.json(new ApiResponse(200, "Service restored", service));
  }
);

export const forceDeleteService = asyncHandler(
  async (req: Request, res: Response) => {
    const service = await Service.findOneAndDelete({
      _id: req.params.id,
      deletedAt: { $ne: null },
    });
    if (!service) throw new ApiError(404, "Service not found in trash");
    res.json(
      new ApiResponse(200, "Service permanently deleted", { id: service._id })
    );
  }
);
