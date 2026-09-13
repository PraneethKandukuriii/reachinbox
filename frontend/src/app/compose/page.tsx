"use client";

import { useEffect, useState } from "react";
import RecipientUpload from "./recipient-upload";

interface FormErrors {
  recipients?: string;
  subject?: string;
  body?: string;
  startTime?: string;
  delayMs?: string;
  hourlyLimit?: string;
}

interface Sender {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

const API_URL = "http://localhost:3000";
const TEST_USER_ID = "test-user-1";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ComposePage() {
  const [recipients, setRecipients] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [startTime, setStartTime] = useState("");
  const [delayMs, setDelayMs] = useState("2000");
  const [hourlyLimit, setHourlyLimit] = useState("50");

  const [senders, setSenders] = useState<Sender[]>([]);
  const [senderId, setSenderId] = useState("");
  const [isLoadingSenders, setIsLoadingSenders] = useState(true);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  useEffect(() => {
    async function loadSenders() {
      try {
        const response = await fetch(
          `${API_URL}/api/senders?userId=${TEST_USER_ID}`,
        );

        if (!response.ok) {
          throw new Error("Failed to load senders");
        }

        const data: Sender[] = await response.json();

        setSenders(data);

        if (data.length > 0) {
          setSenderId(data[0].id);
        }
      } catch (error) {
        console.error("Failed to load senders:", error);
      } finally {
        setIsLoadingSenders(false);
      }
    }

    loadSenders();
  }, []);

  function validateForm(): boolean {
    const newErrors: FormErrors = {};

    const recipientList = recipients
      .split("\n")
      .map((recipient) => recipient.trim())
      .filter(Boolean);

    if (recipientList.length === 0) {
      newErrors.recipients = "At least one recipient is required.";
    } else {
      const invalidRecipient = recipientList.find(
        (recipient) => !emailPattern.test(recipient),
      );

      if (invalidRecipient) {
        newErrors.recipients = `Invalid email address: ${invalidRecipient}`;
      }
    }

    if (!subject.trim()) {
      newErrors.subject = "Subject is required.";
    }

    if (!body.trim()) {
      newErrors.body = "Email body is required.";
    }

    if (!startTime) {
      newErrors.startTime = "Start time is required.";
    }

    const delay = Number(delayMs);

    if (!delayMs || !Number.isFinite(delay) || delay < 0) {
      newErrors.delayMs = "Delay must be 0 or greater.";
    }

    const limit = Number(hourlyLimit);

    if (!hourlyLimit || !Number.isFinite(limit) || limit < 1) {
      newErrors.hourlyLimit = "Hourly limit must be at least 1.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess("");

    try {
      const recipientList = recipients
        .split("\n")
        .map((recipient) => recipient.trim())
        .filter(Boolean);

      const campaignResponse = await fetch(
        `${API_URL}/api/campaigns`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: TEST_USER_ID,
            subject: subject.trim(),
            body: body.trim(),
            startTime: new Date(startTime).toISOString(),
            delayMs: Number(delayMs),
            hourlyLimit: Number(hourlyLimit),
          }),
        },
      );

      const campaignData = await campaignResponse.json();

      if (!campaignResponse.ok) {
        throw new Error(
          campaignData.message || "Failed to create campaign",
        );
      }

      const emailResponse = await fetch(
        `${API_URL}/api/campaigns/${campaignData.id}/emails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId,
            recipients: recipientList,
          }),
        },
      );

      const emailData = await emailResponse.json();

      if (!emailResponse.ok) {
        throw new Error(
          emailData.message || "Failed to schedule emails",
        );
      }

      setSubmitSuccess(
        `${emailData.length} email${
          emailData.length === 1 ? "" : "s"
        } scheduled successfully.`,
      );
    } catch (error) {
      console.error("Failed to schedule campaign:", error);

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to schedule campaign.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const recipientCount = recipients
    .split("\n")
    .map((recipient) => recipient.trim())
    .filter(Boolean).length;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030407] text-white">
      <div className="pointer-events-none absolute left-1/2 top-[-260px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/[0.08] blur-[140px]" />

      <div className="pointer-events-none absolute right-[-180px] top-[45%] h-[400px] w-[400px] rounded-full bg-blue-500/[0.04] blur-[130px]" />

      <header className="relative z-10 border-b border-white/[0.06]">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">
          <a
            href="/"
            className="text-[17px] font-semibold tracking-[-0.03em]"
          >
            Reach<span className="text-violet-400">Inbox</span>
          </a>

          <div className="flex items-center gap-3">
            <a
              href="/dashboard"
              className="text-sm text-white/35 transition hover:text-white/70"
            >
              Dashboard
            </a>

            <div className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-xs font-medium text-white/70">
              P
            </div>
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-12 lg:px-8 lg:pt-16">
        <div className="mb-10">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-violet-300/70">
            New campaign
          </p>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                Compose campaign
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-6 text-white/40">
                Create your message, choose when it starts, and control how
                quickly your emails are sent.
              </p>
            </div>

            <a
              href="/dashboard"
              className="hidden text-sm text-white/30 transition hover:text-white/70 sm:block"
            >
              ← Back to campaigns
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.015]">
          <div className="border-b border-white/[0.06] px-6 py-5 sm:px-8">
            <p className="text-sm font-medium text-white/80">
              Campaign details
            </p>

            <p className="mt-1 text-xs text-white/25">
              Everything your recipients will receive.
            </p>
          </div>

          <div className="space-y-8 px-6 py-7 sm:px-8 sm:py-8">
            <Field
              label="Sender"
              description="Select the account this campaign will send from."
              error=""
            >
              <select
                id="sender"
                value={senderId}
                onChange={(event) => setSenderId(event.target.value)}
                disabled={isLoadingSenders || senders.length === 0}
                className="dark-input"
              >
                {isLoadingSenders ? (
                  <option>Loading senders...</option>
                ) : senders.length === 0 ? (
                  <option>No senders available</option>
                ) : (
                  senders.map((sender) => (
                    <option key={sender.id} value={sender.id}>
                      {sender.name} · {sender.email}
                    </option>
                  ))
                )}
              </select>
            </Field>

            <Field
              label="Recipients"
              description="Import a CSV or add one email address per line."
              error={errors.recipients}
              trailing={`${recipientCount} ${
                recipientCount === 1 ? "recipient" : "recipients"
              }`}
            >
              <div className="space-y-4">
                <RecipientUpload
                  onRecipientsLoaded={(emails) => {
                    setRecipients(emails.join("\n"));

                    setErrors((current) => ({
                      ...current,
                      recipients: undefined,
                    }));
                  }}
                />

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/[0.06]" />

                  <span className="text-[10px] uppercase tracking-[0.14em] text-white/20">
                    or paste manually
                  </span>

                  <div className="h-px flex-1 bg-white/[0.06]" />
                </div>

                <textarea
                  id="recipients"
                  value={recipients}
                  onChange={(event) => {
                    setRecipients(event.target.value);

                    setErrors((current) => ({
                      ...current,
                      recipients: undefined,
                    }));
                  }}
                  placeholder={"alex@example.com\nsam@example.com"}
                  className={`dark-textarea min-h-32 ${
                    errors.recipients ? "border-red-400/30" : ""
                  }`}
                />
              </div>
            </Field>

            <Field
              label="Subject"
              description="Keep it short and clear."
              error={errors.subject}
            >
              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(event) => {
                  setSubject(event.target.value);

                  setErrors((current) => ({
                    ...current,
                    subject: undefined,
                  }));
                }}
                placeholder="Introducing ReachInbox"
                className={`dark-input ${
                  errors.subject ? "border-red-400/30" : ""
                }`}
              />
            </Field>

            <Field
              label="Message"
              description="Write the email your recipients will receive."
              error={errors.body}
            >
              <textarea
                id="body"
                value={body}
                onChange={(event) => {
                  setBody(event.target.value);

                  setErrors((current) => ({
                    ...current,
                    body: undefined,
                  }));
                }}
                placeholder="Write your email..."
                className={`dark-textarea min-h-52 ${
                  errors.body ? "border-red-400/30" : ""
                }`}
              />
            </Field>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.015]">
          <div className="border-b border-white/[0.06] px-6 py-5 sm:px-8">
            <p className="text-sm font-medium text-white/80">
              Delivery settings
            </p>

            <p className="mt-1 text-xs text-white/25">
              Control when and how your campaign is delivered.
            </p>
          </div>

          <div className="grid gap-0 md:grid-cols-3">
            <SettingField
              label="Start time"
              description="When sending begins."
              error={errors.startTime}
            >
              <input
                id="startTime"
                type="datetime-local"
                value={startTime}
                onChange={(event) => {
                  setStartTime(event.target.value);

                  setErrors((current) => ({
                    ...current,
                    startTime: undefined,
                  }));
                }}
                className={`dark-input ${
                  errors.startTime ? "border-red-400/30" : ""
                }`}
              />
            </SettingField>

            <SettingField
              label="Delay between emails"
              description="Milliseconds between individual sends."
              error={errors.delayMs}
            >
              <input
                id="delay"
                type="number"
                min="0"
                value={delayMs}
                onChange={(event) => {
                  setDelayMs(event.target.value);

                  setErrors((current) => ({
                    ...current,
                    delayMs: undefined,
                  }));
                }}
                className={`dark-input ${
                  errors.delayMs ? "border-red-400/30" : ""
                }`}
              />
            </SettingField>

            <SettingField
              label="Hourly limit"
              description="Maximum emails per hour."
              error={errors.hourlyLimit}
            >
              <input
                id="hourlyLimit"
                type="number"
                min="1"
                value={hourlyLimit}
                onChange={(event) => {
                  setHourlyLimit(event.target.value);

                  setErrors((current) => ({
                    ...current,
                    hourlyLimit: undefined,
                  }));
                }}
                className={`dark-input ${
                  errors.hourlyLimit ? "border-red-400/30" : ""
                }`}
              />
            </SettingField>
          </div>
        </div>

        {(submitError || submitSuccess) && (
          <div
            className={`mt-5 rounded-xl border px-5 py-4 text-sm ${
              submitError
                ? "border-red-400/10 bg-red-400/[0.03] text-red-300/80"
                : "border-emerald-400/10 bg-emerald-400/[0.03] text-emerald-300/80"
            }`}
          >
            {submitError || submitSuccess}
          </div>
        )}

        <div className="mt-6 flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-xs leading-5 text-white/20">
            Your campaign will be persisted and scheduled automatically.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="/dashboard"
              className="rounded-full px-4 py-2.5 text-sm text-white/40 transition hover:bg-white/[0.04] hover:text-white"
            >
              Cancel
            </a>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !senderId}
              className="group flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isSubmitting ? "Scheduling..." : "Schedule campaign"}

              {!isSubmitting && (
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              )}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  description,
  error,
  trailing,
  children,
}: {
  label: string;
  description: string;
  error?: string;
  trailing?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2.5 flex items-end justify-between gap-4">
        <div>
          <label
            htmlFor={label.toLowerCase()}
            className="text-sm font-medium text-white/75"
          >
            {label}
          </label>

          <p className="mt-1 text-xs text-white/25">
            {description}
          </p>
        </div>

        {trailing && (
          <span className="shrink-0 text-[11px] text-white/25">
            {trailing}
          </span>
        )}
      </div>

      {children}

      {error && (
        <p className="mt-2 text-xs text-red-300/80">
          {error}
        </p>
      )}
    </div>
  );
}

function SettingField({
  label,
  description,
  error,
  children,
}: {
  label: string;
  description: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/[0.06] p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 sm:p-7">
      <label
        htmlFor={label.toLowerCase()}
        className="text-sm font-medium text-white/75"
      >
        {label}
      </label>

      <p className="mt-1.5 min-h-8 text-xs leading-4 text-white/25">
        {description}
      </p>

      <div className="mt-4">
        {children}
      </div>

      {error && (
        <p className="mt-2 text-xs text-red-300/80">
          {error}
        </p>
      )}
    </div>
  );
}