import { Router } from "express";
import {
  getHero,
  createHero,
  updateHero,
  upsertHero,
} from "../controllers/hero.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";
import {
  createHeroSchema,
  updateHeroSchema,
} from "../validations/hero.validation";

const router = Router();

// Public route
router.get("/", getHero);

// Admin routes
router.post("/", authenticate, validate(createHeroSchema), createHero);
router.put("/", authenticate, validate(updateHeroSchema), updateHero);
router.patch("/", authenticate, validate(updateHeroSchema), upsertHero); // Deprecated - for backward compatibility

export default router;
