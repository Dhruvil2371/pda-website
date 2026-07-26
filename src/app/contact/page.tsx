import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Icon } from "@/components/Icon";
import { site } from "@/lib/site";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Talk to Purvang Doshi & Associates about your taxation, audit, corporate or advisory needs. We typically respond within 30 minutes during business hours.",
  alternates: { canonical: `${site.url}/contact` },
};

const items = [
  { icon: "phone" as const, label: "Phone", value: site.phone, href: `tel:${site.phoneRaw}` },
  { icon: "mail" as const, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: "pin" as const, label: "Office", value: "Mahesana, Gujarat, India" },
  { icon: "clock" as const, label: "Working Hours", value: site.hours },
];

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="eyebrow">Contact us</div>
        <h1>Let&apos;s talk about your finances</h1>
        <p className="lede">We typically respond within 30 minutes during business hours.</p>
      </section>

      <section className="container section-pad">
        <div className={styles.grid}>
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 20, margin: "0 0 24px" }}>Get in Touch</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 22 }}>
              {items.map((it) => (
                <li key={it.label} style={{ display: "flex", gap: 16 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: "var(--teal-soft)",
                      color: "var(--teal)",
                      flex: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon name={it.icon} s={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)" }}>{it.label}</div>
                    {it.href ? (
                      <a href={it.href} style={{ fontSize: 14, color: "var(--muted)" }}>{it.value}</a>
                    ) : (
                      <div style={{ fontSize: 14, color: "var(--muted)" }}>{it.value}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 32, borderRadius: 16, height: 240, overflow: "hidden" }}>
              <iframe
                title="Mahesana, Gujarat"
                src="https://www.google.com/maps?q=Mahesana%2C%20Gujarat%2C%20India&output=embed"
                style={{ width: "100%", height: "100%", border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className={styles.formCard}>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
