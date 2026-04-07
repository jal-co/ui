import { getLatestRelease } from "@/lib/releases"

export interface NavItem {
  title: string
  href: string
  /** Indicates this page documents a bundled export from another registry item. */
  bundledIn?: string
  /** Optional badge shown next to the title (e.g. "New", "Beta"). Prefer omitting — badges are now auto-derived from the latest release. */
  badge?: string
  /** ISO date string when the component was first added to the registry. */
  dateAdded?: string
}

/** Component slugs from the latest release — these get the "New" badge. */
const latestReleaseSlugs = new Set(
  getLatestRelease().components.map((c) => c.name)
)

/** Returns "New" if the component is part of the latest release, or the manual badge if set. */
export function getActiveBadge(item: NavItem): string | undefined {
  if (item.badge) return item.badge
  const slug = item.href.split("/").pop() ?? ""
  return latestReleaseSlugs.has(slug) ? "New" : undefined
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export const docsNav: NavGroup[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Components", href: "/docs" },
      { title: "Releases", href: "/docs/releases" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Color Themes", href: "/docs/themes" },
      { title: "llms.txt", href: "/llms.txt" },
    ],
  },
  {
    title: "Code",
    items: [
      { title: "Code Block", href: "/docs/components/code-block", dateAdded: "2026-03-11" },
      { title: "Diff Viewer", href: "/docs/components/diff-viewer", dateAdded: "2026-03-24" },
      {
        title: "Code Block Command",
        href: "/docs/components/code-block-command",
        dateAdded: "2026-03-11",
      },
      { title: "Code Line", href: "/docs/components/code-line", dateAdded: "2026-03-11" },
    ],
  },
  {
    title: "Docs",
    items: [
      { title: "AI Copy Button", href: "/docs/components/ai-copy-button", dateAdded: "2026-03-11" },
      { title: "Kbd", href: "/docs/components/kbd", dateAdded: "2026-03-24" },
      { title: "API Reference Table", href: "/docs/components/api-ref-table", dateAdded: "2026-03-11" },
      { title: "File Tree", href: "/docs/components/file-tree", dateAdded: "2026-03-17" },
      { title: "Stepper", href: "/docs/components/stepper", dateAdded: "2026-03-12" },
      { title: "Color Palette", href: "/docs/components/color-palette", dateAdded: "2026-03-29" },
    ],
  },
  {
    title: "Open Source",
    items: [
      { title: "Activity Graph", href: "/docs/components/activity-graph", dateAdded: "2026-03-11" },
      {
        title: "GitHub Stars Button",
        href: "/docs/components/github-stars-button",
        dateAdded: "2026-03-10",
      },
      {
        title: "GitHub Button Group",
        href: "/docs/components/github-button-group",
        dateAdded: "2026-03-11",
      },
      { title: "npm Badge", href: "/docs/components/npm-badge", dateAdded: "2026-03-12" },
      { title: "Product Hunt", href: "/docs/components/producthunt-button", dateAdded: "2026-03-12" },
      { title: "Contributor Grid", href: "/docs/components/contributor-grid", dateAdded: "2026-03-29" },
      { title: "Commit Graph", href: "/docs/components/commit-graph", dateAdded: "2026-03-29" },
      { title: "License Badge", href: "/docs/components/license-badge", dateAdded: "2026-03-29" },
      { title: "Repo Card", href: "/docs/components/repo-card", dateAdded: "2026-03-29" },
    ],
  },
  {
    title: "Dev Tools",
    items: [
      { title: "Cron Schedule", href: "/docs/components/cron-schedule", dateAdded: "2026-03-11" },
      { title: "Env Table", href: "/docs/components/env-table", dateAdded: "2026-03-11" },
      { title: "JSON Viewer", href: "/docs/components/json-viewer", dateAdded: "2026-03-11" },
      { title: "Log Viewer", href: "/docs/components/log-viewer", dateAdded: "2026-03-11" },
      { title: "Request Viewer", href: "/docs/components/request-viewer", dateAdded: "2026-03-11" },
    ],
  },
  {
    title: "Marketing",
    items: [
      { title: "Logo Cloud", href: "/docs/components/logo-cloud", dateAdded: "2026-03-29" },
      { title: "Testimonial", href: "/docs/components/testimonial", dateAdded: "2026-03-29" },
    ],
  },
  {
    title: "Infrastructure",
    items: [
      { title: "Status Indicator", href: "/docs/components/status-indicator", dateAdded: "2026-03-29" },
    ],
  },
  {
    title: "Payments",
    items: [
      { title: "Crypto + Tip Jar", href: "/docs/components/tip-jar", dateAdded: "2026-03-11" },
    ],
  },
  {
    title: "Pretext",
    items: [
      { title: "Pretext Hooks", href: "/docs/components/pretext", dateAdded: "2026-04-07" },
      { title: "Pretext Balanced Text", href: "/docs/components/balanced-text", dateAdded: "2026-04-07" },
      { title: "Pretext Chat Bubble", href: "/docs/components/chat-bubble", dateAdded: "2026-04-07" },
      { title: "Pretext Masonry Grid", href: "/docs/components/masonry-grid", dateAdded: "2026-04-07" },
      { title: "Pretext Testimonial Masonry", href: "/docs/components/pretext-testimonial", dateAdded: "2026-04-07" },
      { title: "Pretext Text Highlight", href: "/docs/components/text-highlight", dateAdded: "2026-04-07" },
    ],
  },
]
