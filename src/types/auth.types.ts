import { Document } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  admin: {
    email: string;
  };
}

export interface JWTPayload {
  id: string;
  email: string;
}
