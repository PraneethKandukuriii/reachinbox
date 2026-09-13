import { Worker } from "bullmq";

import prisma from "../config/database.js";
import redis from "../config/redis.js";
import { env } from "../config/env.js";
import { scheduleRateLimitedEmail } from "../queues/email.queue.js";
import { sendEmail } from "../services/email-sender.service.js";
import { checkEmailRateLimit } from "../services/email-rate-limit.service.js";

export const emailWorker = new Worker(
  "email-queue",
  async (job) => {
    const { emailId } = job.data;

    console.log(`Processing job for emailId: ${emailId}`);

    const email = await prisma.email.findUnique({
      where: {
        id: emailId,
      },
      include: {
        sender: true,
        campaign: true,
      },
    });

    if (!email) {
      throw new Error(`Email ID not found: ${emailId}`);
    }

    // Idempotency check.
    // If the email was already sent, do not send it again.
    if (email.status === "SENT") {
      console.log(`Email ${email.id} is already sent. Skipping.`);

      return {
        emailId: email.id,
        messageId: email.messageId,
      };
    }

    const rateLimit = await checkEmailRateLimit(
      email.senderId,
      email.campaignId,
      env.maxEmailsPerHourPerSender,
      email.campaign.hourlyLimit,
    );

    // Rate limit reached.
    // Create a new delayed job instead of moving the active job.
    if (!rateLimit.allowed) {
      const currentHour = Math.floor(
        Date.now() / (60 * 60 * 1000),
      );

      await scheduleRateLimitedEmail(
        email.id,
        rateLimit.retryAfterMs,
        currentHour + 1,
      );

      console.log(
        `Rate limit reached for sender ${email.senderId}. ` +
          `Email ${email.id} rescheduled in ${rateLimit.retryAfterMs}ms.`,
      );

      return {
        emailId: email.id,
        rateLimited: true,
        retryAfterMs: rateLimit.retryAfterMs,
      };
    }

    await prisma.email.update({
      where: {
        id: email.id,
      },
      data: {
        status: "PROCESSING",
        attempts: {
          increment: 1,
        },
      },
    });

    console.log(`Recipient: ${email.recipient}`);
    console.log(`Subject: ${email.subject}`);

    try {
      console.log("Starting SMTP send...");

      const info = await sendEmail({
        from: email.sender.email,
        to: email.recipient,
        subject: email.subject,
        body: email.body,
        smtpUser: email.sender.etherealUser,
        smtpPassword: email.sender.etherealPassword,
      });

      console.log("SMTP send finished");
      console.log(`Email sent: ${info.messageId}`);

      await prisma.email.update({
        where: {
          id: email.id,
        },
        data: {
          status: "SENT",
          sentAt: new Date(),
          messageId: info.messageId,
        },
      });

      return {
        emailId: email.id,
        messageId: info.messageId,
      };
    } catch (error) {
      console.error(
        `Failed to send email ${email.id}:`,
        error,
      );

      const maxAttempts = job.opts.attempts ?? 1;

      const isFinalAttempt =
        job.attemptsMade + 1 >= maxAttempts;

      if (isFinalAttempt) {
        await prisma.email.update({
          where: {
            id: email.id,
          },
          data: {
            status: "FAILED",
            error:
              error instanceof Error
                ? error.message
                : "Unknown error",
          },
        });
      }

      throw error;
    }
  },
  {
    connection: redis,
    concurrency: env.workerConcurrency,
  },
);

console.log(
  `Email worker running with concurrency ${env.workerConcurrency}`,
);

emailWorker.on("ready", () => {
  console.log("Email worker is ready");
});

emailWorker.on("active", (job) => {
  console.log(`Job became active: ${job.id}`);
});

emailWorker.on("completed", (job) => {
  console.log(`Job completed: ${job.id}`);
});

emailWorker.on("failed", (job, error) => {
  console.error(
    `Job failed: ${job?.id}`,
    error,
  );
});

emailWorker.on("error", (error) => {
  console.error("Worker error:", error);
});

emailWorker.on("closed", () => {
  console.log("Worker was closed");
});