<p align="center">
  <a href="https://ui.justinlevine.me">
    <img src="./public/brand/repo-header.png" alt="jal-co/ui" />
  </a>
</p>

<p align="center">
  Open-source React component library for React and Tailwind CSS.<br />
  Distributed via a <a href="https://ui.shadcn.com">shadcn</a>-compatible registry. Never paywalled.
</p>

<p align="center">
  <a href="https://ui.justinlevine.me">Docs & Previews</a> · <a href="https://ui.justinlevine.me/docs">Components</a> · <a href="https://ui.justinlevine.me/docs/installation">Installation</a>
</p>

## About

jal-co/ui is an open-source React component library by [Justin Levine](https://justinlevine.me). Every component is free, open source, and will never be paywalled.

Components are polished, composable, and built for React and Tailwind CSS. Install them with a single command via the shadcn-compatible registry, or copy the source directly into your project.

## Install

```bash
npx shadcn@latest add jalco/[component]
```

Browse all components at [ui.justinlevine.me/docs](https://ui.justinlevine.me/docs).

## Design principles

- **Open source, never paywalled** — every component is free to use, modify, and distribute
- **Self-contained** — components work without shadcn primitives unless complex interaction justifies it
- **Zero dependencies preferred** — no Motion, no extra packages unless the payoff is clear
- **Server-first** — async server components where it makes sense
- **Strong defaults** — useful out of the box, not a blank canvas

## Local development

```bash
pnpm install        # install dependencies
pnpm dev            # start dev server
pnpm build          # shadcn build + next build
pnpm registry:build # registry only
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE)
