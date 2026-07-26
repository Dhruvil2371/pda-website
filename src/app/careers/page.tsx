import type { Metadata } from "next";
import Link from "next/link";
import { CTABanner } from "@/components/CTABanner";
import { Icon } from "@/components/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Purvang Doshi & Associates — open positions for Articled Assistants, Audit Associates and Tax Consultants in Mahesana. Real client exposure and fast career growth.",
  alternates: { canonical: `${site.url}/careers` },
};

const perks = [
  { icon: "cube" as const, name: "Real Client Exposure", desc: "Work directly on taxation, audit and advisory engagements — not just back-office tasks." },
  { icon: "chart" as const, name: "Fast Growth", desc: "A young, growing firm means faster responsibility and career progression." },
  { icon: "medical" as const, name: "Mentorship", desc: "Direct guidance from partners on every significant engagement." },
];

const roles = [
  { title: "Articled Assistant", meta: "Mahesana, Full-time · Under CA article training" },
  { title: "Audit Associate", meta: "Mahesana, Full-time · 1–3 years experience" },
  { title: "Tax Consultant", meta: "Mahesana, Full-time · GST & income tax" },
];

export default function CareersPage() {
  return (
    <>
      <section className="page-hero">
        <div className="eyebrow">Careers</div>
        <h1>Build your career with a fast-growing CA firm</h1>
        <p className="lede">We&apos;re always looking for driven articled assistants and qualified CAs.</p>
      </section>

      <section className="container section-pad">
        <div className="grid grid-3">
          {perks.map((p) => (
            <article key={p.name} className="card" style={{ padding: 28 }}>
              <div className="card-icon"><Icon name={p.icon} s={22} /></div>
              <h2 style={{ fontSize: 15, color: "var(--navy)", margin: "0 0 8px" }}>{p.name}</h2>
              <p style={{ fontSize: 13, color: "var(--dim)", lineHeight: 1.6 }}>{p.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 72 }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 22, margin: "0 0 28px" }}>Open Positions</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
          {roles.map((r) => (
            <li
              key={r.title}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                background: "var(--bg-soft)",
                borderRadius: 14,
                padding: "22px 28px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>{r.title}</div>
                <div style={{ fontSize: 13, color: "var(--dim)" }}>{r.meta}</div>
              </div>
              <Link
                href={`/contact?service=${encodeURIComponent("Careers — " + r.title)}`}
                style={{ color: "var(--teal)", fontWeight: 600, fontSize: 13.5, whiteSpace: "nowrap" }}
              >
                Apply →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CTABanner title="Don't see the right role?" ctaLabel="Send Us Your Resume" href="/contact" />
    </>
  );
}
