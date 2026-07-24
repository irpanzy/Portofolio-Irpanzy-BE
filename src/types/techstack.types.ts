import { Document } from "mongoose";

export interface ITechStack extends Document {
  title: string;
  icon: string;
  iconFileId: string;
  category: "frontend" | "backend" | "database" | "tools" | "other";
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTechStackDTO {
  title: string;
  category: "frontend" | "backend" | "database" | "tools" | "other";
  order?: number;
}

export interface UpdateTechStackDTO {
  title?: string;
  category?: "frontend" | "backend" | "database" | "tools" | "other";
  order?: number;
}
