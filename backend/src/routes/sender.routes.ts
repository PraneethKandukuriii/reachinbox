import { Router } from "express";
import { createSenderController } from "../controllers/sender.controller.js";

const router = Router();

router.post("/", createSenderController);

export default router;  