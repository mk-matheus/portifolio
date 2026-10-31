import { MetadataRoute } from "next"
import { projects } from "@/data/projects"
import { profile } from "@/data/profile"

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${profile.siteUrl}/projetos/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p.featured ? 0.8 : 0.6,
  }))

  return [
    {
      url: profile.siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...projectEntries,
  ]
}
