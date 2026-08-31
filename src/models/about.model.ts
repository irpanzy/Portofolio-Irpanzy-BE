import mongoose, { Schema } from "mongoose";
import { IAbout } from "../types";

const aboutSchema = new Schema<IAbout>(
  {
    bio: { type: String, required: true },
    summary: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export const About = mongoose.model<IAbout>("About", aboutSchema);
