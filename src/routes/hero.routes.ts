import { Router } from "express";
import {
  getHero,
  createHero,
  updateHero,
  upsertHero,
} from "../controllers/hero.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validation.middleware";
import {
  createHeroSchema,
  updateHeroSchema,
} from "../validations/hero.validation";

const router = Router();

router.get("/", getHero);

router.post("/", authenticate, validateBody(createHeroSchema), createHero);
router.put("/", authenticate, validateBody(updateHeroSchema), updateHero);
router.patch("/", authenticate, validateBody(updateHeroSchema), upsertHero);

export default router;
