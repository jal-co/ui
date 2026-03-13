# Component Docs Format Spec

Canonical reference for the structure, section order, writing rules, and review checklist of jalco ui component documentation pages.

## Page anatomy

Every component docs page MUST use `ComponentDocsPage` from `components/docs/component-docs-page.tsx` and follow this section order:

1. **Metadata** — `export const metadata: Metadata` with `title` and `description`
2. **Header** — rendered by `ComponentDocsPage`: title, description, AiCopyButton, DependencyBadges
3. **Preview** — live component inside `ComponentPreview` with source file tabs
4. **Installation** — `InstallCommand` with registry name; `installNote` for bundled exports
5. **Usage** — import snippet via `CodeLine`, minimal usage example, server/client rendering context
6. **Children** (optional, order as needed):
   - Playground
   - Examples (variants, sizes, configurations, etc.)
   - API Reference
   - Notes

## ComponentDocsPage props

| Prop | Type | Required | Purpose |
|---|---|---|---|
| `title` | `string` | yes | Display name (e.g. "GitHub Stars Button") |
| `description` | `string` | yes | One-sentence summary |
| `registryName` | `string` | no | Registry item name; enables install block and badges |
| `sourceFiles` | `(string \| { path, name?, language? })[]` | no | Source file paths for the code tab |
| `preview` | `ReactNode` | no | Live component for the Preview section |
| `installNote` | `ReactNode` | no | Note below install command (e.g. bundled-in explanation) |
| `usage` | `ReactNode` | no | Usage section content |
| `children` | `ReactNode` | no | Everything after Usage |

## Writing rules

### Descriptions

- MUST be one sentence, capability-first
- MUST NOT start with "A", "An", or "A React component for..."
- MUST NOT contain implementation details, subjective adjectives, or unnecessary jargon
- MUST match across: page `metadata.description`, `ComponentDocsPage` `description` prop, and `registry.json` description

### Usage section

- MUST include an import snippet via `CodeLine`
- MUST include a minimal usage example via `CodeLine`
- Server/client rendering context MUST be stated here (e.g. "Async server component")
- The first example SHOULD be minimal — layer complexity in the Examples section

### Examples section

- MUST use `VariantGrid` with labeled items when showing multiple visual states
- MUST group items by meaning: Variants, Sizes, Icon Styles, Configurations, etc.
- MUST NOT label everything as a "variant" — use the most accurate grouping label
- SHOULD use realistic, polished content over placeholder text

### Playground section

- MAY be included when the component has multiple interactive props worth exploring
- SHOULD be a client component that lets users toggle props and see results

### API Reference section

- SHOULD be included when the component has a non-obvious public API
- MUST use `ApiRefTable` from `registry/api-ref-table/api-ref-table`
- SHOULD list all public props with name, type, required flag, and description

### Notes section

- MUST contain only caveats, limitations, and external service behavior
- MUST NOT contain architecture decisions, feature highlights, or rendering context
- SHOULD be brief — a short bulleted list

### Bundled exports

- When a component is bundled inside another registry item, MUST use `installNote` to explain
- MUST set `bundledIn` on the nav item in `lib/docs.ts`

## Section heading style

All `<h2>` headings inside `ComponentDocsPage` children MUST use:

```tsx
<h2 className="text-xl font-semibold tracking-tight">Section Title</h2>
```

Sub-headings (`<h3>`) inside example groups MUST use:

```tsx
<h3 className="text-base font-medium">Group Label</h3>
```

## Naming alignment

These MUST all refer to the same artifact using consistent naming:
- page `metadata.title`
- `ComponentDocsPage` `title` prop
- `registry.json` item `title`
- sidebar nav title in `lib/docs.ts`
- preview file name in `components/docs/previews/`
- component export name

## File header and comment rules

- Public Jalco-authored component source files SHOULD use the compact Jalco-style header
- Headers MUST be compact and human-written in tone
- Headers MUST NOT duplicate the docs page content
- Decorative separator banners MUST NOT appear in source code
- Inline comments MUST be minimal and useful
- Comments MUST NOT narrate straightforward code

## Review checklist

Before shipping a component docs page, verify:

- [ ] Page uses `ComponentDocsPage`
- [ ] `metadata.description` matches `ComponentDocsPage` `description` and `registry.json`
- [ ] Preview renders a realistic default state
- [ ] Usage includes import, minimal example, and server/client context
- [ ] Examples use `VariantGrid` with accurate group labels
- [ ] Notes contains only caveats (no features, no architecture)
- [ ] Sidebar entry in `lib/docs.ts` is correct (title, order, badge, bundledIn)
- [ ] Card preview exists at `components/docs/previews/<registry-name>.tsx`
- [ ] Screenshots exist at `public/previews/<name>-dark.png` and `<name>-light.png`
- [ ] `pnpm previews:generate` has been run
- [ ] `pnpm registry:build` and `pnpm build` pass
