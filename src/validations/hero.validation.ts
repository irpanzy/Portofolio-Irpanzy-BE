import { z } from "zod";

export const createHeroSchema = z.object({
  avatarImage: z.string().min(1, "Avatar image is required"),
  avatarImageFileId: z.string().optional(),
  greeting: z.string().optional().default("Hello! I'm Irfan Muria"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  resumeLink: z.string().url("Resume link must be a valid URL"),
});

export const updateHeroSchema = z.object({
  avatarImage: z.string().min(1, "Avatar image is required").optional(),
  avatarImageFileId: z.string().optional(),
  greeting: z.string().optional(),
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  resumeLink: z.string().url("Resume link must be a valid URL").optional(),
});
