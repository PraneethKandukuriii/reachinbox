import { Router } from "express";
import { createCampaignController } from "../controllers/campaign.controller.js";
import { createEmailsController } from "../controllers/email.controller.js";


const router = Router();

router.post("/", createCampaignController);
router.post("/:campaignId/emails", createEmailsController);

export default router;