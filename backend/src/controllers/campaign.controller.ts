import { Request, Response } from "express";
import { createCampaign } from "../services/campaign.service.js";
import { AppError } from "../errors/app-error.js";

export async function createCampaignController(
  req: Request,
  res: Response,
) {
  try {
    const {
      userId,
      subject,
      body,
      startTime,
      delayMs,
      hourlyLimit,
    } = req.body;

    if (
      typeof userId !== "string" ||
      !userId.trim() ||
      typeof subject !== "string" ||
      !subject.trim() ||
      typeof body !== "string" ||
      !body.trim()
    ) {
      return res.status(400).json({
        message: "userId, subject, and body are required.",
      });
    }

    const parsedStartTime = new Date(startTime);

    if (
      typeof startTime !== "string" ||
      Number.isNaN(parsedStartTime.getTime())
    ) {
      return res.status(400).json({
        message: "startTime must be a valid date.",
      });
    }

    if (
      typeof delayMs !== "number" ||
      !Number.isFinite(delayMs) ||
      delayMs < 0
    ) {
      return res.status(400).json({
        message: "delayMs must be a number greater than or equal to 0.",
      });
    }

    if (
      typeof hourlyLimit !== "number" ||
      !Number.isFinite(hourlyLimit) ||
      hourlyLimit < 1
    ) {
      return res.status(400).json({
        message: "hourlyLimit must be a number greater than or equal to 1.",
      });
    }

    const campaign = await createCampaign({
      userId: userId.trim(),
      subject: subject.trim(),
      body: body.trim(),
      startTime: parsedStartTime,
      delayMs,
      hourlyLimit,
    });

    return res.status(201).json(campaign);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }

    console.error("Failed to create campaign:", error);

    return res.status(500).json({
      message: "Failed to create campaign",
    });
  }
}