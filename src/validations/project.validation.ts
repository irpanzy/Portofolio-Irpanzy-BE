import { z } from "zod";

const techStackItemSchema = z.object({
  title: z.string().min(1, "Tech stack title is required"),
  icon: z.string().url("Tech stack icon must be a valid URL"),
});

export const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  demoLink: z
    .string()
    .url("Demo link must be a valid URL")
    .optional()
    .or(z.literal("")),
  githubLink: z
    .string()
    .url("GitHub link must be a valid URL")
    .optional()
    .or(z.literal("")),
  techStack: z
    .array(techStackItemSchema)
    .min(1, "At least one tech stack item is required"),
  order: z.number().int().nonnegative().optional(),
  isVisible: z.boolean().optional(),
});

export const updateProjectSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  demoLink: z
    .string()
    .url("Demo link must be a valid URL")
    .optional()
    .or(z.literal("")),
  githubLink: z
    .string()
    .url("GitHub link must be a valid URL")
    .optional()
    .or(z.literal("")),
  techStack: z
    .array(techStackItemSchema)
    .min(1, "At least one tech stack item is required")
    .optional(),
  order: z.number().int().nonnegative().optional(),
  isVisible: z.boolean().optional(),
});
