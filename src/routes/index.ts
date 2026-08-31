import { Router } from "express";
import { authRouter } from "./auth.routes";
import { projectRouter } from "./project.routes";
import { experienceRouter } from "./experience.routes";
import { serviceRouter } from "./service.routes";
import { techstackRouter } from "./techstack.routes";
import { aboutRouter } from "./about.routes";
import { contactRouter } from "./contact.routes";
import { chatRouter } from "./chat.routes";
import { uploadRouter } from "./upload.routes";
import { educationRouter } from "./education.routes";
import heroRouter from "./hero.routes";

export const router = Router();

router.use("/auth", authRouter);
router.use("/hero", heroRouter);
router.use("/projects", projectRouter);
router.use("/experiences", experienceRouter);
router.use("/educations", educationRouter);
router.use("/services", serviceRouter);
router.use("/techstacks", techstackRouter);
router.use("/about", aboutRouter);
router.use("/contact", contactRouter);
router.use("/chat", chatRouter);
router.use("/upload", uploadRouter);
