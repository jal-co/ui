# shieldcn

Beautiful README badges as a service. A shields.io alternative with the visual quality of shadcn/ui components.

## What this is

A standalone Next.js app that serves styled SVG badge images for use in GitHub READMEs, npm pages, docs sites, and anywhere that accepts `<img>` tags. Own repo, own domain, own brand.

Not a jalco ui subpage. A separate product that happens to share the same design language and links back to jalco ui as the component library behind it.

## Why this should be separate

- Shields.io is a product, not a feature. This competes with it, so it should feel like a product.
- Own domain means own SEO. "shieldcn.dev" ranks on its own.
- Own repo means contributors can work on badge coverage without touching the component library.
- Own deploy means badge uptime is independent of docs site deploys.
- Marketing surface: every badge image served is a backlink. Every README is an ad.
- Can grow independently — more providers, a badge builder, an API, a GitHub App — without bloating jalco ui.

## Domain

`shieldcn.dev`

## Scaffolding

### Stack (mirror jalco ui)

| Concern | Tool | Notes |
|---------|------|-------|
| Framework | Next.js 16 | Same version as jalco ui |
| Docs | Fumadocs (fumadocs-core, fumadocs-mdx, @fumadocs/base-ui) | Same MDX-driven docs setup |
| Styling | Tailwind CSS v4 | CSS-first `@theme` config |
| Components | shadcn/ui primitives | Only what the landing/docs pages need |
| Fonts | Geist + Geist Mono | Same as jalco ui |
| Package manager | pnpm | With workspace if needed later |
| Linting | ESLint + lint-staged + Husky | Same hooks as jalco ui |
| Deploy | Vercel | Edge caching for badge responses |

### Init commands

```bash
# Create repo
mkdir shieldcn && cd shieldcn
git init

# Scaffold Next.js
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

# Add Fumadocs
pnpm add fumadocs-core fumadocs-mdx
pnpm add -D @fumadocs/base-ui

# Add shadcn
pnpm dlx shadcn@latest init

# Add shared deps
pnpm add class-variance-authority clsx tailwind-merge

# Add dev tooling
pnpm add -D husky lint-staged tsx
```

### Repo structure

```
shieldcn/
├── app/
│   ├── layout.tsx                        ← root layout (Geist fonts, theme provider, metadata)
│   ├── page.tsx                          ← landing page: hero, badge builder, comparison, examples
│   ├── globals.css                       ← Tailwind v4 @theme config
│   ├── [...slug]/
│   │   └── route.ts                      ← catch-all badge SVG route handler
│   └── docs/
│       ├── layout.tsx                    ← Fumadocs docs layout
│       ├── page.tsx                      ← docs index
│       └── [...slug]/
│           └── page.tsx                  ← MDX docs pages
├── content/
│   └── docs/
│       ├── index.mdx                     ← getting started
│       ├── meta.json                     ← Fumadocs page tree
│       ├── badges/
│       │   ├── meta.json
│       │   ├── npm.mdx                   ← npm badge docs
│       │   ├── github-stars.mdx
│       │   ├── github-release.mdx
│       │   ├── github-ci.mdx
│       │   ├── github-license.mdx
│       │   └── discord.mdx
│       ├── customization/
│       │   ├── meta.json
│       │   ├── themes.mdx
│       │   └── styles.mdx
│       └── api-reference.mdx
├── lib/
│   ├── badges/
│   │   ├── render.ts                     ← SVG rendering engine
│   │   ├── measure.ts                    ← text width calculation (char width lookup)
│   │   ├── themes.ts                     ← shadcn color palettes → resolved hex values
│   │   ├── icons.ts                      ← provider SVG icon path data
│   │   └── types.ts                      ← shared types
│   ├── providers/
│   │   ├── npm.ts                        ← npm registry + downloads API
│   │   ├── github.ts                     ← GitHub repos, releases, actions, license API
│   │   └── discord.ts                    ← Discord widget API
│   └── utils.ts                          ← cn(), formatCount(), etc.
├── components/
│   ├── badge-builder.tsx                 ← interactive badge builder (client component)
│   ├── badge-preview.tsx                 ← live badge preview with copy button
│   ├── theme-provider.tsx
│   └── ui/                               ← shadcn primitives (button, input, select, etc.)
├── source.config.ts                      ← Fumadocs MDX config
├── next.config.ts                        ← withMDX wrapper
├── package.json
├── tsconfig.json
├── .gitignore
├── .husky/
│   └── pre-commit
├── AGENTS.md
├── README.md                             ← uses its own badges
└── LICENSE
```

