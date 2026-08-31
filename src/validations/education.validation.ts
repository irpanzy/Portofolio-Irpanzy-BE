import { z } from "zod";

const educationAttachmentSchema = z.object({
  title: z.string().min(1, "Attachment title is required"),
  url: z.string().url("Attachment URL must be a valid URL"),
  fileId: z.string().optional(),
});

export const createEducationSchema = z.object({
  institution: z.string({ required_error: "Institution is required" }).min(1),
  degree: z.string({ required_error: "Degree is required" }).min(1),
  location: z.string().min(1, "Location is required"),
  startDate: z.string({ required_error: "Start date is required" }),
  endDate: z.string().optional().nullable(),
  current: z.boolean().default(false),
  description: z.string().optional(),
  type: z
    .enum(["formal", "bootcamp", "certification", "course"])
    .default("formal"),
  logo: z.string().optional(),
  logoFileId: z.string().optional(),
  attachments: z.array(educationAttachmentSchema).optional().default([]),
  order: z.number().optional().default(0),
});

export const updateEducationSchema = z.object({
  institution: z.string().min(1).optional(),
  degree: z.string().min(1).optional(),
  location: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional().nullable(),
  current: z.boolean().optional(),
  description: z.string().optional(),
  type: z.enum(["formal", "bootcamp", "certification", "course"]).optional(),
  logo: z.string().optional(),
  logoFileId: z.string().optional(),
  attachments: z.array(educationAttachmentSchema).optional(),
  order: z.number().optional(),
});
