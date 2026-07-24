import { Document } from "mongoose";

export interface IInfoItem {
  icon: string;
  iconDark: string;
  title: string;
  description: string;
}

export interface IAbout extends Document {
  bio: string;
  profileImage: string;
  profileImageFileId: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  resumeLink: string;
  infoList: IInfoItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateAboutDTO {
  bio?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  resumeLink?: string;
  infoList?: IInfoItem[];
}
