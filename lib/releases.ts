export interface ReleaseComponent {
  /** Registry item name (slug). */
  name: string
  /** Display title. */
  title: string
  /** One-line description. */
  description: string
  /** Category for grouping (e.g. "Code", "Open Source"). */
  category: string
}

export interface ReleaseImprovement {
  /** Short title. */
  title: string
  /** Description of the change. */
  description: string
}

export interface Release {
  /** CalVer version (e.g. "2026.03.0"). */
  version: string
  /** Release date as ISO string (YYYY-MM-DD). */
  date: string
  /** Short title for the release. */
  title: string
  /** 1-3 sentence intro written by you. Supports basic markdown. */
  summary: string
  /** New components in this release. */
  components: ReleaseComponent[]
  /** Non-component improvements, fixes, infra changes. */
  improvements?: ReleaseImprovement[]
}

export const releases: Release[] = [
  {
    version: "2026.03.1",
    date: "2026-03-29",
    title: "Batch 1",
    summary:
      "This one's been a big push — ten new components across marketing, open source, infra, and design system tooling. The screenshot utility also got a full rebuild so I'm not manually adjusting scale sliders for every single component anymore. Marquee loops actually loop now, which is nice.",
    components: [
      {
        name: "status-indicator",
        title: "Status Indicator",
        description:
          "Operational status badge with colored dot and label for dashboards, status pages, and header bars.",
        category: "Infrastructure",
      },
      {
        name: "contributor-grid",
        title: "Contributor Grid",
        description:
          "GitHub contributor display with avatar grid and detailed list layouts. Async server component with ISR caching.",
        category: "Open Source",
      },
      {
        name: "commit-graph",
        title: "Commit Graph",
        description:
          "Git commit history as a vertical timeline with hashes, messages, author avatars, branch rails, and merge lines.",
        category: "Open Source",
      },
      {
        name: "logo-cloud",
        title: "Logo Cloud",
        description:
          '"Trusted by" logo display with static grid and infinite-scroll marquee layouts.',
        category: "Marketing",
      },
      {
        name: "testimonial",
        title: "Testimonial",
        description:
          "Customer testimonial display with standalone card, responsive grid, and infinite-scroll marquee layouts.",
        category: "Marketing",
      },
      {
        name: "license-badge",
        title: "License Badge",
        description:
          "Software license badge with SPDX identifier, category color-coding, and OSI-approved indicator. Three layouts: inline pill, segmented row, and expanded card.",
        category: "Open Source",
      },
      {
        name: "repo-card",
        title: "Repo Card",
        description:
          "GitHub repository preview card with description, language dot, star and fork counts, license, and topic tags.",
        category: "Open Source",
      },
      {
        name: "color-palette",
        title: "Color Palette",
        description:
          "Color swatch display with name, hex/hsl/rgb values, and click-to-copy. Grid and horizontal scale strip layouts for design system documentation.",
        category: "Docs",
      },
    ],
    improvements: [
      {
        title: "Screenshot tool overhaul",
        description:
          "Auto-scaling, missing file detection with filter controls, Save Missing button, and html2canvas-pro for oklch() support.",
      },
      {
        title: "Seamless marquee loops",
        description:
          "Fixed gap mismatches in testimonial and logo-cloud marquees that caused visible jumps at the loop point.",
      },
      {
        title: "Runner-agnostic codegen",
        description:
          "Preview import codegen now runs from next.config.ts — works with bun dev, pnpm dev, or any runner.",
      },
      {
        title: "Local preview assets",
        description:
          "Downloaded avatars and logos locally to eliminate CORS issues in screenshot capture.",
      },
    ],
  },
  {
    version: "2026.03.0",
    date: "2026-03-24",
    title: "Initial Release",
    summary:
      "The first real drop. Twenty components I'd been building across a bunch of projects, cleaned up and published through a shadcn-compatible registry. Code blocks, dev tools, GitHub badges, documentation primitives — basically everything I kept re-building from scratch and finally decided to just ship properly.",
    components: [
      {
        name: "code-block",
        title: "Code Block",
        description:
          "Syntax-highlighted code block with bundled language icon, copy button, and optional scrollable or collapsible overflow.",
        category: "Code",
      },
      {
        name: "code-block-command",
        title: "Code Block Command",
        description:
          "Tabbed CLI command block with package manager switching, bundled SVG icons, copy button, and localStorage persistence.",
        category: "Code",
      },
      {
        name: "code-line",
        title: "Code Line",
        description:
          "Compact single-line code snippet with syntax highlighting and an inline copy button.",
        category: "Code",
      },
      {
        name: "diff-viewer",
        title: "Diff Viewer",
        description:
          "Code diff viewer with line numbers and add/remove coloring. Supports unified and split layouts.",
        category: "Code",
      },
      {
        name: "ai-copy-button",
        title: "AI Copy Button",
        description:
          "Split button with a primary copy action and a dropdown of AI destinations.",
        category: "Docs",
      },
      {
        name: "kbd",
        title: "Kbd",
        description:
          "Keyboard shortcut key rendered as a styled keycap. Three visual profiles and multiple mechanical keyboard color schemes.",
        category: "Docs",
      },
      {
        name: "api-ref-table",
        title: "API Reference Table",
        description:
          "Expandable prop reference table with color-coded types, optional descriptions, and full-type details.",
        category: "Docs",
      },
      {
        name: "file-tree",
        title: "File Tree",
        description:
          "Collapsible file and folder tree with file-type icons, highlights, and configurable depth.",
        category: "Docs",
      },
      {
        name: "stepper",
        title: "Stepper",
        description:
          "Numbered step-by-step layout with vertical connector lines, auto-incrementing steps, and nested content.",
        category: "Docs",
      },
      {
        name: "activity-graph",
        title: "Activity Graph",
        description:
          "GitHub-style activity heatmap that visualizes daily counts as a color-intensity grid.",
        category: "Open Source",
      },
      {
        name: "github-stars-button",
        title: "GitHub Stars Button",
        description:
          "Link button showing a GitHub repo's star count with the octocat icon. Async server component.",
        category: "Open Source",
      },
      {
        name: "github-button-group",
        title: "GitHub Button Group",
        description:
          "Segmented button group displaying multiple GitHub repo metrics with per-segment links.",
        category: "Open Source",
      },
      {
        name: "npm-badge",
        title: "npm Badge",
        description:
          "Live npm package badge showing version, weekly downloads, license, and last publish date. Three layouts.",
        category: "Open Source",
      },
      {
        name: "producthunt-button",
        title: "Product Hunt Button",
        description:
          "Link button showing a Product Hunt post's upvote count with the PH cat icon.",
        category: "Open Source",
      },
      {
        name: "cron-schedule",
        title: "Cron Schedule",
        description:
          "Visual cron expression display with field breakdown, human-readable summary, and next-run preview.",
        category: "Dev Tools",
      },
      {
        name: "env-table",
        title: "Env Table",
        description:
          "Read-only environment variable table with masked values, click-to-reveal, per-row copy, and required indicators.",
        category: "Dev Tools",
      },
      {
        name: "json-viewer",
        title: "JSON Viewer",
        description:
          "Collapsible, syntax-colored JSON tree with path copying, search, expand/collapse, and configurable depth.",
        category: "Dev Tools",
      },
      {
        name: "log-viewer",
        title: "Log Viewer",
        description:
          "Scrollable log output component for displaying streaming logs or CLI-style output with ANSI color support.",
        category: "Dev Tools",
      },
      {
        name: "request-viewer",
        title: "Request Viewer",
        description:
          "Network request inspector showing headers, response body, and timing waterfall.",
        category: "Dev Tools",
      },
      {
        name: "tip-jar",
        title: "Crypto + Tip Jar",
        description:
          "Donation and tipping component with QR code, wallet address display, and copy-to-clipboard.",
        category: "Payments",
      },
    ],
  },
]

/**
 * Get the latest release.
 */
export function getLatestRelease(): Release {
  return releases[0]
}

/**
 * Get all component slugs from a specific release.
 */
export function getReleaseComponentSlugs(version: string): string[] {
  const release = releases.find((r) => r.version === version)
  return release?.components.map((c) => c.name) ?? []
}
