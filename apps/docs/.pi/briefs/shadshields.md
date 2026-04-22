# shadshields

Beautiful README badges as a service. A shields.io alternative with the visual quality of shadcn/ui components.

## What this is

A standalone Next.js app that serves styled SVG badge images for use in GitHub READMEs, npm pages, docs sites, and anywhere that accepts `<img>` tags. Own repo, own domain, own brand.

Not a jalco ui subpage. A separate product that happens to share the same design language and links back to jalco ui as the component library behind it.

## Why this should be separate

- Shields.io is a product, not a feature. This competes with it, so it should feel like a product.
- Own domain means own SEO. "shadshields.dev" or "shields.jalco.dev" ranks on its own.
- Own repo means contributors can work on badge coverage without touching the component library.
- Own deploy means badge uptime is independent of docs site deploys.
- Marketing surface: every badge image served is a backlink. Every README is an ad.
- Can grow independently — more providers, a badge builder, an API, a GitHub App — without bloating jalco ui.

## Domain options

Pick one:
- `shadshields.dev` — memorable, brandable, plays on shadcn
- `shields.jalco.dev` — ties to jalco brand
- `svgbadge.dev` — generic but descriptive
- `badgekit.dev` — clean

## URL format

```
https://shadshields.dev/{provider}/{...params}.svg?{options}
```

### v1 badge types

