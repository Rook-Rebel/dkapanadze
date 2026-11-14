"use client";

import { useState, type FocusEvent, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n";

type FormStatus = "idle" | "sending" | "success" | "error" | "unconfigured";
type ContactResponse = { success?: boolean; message?: string; mailto?: boolean };
type Field = "name" | "email" | "subject" | "message";
type Values = Record<Field, string>;

const fieldOrder: Field[] = ["name", "email", "subject", "message"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const copy = {
  en: {
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    website: "Website",
    required: "All fields are required.",
    errors: {
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      subject: "Please enter a short subject (at least 3 characters).",
      message: "Please write a message of at least 10 characters.",
    },
    note: "Your email address is used only to reply to your message.",
    sending: "Sending…",
    send: "Send message",
    fallback: "Write with your email application instead",
    success: "Your message has been sent. Thank you for getting in touch.",
    error: "The message could not be sent. Please try again later.",
    server: "The server could not be reached. You can write to the academic email address instead.",
  },
  ka: {
    name: "სახელი და გვარი",
    email: "ელფოსტა",
    subject: "თემა",
    message: "შეტყობინება",
    website: "ვებსაიტი",
    required: "ყველა ველი სავალდებულოა.",
    errors: {
      name: "გთხოვთ, მიუთითოთ სახელი და გვარი.",
      email: "გთხოვთ, მიუთითოთ მოქმედი ელფოსტის მისამართი.",
      subject: "გთხოვთ, მოკლედ მიუთითოთ წერილის თემა (მინიმუმ 3 სიმბოლო).",
      message: "გთხოვთ, დაწეროთ სულ მცირე 10 სიმბოლოსგან შემდგარი შეტყობინება.",
    },
    note: "თქვენი ელფოსტა გამოიყენება მხოლოდ პასუხის გასაცემად.",
    sending: "იგზავნება…",
    send: "შეტყობინების გაგზავნა",
    fallback: "ელფოსტის აპლიკაციით გაგზავნა",
    success: "წერილი გაიგზავნა. გმადლობთ დაკავშირებისთვის.",
    error: "წერილის გაგზავნა ვერ მოხერხდა. გთხოვთ, სცადოთ მოგვიანებით.",
    server: "სერვერთან დაკავშირება ვერ მოხერხდა. შეგიძლიათ მიწეროთ აკადემიურ ელფოსტაზე.",
  },
} as const;

function validateField(field: Field, value: string) {
  const trimmed = value.trim();
  switch (field) {
    case "name":
      return trimmed.length >= 2;
    case "email":
      return emailPattern.test(trimmed);
    case "subject":
      return trimmed.length >= 3;
    case "message":
      return trimmed.length >= 10;
  }
}

export function ContactForm({ locale, headingId }: { locale: Locale; headingId?: string }) {
  const labels = copy[locale];
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [fallbackHref, setFallbackHref] = useState(`mailto:${siteConfig.email}`);

  function readValues(form: HTMLFormElement): Values & { website: string } {
    const data = new FormData(form);
    return {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
    };
  }

  function handleBlur(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.currentTarget.name as Field;
    // Only re-validate fields that already show an error, or that have content.
    if (!errors[field] && !event.currentTarget.value) return;
    const valid = validateField(field, event.currentTarget.value);
    setErrors((current) => ({ ...current, [field]: valid ? undefined : labels.errors[field] }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = readValues(form);

    const nextErrors: Partial<Record<Field, string>> = {};
    for (const field of fieldOrder) {
      if (!validateField(field, values[field])) nextErrors[field] = labels.errors[field];
    }
    setErrors(nextErrors);
    const firstInvalid = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    const mailtoBody = `${labels.name}: ${values.name}\n${labels.email}: ${values.email}\n\n${values.message}`;
    setFallbackHref(
      `mailto:${siteConfig.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(mailtoBody)}`,
    );
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      const result = (await response.json()) as ContactResponse;
      if (response.ok && result.success) {
        setStatus("success");
        setMessage(result.message ?? labels.success);
        form.reset();
        return;
      }
      setStatus(result.mailto ? "unconfigured" : "error");
      setMessage(result.message ?? labels.error);
    } catch {
      setStatus("error");
      setMessage(labels.server);
    }
  }

  const busy = status === "sending";

  const fieldProps = (field: Field) => ({
    id: `contact-${field}`,
    name: field,
    required: true,
    "aria-invalid": errors[field] ? (true as const) : undefined,
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
    onBlur: handleBlur,
  });

  const fieldError = (field: Field) =>
    errors[field] ? (
      <p id={`contact-${field}-error`} className="field-error">
        <AlertCircle aria-hidden="true" />
        {errors[field]}
      </p>
    ) : null;

  return (
    <form
      className="contact-form"
      onSubmit={submit}
      noValidate
      aria-busy={busy}
      aria-labelledby={headingId}
      aria-describedby="contact-form-note"
    >
      <p className="form-required">{labels.required}</p>
      <div className="form-row">
        <div className="field">
          <label htmlFor="contact-name">{labels.name}</label>
          <input {...fieldProps("name")} type="text" autoComplete="name" minLength={2} maxLength={100} />
          {fieldError("name")}
        </div>
        <div className="field">
          <label htmlFor="contact-email">{labels.email}</label>
          <input
            {...fieldProps("email")}
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            spellCheck={false}
          />
          {fieldError("email")}
        </div>
      </div>
      <div className="field">
        <label htmlFor="contact-subject">{labels.subject}</label>
        <input {...fieldProps("subject")} type="text" minLength={3} maxLength={160} />
        {fieldError("subject")}
      </div>
      <div className="field">
        <label htmlFor="contact-message">{labels.message}</label>
        <textarea {...fieldProps("message")} rows={7} minLength={10} maxLength={5000} />
        {fieldError("message")}
      </div>
      <div className="honeypot-field" aria-hidden="true">
        <label htmlFor="contact-website">{labels.website}</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-footer">
        <button className="button button-primary" type="submit" disabled={busy}>
          {busy ? (
            <LoaderCircle className="spinner" aria-hidden="true" />
          ) : (
            <Send aria-hidden="true" />
          )}
          {busy ? labels.sending : labels.send}
        </button>
        <p id="contact-form-note" className="form-note">
          {labels.note}
        </p>
      </div>
      <div className="form-feedback-region" aria-live="polite">
        {message ? (
          <div
            className={`form-feedback form-feedback-${status === "success" ? "success" : "error"}`}
            role={status === "success" ? "status" : "alert"}
          >
            {status === "success" ? <CheckCircle2 aria-hidden="true" /> : <AlertCircle aria-hidden="true" />}
            <div>
              <p>{message}</p>
              {status === "unconfigured" || status === "error" ? (
                <a href={fallbackHref}>{labels.fallback}</a>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
}
