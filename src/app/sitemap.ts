import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const routes = [
  { path: "/", priority: 1.0 },
  { path: "/services", priority: 0.9 },
  { path: "/industries", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/team", priority: 0.7 },
  { path: "/resources", priority: 0.6 },
  { path: "/insights", priority: 0.6 },
  { path: "/careers", priority: 0.5 },
  { path: "/contact", priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: r.priority,
  }));
}
