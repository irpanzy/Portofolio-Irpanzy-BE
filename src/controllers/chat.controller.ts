import { Request, Response } from "express";
import { chatService } from "../services";
import { asyncHandler, ApiResponse, ApiError } from "../utils";

export const chat = asyncHandler(async (req: Request, res: Response) => {
  const result = await chatService.chat(req.body);
  res.json(new ApiResponse(200, "Chat response generated", result));
});

export const getChatHistory = asyncHandler(
  async (req: Request, res: Response) => {
    const { sessionId } = req.params;
    if (!sessionId || Array.isArray(sessionId)) {
      throw new ApiError(400, "Invalid session ID");
    }
    const history = await chatService.getChatHistory(sessionId);
    res.json(new ApiResponse(200, "Chat history retrieved", history));
  }
);

export const deleteChatHistory = asyncHandler(
  async (req: Request, res: Response) => {
    const { sessionId } = req.params;
    if (!sessionId || Array.isArray(sessionId)) {
      throw new ApiError(400, "Invalid session ID");
    }
    await chatService.deleteChatHistory(sessionId);
    res.json(new ApiResponse(200, "Chat history deleted", null));
  }
);
