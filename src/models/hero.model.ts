import mongoose, { Schema } from "mongoose";
import { IHero } from "../types";

const heroSchema = new Schema<IHero>(
  {
    avatarImage: { type: String, required: true },
    avatarImageFileId: { type: String, default: "" },
    greeting: { type: String, default: "Hello! I'm Irfan Muria" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    resumeLink: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Hero = mongoose.model<IHero>("Hero", heroSchema);
