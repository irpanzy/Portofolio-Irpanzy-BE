import { Document } from "mongoose";

export interface IAbout extends Document {
  bio: string;
  summary?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAboutDTO {
  bio: string;
  summary?: string;
}

export interface UpdateAboutDTO {
  bio?: string;
  summary?: string;
}
