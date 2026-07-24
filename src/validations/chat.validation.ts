import { z } from "zod";

export const chatRequestSchema = z.object({
  message: z
    .string()
    .min(1, "Message is required")
    .max(500, "Message is too long"),
  sessionId: z.string().uuid().optional(),
});
