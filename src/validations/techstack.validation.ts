import { z } from "zod";

export const createTechStackSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.enum(["frontend", "backend", "database", "tools", "other"]),
  order: z.number().int().nonnegative().optional(),
});

export const updateTechStackSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  category: z
    .enum(["frontend", "backend", "database", "tools", "other"])
    .optional(),
  order: z.number().int().nonnegative().optional(),
});
