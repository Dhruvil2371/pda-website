import Link from "next/link";
import styles from "./CTABanner.module.css";

export function CTABanner({
  title,
  ctaLabel = "Contact Us",
  href = "/contact",
}: {
  title: string;
  ctaLabel?: string;
  href?: string;
}) {
  return (
    <section className={styles.wrap}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{title}</h2>
        <Link href={href} className={styles.btn}>{ctaLabel}</Link>
      </div>
    </section>
  );
}
