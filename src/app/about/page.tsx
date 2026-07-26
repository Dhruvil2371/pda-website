import type { Metadata } from "next";
import Image from "next/image";
import { CTABanner } from "@/components/CTABanner";
import { Icon } from "@/components/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us — A modern CA firm from Mahesana",
  description:
    "Founded in 2024 in Mahesana, Gujarat, Purvang Doshi & Associates delivers taxation, audit, corporate and cross-border advisory services to 100+ clients across 4+ countries.",
  alternates: { canonical: `${site.url}/about` },
};

const values = [
  { icon: "shield" as const, name: "Integrity", desc: "Honest advice, always in the client's best interest" },
  { icon: "check" as const, name: "Accuracy", desc: "Meticulous compliance, zero shortcuts" },
  { icon: "clock" as const, name: "Responsiveness", desc: "Fast answers when clients need them most" },
  { icon: "globe" as const, name: "Global Outlook", desc: "Cross-border expertise for a connected world" },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="eyebrow">About Purvang Doshi &amp; Associates</div>
        <h1>A young firm with deep expertise, built to serve clients across India and abroad</h1>
      </section>

      <section className="container section-pad">
        <div className="split">
          <div>
            <div className="eyebrow">Our story</div>
            <h2 style={{ fontSize: 28, marginBottom: 18 }}>Founded in 2024, built on precision and client trust</h2>
            <p style={{ marginBottom: 16, fontSize: 15.5, lineHeight: 1.75 }}>
              Purvang Doshi &amp; Associates was founded in Mahesana, Gujarat, with a simple goal: make high-quality financial and compliance expertise accessible to every kind of client — from individual taxpayers to global companies entering India.
            </p>
            <p style={{ marginBottom: 16, fontSize: 15.5, lineHeight: 1.75 }}>
              In a short time, our 15-member team has grown to serve 100+ clients across 4+ countries, spanning taxation, audit, corporate services, valuation and cross-border advisory.
            </p>
            <p style={{ fontSize: 15.5, lineHeight: 1.75 }}>
              We combine the rigor of traditional chartered accountancy with a modern, responsive way of working — clear communication, fast turnarounds and technology-driven processes.
            </p>
          </div>
          <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", aspectRatio: "5/4" }}>
            <Image
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80"
              alt="Purvang Doshi & Associates office"
              width={1000}
              height={800}
              sizes="(max-width: 900px) 100vw, 45vw"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 72 }}>
        <div className="grid grid-2">
          <article className="card" style={{ padding: 32 }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 20, margin: "0 0 12px" }}>Our Mission</h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.75 }}>
              Empower businesses and individuals with reliable, high-quality financial and advisory services, delivered with integrity and a client-first approach.
            </p>
          </article>
          <article className="card" style={{ padding: 32 }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 20, margin: "0 0 12px" }}>Our Vision</h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.75 }}>
              To be the most trusted CA firm in Gujarat and beyond, a genuine strategic partner in every client&apos;s financial journey.
            </p>
          </article>
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)", padding: "72px 0" }}>
        <div className="container">
          <h2 style={{ textAlign: "center", fontFamily: "var(--font-heading)", fontSize: 26, marginBottom: 36 }}>
            What We Stand For
          </h2>
          <div className="grid grid-4">
            {values.map((v) => (
              <article
                key={v.name}
                style={{ background: "#fff", borderRadius: "var(--radius-md)", padding: 28, textAlign: "center" }}
              >
                <div className="card-icon" style={{ margin: "0 auto 14px" }}>
                  <Icon name={v.icon} s={22} />
                </div>
                <h3 style={{ fontSize: 15, color: "var(--navy)", margin: "0 0 8px" }}>{v.name}</h3>
                <p style={{ fontSize: 13, color: "var(--dim)", lineHeight: 1.6 }}>{v.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          padding: "56px var(--page-pad-x)",
          textAlign: "center",
          gap: 24,
          maxWidth: 1440,
          margin: "0 auto",
        }}
      >
        {[
          ["2024", "Founded"],
          ["15+", "Team members"],
          ["100+", "Clients served"],
          ["4+", "Countries served"],
        ].map(([n, l]) => (
          <div key={l}>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: 34, fontWeight: 700, color: "var(--teal)" }}>{n}</div>
            <div style={{ fontSize: 13, color: "var(--dim)", marginTop: 6 }}>{l}</div>
          </div>
        ))}
      </section>

      <CTABanner title="Want to know more about how we work?" ctaLabel="Talk to Our Team" href="/contact" />
    </>
  );
}
