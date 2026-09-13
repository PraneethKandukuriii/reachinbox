import { Router } from "express";

import {
  getScheduledEmailsController,
  getSentEmailsController,
} from "../controllers/email.controller.js";

const router = Router();

router.get("/scheduled", getScheduledEmailsController);
router.get("/sent", getSentEmailsController);

export default router;