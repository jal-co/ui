export interface NavItem {
  title: string
  href: string
  /** Indicates this page documents a bundled export from another registry item. */
  bundledIn?: string
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export const docsNav: NavGroup[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
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
      { title: "Stepper", href: "/docs/components/stepper" },
    ],
  },
  {
    title: "GitHub",
    items: [
      { title: "Activity Graph", href: "/docs/components/activity-graph" },
      {
        title: "Stars Button",
        href: "/docs/components/github-stars-button",
      },
      {
        title: "Button Group",
        href: "/docs/components/github-button-group",
      },
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
