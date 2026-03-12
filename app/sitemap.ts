import type { MetadataRoute } from "next"

const siteUrl = "https://ui.justinlevine.me"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/docs",
    "/docs/installation",
    "/docs/components/activity-graph",
    "/docs/components/ai-copy-button",
    "/docs/components/api-ref-table",
    "/docs/components/code-block",
    "/docs/components/code-block-command",
    "/docs/components/code-line",
    "/docs/components/github-button-group",
    "/docs/components/github-stars-button",
    "/docs/components/request-viewer",
    "/docs/components/tip-jar",
  ]

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }))
}
