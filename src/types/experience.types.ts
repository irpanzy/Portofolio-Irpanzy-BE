import { Document } from "mongoose";

export interface IExperienceAttachment {
  title: string;
  url: string;
  fileId?: string;
}

export interface IExperience extends Document {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  logo: string;
  logoFileId?: string;
  responsibilities: string[];
  attachments: IExperienceAttachment[];
  order: number;
  deletedAt: Date | null;
  deletedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateExperienceDTO {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  logo?: string;
  responsibilities: string[];
  attachments?: IExperienceAttachment[];
  order?: number;
}

export interface UpdateExperienceDTO {
  company?: string;
  position?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  description?: string;
  logo?: string;
  responsibilities?: string[];
  attachments?: IExperienceAttachment[];
  order?: number;
}
