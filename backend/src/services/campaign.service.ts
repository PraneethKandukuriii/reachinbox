import prisma from "../config/database.js";
import { AppError } from "../errors/app-error.js";

interface CreateCampaignInput {
  userId: string;
  subject: string;
  body: string;
  startTime: Date;
  delayMs: number;
  hourlyLimit: number;
}

export async function createCampaign(input: CreateCampaignInput) {
  const user = await prisma.user.findUnique({
    where: {
      id: input.userId,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return prisma.campaign.create({
    data: {
      userId: input.userId,
      subject: input.subject,
      body: input.body,
      startTime: input.startTime,
      delayMs: input.delayMs,
      hourlyLimit: input.hourlyLimit,
    },
  });
}