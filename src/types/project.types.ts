import { Document } from "mongoose";

export interface ITechStackItem {
  title: string;
  icon?: string; // Make icon optional
}

export interface IProject extends Document {
  title: string;
  description: string;
  bgImage: string;
  bgImageFileId?: string; // Make optional
  demoLink: string;
  githubLink: string;
  techStack: (string | ITechStackItem)[]; // Support mixed array
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
  techStack: (string | ITechStackItem)[]; // Support mixed array
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
  techStack?: (string | ITechStackItem)[]; // Support mixed array
  order?: number;
  isVisible?: boolean;
}
