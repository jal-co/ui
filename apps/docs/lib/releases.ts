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
    version: "2026.04.1",
    date: "2026-04-22",
    title: "Open Source Batch",
    summary:
      "Leaning harder into the open-source lane. Four new components that round out the GitHub and ecosystem coverage: a release badge that pulls your latest tag, a CI status badge for GitHub Actions, a Discord server widget, and a zero-dep SVG sparkline that shows npm download trends inline. Also split the sidebar into GitHub and Ecosystem sections because 13 items in one list was getting unwieldy.",
    components: [
      {
        name: "release-badge",
        title: "Release Badge",
        description:
          "Live GitHub release badge showing latest tag, publish date, and pre-release indicator. Three layouts.",
        category: "GitHub",
      },
      {
        name: "ci-badge",
        title: "CI Badge",
        description:
          "GitHub Actions CI status badge with colored status dots for passing, failing, pending, and cancelled states.",
        category: "GitHub",
      },
      {
        name: "discord-badge",
        title: "Discord Badge",
        description:
          "Live Discord server badge showing server name and online count via the public widget API. Includes a blurple variant.",
        category: "Ecosystem",
      },
      {
        name: "download-sparkline",
        title: "Download Sparkline",
        description:
          "Tiny inline SVG sparkline showing npm download trends. Three chart types, trend indicator, average baseline, and date range labels. Zero charting dependencies.",
        category: "Ecosystem",
      },
    ],
    improvements: [
      {
        title: "Sidebar reorganization",
        description:
          "Split the Open Source section into GitHub (repo-specific components) and Ecosystem (npm, Discord, licensing, platforms) for easier navigation.",
      },
    ],
  },
  {
    version: "2026.04.0",
    date: "2026-04-07",
    title: "Pretext",
    summary:
      "This one was me falling down a rabbit hole with Cheng Lou's Pretext library and deciding it was too interesting not to build around. I genuinely think Pretext is kind of revolutionary — it makes a bunch of text-layout problems feel solvable in a way the DOM never really has. So now jalco-ui has a small text-layout mini-batch: hooks for DOM-free text measurement, shrinkwrapped chat bubbles, balanced text, and a masonry grid that predicts heights without poking the DOM. Extremely niche in the best way.",
    components: [
      {
        name: "pretext",
        title: "Pretext Hooks",
        description:
          "React hooks for DOM-free text measurement — prepare/layout lifecycle, shrinkwrap search, and balanced-width computation powered by @chenglou/pretext.",
        category: "Pretext",
      },
      {
        name: "chat-bubble",
        title: "Pretext Chat Bubble",
        description:
          "Message bubble with Pretext shrinkwrap that finds the tightest width for the same line count, eliminating dead space CSS fit-content leaves behind.",
        category: "Pretext",
      },
      {
        name: "balanced-text",
        title: "Pretext Balanced Text",
        description:
          "Text wrapper that uses Pretext to balance line widths so all lines are roughly equal length. Deterministic and cross-browser consistent.",
        category: "Pretext",
      },
      {
        name: "masonry-grid",
        title: "Pretext Masonry Grid",
        description:
          "Text-aware masonry layout where card heights are predicted by Pretext without DOM measurement. Zero layout shift.",
        category: "Pretext",
      },
    ],
    improvements: [
      {
        title: "Cleaner dependency badges",
        description:
          "Internal registry lib dependencies like the shared pretext utility are now hidden from docs-page dependency badges, so only the dependencies users actually care about show up.",
      },
    ],
  },
  {
    version: "2026.03.1",
    date: "2026-03-29",
    title: "Batch 1",
    summary:
      "Big batch. Eight new components — landing page stuff like testimonials and logo clouds, open source primitives like repo cards and license badges, and a color palette for design system docs. Basically the pieces I kept needing across projects and finally built properly.",
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
        title: "Seamless marquee animations",
        description:
          "Fixed gap mismatches in testimonial and logo-cloud marquees that caused visible jumps at the loop point.",
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
