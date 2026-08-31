import { Document } from "mongoose";

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
  order?: number;
}
