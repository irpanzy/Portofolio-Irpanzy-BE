import { Document } from "mongoose";

export interface IChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface IChatHistory extends Document {
  sessionId: string;
  messages: IChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}

export interface IChatRequest {
  message: string;
  sessionId?: string;
}

export interface IChatResponse {
  reply: string;
  sessionId: string;
  suggestedQuestions?: string[];
}
