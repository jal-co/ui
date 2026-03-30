import type { MetadataRoute } from "next"
import { docsNav } from "@/lib/docs"
import { source } from "@/lib/source"

const siteUrl = "https://ui.justinlevine.me"

export default function sitemap(): MetadataRoute.Sitemap {
  // Explicit nav routes (existing TSX pages)
  const navRoutes = docsNav.flatMap((group) =>
    group.items.map((item) => item.href)
  )

  // Fumadocs MDX pages
  const mdxRoutes = source.getPages().map((page) => page.url)

  // Deduplicate (some routes may exist in both)
  const allRoutes = [...new Set([...navRoutes, ...mdxRoutes])]

  return allRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }))
}
