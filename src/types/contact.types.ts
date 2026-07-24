import { Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateContactDTO {
  name: string;
  email: string;
  message: string;
}
