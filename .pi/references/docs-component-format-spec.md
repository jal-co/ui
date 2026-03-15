# Component Docs Format Spec

Canonical reference for the structure, section order, writing rules, and review checklist of jalco ui component documentation pages.

## Page anatomy

Every component docs page MUST use `ComponentDocsPage` from `components/docs/component-docs-page.tsx` and follow this section order:

1. **Metadata** — `export const metadata: Metadata` with `title` and `description`
2. **Header** — rendered by `ComponentDocsPage`: title, description, AiCopyButton, DependencyBadges
3. **Preview** — live component inside `ComponentPreview` with source file tabs
4. **Installation** — `InstallCommand` with registry name; `installNote` for bundled exports
5. **Requirements** (optional) — prerequisites, constraints, or caveats that affect whether or how someone adopts the component. Rendered via the `requirements` prop.
6. **Usage** — import snippet via `CodeLine`, minimal usage example, server/client rendering context
7. **Children** (optional, order as needed):
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
| `requirements` | `ReactNode` | no | Prerequisites, constraints, or caveats surfaced before Usage |
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

### Requirements section

The Requirements section surfaces adoption-blocking information — things a user needs to know *before* they install or integrate the component. It is rendered between Installation and Usage via the `requirements` prop, inside an amber-tinted `Card` with a warning icon.

- MUST be used when the component has hard prerequisites, scope constraints, security caveats, or performance limits that affect adoption decisions
- MUST NOT be used for general behavioral notes, nice-to-know details, or supplementary context
- Content SHOULD be a short `<ul>` with the same styling as Notes (`list-disc space-y-2 pl-6 text-sm text-muted-foreground`)
- Each bullet SHOULD use a bolded lead label in `text-foreground`
- The Card wrapper, heading, and icon are handled by `ComponentDocsPage` — pages only supply the inner content via the `requirements` prop

A note belongs in Requirements when it answers one of these questions:
- Will this break or fail without additional setup? (e.g. "Requires a `highlightCode` utility")
- Does this component *not* do something users will assume it does? (e.g. "Display-only — does not read from `process.env`")
- Is there a hard scope limitation that affects whether someone should install it? (e.g. "Standard 5-field only", "No virtualization")
- Is there a security or correctness caveat? (e.g. "Visual masking — values are still in the DOM")
- Is there a fragility or reliability concern? (e.g. "Scrapes HTML — parser may need updating")

A note belongs in Notes (bottom) when it answers:
- What runtime boundary does this use? (server/client component)
- What icon library does it use?
- How does caching work?
- How does a particular feature behave in detail?
- What accessibility patterns does it use?

When migrating a bullet from Notes to Requirements, remove it from Notes entirely — do not duplicate.

### Notes section

- MUST contain only supplementary behavioral details, implementation context, and nice-to-know caveats
- MUST NOT contain adoption blockers, hard prerequisites, or scope limitations — those belong in Requirements
- MUST NOT contain architecture decisions or feature highlights
- SHOULD be brief — a short bulleted list

### Icon library note

Components that depend on `lucide-react` MUST include the following note in their Notes section:

```tsx
<li>
  <strong className="text-foreground">Icon library.</strong>{" "}
  Uses{" "}
  <a
    href="https://lucide.dev"
    className="underline hover:text-foreground"
    target="_blank"
    rel="noopener noreferrer"
  >
    Lucide
  </a>{" "}
  icons by default. Since this is copy-paste code, you can swap the
  imports if your project uses a different icon library.
</li>
```

This note communicates that Lucide is the default but is not a hard requirement, and that the user can adapt the icons to match their shadcn theme's icon library (Tabler, Phosphor, HugeIcons, Remix, etc.).

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
- [ ] Adoption blockers and prerequisites are in Requirements, not buried in Notes
- [ ] Examples use `VariantGrid` with accurate group labels
- [ ] Notes contains only supplementary details (no blockers, no features, no architecture)
- [ ] Sidebar entry in `lib/docs.ts` is correct (title, order, badge, bundledIn)
- [ ] Card preview exists at `components/docs/previews/<registry-name>.tsx`
- [ ] Screenshots exist at `public/previews/<name>-dark.png` and `<name>-light.png`
- [ ] `pnpm previews:generate` has been run
- [ ] `pnpm registry:build` and `pnpm build` pass
