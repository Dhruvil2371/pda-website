import type { Metadata } from "next";
import { CTABanner } from "@/components/CTABanner";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Insights — Tax & Compliance Updates",
  description:
    "Practical tax, GST, corporate and NRI guidance from the team at Purvang Doshi & Associates. Updates explained simply, without jargon.",
  alternates: { canonical: `${site.url}/insights` },
};

const articles = [
  { tag: "TAXATION", title: "New Tax Regime vs Old Regime: Which Should You Choose in FY 2026-27?", read: "5 min read · Jul 2026" },
  { tag: "CORPORATE", title: "A Founder's Guide to Company Registration in India", read: "6 min read · Jun 2026" },
  { tag: "NRI", title: "NRI Taxation Simplified: DTAA, Repatriation & Capital Gains", read: "7 min read · Jun 2026" },
  { tag: "GST", title: "Common GST Filing Mistakes and How to Avoid Them", read: "4 min read · May 2026" },
  { tag: "GLOBAL", title: "Setting Up in India: A Compliance Checklist for Foreign Companies", read: "8 min read · May 2026" },
  { tag: "CFO INSIGHTS", title: "When Does Your Startup Need a Virtual CFO?", read: "5 min read · Apr 2026" },
];

export default function InsightsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="eyebrow">Insights</div>
        <h1>Tax &amp; compliance updates, explained simply</h1>
        <p className="lede">Practical guidance from our team — no jargon.</p>
      </section>

      <section className="container section-pad">
        <div className="grid grid-3" style={{ gap: 24 }}>
          {articles.map((a) => (
            <article
              key={a.title}
              style={{ background: "var(--bg-soft)", borderRadius: "var(--radius-md)", overflow: "hidden" }}
            >
              <div
                style={{
                  height: 160,
                  background: "linear-gradient(135deg, #cfeae5, #a8dcd3)",
                }}
                aria-hidden="true"
              />
              <div style={{ padding: 22 }}>
                <div style={{ fontSize: 12, color: "var(--teal)", fontWeight: 700, letterSpacing: 0.5, marginBottom: 8 }}>{a.tag}</div>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 16.5, margin: "0 0 10px", color: "var(--navy)", lineHeight: 1.4 }}>
                  {a.title}
                </h2>
                <div style={{ fontSize: 12.5, color: "var(--dim)" }}>{a.read}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTABanner title="Want tax updates delivered to your inbox?" ctaLabel="Subscribe to Insights" href="/contact" />
    </>
  );
}
