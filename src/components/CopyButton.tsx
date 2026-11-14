"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { getUi, type Locale } from "@/i18n";

type CopyButtonProps = {
  value: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
  locale: Locale;
};

export function CopyButton({ value, label, copiedLabel, className = "", locale }: CopyButtonProps) {
  const labels = getUi(locale);
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("error");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2000);
  }

  const text =
    state === "copied"
      ? (copiedLabel ?? labels.copied)
      : state === "error"
        ? labels.copyFailed
        : (label ?? labels.copy);

  return (
    <>
      <button
        type="button"
        className={`action-link copy-button ${className}`.trim()}
        data-state={state}
        onClick={copy}
      >
        {state === "copied" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
        <span>{text}</span>
      </button>
      <span className="sr-only" role="status">
        {state === "idle" ? "" : text}
      </span>
    </>
  );
}
