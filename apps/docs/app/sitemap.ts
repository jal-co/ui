import type { MetadataRoute } from "next"
import { docsNav } from "@/lib/docs"

const siteUrl = "https://ui.justinlevine.me"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = docsNav.flatMap((group) =>
    group.items.map((item) => item.href)
  )

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }))
}
