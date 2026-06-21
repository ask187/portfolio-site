import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aravindsk.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "/", changeFrequency: "monthly", priority: 1.0 },
    { path: "/work", changeFrequency: "monthly", priority: 0.9 },
    { path: "/projects", changeFrequency: "monthly", priority: 0.9 },
    { path: "/about", changeFrequency: "yearly", priority: 0.7 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
