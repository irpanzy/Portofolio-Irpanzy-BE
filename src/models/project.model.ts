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
    bgImageFileId: { type: String, required: false }, // Make optional
    demoLink: { type: String, default: "" },
    githubLink: { type: String, default: "" },
    // Support both string array and object array for techStack
    techStack: {
      type: Schema.Types.Mixed,
      required: true,
      validate: {
        validator: function (value: any) {
          if (!Array.isArray(value)) return false;
          if (value.length === 0) return false;

          // Check if all items are strings OR all items are objects
          const allStrings = value.every((item) => typeof item === "string");
          const allObjects = value.every(
            (item) =>
              typeof item === "object" &&
              item !== null &&
              "title" in item &&
              "icon" in item
          );

          return allStrings || allObjects;
        },
        message:
          "techStack must be an array of strings or objects with title and icon",
      },
    },
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
