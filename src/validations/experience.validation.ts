import { z } from "zod";

export const createExperienceSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  location: z.string().min(1, "Location is required"),
  period: z.string().min(1, "Period is required"),
  responsibilities: z
    .array(z.string())
    .min(1, "At least one responsibility is required"),
  order: z.number().int().nonnegative().optional(),
});

export const updateExperienceSchema = z.object({
  company: z.string().min(1, "Company name is required").optional(),
  position: z.string().min(1, "Position is required").optional(),
  location: z.string().min(1, "Location is required").optional(),
  period: z.string().min(1, "Period is required").optional(),
  responsibilities: z
    .array(z.string())
    .min(1, "At least one responsibility is required")
    .optional(),
  order: z.number().int().nonnegative().optional(),
});
