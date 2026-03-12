<p align="center">
  <a href="https://ui.justinlevine.me">
    <img src="./repo-header.png" alt="Jalco UI" />
  </a>
</p>

<p align="center">
  A curated <a href="https://ui.shadcn.com">shadcn</a>-style component registry by <a href="https://justinlevine.me">Justin Levine</a>.
</p>

**Docs & previews:** [ui.justinlevine.me](https://ui.justinlevine.me)

## Install

```bash
npx shadcn@latest add https://ui.justinlevine.me/r/[component].json
```

Or with the registry shorthand (once approved):

```bash
npx shadcn@latest add @jalco/[component]
```

## Components

| Component | Description |
| --- | --- |
| [Activity Graph](https://ui.justinlevine.me/docs/components/activity-graph) | GitHub-style contribution heatmap with auto-fit sizing and custom color scales |
| [GitHub Stars Button](https://ui.justinlevine.me/docs/components/github-stars-button) | Live star count button with multiple variants and icon styles |
| [GitHub Button Group](https://ui.justinlevine.me/docs/components/github-button-group) | Grouped GitHub repo metrics (stars, forks, watchers, issues) |
| [Code Block](https://ui.justinlevine.me/docs/components/code-block) | Syntax-highlighted code block with language icon, copy button, and collapsible overflow |
| [Code Block Command](https://ui.justinlevine.me/docs/components/code-block-command) | Multi-package-manager install command with tab switching |
| [Code Line](https://ui.justinlevine.me/docs/components/code-line) | Single-line code snippet with inline copy button |
| [AI Copy Button](https://ui.justinlevine.me/docs/components/ai-copy-button) | Copy-to-clipboard button with AI-provider icon cycling |
| [Request Viewer](https://ui.justinlevine.me/docs/components/request-viewer) | HTTP request display with method badge, URL, headers, and body |
| [API Reference Table](https://ui.justinlevine.me/docs/components/api-ref-table) | Expandable prop reference table for component documentation |
| [Crypto + Tip Jar](https://ui.justinlevine.me/docs/components/tip-jar) | Crypto tip jar with QR code, address copy, and wallet deep links |

## Design principles

- **Self-contained** — components work without shadcn primitives unless complex interaction justifies it
- **Zero dependencies preferred** — no Motion, no extra packages unless the payoff is clear
- **Server-first** — async server components where it makes sense
- **Strong defaults** — useful out of the box, not a blank canvas

## Development

```bash
pnpm install
pnpm dev
```

Build the docs site and registry:

```bash
pnpm build          # runs shadcn build + next build
pnpm registry:build # registry only
```

## License

[MIT](./LICENSE)
