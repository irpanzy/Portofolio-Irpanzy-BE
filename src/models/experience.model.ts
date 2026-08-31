import mongoose, { Schema } from "mongoose";
import { IExperience } from "../types";

const experienceSchema = new Schema<IExperience>(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    location: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, default: null },
    current: { type: Boolean, default: false },
    description: { type: String, required: true },
    logo: { type: String, default: null },
    logoFileId: { type: String, default: null },
    responsibilities: [{ type: String }],
    order: { type: Number, default: 0 },
    deletedAt: { type: Date, default: null },
    deletedBy: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

experienceSchema.index({ order: 1 });
experienceSchema.index({ deletedAt: 1 });

export const Experience = mongoose.model<IExperience>(
  "Experience",
  experienceSchema
);
