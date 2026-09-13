import { Request, Response } from "express";
import {
  createSender,
  getSenders,
} from "../services/sender.service.js";
import { AppError } from "../errors/app-error.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function createSenderController(
  req: Request,
  res: Response,
) {
  try {
    const {
      userId,
      email,
      name,
      etherealUser,
      etherealPassword,
    } = req.body;

    if (
      typeof userId !== "string" ||
      !userId.trim() ||
      typeof email !== "string" ||
      !emailPattern.test(email.trim()) ||
      typeof name !== "string" ||
      !name.trim() ||
      typeof etherealUser !== "string" ||
      !etherealUser.trim() ||
      typeof etherealPassword !== "string" ||
      !etherealPassword.trim()
    ) {
      return res.status(400).json({
        message: "Invalid sender details.",
      });
    }

    const sender = await createSender({
      userId: userId.trim(),
      email: email.trim(),
      name: name.trim(),
      etherealUser: etherealUser.trim(),
      etherealPassword: etherealPassword.trim(),
    });

    return res.status(201).json({
      id: sender.id,
      email: sender.email,
      name: sender.name,
      createdAt: sender.createdAt,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }

    console.error("Failed to create sender:", error);

    return res.status(500).json({
      message: "Failed to create sender",
    });
  }
}

export async function getSendersController(
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

    const senders = await getSenders(userId.trim());

    return res.status(200).json(senders);
  } catch (error) {
    console.error("Failed to fetch senders:", error);

    return res.status(500).json({
      message: "Failed to fetch senders",
    });
  }
}