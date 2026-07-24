import mongoose, { Schema } from "mongoose";
import { IService } from "../types";

const serviceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    iconFileId: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

serviceSchema.index({ order: 1 });

export const Service = mongoose.model<IService>("Service", serviceSchema);
