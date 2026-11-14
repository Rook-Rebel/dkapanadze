import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
  locale: "ka" | "en";
};

type RateRecord = {
  count: number;
  resetAt: number;
};

const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT = 5;
const rateStore = new Map<string, RateRecord>();

function clientIdentifier(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    request.headers.get("cf-connecting-ip") ??
    forwarded?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function isRateLimited(identifier: string) {
  const now = Date.now();
  if (rateStore.size > 500) {
    for (const [key, record] of rateStore) {
      if (record.resetAt <= now) rateStore.delete(key);
    }
  }
  const current = rateStore.get(identifier);

  if (!current || current.resetAt <= now) {
    rateStore.set(identifier, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_LIMIT) return true;
  current.count += 1;
  rateStore.set(identifier, current);
  return false;
}

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanSingleLine(value: unknown, maxLength: number) {
  return clean(value, maxLength).replace(/[\r\n]+/g, " ");
}

function parsePayload(input: unknown): ContactPayload | null {
  if (!input || typeof input !== "object") return null;
  const source = input as Record<string, unknown>;
  const payload: ContactPayload = {
    name: cleanSingleLine(source.name, 100),
    email: clean(source.email, 254).toLowerCase(),
    subject: cleanSingleLine(source.subject, 160),
    message: clean(source.message, 5000),
    website: clean(source.website, 200),
    locale: source.locale === "en" ? "en" : "ka",
  };
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);

  if (
    payload.name.length < 2 ||
    !validEmail ||
    payload.subject.length < 3 ||
    payload.message.length < 10
  ) {
    return null;
  }

  return payload;
}

export async function POST(request: NextRequest) {
  let requestedLocale: "ka" | "en" = request.cookies.get("dk-language")?.value === "en" ? "en" : "ka";
  const identifier = clientIdentifier(request);
  if (isRateLimited(identifier)) {
    return NextResponse.json(
      {
        success: false,
        message: requestedLocale === "en" ? "The sending limit has been reached. Please try again later." : "მოკლე დროში გაგზავნის ლიმიტი ამოიწურა. გთხოვთ, სცადოთ მოგვიანებით.",
      },
      { status: 429 },
    );
  }

  let input: unknown;
  try {
    input = await request.json();
    requestedLocale = (input as { locale?: unknown })?.locale === "en" ? "en" : "ka";
  } catch {
    return NextResponse.json(
      { success: false, message: requestedLocale === "en" ? "The request format is invalid." : "მოთხოვნის ფორმატი არასწორია." },
      { status: 400 },
    );
  }

  const payload = parsePayload(input);
  if (!payload) {
    return NextResponse.json(
      {
        success: false,
        message: requestedLocale === "en" ? "Please complete all required fields correctly." : "გთხოვთ, სწორად შეავსოთ ყველა სავალდებულო ველი.",
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        success: false,
        mailto: true,
        message: payload.locale === "en" ? "Online sending is not configured yet. Please use the academic email address." : "ონლაინ გაგზავნა ჯერ არ არის კონფიგურირებული. გამოიყენეთ აკადემიური ელფოსტა.",
      },
      { status: 503 },
    );
  }

  // Honeypot: return an uneventful response without sending an email.
  if (payload.website) {
    return NextResponse.json({
      success: true,
      message: payload.locale === "en" ? "Request received." : "მოთხოვნა მიღებულია.",
    });
  }

  const toEmail =
    process.env.CONTACT_TO_EMAIL ?? "d.kapanadze@seu.edu.ge";
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? "website@dkapanadze.ge";
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: `dkapanadze.ge <${fromEmail}>`,
    to: [toEmail],
    replyTo: payload.email,
    subject: `[dkapanadze.ge] ${payload.subject}`,
    text: [
      `სახელი და გვარი: ${payload.name}`,
      `ელფოსტა: ${payload.email}`,
      "",
      payload.message,
    ].join("\n"),
  });

  if (error) {
    return NextResponse.json(
      {
        success: false,
        mailto: true,
        message:
          payload.locale === "en" ? "The message could not be sent. Please use the academic email address or try again later." : "წერილის გაგზავნა ვერ მოხერხდა. გამოიყენეთ აკადემიური ელფოსტა ან სცადეთ მოგვიანებით.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    success: true,
    message: payload.locale === "en" ? "Your message was sent successfully. Thank you for getting in touch." : "წერილი წარმატებით გაიგზავნა. გმადლობთ დაკავშირებისთვის.",
  });
}
