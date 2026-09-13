import "dotenv/config";

const databaseUrl = process.env.DATABASE_URL;

const workerConcurrency = Number(
  process.env.WORKER_CONCURRENCY ?? 5,
);

const minEmailDelayMs = Number(
  process.env.MIN_EMAIL_DELAY_MS ?? 2000,
);

const maxEmailsPerHourPerSender = Number(
  process.env.MAX_EMAILS_PER_HOUR_PER_SENDER ?? 200,
);

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is not defined in the environment variables.",
  );
}

if (!Number.isInteger(workerConcurrency) || workerConcurrency < 1) {
  throw new Error(
    "WORKER_CONCURRENCY must be a positive integer.",
  );
}

if (!Number.isInteger(minEmailDelayMs) || minEmailDelayMs < 0) {
  throw new Error(
    "MIN_EMAIL_DELAY_MS must be a non-negative integer.",
  );
}

if (
  !Number.isInteger(maxEmailsPerHourPerSender) ||
  maxEmailsPerHourPerSender < 1
) {
  throw new Error(
    "MAX_EMAILS_PER_HOUR_PER_SENDER must be a positive integer.",
  );
}

export const env = {
  databaseUrl,
  workerConcurrency,
  minEmailDelayMs,
  maxEmailsPerHourPerSender,
};