### Fumadocs setup

`source.config.ts`:
```ts
import { defineDocs, defineConfig } from "fumadocs-mdx/config"

export const docs = defineDocs({
  dir: "content/docs",
})

export default defineConfig({
  mdxOptions: {},
})
```

`next.config.ts`:
```ts
import type { NextConfig } from "next"
import { createMDX } from "fumadocs-mdx/next"

const nextConfig: NextConfig = {}
const withMDX = createMDX()
export default withMDX(nextConfig)
```

`app/docs/layout.tsx`:
```tsx
import { DocsLayout } from "fumadocs-ui/layouts/docs"
import type { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return <DocsLayout>{children}</DocsLayout>
}
```

### Tailwind v4 config

`globals.css`:
```css
@import "tailwindcss";

@theme {
  --color-background: oklch(100% 0 0);
  --color-foreground: oklch(14.5% 0.025 264);
  --color-muted: oklch(96% 0.01 264);
  --color-muted-foreground: oklch(46% 0.02 264);
  --color-border: oklch(91% 0.01 264);
  /* ... standard shadcn tokens */
}
```

## URL format

```
https://shieldcn.dev/{provider}/{...params}.svg           → SVG badge image
https://shieldcn.dev/{provider}/{...params}.json          → raw badge data
https://shieldcn.dev/{provider}/{...params}/shields.json  → shields.io compatible
```

### v1 badge types

| Badge | URL | Data source |
|-------|-----|-------------|
| npm version | `/{package}.svg` | registry.npmjs.org |
| npm downloads | `/npm/{package}/downloads.svg` | api.npmjs.org |
| GitHub release | `/github/{owner}/{repo}/release.svg` | GitHub Releases API |
| GitHub stars | `/github/{owner}/{repo}/stars.svg` | GitHub Repos API |
| CI status | `/github/{owner}/{repo}/ci.svg` | GitHub Actions API |
| License | `/github/{owner}/{repo}/license.svg` | GitHub Repos API |
| Discord online | `/discord/{serverId}.svg` | Discord widget API |

### Query params

| Param | Type | Description |
|-------|------|-------------|
| `style` | `default` \| `outline` \| `subtle` \| `flat` | Visual style. Default: `default` |
| `theme` | `zinc` \| `slate` \| `stone` \| `neutral` \| `blue` \| `green` \| `rose` \| ... | Color theme using shadcn palette names. Default: `zinc` |
| `color` | hex string (no `#`) | Override badge accent color. Overrides theme. |
| `labelColor` | hex string (no `#`) | Override label background color. |
| `label` | string | Override the left-side label text |
| `logo` | `true` \| `false` | Show/hide the provider icon. Default: `true` |

### Usage in markdown

```md
![npm version](https://shieldcn.dev/npm/react.svg)
![stars](https://shieldcn.dev/github/vercel/next.js/stars.svg?theme=blue)
![CI](https://shieldcn.dev/github/jal-co/ui/ci.svg?style=outline)
![Discord](https://shieldcn.dev/discord/1316199667142496307.svg)
```

## SVG rendering engine

### Core function

```ts
interface BadgeConfig {
  label: string              // left side text ("npm", "release", "CI")
  value: string              // right side text ("v19.1.0", "45.2k", "passing")
  icon?: string              // SVG path data for provider icon
  iconViewBox?: string       // viewBox for the icon
  style: "default" | "outline" | "subtle" | "flat"
  colors: ResolvedColors     // resolved hex values
  statusColor?: string       // override value bg for CI status (green/red/amber)
}

function renderBadge(config: BadgeConfig): string
```

Returns a complete SVG string. No React, no Tailwind, no external dependencies.

### Layout math

```
┌─────────────────────────────────────────┐
│ [icon] label  │  value                  │
└─────────────────────────────────────────┘
  ↑              ↑  ↑
  iconWidth      │  valueWidth
  + padding      │  + padding
                 divider
```

1. Measure label text width using character lookup table
2. Measure value text width
3. Add icon width + padding if icon enabled
4. Calculate total badge width
5. Position all elements with x/y coordinates

Badge height: 20px — standard README badge height, aligns with shields.io badges.

### Text measurement

Lookup table approach (same technique as shields.io). Pre-measured character widths for the badge font at 11px. No native dependencies.

