import prisma from "../config/database.js";
import { env } from "../config/env.js";
import { scheduleEmailJob } from "../queues/email.queue.js";
import { reserveSendSlot } from "./email-throttle.service.js";

interface CreateEmailsInput {
  campaignId: string;
  senderId: string;
  recipients: string[];
}

export async function createEmails(input: CreateEmailsInput) {
  const campaign = await prisma.campaign.findUnique({
    where: {
      id: input.campaignId,
    },
  });

  if (!campaign) {
    throw new Error("Campaign not found");
  }

  const scheduledTimes: Date[] = [];

  for (let index = 0; index < input.recipients.length; index++) {
    const requestedAt =
      campaign.startTime.getTime() +
      index * campaign.delayMs;

    const sendAt = await reserveSendSlot(
      input.senderId,
      requestedAt,
      env.minEmailDelayMs,
    );

    scheduledTimes.push(new Date(sendAt));
  }

  const emails = input.recipients.map((recipient, index) => ({
    campaignId: input.campaignId,
    senderId: input.senderId,
    recipient,
    subject: campaign.subject,
    body: campaign.body,
    scheduledAt: scheduledTimes[index],
  }));

  const createdEmails = await prisma.email.createManyAndReturn({
    data: emails,
  });

  for (const email of createdEmails) {
    const delay = Math.max(
      0,
      email.scheduledAt.getTime() - Date.now(),
    );

    await scheduleEmailJob({
      emailId: email.id,
      delay,
    });
  }

  return createdEmails;
}