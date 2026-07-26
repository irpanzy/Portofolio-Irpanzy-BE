import { Request, Response } from "express";
import { About } from "../models";
import { asyncHandler, ApiResponse, ApiError } from "../utils";

export const getAbout = asyncHandler(async (req: Request, res: Response) => {
  const about = await About.findOne();

  if (!about) {
    return res.json(new ApiResponse(200, "No about data yet", null));
  }

  res.json(new ApiResponse(200, "About retrieved", about));
});

export const updateAbout = asyncHandler(async (req: Request, res: Response) => {
  let about = await About.findOne();

  if (!about) {
    // First time create
    about = await About.create(req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, "About data created successfully", about));
  }

  // Update existing
  about = await About.findByIdAndUpdate(about._id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json(new ApiResponse(200, "About data updated successfully", about));
});
