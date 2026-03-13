## New Component: `<component-name>`

<!-- Brief description of the component and its use case. -->

### Checklist

#### Implementation
- [ ] Component source exists in `registry/<name>/`
- [ ] `registry.json` entry added with accurate title, description, categories, dependencies, and files
- [ ] `"use client"` only where required
- [ ] Accessible markup and keyboard interactions
- [ ] No unnecessary dependencies added

#### Sidebar & Navigation
- [ ] Entry added to `lib/docs.ts` with correct group, title, and href
- [ ] `badge: "New"` and `badgeAdded: "<YYYY-MM-DD>"` set with today's date

#### Docs Page
- [ ] Docs page created at `app/docs/components/<name>/page.tsx`
- [ ] Uses `ComponentDocsPage` with `title`, `description`, `registryName`, `sourceFiles`, `preview`, `usage`
- [ ] Description matches across docs page, `registry.json`, and `lib/docs.ts`
- [ ] Realistic preview content
- [ ] Examples section with labeled variants (if applicable)
- [ ] API Reference table (if applicable)

#### Card Preview
- [ ] Preview file created at `components/docs/previews/<name>.tsx`
- [ ] Shows key variants / sizes / layout exports (if applicable)
- [ ] `pnpm previews:generate` run to update import map

#### Screenshots
- [ ] Screenshots generated via `/dev/screenshots` page
- [ ] `public/previews/<name>-dark.png` exists
- [ ] `public/previews/<name>-light.png` exists
- [ ] Screenshots saved at 1280×640 @ 2x
- [ ] Component properly centered and scaled in screenshot frame

#### Registry Build
- [ ] `pnpm registry:build` passes
- [ ] `pnpm build` passes with no errors
- [ ] Verified install works: `npx shadcn@latest add http://localhost:3000/r/<name>.json`

### Screenshots

<!-- Paste or attach the dark and light mode PNGs here. -->

| Dark | Light |
|------|-------|
| ![dark](<!-- link -->) | ![light](<!-- link -->) |

### Notes

<!-- Any design decisions, tradeoffs, or follow-up items. -->
