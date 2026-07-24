import { z } from "zod";

const infoItemSchema = z.object({
  icon: z.string().url("Icon must be a valid URL"),
  iconDark: z.string().url("Dark icon must be a valid URL"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

export const updateAboutSchema = z.object({
  bio: z.string().min(1, "Bio is required").optional(),
  heroTitle: z.string().min(1, "Hero title is required").optional(),
  heroSubtitle: z.string().min(1, "Hero subtitle is required").optional(),
  heroDescription: z.string().min(1, "Hero description is required").optional(),
  resumeLink: z.string().url("Resume link must be a valid URL").optional(),
  infoList: z.array(infoItemSchema).optional(),
});
