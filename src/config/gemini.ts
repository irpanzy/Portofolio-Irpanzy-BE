import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "./env";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

export const getGeminiModel = (modelName: string = "gemini-2.0-flash-exp") => {
  return genAI.getGenerativeModel({ model: modelName });
};

export default genAI;
