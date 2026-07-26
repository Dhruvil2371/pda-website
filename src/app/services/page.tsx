import type { Metadata } from "next";
import Link from "next/link";
import { CTABanner } from "@/components/CTABanner";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import { services, site } from "@/lib/site";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Services — Tax, Audit, Corporate & Advisory",
  description:
    "A complete suite of financial and compliance services from Purvang Doshi & Associates: taxation, audit, corporate services, Virtual CFO, business valuation, FEMA/RBI, payroll and cross-border advisory.",
  alternates: { canonical: `${site.url}/services` },
};

const iconByService: Record<string, IconName> = {
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

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="eyebrow">Our services</div>
        <h1>A complete suite of financial &amp; compliance services</h1>
        <p className="lede">For individuals, startups, SMEs, large corporates, NRIs and foreign companies entering India.</p>
      </section>

      <section className="container section-pad">
        <ol className={styles.list}>
          {services.map((s) => (
            <li key={s.slug} id={s.slug} className={styles.row}>
              <div className={styles.iconWrap}>
                <Icon name={iconByService[s.slug] || "coin"} s={26} />
              </div>
              <div>
                <h2 className={styles.name}>{s.name}</h2>
                <p className={styles.desc}>{s.long}</p>
              </div>
              <Link href={`/contact?service=${encodeURIComponent(s.name)}`} className={styles.tag}>
                Enquire →
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <CTABanner
        title="Not sure which service you need?"
        ctaLabel="Book a Free Consultation"
        href="/contact"
      />
    </>
  );
}
