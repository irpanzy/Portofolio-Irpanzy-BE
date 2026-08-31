import { Request, Response } from "express";
import { About } from "../models";
import { asyncHandler, ApiResponse, ApiError } from "../utils";
import {
  createAboutSchema,
  updateAboutSchema,
} from "../validations/about.validation";

export const getAbout = asyncHandler(async (req: Request, res: Response) => {
  const about = await About.findOne();

  if (!about) {
    throw new ApiError(404, "About data not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "About data retrieved successfully", about));
});

export const createAbout = asyncHandler(async (req: Request, res: Response) => {
  const existingAbout = await About.findOne();

  if (existingAbout) {
    throw new ApiError(400, "About data already exists. Use PUT to update.");
  }

  const validatedData = createAboutSchema.parse(req.body);
  const about = await About.create(validatedData);

  res
    .status(201)
    .json(new ApiResponse(201, "About data created successfully", about));
});

export const updateAbout = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = updateAboutSchema.parse(req.body);

  const about = await About.findOne();

  if (!about) {
    throw new ApiError(404, "About data not found. Use POST to create.");
  }

  Object.assign(about, validatedData);
  await about.save();

  res
    .status(200)
    .json(new ApiResponse(200, "About data updated successfully", about));
});

export const upsertAbout = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = updateAboutSchema.parse(req.body);

  let about = await About.findOne();

  if (about) {
    Object.assign(about, validatedData);
    await about.save();
  } else {
    const createData = createAboutSchema.parse(req.body);
    about = await About.create(createData);
  }

  res
    .status(200)
    .json(new ApiResponse(200, "About data saved successfully", about));
});
