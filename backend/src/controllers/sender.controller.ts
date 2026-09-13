import { Request, Response } from "express";
import { createSender } from "../services/sender.service.js";

export async function createSenderController(
  req: Request,
  res: Response,
) {
  try {
    const sender = await createSender(req.body);

    res.status(201).json(sender);
  } catch (error) {
    console.error("Failed to create sender:", error);

    res.status(500).json({
      message: "Failed to create sender",
    });
  }
}