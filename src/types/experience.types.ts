import { Document } from "mongoose";

export interface IExperience extends Document {
  company: string;
  position: string;
  location: string;
  period: string;
  logo: string;
  logoFileId: string;
  responsibilities: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateExperienceDTO {
  company: string;
  position: string;
  location: string;
  period: string;
  responsibilities: string[];
  order?: number;
}

export interface UpdateExperienceDTO {
  company?: string;
  position?: string;
  location?: string;
  period?: string;
  responsibilities?: string[];
  order?: number;
}
