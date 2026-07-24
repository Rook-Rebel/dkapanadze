"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type CopyButtonProps = {
  value: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
};

export function CopyButton({
  value,
  label = "ასლის შექმნა",
  copiedLabel = "დაკოპირდა",
  className = "",
}: CopyButtonProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  async function copy() {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(value);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    window.setTimeout(() => setCopyState("idle"), 1800);
  }

  const feedbackLabel =
    copyState === "copied"
      ? copiedLabel
      : copyState === "error"
        ? "კოპირება ვერ მოხერხდა"
        : label;

  return (
    <button
      type="button"
      className={`copy-button ${className}`}
      onClick={copy}
      aria-live="polite"
      aria-atomic="true"
    >
      {copyState === "copied" ? (
        <Check aria-hidden="true" size={16} />
      ) : (
        <Copy aria-hidden="true" size={16} />
      )}
      {feedbackLabel}
    </button>
  );
}
