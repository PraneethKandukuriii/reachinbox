import { Request, Response } from "express";

import {
  createEmails,
  getScheduledEmails,
  getSentEmails,
} from "../services/email.service.js";

import { AppError } from "../errors/app-error.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function createEmailsController(
  req: Request,
  res: Response,
) {
  try {
    const { campaignId } = req.params;
    const { senderId, recipients } = req.body;

    if (typeof campaignId !== "string" || !campaignId.trim()) {
      return res.status(400).json({
        message: "Invalid campaign ID.",
      });
    }

    if (typeof senderId !== "string" || !senderId.trim()) {
      return res.status(400).json({
        message: "senderId is required.",
      });
    }

    if (!Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({
        message: "At least one recipient is required.",
      });
    }

    if (
      recipients.some(
        (recipient) =>
          typeof recipient !== "string" ||
          !emailPattern.test(recipient.trim()),
      )
    ) {
      return res.status(400).json({
        message: "All recipients must be valid email addresses.",
      });
    }

    const result = await createEmails({
      campaignId: campaignId.trim(),
      senderId: senderId.trim(),
      recipients: recipients.map((recipient) => recipient.trim()),
    });

    return res.status(201).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }

    console.error("Failed to create emails:", error);

    return res.status(500).json({
      message: "Failed to create emails",
    });
  }
}

export async function getScheduledEmailsController(
  req: Request,
  res: Response,
) {
  try {
    const { userId } = req.query;

    if (typeof userId !== "string" || !userId.trim()) {
      return res.status(400).json({
        message: "userId is required.",
      });
    }

    const emails = await getScheduledEmails(userId.trim());

    return res.status(200).json(emails);
  } catch (error) {
    console.error("Failed to fetch scheduled emails:", error);

    return res.status(500).json({
      message: "Failed to fetch scheduled emails",
    });
  }
}

export async function getSentEmailsController(
  req: Request,
  res: Response,
) {
  try {
    const { userId } = req.query;

    if (typeof userId !== "string" || !userId.trim()) {
      return res.status(400).json({
        message: "userId is required.",
      });
    }

    const emails = await getSentEmails(userId.trim());

    return res.status(200).json(emails);
  } catch (error) {
    console.error("Failed to fetch sent emails:", error);

    return res.status(500).json({
      message: "Failed to fetch sent emails",
    });
  }
}