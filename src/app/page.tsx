import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import { CTABanner } from "@/components/CTABanner";
import { EnquiryForm } from "@/components/EnquiryForm";
import { industries, services, site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Chartered Accountants in Mahesana — Tax, GST, Audit & Advisory",
  description:
    "Purvang Doshi & Associates is a Mahesana-based CA firm serving 100+ clients across India and abroad. Taxation, audit, corporate services, valuation, Virtual CFO and cross-border compliance.",
  alternates: { canonical: site.url },
};

const industryIcons: Record<string, IconName> = {
  "Manufacturing": "factory",
  "Real Estate": "building",
  "Textiles": "grid",
  "Healthcare": "medical",
  "IT & Startups": "monitor",
  "Trading & Retail": "bag",
};

const serviceIcons: Record<string, IconName> = {
  "taxation": "coin",
  "audit": "check",
  "corporate": "briefcase",
  "advisory": "compass",
  "virtual-cfo": "chart",
  "valuation": "cube",
  "loans": "wallet",
  "payroll": "cash",
  "fema": "globe",
  "due-diligence": "search",
};

const testimonials = [
  { quote: "Responsive, knowledgeable and always available for quick guidance. Made our GST transition painless.", name: "Rakesh Shah" },
  { quote: "Guided us through company formation end-to-end, explaining every step clearly. Truly appreciated.", name: "Deepa Brahmakshatriya" },
  { quote: "Great Virtual CFO support, gave us real clarity on cash flow during a critical growth phase.", name: "Akash Bhatt" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className={`${styles.hero} hero`}>
        <div className={`container ${styles.heroInner}`}>
          <div>
            <span className="chip">TRUSTED BY 100+ CLIENTS ACROSS 4 COUNTRIES</span>
            <h1 className={styles.h1}>Tax and compliance made simple, for every kind of business.</h1>
            <p className={styles.lede}>
              From salaried professionals to startups, SMEs, large corporates and foreign companies expanding into India, we handle the numbers so you can focus on growth.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/contact" className="btn-primary">Get a Callback</Link>
              <Link href="/services" className="btn-secondary">Explore Services</Link>
            </div>
            <dl className={styles.stats}>
              <div><dt>15+</dt><dd>Team members</dd></div>
              <div><dt>100+</dt><dd>Clients served</dd></div>
              <div><dt>10+</dt><dd>Service areas</dd></div>
            </dl>
          </div>
          <div className={styles.heroImg}>
            <Image
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80"
              alt="Purvang Doshi & Associates team at work"
              width={1000}
              height={800}
              priority
              sizes="(max-width: 900px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className={`container section-pad`}>
        <div className="split">
          <div>
            <div className="eyebrow">About us</div>
            <h2 className={styles.h2}>A modern CA firm built for founders, families and global clients</h2>
            <p className={styles.body}>
              Founded in 2024 and based in Mahesana, Purvang Doshi &amp; Associates is a 15-member team delivering taxation, audit, corporate and advisory services, with 100+ clients across India and abroad.
            </p>
            <p className={styles.body}>
              We also support foreign companies entering India with FEMA/RBI compliance and cross-border tax structuring, so growth never gets stuck in paperwork.
            </p>
            <Link href="/about" className={styles.inlineLink}>Learn about our firm →</Link>
          </div>
          <div className={styles.aboutImg}>
            <Image
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
              alt="CA team reviewing financial documents"
              width={900}
              height={720}
              sizes="(max-width: 900px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      {/* Industries strip */}
      <section className={styles.industries}>
        <div className="container">
          <h2 className={styles.sectionHead}>Industries We Serve</h2>
          <p className={styles.sectionSub}>Deep sector experience across a wide range of businesses</p>
          <div className={`grid grid-6 ${styles.industryGrid}`}>
            {industries.map((it) => (
              <Link href="/industries" key={it.name} className={styles.industryTile}>
                <div className="card-icon"><Icon name={industryIcons[it.name] || "grid"} s={22} /></div>
                <div className={styles.industryName}>{it.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className={`container ${styles.overview}`}>
        <div><span>100+</span><small>Clients</small></div>
        <div><span>15+</span><small>Team members</small></div>
        <div><span>2024</span><small>Founded</small></div>
        <div><span>4+</span><small>Countries</small></div>
      </section>

      {/* Mission / Vision */}
      <section className="container" style={{ paddingBottom: 72 }}>
        <div className="grid grid-2">
          <article className="card" style={{ padding: 32 }}>
            <h3 className={styles.h3}>Our Mission</h3>
            <p style={{ marginTop: 12 }}>Empower businesses and individuals with reliable, high-quality financial and advisory services, delivered with integrity and a client-first approach.</p>
          </article>
          <article className="card" style={{ padding: 32 }}>
            <h3 className={styles.h3}>Our Vision</h3>
            <p style={{ marginTop: 12 }}>To be the most trusted CA firm in Gujarat and beyond, a genuine strategic partner in every client&apos;s financial journey.</p>
          </article>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-pad">
        <div className="container">
          <h2 className={styles.sectionHead}>What we help you with</h2>
          <p className={styles.sectionSub}>Pick a service to see how we can support you</p>
          <div className={`grid grid-5 ${styles.serviceGrid}`}>
            {services.map((s) => (
              <Link key={s.slug} href={`/services#${s.slug}`} className={styles.svcTile}>
                <div className="card-icon" style={{ borderRadius: 10, width: 40, height: 40 }}>
                  <Icon name={serviceIcons[s.slug] || "coin"} s={20} />
                </div>
                <div className={styles.svcName}>{s.name}</div>
                <div className={styles.svcShort}>{s.short}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Looking for an experienced partner to grow your business?"
        ctaLabel="Contact Us Today"
        href="/contact"
      />

      {/* Testimonials */}
      <section className="container section-pad">
        <h2 className={styles.sectionHead}>What Our Clients Say</h2>
        <p className={styles.sectionSub}>Transparency, Accuracy, Trust</p>
        <div className="grid grid-3" style={{ marginTop: 8 }}>
          {testimonials.map((t) => (
            <figure key={t.name} className={styles.quoteCard}>
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption>{t.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Contact / callback */}
      <section className={styles.contactStrip}>
        <div className={`container ${styles.contactInner}`}>
          <div>
            <div className="eyebrow">Get in touch</div>
            <h2 className={styles.h2}>We&apos;ll Call You Back Within 30 Minutes</h2>
            <p className={styles.body}>
              Share a few details, or call us directly at{" "}
              <a href={`tel:${site.phoneRaw}`} style={{ color: "var(--navy)", fontWeight: 700 }}>{site.phone}</a>.
              Mon to Sat, 9am to 6pm.
            </p>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
