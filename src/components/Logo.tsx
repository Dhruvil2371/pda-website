export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden="true"
      style={{ flex: "none", display: "block" }}
    >
      <rect width="64" height="64" rx="14" ry="14" fill="#0e2f3c" />
      <text
        x="32"
        y="42"
        fontFamily="'Poppins','Segoe UI','Arial Black',Arial,sans-serif"
        fontSize="30"
        fontWeight="800"
        letterSpacing="-1"
        fill="#ffffff"
        textAnchor="middle"
      >
        PD
      </text>
      <rect x="18" y="50" width="28" height="4" rx="2" ry="2" fill="#12897d" />
    </svg>
  );
}
