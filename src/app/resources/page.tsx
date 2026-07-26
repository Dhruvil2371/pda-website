import type { Metadata } from "next";
import { CTABanner } from "@/components/CTABanner";
import { Icon } from "@/components/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources — Calculators, Checklists & Guides",
  description:
    "Free tools from Purvang Doshi & Associates: income tax calculator, EMI calculator, tax due-date calendar, company registration checklist and NRI taxation guide.",
  alternates: { canonical: `${site.url}/resources` },
};

const calculators = [
  {
    title: "Income Tax Calculator (FY 2025-26)",
    rows: [
      ["Annual Income", "₹ 10,00,000"],
      ["Tax Regime", "New Regime"],
    ],
    cta: "Calculate Tax",
  },
  {
    title: "EMI Calculator",
    rows: [
      ["Loan Amount", "₹ 25,00,000"],
      ["Interest Rate / Tenure", "8.5% / 20 yrs"],
    ],
    cta: "Calculate EMI",
  },
];

const downloads = [
  { title: "Tax Due-Date Calendar 2026", desc: "All GST & income tax deadlines for the year" },
  { title: "Company Registration Checklist", desc: "Documents needed to incorporate in India" },
  { title: "NRI Taxation Guide", desc: "DTAA, repatriation & capital gains basics" },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="eyebrow">Resources</div>
        <h1>Calculators, checklists and due-date reminders</h1>
        <p className="lede">Free tools to help you plan ahead — no login required.</p>
      </section>

      <section className="container section-pad">
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 22, margin: "0 0 28px" }}>Calculators</h2>
        <div className="grid grid-2">
          {calculators.map((c) => (
            <article key={c.title} className="card" style={{ padding: 32 }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 18, color: "var(--navy)", margin: "0 0 18px" }}>{c.title}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {c.rows.map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 13.5, color: "var(--muted)" }}>{k}</span>
                    <div
                      style={{
                        minWidth: 180,
                        border: "1px solid var(--line)",
                        borderRadius: 8,
                        padding: "10px 12px",
                        color: "var(--dim)",
                        fontSize: 13.5,
                        background: "#fff",
                      }}
                    >
                      {v}
                    </div>
                  </div>
                ))}
                <button type="button" className="btn-primary" style={{ marginTop: 6 }}>{c.cta}</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 72 }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 22, margin: "0 0 28px" }}>Downloadable Resources</h2>
        <div className="grid grid-3">
          {downloads.map((d) => (
            <article
              key={d.title}
              className="card"
              style={{ padding: 26, display: "flex", gap: 16, alignItems: "flex-start" }}
            >
              <div className="card-icon" style={{ borderRadius: 10, flex: "none", marginBottom: 0 }}>
                <Icon name="arrow-down" s={20} />
              </div>
              <div>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>{d.title}</div>
                <div style={{ fontSize: 12.5, color: "var(--dim)" }}>{d.desc}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTABanner title="Need help interpreting the numbers?" ctaLabel="Talk to an Expert" href="/contact" />
    </>
  );
}
