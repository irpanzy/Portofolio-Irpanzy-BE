import mongoose, { Schema } from "mongoose";
import { IChatHistory } from "../types";

const chatMessageSchema = new Schema(
  {
    role: { type: String, enum: ["user", "assistant"], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const chatHistorySchema = new Schema<IChatHistory>(
  {
    sessionId: { type: String, required: true, unique: true, index: true },
    messages: [chatMessageSchema],
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

// TTL index: auto-delete after 24 hours
chatHistorySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const ChatHistory = mongoose.model<IChatHistory>(
  "ChatHistory",
  chatHistorySchema
);