```ts
const CHAR_WIDTHS: Record<string, number> = {
  "a": 6.2, "b": 6.8, "c": 5.6, // ...
  "0": 6.6, "1": 4.4, // ...
}

function measureText(text: string, fontSize: number): number
```

### Theme system

Map shadcn palette names to resolved hex values:

```ts
interface ResolvedColors {
  labelBg: string
  labelFg: string
  valueBg: string
  valueFg: string
  border: string
}

const themes: Record<string, ResolvedColors> = {
  zinc:  { labelBg: "#27272a", labelFg: "#fafafa", valueBg: "#3f3f46", valueFg: "#fafafa", border: "#52525b" },
  slate: { labelBg: "#1e293b", labelFg: "#f8fafc", valueBg: "#334155", valueFg: "#f8fafc", border: "#475569" },
  blue:  { labelBg: "#1e3a5f", labelFg: "#dbeafe", valueBg: "#2563eb", valueFg: "#ffffff", border: "#3b82f6" },
  green: { labelBg: "#14532d", labelFg: "#dcfce7", valueBg: "#16a34a", valueFg: "#ffffff", border: "#22c55e" },
  rose:  { labelBg: "#4c0519", labelFg: "#ffe4e6", valueBg: "#e11d48", valueFg: "#ffffff", border: "#f43f5e" },
  // ...
}
```

Default: `zinc`.

Tailwind CSS tokens can't be used directly in SVG images. SVGs served as `<img>` are sandboxed — no external CSS, no CSS variables, no class-based styling. The theme system uses the same vocabulary as shadcn (palette names like `zinc`, `slate`, `blue`) but resolves them to hex values at render time.

### Style variants

- **default** — dark label bg, slightly lighter value bg, subtle border, rounded corners
- **outline** — transparent bg, visible border, themed text colors
- **subtle** — fully rounded pill, muted background, no strong contrast between label/value
- **flat** — shields.io compatible flat style for people who want consistency with existing badges

### Icons

Raw SVG path data for each provider:

```ts
const icons: Record<string, { viewBox: string; path: string; fillRule?: string }> = {
  npm:     { viewBox: "0 0 256 256", path: "M0 256V0h256..." },
  github:  { viewBox: "0 0 16 16", path: "M8 0C3.58 0..." },
  discord: { viewBox: "0 -28.5 256 256", path: "M216.856339...", fillRule: "nonzero" },
}
```

## Data providers

Port the fetch functions from jalco ui's registry libs. Simplify — each provider returns `{ label, value, statusColor? }`.

```ts
// lib/providers/npm.ts
export async function getNpmVersion(pkg: string): Promise<BadgeData | null>
export async function getNpmDownloads(pkg: string): Promise<BadgeData | null>

// lib/providers/github.ts
export async function getGitHubStars(owner: string, repo: string): Promise<BadgeData | null>
export async function getGitHubRelease(owner: string, repo: string): Promise<BadgeData | null>
export async function getGitHubCI(owner: string, repo: string): Promise<BadgeData | null>
export async function getGitHubLicense(owner: string, repo: string): Promise<BadgeData | null>

// lib/providers/discord.ts
export async function getDiscordOnline(serverId: string): Promise<BadgeData | null>
```

## API

The badge service is the API. Every badge URL is a public endpoint that returns data in the requested format.

### SVG endpoint (default)

```
GET /npm/react.svg         → image/svg+xml
GET /github/vercel/next.js/stars.svg → image/svg+xml
```

Returns a rendered SVG badge image. This is what `<img>` tags and markdown `![]()` reference.

### JSON endpoint

Append `.json` instead of `.svg` to get raw badge data:

```
GET /npm/react.json        → application/json
GET /github/vercel/next.js/stars.json → application/json
```

Returns:
```json
{
  "label": "npm",
  "value": "v19.1.0",
  "color": "blue",
  "link": "https://www.npmjs.com/package/react"
}
```

This lets people build their own badge rendering or consume the data for dashboards, scripts, or CI. Same cache headers as SVG.

### Shields.io endpoint compatibility

Serve a shields.io-compatible JSON endpoint so people can use shieldcn as a data source with shields.io rendering if they want:

```
GET /npm/react/shields.json
```

Returns:
```json
{
  "schemaVersion": 1,
  "label": "npm",
  "message": "v19.1.0",
  "color": "blue"
}
```

This works with shields.io's [endpoint badge](https://shields.io/badges/endpoint-badge):
```md
![npm](https://img.shields.io/endpoint?url=https://shieldcn.dev/npm/react/shields.json)
```

