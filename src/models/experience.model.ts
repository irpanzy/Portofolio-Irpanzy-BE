import mongoose, { Schema } from "mongoose";
import { IExperience } from "../types";

const experienceSchema = new Schema<IExperience>(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    location: { type: String, required: true },
    period: { type: String, required: true },
    logo: { type: String, required: true },
    logoFileId: { type: String, required: true },
    responsibilities: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

experienceSchema.index({ order: 1 });

export const Experience = mongoose.model<IExperience>(
  "Experience",
  experienceSchema
);
