import mongoose from "mongoose";
import { env } from "./env";

export const connectDatabase = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    await mongoose.connect(env.DATABASE_URL);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    if (process.env.VERCEL !== "1") {
      process.exit(1);
    }
    throw error;
  }
};

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed");
  process.exit(0);
});
