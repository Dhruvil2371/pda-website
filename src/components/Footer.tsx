import Link from "next/link";
import { site } from "@/lib/site";
import { LogoMark } from "./Logo";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div>
            <div className={styles.brandRow}>
              <LogoMark size={38} />
              <div className={styles.brand}>{site.name}</div>
            </div>
            <p className={styles.blurb}>
              Chartered Accountants based in Mahesana, providing taxation, audit, corporate and advisory services to individuals, SMEs, corporates, NRIs and foreign entities.
            </p>
          </div>
          <div>
            <div className={styles.head}>SERVICES</div>
            <ul className={styles.list}>
              <li><Link href="/services#taxation">Taxation</Link></li>
              <li><Link href="/services#audit">Audit &amp; Assurance</Link></li>
              <li><Link href="/services#corporate">Corporate Services</Link></li>
              <li><Link href="/services#virtual-cfo">Virtual CFO</Link></li>
              <li><Link href="/services#advisory">Advisory</Link></li>
            </ul>
          </div>
          <div>
            <div className={styles.head}>QUICK LINKS</div>
            <ul className={styles.list}>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/team">Our Team</Link></li>
              <li><Link href="/resources">Resources</Link></li>
              <li><Link href="/insights">Insights</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <div className={styles.head}>GET IN TOUCH</div>
            <ul className={styles.list}>
              <li>Mahesana, Gujarat, India</li>
              <li><a href={`tel:${site.phoneRaw}`}>{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>&copy; {new Date().getFullYear()} {site.name}, Chartered Accountants. All Rights Reserved.</span>
          <span>Terms &amp; Conditions · Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
}
