import { Document } from "mongoose";

export interface ITechStackItem {
  title: string;
  icon: string;
}

export interface IProject extends Document {
  title: string;
  description: string;
  bgImage: string;
  bgImageFileId?: string; // Make optional
  demoLink: string;
  githubLink: string;
  techStack: string[] | ITechStackItem[];
  order: number;
  isVisible: boolean;
  deletedAt: Date | null;
  deletedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectDTO {
  title: string;
  description: string;
  bgImage?: string;
  bgImageFileId?: string;
  demoLink?: string;
  githubLink?: string;
  techStack: string[] | ITechStackItem[]; // Support both formats
  order?: number;
  isVisible?: boolean;
}

export interface UpdateProjectDTO {
  title?: string;
  description?: string;
  bgImage?: string;
  bgImageFileId?: string;
  demoLink?: string;
  githubLink?: string;
  techStack?: string[] | ITechStackItem[]; // Support both formats
  order?: number;
  isVisible?: boolean;
}
