import { Document } from "mongoose";

export interface IHero extends Document {
  avatarImage: string;
  avatarImageFileId?: string;
  greeting: string;
  title: string;
  description: string;
  resumeLink: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateHeroDTO {
  avatarImage: string;
  avatarImageFileId?: string;
  greeting?: string;
  title: string;
  description: string;
  resumeLink: string;
}

export interface UpdateHeroDTO {
  avatarImage?: string;
  avatarImageFileId?: string;
  greeting?: string;
  title?: string;
  description?: string;
  resumeLink?: string;
}
