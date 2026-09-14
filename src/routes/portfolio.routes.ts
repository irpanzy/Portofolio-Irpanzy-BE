import { Router } from "express";
import { portfolioController } from "../controllers";

export const portfolioRouter = Router();

portfolioRouter.get("/all", portfolioController.getPortfolioAll);