So people can migrate gradually — use shieldcn data with shields.io rendering first, then switch to shieldcn rendering when ready.

### Route handler

`app/[...slug]/route.ts` — single catch-all:

```ts
export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  const segments = params.slug
  const lastSegment = segments[segments.length - 1]

  // Determine response format from file extension
  const format = lastSegment.endsWith(".json")
    ? lastSegment.endsWith("/shields.json") ? "shields" : "json"
    : "svg"

  // Strip extension from last segment for parsing
  // Parse remaining segments → provider + badge type + resource params
  // Parse searchParams → style, theme, color, label, logo
  // Validate inputs
  // Fetch data from provider API
  // Return SVG, JSON, or shields-compatible JSON based on format
}
```

## Caching

```ts
return new Response(svg, {
  headers: {
    "Content-Type": "image/svg+xml",
    "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
  },
})
```

GitHub's Camo image proxy caches for ~4 hours on top of this. Combined with Vercel edge caching, origin hits will be minimal.

## Error handling

On bad params or failed API calls, return a valid SVG badge showing the error:

```
┌──────────────────────────┐
│ error │ package not found │
└──────────────────────────┘
```

Never return a broken image. Always return a valid SVG.

## Landing page

Simple, one-page site at `/`:
- Hero: "Beautiful README badges" + a row of example badges rendered live as `<img>` tags
- Badge builder: provider selector, package/repo input, style/theme dropdowns, live preview, copy-to-clipboard markdown
- Comparison section: same badge in shields.io vs shieldcn side by side
- URL reference: quick table of all badge types + params
- Footer: "Built with jal-co/ui" link

The badge builder is a client component. Everything else is static.

## Docs pages (Fumadocs)

Structured under `/docs`:
- Getting started (install in your README)
- Per-badge-type pages (npm, GitHub stars, release, CI, license, Discord)
- Customization: themes, styles
- API reference: full URL + param spec

Each badge doc page shows:
- Live badge preview (as `<img>` tags)
- Markdown snippet to copy
- All relevant query params with examples
- Visual comparison of style/theme variants

## Cross-linking with jalco ui

- shieldcn footer: "Badge components for React → jal-co/ui"
- jalco ui docs: "Use these badges in your README → shieldcn.dev"
- jalco ui npm-badge, release-badge, ci-badge, discord-badge docs: add a "README badge" section with the shieldcn URL equivalent
- jalco ui README: use shieldcn badges

## Implementation order

1. Scaffold Next.js app with Fumadocs, Tailwind v4, Geist fonts
2. `lib/badges/measure.ts` — character width lookup table
3. `lib/badges/themes.ts` — shadcn color palettes
4. `lib/badges/icons.ts` — provider SVG paths (copy from jalco ui)
5. `lib/badges/render.ts` — core SVG renderer
6. Test renderer with hardcoded data — get the visual quality right before adding API calls
7. `lib/providers/` — port fetch functions from jalco ui
8. `app/[...slug]/route.ts` — route handler
9. Test all 7 badge types with real data in GitHub README
10. Landing page with hero, comparison, badge builder
11. Fumadocs docs pages
12. README using its own badges
13. Deploy to Vercel, connect domain
14. Add cross-links from jalco ui

## What NOT to build in v1

- Services beyond the 7 listed
- Dark mode auto-detection (GitHub doesn't support it in README SVGs)
- Custom fonts
- Auth, rate limiting, user accounts
- GitHub App
- Separate analytics (use Vercel analytics or umami)
- GraphQL or complex query API — the URL *is* the API, keep it REST/resource-based

## Success criteria

- Badges render correctly in GitHub READMEs
- Badges render correctly on npm package pages
- Visual quality is noticeably better than shields.io
- All 7 badge types work with live data
- Response times < 200ms (cached)
- Badge URLs are intuitive
- Landing page badge builder copies markdown to clipboard
- Docs cover every badge type and customization option
- jalco ui's own README uses shieldcn badges

## Future (v2+)

- More providers: PyPI, Crates.io, Packagist, Docker Hub, Codecov, Bundlephobia
- Custom/static badges: `/badge/{label}/{value}.svg?color=blue`
- Sparkline badges: tiny inline SVG charts as badge images
- GitHub App: auto-generates badge markdown for repos
- `?mode=dark` for dark-background READMEs
- Badge gallery page
- Contributor-friendly provider plugin system
- OpenAPI spec
