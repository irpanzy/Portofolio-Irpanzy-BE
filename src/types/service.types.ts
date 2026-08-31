import { Document } from "mongoose";

export interface IService extends Document {
  title: string;
  description: string;
  icon: string;
  iconFileId: string;
  order: number;
  deletedAt: Date | null;
  deletedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateServiceDTO {
  title: string;
  description: string;
  order?: number;
}

export interface UpdateServiceDTO {
  title?: string;
  description?: string;
  order?: number;
}
