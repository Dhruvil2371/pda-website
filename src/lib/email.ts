import nodemailer, { type Transporter } from "nodemailer";

let _transport: Transporter | null = null;

function transport(): Transporter | null {
  if (_transport) return _transport;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) return null;
  _transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return _transport;
}

export type EnquiryEmail = {
  id: number;
  name: string;
  phone: string;
  email: string;
  service?: string | null;
  message?: string | null;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendEnquiryEmail(e: EnquiryEmail): Promise<{ ok: true } | { ok: false; error: string }> {
  const t = transport();
  const to = process.env.ADMIN_EMAIL;
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  if (!t || !to || !from) {
    return { ok: false, error: "SMTP or ADMIN_EMAIL not configured" };
  }

  const subject = `New enquiry #${e.id} — ${e.name}${e.service ? ` · ${e.service}` : ""}`;
  const text = [
    `New enquiry received from the website.`,
    ``,
    `ID:      ${e.id}`,
    `Name:    ${e.name}`,
    `Phone:   ${e.phone}`,
    `Email:   ${e.email}`,
    `Service: ${e.service || "—"}`,
    ``,
    `Message:`,
    e.message || "(no message)",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.55;color:#0e2f3c">
      <h2 style="margin:0 0 12px;color:#12897d">New enquiry #${e.id}</h2>
      <p style="margin:0 0 16px;color:#526168">A new enquiry was submitted on the website.</p>
      <table style="border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 12px 6px 0;color:#7c8a90">Name</td><td style="padding:6px 0"><strong>${escapeHtml(e.name)}</strong></td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#7c8a90">Phone</td><td style="padding:6px 0"><a href="tel:${escapeHtml(e.phone)}">${escapeHtml(e.phone)}</a></td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#7c8a90">Email</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(e.email)}">${escapeHtml(e.email)}</a></td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#7c8a90">Service</td><td style="padding:6px 0">${escapeHtml(e.service || "—")}</td></tr>
      </table>
      ${
        e.message
          ? `<div style="margin-top:16px"><div style="font-size:12px;color:#7c8a90;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">Message</div><div style="background:#f7faf9;border-radius:8px;padding:12px 14px;white-space:pre-wrap">${escapeHtml(e.message)}</div></div>`
          : ""
      }
    </div>`;

  try {
    await t.sendMail({
      to,
      from,
      replyTo: e.email,
      subject,
      text,
      html,
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "send failed" };
  }
}
