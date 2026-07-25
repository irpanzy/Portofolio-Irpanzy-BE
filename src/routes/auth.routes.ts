import { Router } from "express";
import { authController } from "../controllers";
import { authenticate, authLimiter, validateBody } from "../middleware";
import { loginSchema } from "../validations";

export const authRouter = Router();

authRouter.post(
  "/login",
  authLimiter,
  validateBody(loginSchema),
  authController.login
);
authRouter.post("/refresh", authenticate, authController.refreshToken);
authRouter.get("/profile", authenticate, authController.getProfile);
authRouter.put("/password", authenticate, authController.updatePassword);
