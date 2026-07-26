"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/site";
import { Icon } from "./Icon";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.wrap}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label={site.name}>
          Purvang Doshi <span>&amp; Associates</span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? styles.linkActive : styles.link}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/contact" className={styles.cta}>Book a Free Call</Link>

        <button
          type="button"
          className={styles.menuBtn}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} s={22} />
        </button>
      </div>

      {open && (
        <nav className={styles.mobileNav} aria-label="Mobile">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? styles.mLinkActive : styles.mLink}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className={styles.mCta} onClick={() => setOpen(false)}>
            Book a Free Call
          </Link>
        </nav>
      )}
    </header>
  );
}
