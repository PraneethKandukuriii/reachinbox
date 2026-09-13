import { Job, Queue } from "bullmq";

import redis from "../config/redis.js";

export const emailQueue = new Queue("email-queue", {
  connection: redis,
});

interface ScheduleEmailOptions {
  emailId: string;
  delay?: number;
  jobId?: string;
}

export async function scheduleEmailJob({
  emailId,
  delay = 0,
  jobId = `email-${emailId}`,
}: ScheduleEmailOptions): Promise<Job> {
  return emailQueue.add(
    "send-email",
    {
      emailId,
    },
    {
      jobId,
      delay,
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 5000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    },
  );
}

export async function scheduleRateLimitedEmail(
  emailId: string,
  delay: number,
  hour: number,
): Promise<Job> {
  return scheduleEmailJob({
    emailId,
    delay,
    jobId: `email-${emailId}-rate-limit-${hour}`,
  });
}