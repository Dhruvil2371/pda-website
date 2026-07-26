import { NextResponse, type NextRequest } from "next/server";
import { insertEnquiry, markEmail } from "@/lib/db";
import { sendEnquiryEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Simple in-memory rate limit: 5 requests per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function clientIp(req: NextRequest): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

function rateLimited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > LIMIT;
}

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const isPhone = (s: string) => /^[+\d][\d\s\-().]{6,20}$/.test(s);
const clip = (s: unknown, max: number) =>
  typeof s === "string" ? s.trim().slice(0, max) : "";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: if bots filled the "website" field, silently accept.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = clip(body.name, 120);
  const phone = clip(body.phone, 40);
  const email = clip(body.email, 200);
  const service = clip(body.service, 120) || null;
  const message = clip(body.message, 4000) || null;

  if (!name || name.length < 2) return NextResponse.json({ ok: false, error: "Please share your name." }, { status: 400 });
  if (!isPhone(phone)) return NextResponse.json({ ok: false, error: "Please share a valid phone number." }, { status: 400 });
  if (!isEmail(email)) return NextResponse.json({ ok: false, error: "Please share a valid email." }, { status: 400 });

  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const id = insertEnquiry({
    name,
    phone,
    email,
    service,
    message,
    user_agent: req.headers.get("user-agent"),
    ip,
  });

  // Fire-and-forget email (don't block user response on SMTP).
  // id may be null on serverless (no persistent disk) — email is still the source of truth.
  sendEnquiryEmail({ id: id ?? 0, name, phone, email, service, message })
    .then((res) => {
      if (res.ok) markEmail(id, true);
      else markEmail(id, false, res.error);
    })
    .catch((err) => markEmail(id, false, err instanceof Error ? err.message : "unknown"));

  return NextResponse.json({ ok: true, id });
}
