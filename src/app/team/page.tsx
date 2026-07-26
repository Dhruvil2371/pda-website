import type { Metadata } from "next";
import Image from "next/image";
import { CTABanner } from "@/components/CTABanner";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the 15-member team at Purvang Doshi & Associates — chartered accountants, tax specialists, audit associates and compliance executives serving clients across India and abroad.",
  alternates: { canonical: `${site.url}/team` },
};

const leadership = [
  {
    name: "CA Purvang Doshi",
    role: "Founder & Managing Partner",
    bio: "Leads taxation, audit and cross-border advisory engagements for the firm's corporate clients.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "CA Partner Name",
    role: "Partner — Audit & Assurance",
    bio: "Oversees statutory and internal audit practice across manufacturing and real estate clients.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "CA Partner Name",
    role: "Partner — Corporate & Advisory",
    bio: "Heads corporate services, FEMA/RBI compliance and Virtual CFO engagements.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80",
  },
];

const team = [
  { name: "Team Member", role: "Tax Associate", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" },
  { name: "Team Member", role: "Audit Associate", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" },
  { name: "Team Member", role: "Compliance Executive", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
  { name: "Team Member", role: "Accounts Executive", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80" },
  { name: "Team Member", role: "Article Assistant", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" },
  { name: "Team Member", role: "Client Relations", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80" },
];

export default function TeamPage() {
  return (
    <>
      <section className="page-hero">
        <div className="eyebrow">Our team</div>
        <h1>15 professionals, one client-first standard</h1>
        <p className="lede">Meet the people behind your compliance and advisory work.</p>
      </section>

      <section className="container section-pad">
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 22, margin: "0 0 28px" }}>Leadership</h2>
        <div className="grid grid-3">
          {leadership.map((p) => (
            <article key={p.name + p.role} style={{ background: "var(--bg-soft)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
              <div style={{ aspectRatio: "5/4", position: "relative" }}>
                <Image src={p.img} alt={`${p.name}, ${p.role}`} fill sizes="(max-width: 900px) 100vw, 33vw" style={{ objectFit: "cover" }} />
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 17, fontWeight: 700, color: "var(--navy)" }}>{p.name}</div>
                <div style={{ fontSize: 13, color: "var(--teal)", fontWeight: 600, margin: "4px 0 10px" }}>{p.role}</div>
                <p style={{ fontSize: 13, color: "var(--dim)", lineHeight: 1.65 }}>{p.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 72 }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 22, margin: "0 0 28px" }}>Our Team</h2>
        <div className="grid grid-6" style={{ gap: 18 }}>
          {team.map((p, i) => (
            <div key={p.role + i} style={{ textAlign: "center" }}>
              <div style={{ width: 88, height: 88, borderRadius: "50%", overflow: "hidden", position: "relative", margin: "0 auto 10px" }}>
                <Image src={p.img} alt={p.role} fill sizes="88px" style={{ objectFit: "cover" }} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>{p.name}</div>
              <div style={{ fontSize: 11.5, color: "var(--dim)" }}>{p.role}</div>
            </div>
          ))}
        </div>
      </section>

      <CTABanner title="Interested in joining our team?" ctaLabel="View Careers" href="/careers" />
    </>
  );
}
