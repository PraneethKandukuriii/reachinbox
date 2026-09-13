import prisma from "../config/database.js";

interface CreateCampaignInput {
  userId: string;
  subject: string;
  body: string;
  startTime: Date;
  delayMs: number;
  hourlyLimit: number;
}

export async function createCampaign(input: CreateCampaignInput) {
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