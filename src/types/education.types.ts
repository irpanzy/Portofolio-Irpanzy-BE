import { Document } from "mongoose";

export type EducationType = "formal" | "bootcamp" | "certification" | "course";

export interface IEducationAttachment {
  title: string;
  url: string;
  fileId?: string;
}

export interface IEducation extends Document {
  institution: string;
  degree: string;
  location: string;
  startDate: Date;
  endDate?: Date | null;
  current: boolean;
  description?: string;
  type: EducationType;
  logo?: string;
  logoFileId?: string;
  attachments: IEducationAttachment[];
  order: number;
  deletedAt: Date | null;
  deletedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEducationDTO {
  institution: string;
  degree: string;
  location: string;
  startDate: string | Date;
  endDate?: string | Date | null;
  current?: boolean;
  description?: string;
  type: EducationType;
  logo?: string;
  logoFileId?: string;
  attachments?: IEducationAttachment[];
  order?: number;
}

export interface UpdateEducationDTO {
  institution?: string;
  degree?: string;
  location?: string;
  startDate?: string | Date;
  endDate?: string | Date | null;
  current?: boolean;
  description?: string;
  type?: EducationType;
  logo?: string;
  logoFileId?: string;
  attachments?: IEducationAttachment[];
  order?: number;
}
