import mongoose, { Schema } from "mongoose";
import { IAbout } from "../types";

const infoItemSchema = new Schema(
  {
    icon: { type: String, required: true },
    iconDark: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const aboutSchema = new Schema<IAbout>(
  {
    bio: { type: String, required: true },
    profileImage: { type: String, required: true },
    profileImageFileId: { type: String, required: true },
    heroTitle: { type: String, required: true },
    heroSubtitle: { type: String, required: true },
    heroDescription: { type: String, required: true },
    resumeLink: { type: String, required: true },
    infoList: [infoItemSchema],
  },
  {
    timestamps: true,
  }
);

export const About = mongoose.model<IAbout>("About", aboutSchema);
