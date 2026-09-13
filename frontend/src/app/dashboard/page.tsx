"use client";

import { useEffect, useState } from "react";

interface Email {
  id: string;
  recipient: string;
  subject: string;
  scheduledAt: string;
  sentAt: string | null;
  status: "SCHEDULED" | "PROCESSING" | "SENT" | "FAILED";
  sender: {
    email: string;
    name: string;
  };
}

const API_URL = "http://localhost:3000";
const TEST_USER_ID = "test-user-1";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"scheduled" | "sent">(
    "scheduled",
  );
  const [scheduledEmails, setScheduledEmails] = useState<Email[]>([]);
  const [sentEmails, setSentEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadEmails() {
    try {
      setIsLoading(true);
      setError("");

      const [scheduledResponse, sentResponse] = await Promise.all([
        fetch(
          `${API_URL}/api/emails/scheduled?userId=${TEST_USER_ID}`,
        ),
        fetch(`${API_URL}/api/emails/sent?userId=${TEST_USER_ID}`),
      ]);

      if (!scheduledResponse.ok || !sentResponse.ok) {
        throw new Error("Failed to load emails");
      }

      const scheduledData = await scheduledResponse.json();
      const sentData = await sentResponse.json();

      setScheduledEmails(scheduledData);
      setSentEmails(sentData);
    } catch (error) {
      console.error("Failed to load emails:", error);
      setError("Unable to load emails.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadEmails();
  }, []);

  const activeEmails =
    activeTab === "scheduled" ? scheduledEmails : sentEmails;

  const totalEmails = scheduledEmails.length + sentEmails.length;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030407] text-white">
      <div className="pointer-events-none absolute left-1/2 top-[-260px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/[0.08] blur-[140px]" />

      <div className="pointer-events-none absolute right-[-180px] top-[35%] h-[400px] w-[400px] rounded-full bg-blue-500/[0.04] blur-[130px]" />

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
              href="/compose"
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.1]"
            >
              <span>Compose</span>
              <span className="text-white/40 transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </a>

            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-xs font-medium text-white/70">
              P
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-12 lg:px-8 lg:pt-16">
        <section className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-violet-300/70">
              Dashboard
            </p>

            <h1 className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
              Email overview
            </h1>

            <p className="mt-3 max-w-md text-sm leading-6 text-white/40">
              Keep track of what is scheduled, what has been sent, and what
              comes next.
            </p>
          </div>

          <button
            type="button"
            onClick={loadEmails}
            disabled={isLoading}
            className="group flex w-fit items-center gap-2 text-sm text-white/40 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span
              className={`text-base transition-transform duration-500 ${
                isLoading ? "animate-spin" : "group-hover:rotate-180"
              }`}
            >
              ↻
            </span>
            Refresh
          </button>
        </section>

        <section className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-3">
          <Stat
            label="Total emails"
            value={totalEmails}
            description="Across all campaigns"
          />

          <Stat
            label="Scheduled"
            value={scheduledEmails.length}
            description="Waiting to be sent"
          />

          <Stat
            label="Sent"
            value={sentEmails.length}
            description="Successfully delivered"
          />
        </section>

        <section className="mt-16">
          <div className="flex items-end justify-between border-b border-white/[0.07]">
            <div className="flex gap-7">
              <Tab
                active={activeTab === "scheduled"}
                label="Scheduled"
                count={scheduledEmails.length}
                onClick={() => setActiveTab("scheduled")}
              />

              <Tab
                active={activeTab === "sent"}
                label="Sent"
                count={sentEmails.length}
                onClick={() => setActiveTab("sent")}
              />
            </div>

            <span className="mb-3 hidden text-xs text-white/20 sm:block">
              {activeEmails.length}{" "}
              {activeEmails.length === 1 ? "email" : "emails"}
            </span>
          </div>

          <div className="mt-5">
            {isLoading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState message={error} onRetry={loadEmails} />
            ) : activeEmails.length === 0 ? (
              <EmptyState activeTab={activeTab} />
            ) : (
              <EmailTable
                emails={activeEmails}
                activeTab={activeTab}
              />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  description,
}: {
  label: string;
  value: number;
  description: string;
}) {
  return (
    <div className="group relative bg-[#08090d] px-6 py-6 transition-colors duration-300 hover:bg-[#0b0c11]">
      <div className="absolute left-0 top-0 h-px w-0 bg-violet-400/60 transition-all duration-500 group-hover:w-full" />

      <p className="text-[11px] uppercase tracking-[0.14em] text-white/30">
        {label}
      </p>

      <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
        {value}
      </p>

      <p className="mt-1.5 text-xs text-white/25">
        {description}
      </p>
    </div>
  );
}

