import { z } from "zod";

export const createAboutSchema = z.object({
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  summary: z.string().optional(),
});

export const updateAboutSchema = z.object({
  bio: z.string().min(10, "Bio must be at least 10 characters").optional(),
  summary: z.string().optional(),
});
