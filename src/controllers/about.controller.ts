import { Request, Response } from "express";
import { About } from "../models";
import { asyncHandler, ApiResponse, ApiError } from "../utils";

export const getAbout = asyncHandler(async (req: Request, res: Response) => {
  const about = await About.findOne();
  if (!about) throw new ApiError(404, "About data not found");
  res.json(new ApiResponse(200, "About retrieved", about));
});

export const updateAbout = asyncHandler(async (req: Request, res: Response) => {
  let about = await About.findOne();

  if (!about) {
    about = await About.create(req.body);
    return res.status(201).json(new ApiResponse(201, "About created", about));
  }

  about = await About.findByIdAndUpdate(about._id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json(new ApiResponse(200, "About updated", about));
});
