import { Request, Response } from "express";
import { Hero } from "../models/hero.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import {
  createHeroSchema,
  updateHeroSchema,
} from "../validations/hero.validation";

export const getHero = asyncHandler(async (req: Request, res: Response) => {
  const hero = await Hero.findOne();

  if (!hero) {
    throw new ApiError(404, "Hero data not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Hero data retrieved successfully", hero));
});

export const createHero = asyncHandler(async (req: Request, res: Response) => {
  const existingHero = await Hero.findOne();

  if (existingHero) {
    throw new ApiError(400, "Hero data already exists. Use PUT to update.");
  }

  const validatedData = createHeroSchema.parse(req.body);
  const hero = await Hero.create(validatedData);

  res
    .status(201)
    .json(new ApiResponse(201, "Hero data created successfully", hero));
});

export const updateHero = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = updateHeroSchema.parse(req.body);

  const hero = await Hero.findOne();

  if (!hero) {
    throw new ApiError(404, "Hero data not found. Use POST to create.");
  }

  Object.assign(hero, validatedData);
  await hero.save();

  res
    .status(200)
    .json(new ApiResponse(200, "Hero data updated successfully", hero));
});

export const upsertHero = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = updateHeroSchema.parse(req.body);

  let hero = await Hero.findOne();

  if (hero) {
    Object.assign(hero, validatedData);
    await hero.save();
  } else {
    const createData = createHeroSchema.parse(req.body);
    hero = await Hero.create(createData);
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Hero data saved successfully", hero));
});
