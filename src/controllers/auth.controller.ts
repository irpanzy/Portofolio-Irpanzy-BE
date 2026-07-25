import { Request, Response } from "express";
import { authService } from "../services";
import { asyncHandler, ApiResponse } from "../utils";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  res.json(new ApiResponse(200, "Login successful", result));
});

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization?.substring(7);
    if (!token) {
      return res
        .status(401)
        .json(new ApiResponse(401, "No token provided", null));
    }

    const result = await authService.refreshToken(token);
    res.json(new ApiResponse(200, "Token refreshed", result));
  }
);

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const admin = await authService.getAdminById(req.admin!.id);
  res.json(new ApiResponse(200, "Profile retrieved", admin));
});

export const updatePassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { oldPassword, newPassword } = req.body;
    const result = await authService.updatePassword(
      req.admin!.id,
      oldPassword,
      newPassword
    );
    res.json(new ApiResponse(200, "Password updated", result));
  }
);
