import { Request, Response } from "express";
import { Education } from "../models/education.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import {
  createEducationSchema,
  updateEducationSchema,
} from "../validations/education.validation";

// @desc    Get all educations
// @route   GET /api/educations
// @access  Public
export const getEducations = asyncHandler(
  async (req: Request, res: Response) => {
    const educations = await Education.find({ deletedAt: null }).sort({
      order: 1,
      startDate: -1,
    });

    res
      .status(200)
      .json(
        new ApiResponse(200, "Educations retrieved successfully", educations)
      );
  }
);

// @desc    Get single education by ID
// @route   GET /api/educations/:id
// @access  Public
export const getEducation = asyncHandler(
  async (req: Request, res: Response) => {
    const education = await Education.findOne({
      _id: req.params.id,
      deletedAt: null,
    });

    if (!education) {
      throw new ApiError(404, "Education not found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, "Education retrieved successfully", education)
      );
  }
);

// @desc    Create new education
// @route   POST /api/educations
// @access  Private (Admin)
export const createEducation = asyncHandler(
  async (req: Request, res: Response) => {
    const validatedData = createEducationSchema.parse(req.body);

    // Convert date strings to Date objects
    const educationData = {
      ...validatedData,
      startDate: new Date(validatedData.startDate),
      endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
    };

    const education = await Education.create(educationData);

    res
      .status(201)
      .json(new ApiResponse(201, "Education created successfully", education));
  }
);

// @desc    Update education
// @route   PUT /api/educations/:id
// @access  Private (Admin)
export const updateEducation = asyncHandler(
  async (req: Request, res: Response) => {
    const validatedData = updateEducationSchema.parse(req.body);

    const education = await Education.findOne({
      _id: req.params.id,
      deletedAt: null,
    });

    if (!education) {
      throw new ApiError(404, "Education not found");
    }

    // Convert date strings to Date objects if provided
    const updateData: any = { ...validatedData };
    if (validatedData.startDate) {
      updateData.startDate = new Date(validatedData.startDate);
    }
    if (validatedData.endDate) {
      updateData.endDate = new Date(validatedData.endDate);
    }

    Object.assign(education, updateData);
    await education.save();

    res
      .status(200)
      .json(new ApiResponse(200, "Education updated successfully", education));
  }
);

// @desc    Delete education (soft delete)
// @route   DELETE /api/educations/:id
// @access  Private (Admin)
export const deleteEducation = asyncHandler(
  async (req: Request, res: Response) => {
    const education = await Education.findOneAndUpdate(
      { _id: req.params.id, deletedAt: null },
      { deletedAt: new Date(), deletedBy: req.admin!.id },
      { new: true }
    );

    if (!education) {
      throw new ApiError(404, "Education not found");
    }

    res.status(200).json(
      new ApiResponse(200, "Education deleted successfully", {
        id: education._id,
      })
    );
  }
);

// @desc    Get trash (deleted educations)
// @route   GET /api/educations/trash
// @access  Private (Admin)
export const getTrash = asyncHandler(async (req: Request, res: Response) => {
  const educations = await Education.find({ deletedAt: { $ne: null } }).sort({
    deletedAt: -1,
  });

  res
    .status(200)
    .json(new ApiResponse(200, "Trash retrieved successfully", educations));
});

// @desc    Restore education from trash
// @route   PATCH /api/educations/:id/restore
// @access  Private (Admin)
export const restoreEducation = asyncHandler(
  async (req: Request, res: Response) => {
    const education = await Education.findOneAndUpdate(
      { _id: req.params.id, deletedAt: { $ne: null } },
      { deletedAt: null, deletedBy: null },
      { new: true }
    );

    if (!education) {
      throw new ApiError(404, "Education not found in trash");
    }

    res
      .status(200)
      .json(new ApiResponse(200, "Education restored successfully", education));
  }
);

// @desc    Force delete education (permanent)
// @route   DELETE /api/educations/:id/force
// @access  Private (Admin)
export const forceDeleteEducation = asyncHandler(
  async (req: Request, res: Response) => {
    const education = await Education.findOneAndDelete({
      _id: req.params.id,
      deletedAt: { $ne: null },
    });

    if (!education) {
      throw new ApiError(404, "Education not found in trash");
    }

    res.status(200).json(
      new ApiResponse(200, "Education permanently deleted", {
        id: education._id,
      })
    );
  }
);
