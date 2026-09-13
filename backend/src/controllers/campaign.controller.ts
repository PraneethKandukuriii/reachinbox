import { Request, Response } from "express";
import { createCampaign } from "../services/campaign.service.js";

export async function createCampaignController(
  req: Request,
  res: Response,
) {
  try {
    console.log("Campaign request body:", req.body);
    const campaign = await createCampaign(req.body);
    

    res.status(201).json(campaign);
  } catch (error) {
    console.error("Failed to create campaign:", error);

    res.status(500).json({
      message: "Failed to create campaign",
    });
  }
}