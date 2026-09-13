import { Router } from "express";
import {
  createSenderController,
  getSendersController,
} from "../controllers/sender.controller.js";

const router = Router();

router.post("/", createSenderController);
router.get("/", getSendersController);

export default router;