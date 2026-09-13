"use client";

import { ChangeEvent, useRef, useState } from "react";
import { parseRecipientCsv } from "@/lib/csv";

interface RecipientUploadProps {
  onRecipientsLoaded: (emails: string[]) => void;
}

export default function RecipientUpload({
  onRecipientsLoaded,
}: RecipientUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState("");

  const [summary, setSummary] = useState<{
    valid: number;
    duplicates: number;
    invalid: number;
  } | null>(null);

  async function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setSummary(null);
    setFileName(file.name);
    setIsParsing(true);

    try {
      const result = await parseRecipientCsv(file);

      if (result.emails.length === 0) {
        throw new Error("No valid email addresses were found.");
      }

      onRecipientsLoaded(result.emails);

      setSummary({
        valid: result.emails.length,
        duplicates: result.duplicates,
        invalid: result.invalid.length,
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to read CSV file.",
      );

      setFileName("");
    } finally {
      setIsParsing(false);
      event.target.value = "";
    }
  }

  function handleRemove() {
    setFileName("");
    setSummary(null);
    setError("");
    onRecipientsLoaded([]);
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        onChange={handleFileChange}
        className="hidden"
      />

      {!fileName ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isParsing}
          className="group w-full rounded-xl border border-dashed border-white/[0.14] bg-white/[0.02] px-6 py-8 text-left transition-all duration-300 hover:border-violet-400/30 hover:bg-violet-400/[0.025] disabled:cursor-wait disabled:opacity-50"
        >
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.04] text-white/40 transition-colors group-hover:border-violet-400/20 group-hover:text-violet-300">
              ↑
            </div>

            <p className="mt-4 text-sm font-medium text-white/65">
              Upload recipient list
            </p>

            <p className="mt-1 text-xs text-white/25">
              CSV file with an email column
            </p>

            <span className="mt-4 rounded-full border border-white/[0.1] bg-white/[0.05] px-3.5 py-1.5 text-xs text-white/50 transition group-hover:border-white/[0.15] group-hover:text-white/70">
              Choose CSV
            </span>
          </div>
        </button>
      ) : (
        <div className="rounded-xl border border-white/[0.1] bg-white/[0.025] p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-violet-400/15 bg-violet-400/[0.07] text-xs font-medium text-violet-300">
                CSV
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm text-white/70">
                  {fileName}
                </p>

                <p className="mt-0.5 text-xs text-white/25">
                  {isParsing
                    ? "Reading recipients..."
                    : "Recipient list imported"}
                </p>
              </div>
            </div>

            {!isParsing && (
              <button
                type="button"
                onClick={handleRemove}
                className="shrink-0 text-xs text-white/30 transition hover:text-red-300"
              >
                Remove
              </button>
            )}
          </div>

          {isParsing && (
            <div className="mt-4 h-px overflow-hidden bg-white/[0.06]">
              <div className="h-full w-1/3 animate-pulse bg-violet-400/60" />
            </div>
          )}

          {summary && !isParsing && (
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/[0.06] pt-4 text-xs">
              <span className="text-emerald-300/70">
                {summary.valid} valid
              </span>

              {summary.duplicates > 0 && (
                <span className="text-white/30">
                  {summary.duplicates} duplicate
                  {summary.duplicates === 1 ? "" : "s"}
                </span>
              )}

              {summary.invalid > 0 && (
                <span className="text-red-300/70">
                  {summary.invalid} invalid
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="mt-2 text-xs text-red-300/80">
          {error}
        </p>
      )}
    </div>
  );
}