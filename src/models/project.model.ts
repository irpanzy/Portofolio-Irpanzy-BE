import mongoose, { Schema } from "mongoose";
import { IProject } from "../types";

const techStackItemSchema = new Schema(
  {
    title: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { _id: false }
);

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    bgImage: { type: String, required: true },
    bgImageFileId: { type: String, required: true },
    demoLink: { type: String, default: "" },
    githubLink: { type: String, default: "" },
    techStack: [techStackItemSchema],
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null },
    deletedBy: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

projectSchema.index({ order: 1 });
projectSchema.index({ deletedAt: 1 });

export const Project = mongoose.model<IProject>("Project", projectSchema);
