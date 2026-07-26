import type { Metadata } from "next";
import { CTABanner } from "@/components/CTABanner";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import { industries, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Sector expertise across manufacturing, real estate, textiles, healthcare, IT & startups, and trading & retail — with hands-on knowledge of each industry's compliance quirks.",
  alternates: { canonical: `${site.url}/industries` },
};

const iconByIndustry: Record<string, IconName> = {
  "Manufacturing": "factory",
  "Real Estate": "building",
  "Textiles": "grid",
  "Healthcare": "medical",
  "IT & Startups": "monitor",
  "Trading & Retail": "bag",
};

export default function IndustriesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="eyebrow">Industries we serve</div>
        <h1>Sector expertise across a wide range of businesses</h1>
        <p className="lede">Every industry has its own compliance quirks — we bring hands-on experience to each one.</p>
      </section>

      <section className="container section-pad">
        <div className="grid grid-3">
          {industries.map((it) => (
            <article key={it.name} className="card" style={{ padding: 32 }}>
              <div className="card-icon" style={{ width: 48, height: 48, marginBottom: 16 }}>
                <Icon name={iconByIndustry[it.name] || "grid"} s={24} />
              </div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 18, margin: "0 0 8px", color: "var(--navy)" }}>{it.name}</h2>
              <p style={{ fontSize: 13.5, color: "var(--dim)", lineHeight: 1.65 }}>{it.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <CTABanner
        title="Don't see your industry listed?"
        ctaLabel="Tell Us About Your Business"
        href="/contact"
      />
    </>
  );
}
