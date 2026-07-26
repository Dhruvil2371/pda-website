import { site } from "@/lib/site";
import styles from "./WhatsAppButton.module.css";

export function WhatsAppButton() {
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hi, I would like to enquire about your services."
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.btn}
      aria-label="Chat on WhatsApp"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.5 3.5A11 11 0 0 0 3.6 17.3L2 22l4.9-1.6A11 11 0 1 0 20.5 3.5Zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-2.9 1 1-2.8-.2-.3A9 9 0 1 1 12 20.5Zm5.1-6.7c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.2-.7.9-.8 1c-.2.2-.3.2-.6.1s-1.3-.5-2.4-1.5c-.9-.8-1.5-1.8-1.7-2.1s0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5s0-.4 0-.5-.6-1.5-.9-2.1-.5-.5-.6-.5h-.5c-.2 0-.5.1-.7.4s-.9.9-.9 2.2.9 2.6 1 2.8 1.8 2.7 4.3 3.8c.6.3 1.1.4 1.4.5.6.2 1.1.2 1.6.1.5-.1 1.6-.6 1.8-1.3s.2-1.2.1-1.3-.2-.2-.5-.3Z"/>
      </svg>
    </a>
  );
}
