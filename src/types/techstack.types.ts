import { Document } from "mongoose";

export type TechCategory =
  | "languages"
  | "frontend"
  | "backend"
  | "mobile"
  | "database"
  | "devops_cloud"
  | "tools";

export interface ITechStack extends Document {
  title: string;
  icon?: string;
  iconFileId?: string;
  categories: TechCategory[];
  proficiencyLevel?: number | null;
  order: number;
  deletedAt: Date | null;
  deletedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTechStackDTO {
  title: string;
  categories: TechCategory[];
  order?: number;
  icon?: string;
  iconFileId?: string;
  proficiencyLevel?: number;
}

export interface UpdateTechStackDTO {
  title?: string;
  categories?: TechCategory[];
  order?: number;
  icon?: string;
  iconFileId?: string;
  proficiencyLevel?: number;
}
