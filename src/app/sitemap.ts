import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/lib/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const alt = (p: string) => ({ languages: { en: `${site.url}/en/${p}`, id: `${site.url}/id/${p}`, "x-default": `${site.url}/en/${p}` } });
  return [
    { url: `${site.url}/en/`, alternates: alt(""), changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${site.url}/en/work/${p.slug}/`,
      alternates: alt(`work/${p.slug}/`),
      changeFrequency: "yearly" as const,
      priority: p.highlight ? 0.8 : 0.5,
    })),
  ];
}
