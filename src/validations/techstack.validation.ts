import { z } from "zod";

export const createTechStackSchema = z.object({
  title: z.string().min(1, "Title is required"),
  icon: z.string().url().optional(),
  iconFileId: z.string().optional(),
  iconLight: z.string().url().optional(),
  iconLightFileId: z.string().optional(),
  iconDark: z.string().url().optional(),
  iconDarkFileId: z.string().optional(),
  categories: z
    .array(
      z.enum([
        "languages",
        "frontend",
        "backend",
        "mobile",
        "database",
        "devops_cloud",
        "tools",
      ])
    )
    .min(1, "At least one category is required"),
  proficiencyLevel: z.number().int().min(1).max(5).optional(),
  order: z.number().int().nonnegative().optional(),
});

export const updateTechStackSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  icon: z.string().url().optional(),
  iconFileId: z.string().optional(),
  iconLight: z.string().url().optional(),
  iconLightFileId: z.string().optional(),
  iconDark: z.string().url().optional(),
  iconDarkFileId: z.string().optional(),
  categories: z
    .array(
      z.enum([
        "languages",
        "frontend",
        "backend",
        "mobile",
        "database",
        "devops_cloud",
        "tools",
      ])
    )
    .min(1, "At least one category is required")
    .optional(),
  proficiencyLevel: z.number().int().min(1).max(5).optional(),
  order: z.number().int().nonnegative().optional(),
});
