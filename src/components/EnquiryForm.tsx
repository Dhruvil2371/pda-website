"use client";

import { useState } from "react";
import { services } from "@/lib/site";
import styles from "./EnquiryForm.module.css";

type Status = "idle" | "sending" | "sent" | "error";

export function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    // Honeypot
    if (data.website) { setStatus("sent"); return; }
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send");
      setStatus("error");
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      {!compact && (
        <>
          <h3 className={styles.title}>Request a Callback</h3>
          <p className={styles.sub}>Fill this in and we&apos;ll call you back shortly.</p>
        </>
      )}
      <label className={styles.field}>
        <span className={styles.label}>Your name</span>
        <input name="name" type="text" required autoComplete="name" placeholder="Full name" />
      </label>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Phone number</span>
          <input name="phone" type="tel" required autoComplete="tel" placeholder="+91 98765 43210" />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Email address</span>
          <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
        </label>
      </div>
      <label className={styles.field}>
        <span className={styles.label}>Service you&apos;re interested in</span>
        <select name="service" defaultValue="">
          <option value="" disabled>Select a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>{s.name}</option>
          ))}
          <option value="Other">Other / not sure</option>
        </select>
      </label>
      <label className={styles.field}>
        <span className={styles.label}>How can we help?</span>
        <textarea name="message" rows={4} placeholder="A few lines about what you need" />
      </label>
      {/* Honeypot for bots — hidden from users */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }}
      />
      <button type="submit" className={styles.submit} disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
      {status === "sent" && (
        <div className={styles.ok} role="status">
          Thanks — we&apos;ve received your enquiry and will call you back within 30 minutes during business hours.
        </div>
      )}
      {status === "error" && (
        <div className={styles.err} role="alert">
          {error || "Couldn't send that. Please try again or call us directly."}
        </div>
      )}
    </form>
  );
}
