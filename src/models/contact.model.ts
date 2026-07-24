import mongoose, { Schema } from "mongoose";
import { IContact } from "../types";

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

contactSchema.index({ createdAt: -1 });

export const Contact = mongoose.model<IContact>("Contact", contactSchema);
