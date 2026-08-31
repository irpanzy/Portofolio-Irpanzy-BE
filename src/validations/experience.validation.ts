import { z } from "zod";

export const createExperienceSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  location: z.string().min(1, "Location is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().or(z.literal("")),
  current: z.boolean().default(false),
  description: z.string().min(1, "Description is required"),
  logo: z.string().optional().or(z.literal("")),
  responsibilities: z
    .array(z.string())
    .min(1, "At least one responsibility is required"),
  order: z.number().int().nonnegative().optional(),
});

export const updateExperienceSchema = z.object({
  company: z.string().min(1, "Company name is required").optional(),
  position: z.string().min(1, "Position is required").optional(),
  location: z.string().min(1, "Location is required").optional(),
  startDate: z.string().min(1, "Start date is required").optional(),
  endDate: z.string().optional().or(z.literal("")),
  current: z.boolean().optional(),
  description: z.string().min(1, "Description is required").optional(),
  logo: z.string().optional().or(z.literal("")),
  responsibilities: z
    .array(z.string())
    .min(1, "At least one responsibility is required")
    .optional(),
  order: z.number().int().nonnegative().optional(),
});
