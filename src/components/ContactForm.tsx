"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

type FormStatus = "idle" | "sending" | "success" | "error" | "unconfigured";

type ContactResponse = {
  success?: boolean;
  message?: string;
  mailto?: boolean;
};

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [fallbackHref, setFallbackHref] = useState(
    `mailto:${siteConfig.email}`,
  );

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    const mailtoBody = `სახელი და გვარი: ${payload.name}\nელფოსტა: ${payload.email}\n\n${payload.message}`;
    setFallbackHref(
      `mailto:${siteConfig.email}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(mailtoBody)}`,
    );
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as ContactResponse;

      if (response.ok && result.success) {
        setStatus("success");
        setMessage(
          result.message ?? "წერილი წარმატებით გაიგზავნა. გმადლობთ დაკავშირებისთვის.",
        );
        form.reset();
        return;
      }

      setStatus(result.mailto ? "unconfigured" : "error");
      setMessage(
        result.message ??
          "წერილის გაგზავნა ვერ მოხერხდა. გთხოვთ, სცადოთ მოგვიანებით.",
      );
    } catch {
      setStatus("error");
      setMessage(
        "სერვერთან დაკავშირება ვერ მოხერხდა. შეგიძლიათ გამოიყენოთ აკადემიური ელფოსტა.",
      );
    }
  }

  const busy = status === "sending";

  return (
    <form
      className="contact-form"
      onSubmit={submit}
      aria-busy={busy}
      aria-describedby={
        message
          ? "contact-form-note contact-form-feedback"
          : "contact-form-note"
      }
    >
      <div className="form-row">
        <label htmlFor="contact-name">
          სახელი და გვარი
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            onInvalid={(event) =>
              event.currentTarget.setCustomValidity(
                "გთხოვთ, მიუთითოთ სახელი და გვარი.",
              )
            }
            onInput={(event) => event.currentTarget.setCustomValidity("")}
          />
        </label>
        <label htmlFor="contact-email">
          ელფოსტა
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            onInvalid={(event) =>
              event.currentTarget.setCustomValidity(
                "გთხოვთ, მიუთითოთ მოქმედი ელფოსტის მისამართი.",
              )
            }
            onInput={(event) => event.currentTarget.setCustomValidity("")}
          />
        </label>
      </div>
      <label htmlFor="contact-subject">
        თემა
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          minLength={3}
          maxLength={160}
          onInvalid={(event) =>
            event.currentTarget.setCustomValidity(
              "გთხოვთ, მოკლედ მიუთითოთ წერილის თემა.",
            )
          }
          onInput={(event) => event.currentTarget.setCustomValidity("")}
        />
      </label>
      <label htmlFor="contact-message">
        შეტყობინება
        <textarea
          id="contact-message"
          name="message"
          rows={7}
          required
          minLength={10}
          maxLength={5000}
          onInvalid={(event) =>
            event.currentTarget.setCustomValidity(
              "გთხოვთ, შეიყვანოთ სულ მცირე 10 სიმბოლოსგან შემდგარი შეტყობინება.",
            )
          }
          onInput={(event) => event.currentTarget.setCustomValidity("")}
        />
      </label>
      <div className="honeypot-field" aria-hidden="true">
        <label htmlFor="contact-website">
          ვებსაიტი
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>
      <p id="contact-form-note" className="form-transparency">
        ფორმა წერილს სერვერის დაცული არხით აგზავნის. თქვენი ელფოსტა გამოიყენება
        მხოლოდ პასუხის გასაცემად და ბრაუზერში საიდუმლო გასაღები არ იგზავნება.
      </p>
      <button className="button button-primary" type="submit" disabled={busy}>
        {busy ? (
          <LoaderCircle className="form-spinner" aria-hidden="true" />
        ) : (
          <Mail aria-hidden="true" />
        )}
        {busy ? "იგზავნება…" : "შეტყობინების გაგზავნა"}
      </button>
      {message ? (
        <div
          id="contact-form-feedback"
          className={`form-feedback form-feedback-${status}`}
          role={status === "success" ? "status" : "alert"}
        >
          {status === "success" ? (
            <CheckCircle2 aria-hidden="true" />
          ) : (
            <AlertCircle aria-hidden="true" />
          )}
          <div>
            <p>{message}</p>
            {status === "unconfigured" || status === "error" ? (
              <a href={fallbackHref}>ელფოსტის აპლიკაციით გაგზავნა</a>
            ) : null}
          </div>
        </div>
      ) : null}
    </form>
  );
}
