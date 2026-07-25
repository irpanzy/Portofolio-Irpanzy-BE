import mongoose, { Schema } from "mongoose";
import { ITechStack } from "../types";

const techStackSchema = new Schema<ITechStack>(
  {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    iconFileId: { type: String, required: true },
    category: {
      type: String,
      enum: ["frontend", "backend", "database", "tools", "other"],
      default: "other",
    },
    order: { type: Number, default: 0 },
    deletedAt: { type: Date, default: null },
    deletedBy: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

techStackSchema.index({ category: 1, order: 1 });
techStackSchema.index({ deletedAt: 1 });

export const TechStack = mongoose.model<ITechStack>(
  "TechStack",
  techStackSchema
);
