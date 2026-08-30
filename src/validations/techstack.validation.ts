import { z } from "zod";

export const createTechStackSchema = z.object({
  title: z.string().min(1, "Title is required"),
  icon: z.string().url().optional(),
  iconFileId: z.string().optional(),
  category: z.enum([
    "languages",
    "frontend",
    "backend",
    "mobile",
    "database",
    "devops_cloud",
    "tools",
  ]),
  proficiencyLevel: z.number().int().min(1).max(5).optional(),
  order: z.number().int().nonnegative().optional(),
});

export const updateTechStackSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  icon: z.string().url().optional(),
  iconFileId: z.string().optional(),
  category: z
    .enum([
      "languages",
      "frontend",
      "backend",
      "mobile",
      "database",
      "devops_cloud",
      "tools",
    ])
    .optional(),
  proficiencyLevel: z.number().int().min(1).max(5).optional(),
  order: z.number().int().nonnegative().optional(),
});
