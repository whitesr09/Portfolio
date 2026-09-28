import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://nshd-portfolio.vercel.app";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: `${base}/work/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8
    }))
  ];
}
