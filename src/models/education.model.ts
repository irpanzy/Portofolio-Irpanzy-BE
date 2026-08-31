import mongoose, { Schema } from "mongoose";
import { IEducation, IEducationAttachment } from "../types";

const educationAttachmentSchema = new Schema<IEducationAttachment>(
  {
    title: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    fileId: { type: String, default: "" },
  },
  { _id: false }
);

const educationSchema = new Schema<IEducation>(
  {
    institution: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    current: { type: Boolean, default: false },
    description: { type: String, default: "" },
    type: {
      type: String,
      enum: ["formal", "bootcamp", "certification", "course"],
      default: "formal",
      required: true,
    },
    logo: { type: String, default: "" },
    logoFileId: { type: String, default: "" },
    attachments: {
      type: [educationAttachmentSchema],
      default: [],
    },
    order: { type: Number, default: 0 },
    deletedAt: { type: Date, default: null },
    deletedBy: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

educationSchema.index({ order: 1 });
educationSchema.index({ startDate: -1 });
educationSchema.index({ deletedAt: 1 });

export const Education = mongoose.model<IEducation>(
  "Education",
  educationSchema
);