| Badge | URL | Data source |
|-------|-----|-------------|
| npm version | `/npm/{package}.svg` | registry.npmjs.org |
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
![npm version](https://shadshields.dev/npm/react.svg)
![stars](https://shadshields.dev/github/vercel/next.js/stars.svg?theme=blue)
![CI](https://shadshields.dev/github/jal-co/ui/ci.svg?style=outline)
![Discord](https://shadshields.dev/discord/1316199667142496307.svg)
```

## Repo structure

Standalone Next.js app. Minimal — this is a service, not a UI-heavy site.

```
shadshields/
├── app/
│   ├── page.tsx                          ← landing page with examples + badge builder
│   ├── docs/page.tsx                     ← URL reference, params, themes
│   ├── [...slug]/route.ts                ← catch-all badge route handler
│   └── layout.tsx
├── lib/
│   ├── badges/
│   │   ├── render.ts                     ← SVG rendering engine
│   │   ├── measure.ts                    ← text width calculation (char width lookup)
│   │   ├── themes.ts                     ← shadcn color palettes → resolved hex values
│   │   ├── icons.ts                      ← provider SVG icon path data
│   │   └── types.ts                      ← shared types
│   ├── providers/
│   │   ├── npm.ts                        ← npm registry + downloads API
│   │   ├── github.ts                     ← GitHub repos, releases, actions API
│   │   └── discord.ts                    ← Discord widget API
│   └── utils.ts
├── public/
│   └── og.png                            ← social image
├── package.json
├── next.config.ts
└── README.md                             ← uses its own badges, obviously
```

### Landing page

Simple, one-page site:
- Hero: "Beautiful README badges" + a row of example badges rendered live
- Badge builder: form with provider selector, package/repo input, style/theme dropdowns, live preview, copy-to-clipboard markdown
- Comparison: same badge in shields.io vs shadshields side by side
- URL reference: quick table of all badge types
- Footer: "Powered by jal-co/ui" with link

### Route handler (`app/[...slug]/route.ts`)

Single catch-all:

```ts
export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  // 1. Parse slug → provider + badge type + resource params
  // 2. Parse searchParams → style, theme, color, label, logo
  // 3. Validate inputs, return 400 SVG on bad params
  // 4. Fetch data from provider API
  // 5. Map data → BadgeConfig { label, value, icon, statusColor }
  // 6. Resolve theme → actual hex colors
  // 7. Render SVG string
  // 8. Return Response with SVG content-type + cache headers
}
```

## SVG rendering engine

### Core function

```ts
interface BadgeConfig {
  label: string              // left side text ("npm", "release", "CI")
  value: string              // right side text ("v19.1.0", "45.2k", "passing")
  icon?: string              // SVG path data for provider icon
  iconViewBox?: string       // viewBox for the icon
  style: BadgeStyle
  colors: ResolvedColors     // { labelBg, labelFg, valueBg, valueFg, border }
  statusColor?: string       // override value bg for CI status (green/red/amber)
  height?: number            // 20 | 24 | 28
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

### Text measurement

Lookup table approach (same as shields.io). Pre-measured character widths for the badge font at 11px. No native dependencies.

```ts
const CHAR_WIDTHS: Record<string, number> = {
  // measured from -apple-system at 11px
  "a": 6.2, "b": 6.8, "c": 5.6, ...
  "0": 6.6, "1": 4.4, ...
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
  zinc:    { labelBg: "#27272a", labelFg: "#fafafa", valueBg: "#3f3f46", valueFg: "#fafafa", border: "#52525b" },
  slate:   { labelBg: "#1e293b", labelFg: "#f8fafc", valueBg: "#334155", valueFg: "#f8fafc", border: "#475569" },
  blue:    { labelBg: "#1e3a5f", labelFg: "#dbeafe", valueBg: "#2563eb", valueFg: "#ffffff", border: "#3b82f6" },
  green:   { labelBg: "#14532d", labelFg: "#dcfce7", valueBg: "#16a34a", valueFg: "#ffffff", border: "#22c55e" },
  rose:    { labelBg: "#4c0519", labelFg: "#ffe4e6", valueBg: "#e11d48", valueFg: "#ffffff", border: "#f43f5e" },
  // ...
}
```

Default: `zinc` — works on light and dark README backgrounds.

Tailwind CSS tokens can't be used directly in SVG images. SVGs served as `<img>` are sandboxed — no external CSS, no CSS variables, no class-based styling. The theme system uses the same vocabulary as shadcn (theme names like `zinc`, `slate`, `blue`) but resolves them to hex values at render time.

### Style variants

**default** — dark label bg, slightly lighter value bg, subtle border, rounded corners (like jalco ui's default badge variant)

**outline** — transparent bg, visible border, themed text colors

**subtle** — fully rounded (pill), muted background, no strong contrast between label and value

**flat** — shields.io compatible flat style for people who want consistency with existing badges

### Icons

Raw SVG path data for each provider, extracted from existing jalco ui components:

```ts
const icons: Record<string, { viewBox: string; path: string; fillRule?: string }> = {
  npm:     { viewBox: "0 0 256 256", path: "M0 256V0h256..." },
  github:  { viewBox: "0 0 16 16", path: "M8 0C3.58 0..." },
  discord: { viewBox: "0 -28.5 256 256", path: "M216.856339...", fillRule: "nonzero" },
}
```

## Data providers

Port the fetch functions from jalco ui's registry libs. Simplify — each provider just needs to return `{ label, value, statusColor? }`.

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

## Cross-linking with jalco ui

- Landing page footer: "Badge components for React → jal-co/ui"
- jalco ui docs: "Use these badges in your README → shadshields.dev"
- jalco ui npm-badge, release-badge, ci-badge, discord-badge docs pages: add a "README badge" section showing the shadshields URL equivalent
- jalco ui's own README: use shadshields badges

## Implementation order

1. Scaffold Next.js app with basic layout
2. `lib/badges/measure.ts` — character width lookup table
3. `lib/badges/themes.ts` — shadcn color palettes
4. `lib/badges/icons.ts` — provider SVG paths (copy from jalco ui)
5. `lib/badges/render.ts` — core SVG renderer
6. Test renderer with hardcoded data — get the visual quality right
7. `lib/providers/` — port fetch functions from jalco ui
8. `app/[...slug]/route.ts` — route handler
9. Test all 7 badge types with real data
10. Landing page with badge builder
11. README using its own badges
12. Deploy, connect domain
13. Add cross-links from jalco ui

## What NOT to build in v1

- Services beyond the 7 listed
- Dark mode auto-detection (GitHub doesn't support `prefers-color-scheme` in README SVG images)
- Custom fonts
- Authentication or rate limiting
- GitHub App
- API keys / user accounts
- Separate analytics

## Success criteria

- Badges render correctly in GitHub READMEs
- Badges render correctly in npm package pages
- Visual quality is noticeably better than shields.io
- All 7 badge types work with live data
- Response times < 200ms (cached)
- Badge URLs are intuitive and memorable
- Landing page badge builder works and copies markdown to clipboard
- jalco ui's own README uses shadshields badges

## Future (v2+)

- More providers: PyPI, Crates.io, Packagist, Docker Hub, Codecov, Bundlephobia
- Custom/static badges: `/badge/{label}/{value}.svg?color=blue`
- Sparkline badges: tiny inline SVG charts as badge images
- GitHub App: auto-generates badge markdown for repos
- Dark mode variant: `?mode=dark`
- Badge gallery: browse all badge types visually
- OpenAPI spec for the URL patterns
- Contributor-friendly provider plugin system
