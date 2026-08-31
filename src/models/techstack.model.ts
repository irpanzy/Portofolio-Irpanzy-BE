import mongoose, { Schema } from "mongoose";
import { ITechStack } from "../types";

const techStackSchema = new Schema<ITechStack>(
  {
    title: { type: String, required: true },
    icon: { type: String, required: false },
    iconFileId: { type: String, required: false },
    categories: {
      type: [String],
      enum: [
        "languages",
        "frontend",
        "backend",
        "mobile",
        "database",
        "devops_cloud",
        "tools",
      ],
      required: true,
      validate: {
        validator: function (value: string[]) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "At least one category is required",
      },
    },
    proficiencyLevel: {
      type: Number,
      min: 1,
      max: 5,
      required: false,
      default: null,
    },
    order: { type: Number, default: 0 },
    deletedAt: { type: Date, default: null },
    deletedBy: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

techStackSchema.index({ categories: 1, order: 1 });
techStackSchema.index({ deletedAt: 1 });

export const TechStack = mongoose.model<ITechStack>(
  "TechStack",
  techStackSchema
);
