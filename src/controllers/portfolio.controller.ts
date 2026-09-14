import { Request, Response } from "express";
import {
  Hero,
  About,
  Project,
  Experience,
  Education,
  Service,
  TechStack,
} from "../models";
import { asyncHandler, ApiResponse } from "../utils";

export const getPortfolioAll = asyncHandler(
  async (_req: Request, res: Response) => {
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=600, stale-while-revalidate=86400"
    );

    const [
      hero,
      about,
      projects,
      experiences,
      educations,
      services,
      techstacks,
    ] = await Promise.all([
      Hero.findOne().lean(),
      About.findOne().lean(),
      Project.find({ deletedAt: null })
        .sort({ order: 1 })
        .select("-deletedBy")
        .lean(),
      Experience.find({ deletedAt: null }).sort({ order: 1 }).lean(),
      Education.find({ deletedAt: null })
        .sort({ order: 1, startDate: -1 })
        .lean(),
      Service.find({ deletedAt: null }).sort({ order: 1 }).lean(),
      TechStack.find({ deletedAt: null }).sort({ order: 1 }).lean(),
    ]);

    res.status(200).json(
      new ApiResponse(200, "All portfolio data retrieved successfully", {
        hero: hero || null,
        about: about || null,
        projects: projects || [],
        experiences: experiences || [],
        educations: educations || [],
        services: services || [],
        techstacks: techstacks || [],
      })
    );
  }
);
