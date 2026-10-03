"use client";

import { useEffect, useState } from "react";

type Row = {
  id: number;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  service: string | null;
  message: string | null;
  email_sent: number;
  email_error: string | null;
};

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Pre-fill from URL ?key= — but never store it.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("key");
    if (q) setKey(q);
  }, []);

  async function load() {
    if (!key) return;
    setLoading(true);
    setErr(null);
    try {
      const r = await fetch(`/api/admin/enquiries?key=${encodeURIComponent(key)}`);
      const j = await r.json();
      if (!r.ok || !j.ok) throw new Error(j.error || `HTTP ${r.status}`);
      setRows(j.enquiries || []);
      setNote(j.note || null);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed");
      setRows(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px", fontFamily: "var(--font-body)" }}>
      <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 26, marginBottom: 8 }}>Enquiries</h1>
      <p style={{ color: "var(--dim)", marginBottom: 24, fontSize: 14 }}>
        Paste your <code>ADMIN_KEY</code> to view stored enquiries.
      </p>

      <form
        onSubmit={(e) => { e.preventDefault(); load(); }}
        style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}
      >
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="ADMIN_KEY"
          style={{ flex: 1, minWidth: 220, padding: "11px 14px", border: "1px solid var(--line)", borderRadius: 8, fontSize: 14 }}
        />
        <button type="submit" className="btn-primary" disabled={!key || loading} style={{ padding: "11px 22px" }}>
          {loading ? "Loading…" : "Load"}
        </button>
      </form>

      {err && (
        <div style={{ background: "#fdecea", color: "#b3261e", padding: 12, borderRadius: 8, marginBottom: 20, fontSize: 14 }}>
          {err}
        </div>
      )}

      {note && (
        <div style={{ background: "#e3f3f0", color: "var(--teal)", padding: 12, borderRadius: 8, marginBottom: 20, fontSize: 13.5 }}>
          {note}
        </div>
      )}

      {rows && rows.length > 0 && (
        <div style={{ overflowX: "auto", border: "1px solid var(--line)", borderRadius: 12 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
            <thead style={{ background: "var(--bg-soft)" }}>
              <tr>
                {["ID", "When", "Name", "Phone", "Email", "Service", "Message", "Email"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "12px 14px", fontWeight: 600, color: "var(--muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} style={{ borderTop: "1px solid var(--line)" }}>
                  <td style={{ padding: "12px 14px", color: "var(--dim)" }}>{r.id}</td>
                  <td style={{ padding: "12px 14px", color: "var(--dim)", whiteSpace: "nowrap" }}>{r.created_at}</td>
                  <td style={{ padding: "12px 14px", fontWeight: 600 }}>{r.name}</td>
                  <td style={{ padding: "12px 14px" }}><a href={`tel:${r.phone}`}>{r.phone}</a></td>
                  <td style={{ padding: "12px 14px" }}><a href={`mailto:${r.email}`}>{r.email}</a></td>
                  <td style={{ padding: "12px 14px" }}>{r.service || "—"}</td>
                  <td style={{ padding: "12px 14px", maxWidth: 320, color: "var(--muted)" }}>{r.message || "—"}</td>
                  <td style={{ padding: "12px 14px" }}>
                    {r.email_sent ? (
                      <span style={{ color: "var(--teal)" }}>sent</span>
                    ) : r.email_error ? (
                      <span title={r.email_error} style={{ color: "#b3261e" }}>failed</span>
                    ) : (
                      <span style={{ color: "var(--dim)" }}>pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {rows && rows.length === 0 && !note && (
        <p style={{ color: "var(--dim)", fontSize: 14 }}>No enquiries yet.</p>
      )}
    </div>
  );
}
