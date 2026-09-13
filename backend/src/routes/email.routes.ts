import { Router } from "express";
import { createCampaignController } from "../controllers/campaign.controller.js";

const router = Router();

router.post("/:campaignId/emails", createCampaignController);

export default router;