function Tab({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative pb-3 text-sm transition-colors duration-300 ${
        active ? "text-white" : "text-white/30 hover:text-white/60"
      }`}
    >
      {label}

      <span
        className={`ml-2 text-xs transition-colors ${
          active ? "text-violet-300/70" : "text-white/20"
        }`}
      >
        {count}
      </span>

      <span
        className={`absolute bottom-0 left-0 h-px bg-violet-400 transition-all duration-300 ${
          active ? "w-full" : "w-0"
        }`}
      />
    </button>
  );
}

function EmailTable({
  emails,
  activeTab,
}: {
  emails: Email[];
  activeTab: "scheduled" | "sent";
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.015]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="px-6 py-4 text-left text-[10px] font-medium uppercase tracking-[0.14em] text-white/25">
                Recipient
              </th>

              <th className="px-6 py-4 text-left text-[10px] font-medium uppercase tracking-[0.14em] text-white/25">
                Subject
              </th>

              <th className="px-6 py-4 text-left text-[10px] font-medium uppercase tracking-[0.14em] text-white/25">
                Sender
              </th>

              <th className="px-6 py-4 text-left text-[10px] font-medium uppercase tracking-[0.14em] text-white/25">
                {activeTab === "scheduled" ? "Scheduled" : "Sent"}
              </th>

              <th className="px-6 py-4 text-left text-[10px] font-medium uppercase tracking-[0.14em] text-white/25">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {emails.map((email) => (
              <tr
                key={email.id}
                className="group border-b border-white/[0.045] transition-colors duration-200 last:border-0 hover:bg-white/[0.025]"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-[10px] font-medium text-white/40">
                      {getInitials(email.recipient)}
                    </div>

                    <span className="text-sm text-white/70">
                      {email.recipient}
                    </span>
                  </div>
                </td>

                <td className="max-w-[260px] px-6 py-5">
                  <p className="truncate text-sm text-white/50">
                    {email.subject}
                  </p>
                </td>

                <td className="px-6 py-5">
                  <div>
                    <p className="text-sm text-white/50">
                      {email.sender.name}
                    </p>

                    <p className="mt-0.5 text-xs text-white/20">
                      {email.sender.email}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-5 text-sm text-white/35">
                  {formatDate(
                    activeTab === "scheduled"
                      ? email.scheduledAt
                      : email.sentAt,
                  )}
                </td>

                <td className="px-6 py-5">
                  <Status status={email.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Status({
  status,
}: {
  status: Email["status"];
}) {
  const styles = {
    SCHEDULED:
      "border-violet-400/20 bg-violet-400/[0.07] text-violet-300",
    PROCESSING:
      "border-yellow-400/20 bg-yellow-400/[0.06] text-yellow-300",
    SENT:
      "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-300",
    FAILED:
      "border-red-400/20 bg-red-400/[0.06] text-red-300",
  };

  const labels = {
    SCHEDULED: "Scheduled",
    PROCESSING: "Processing",
    SENT: "Sent",
    FAILED: "Failed",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium ${styles[status]}`}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {labels[status]}
    </span>
  );
}

function LoadingState() {
  return (
    <div className="rounded-2xl border border-white/[0.07] py-24 text-center">
      <div className="mx-auto h-5 w-5 animate-spin rounded-full border border-white/10 border-t-violet-400" />

      <p className="mt-4 text-xs text-white/25">
        Loading emails...
      </p>
    </div>
  );
}

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="rounded-2xl border border-red-400/10 bg-red-400/[0.02] py-20 text-center">
      <p className="text-sm text-red-300/80">{message}</p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-4 text-xs text-white/40 transition hover:text-white"
      >
        Try again →
      </button>
    </div>
  );
}

function EmptyState({
  activeTab,
}: {
  activeTab: "scheduled" | "sent";
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] py-24 text-center">
      <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-60 -translate-x-1/2 rounded-full bg-violet-500/[0.04] blur-[80px]" />

      <div className="relative">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-sm text-white/30">
          {activeTab === "scheduled" ? "↗" : "✓"}
        </div>

        <p className="mt-4 text-sm text-white/40">
          No {activeTab} emails yet.
        </p>

        {activeTab === "scheduled" && (
          <a
            href="/compose"
            className="mt-3 inline-block text-xs text-violet-300/70 transition hover:text-violet-300"
          >
            Schedule your first email →
          </a>
        )}
      </div>
    </div>
  );
}

function getInitials(email: string) {
  return email
    .split("@")[0]
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(date: string | null) {
  if (!date) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}