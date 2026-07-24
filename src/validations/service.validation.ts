import { z } from "zod";

export const createServiceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  order: z.number().int().nonnegative().optional(),
});

export const updateServiceSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  order: z.number().int().nonnegative().optional(),
});
