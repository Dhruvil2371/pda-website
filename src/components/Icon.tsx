import type { SVGProps } from "react";

type IconName =
  | "coin" | "check" | "briefcase" | "compass" | "chart"
  | "cube" | "wallet" | "cash" | "globe" | "search"
  | "factory" | "building" | "grid" | "medical" | "monitor" | "bag"
  | "phone" | "mail" | "pin" | "clock" | "shield" | "arrow-down"
  | "trophy" | "menu" | "close" | "chevron-right";

const size = 22;

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: switch registry
export function Icon({ name, s = size, ...rest }: { name: IconName; s?: number } & SVGProps<SVGSVGElement>) {
  const common = {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...rest,
  };
  switch (name) {
    case "coin": return <svg {...common}><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
    case "check": return <svg {...common}><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>;
    case "briefcase": return <svg {...common}><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 9h6M9 13h6M9 17h3"/></svg>;
    case "compass": return <svg {...common}><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 8v4l3 2"/></svg>;
    case "chart": return <svg {...common}><path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 5-6"/></svg>;
    case "cube": return <svg {...common}><path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>;
    case "wallet": return <svg {...common}><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 12h.01M18 12h.01"/></svg>;
    case "cash": return <svg {...common}><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M15 9h3M15 13h3M6 17h12"/></svg>;
    case "globe": return <svg {...common}><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z"/></svg>;
    case "search": return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>;
    case "factory": return <svg {...common}><path d="M2 20h20"/><path d="M4 20V10l5-4 5 4v10"/><path d="M14 20v-7l4-3 4 3v7"/></svg>;
    case "building": return <svg {...common}><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/></svg>;
    case "grid": return <svg {...common}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
    case "medical": return <svg {...common}><path d="M20 12H4"/><path d="M12 4v16"/><path d="M6 4a6 6 0 0 1 6 6 6 6 0 0 1 6-6"/></svg>;
    case "monitor": return <svg {...common}><rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>;
    case "bag": return <svg {...common}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
    case "phone": return <svg {...common}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
    case "mail": return <svg {...common}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>;
    case "pin": return <svg {...common}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
    case "clock": return <svg {...common}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>;
    case "shield": return <svg {...common}><path d="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7z"/></svg>;
    case "arrow-down": return <svg {...common}><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 21h16"/></svg>;
    case "trophy": return <svg {...common}><path d="M8 21h8M12 17v4M17 5H7a3 3 0 0 0-3 3v2a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5V8a3 3 0 0 0-3-3Z"/></svg>;
    case "menu": return <svg {...common}><path d="M3 6h18M3 12h18M3 18h18"/></svg>;
    case "close": return <svg {...common}><path d="M18 6 6 18M6 6l12 12"/></svg>;
    case "chevron-right": return <svg {...common}><path d="m9 6 6 6-6 6"/></svg>;
  }
}

export type { IconName };
