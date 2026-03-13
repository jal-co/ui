export interface NavItem {
  title: string
  href: string
  /** Indicates this page documents a bundled export from another registry item. */
  bundledIn?: string
  /** Optional badge shown next to the title (e.g. "New", "Beta"). */
  badge?: string
  /**
   * ISO date string (e.g. "2026-03-12") when the badge was added.
   * Badge auto-hides 14 days after this date. When omitted, badge is permanent.
   */
  badgeAdded?: string
}

/** Number of days a badge stays visible. */
const BADGE_TTL_DAYS = 14

/** Returns the badge text if it should still be shown, or undefined. */
export function getActiveBadge(item: NavItem): string | undefined {
  if (!item.badge) return undefined
  if (!item.badgeAdded) return item.badge

  const added = new Date(item.badgeAdded)
  const expires = new Date(added.getTime() + BADGE_TTL_DAYS * 86_400_000)
  return new Date() < expires ? item.badge : undefined
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
      { title: "Installation", href: "/docs/installation" },
      { title: "Color Themes", href: "/docs/themes" },
    ],
  },
  {
    title: "Code",
    items: [
      { title: "Code Block", href: "/docs/components/code-block" },
      {
        title: "Code Block Command",
        href: "/docs/components/code-block-command",
      },
      { title: "Code Line", href: "/docs/components/code-line" },
    ],
  },
  {
    title: "Docs",
    items: [
      { title: "AI Copy Button", href: "/docs/components/ai-copy-button" },
      { title: "API Reference Table", href: "/docs/components/api-ref-table" },
      { title: "Stepper", href: "/docs/components/stepper", badge: "New", badgeAdded: "2026-03-12" },
    ],
  },
  {
    title: "Open Source",
    items: [
      { title: "Activity Graph", href: "/docs/components/activity-graph" },
      {
        title: "GitHub Stars Button",
        href: "/docs/components/github-stars-button",
      },
      {
        title: "GitHub Button Group",
        href: "/docs/components/github-button-group",
      },
      { title: "npm Badge", href: "/docs/components/npm-badge", badge: "New", badgeAdded: "2026-03-12" },
    ],
  },
  {
    title: "Dev Tools",
    items: [
      { title: "Cron Schedule", href: "/docs/components/cron-schedule" },
      { title: "Env Table", href: "/docs/components/env-table" },
      { title: "JSON Viewer", href: "/docs/components/json-viewer" },
      { title: "Log Viewer", href: "/docs/components/log-viewer" },
      { title: "Request Viewer", href: "/docs/components/request-viewer" },
    ],
  },
  {
    title: "Payments",
    items: [
      { title: "Crypto + Tip Jar", href: "/docs/components/tip-jar" },
    ],
  },
]
