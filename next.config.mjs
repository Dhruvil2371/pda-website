/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export so the site can be hosted anywhere (Cloudflare Pages, GitHub Pages, S3, etc.).
  // Enquiries POST to the Google Apps Script URL in NEXT_PUBLIC_SHEETS_URL, so no server needed.
  output: "export",
  // next/image optimization needs a server; use the raw image URLs instead.
  images: { unoptimized: true },
  // Keep trailing slashes off so /services renders as /services/index.html predictably.
  trailingSlash: false,
};
export default nextConfig;
