---
name: components-build
description: |-
  The canonical standard for building React components. Covers composition, accessibility, typing, styling, state, polymorphism, asChild, data attributes, design tokens, and artifact taxonomy from the components.build specification by Hayden Bleasel and shadcn.
  Use for building any React component, reviewing component architecture, auditing accessibility and keyboard navigation, choosing between as/asChild, designing variant APIs with CVA, applying data-attribute-driven styling, classifying artifacts (primitive/component/block/pattern/template/utility), extending HTML types, and managing controlled/uncontrolled state.
  Use proactively when creating or reviewing React components, designing component APIs, building design systems, implementing keyboard navigation, adding ARIA support, structuring compound components, choosing element flexibility patterns, or applying Tailwind styling systems.
  Examples:
  - user: "Build an accessible dialog" → semantic HTML, focus trap, keyboard map, ARIA, asChild trigger
  - user: "Review this component" → audit composition, a11y, typing, styling, data attributes
  - user: "Is this a component or a block?" → classify using taxonomy heuristics
  - user: "Add variants to this button" → CVA + cn + data-slot + exported types
  - user: "Should I use as or asChild?" → compare tradeoffs, recommend based on context
  - user: "Build a dropdown menu" → compound component, keyboard map, ARIA roles/states, focus management
  - user: "Make this component support both controlled and uncontrolled" → useControllableState
---

# components.build — The Standard

The canonical specification for building modern, composable, accessible UI components.
Co-authored by Hayden Bleasel and shadcn. Source: https://www.components.build

This skill is authoritative for **how components are engineered**. It does not cover documentation authoring, registry publishing, or project-specific conventions — those are handled by repo-local skills.

## The Seven Pillars

Every component decision maps to one of these pillars. They are non-negotiable.

### 1. Composition

Distribute responsibility across cooperating sub-components. Never build monolithic god-components with dozens of props. Use the Root/Trigger/Content compound pattern. Share state via Context. Each sub-component wraps a single element.

→ `references/composition.md`

### 2. Accessibility

Not optional — it is a baseline requirement. Start with semantic HTML. Implement keyboard maps for every interactive element. Wire ARIA roles, states, and properties. Trap and restore focus. Meet WCAG contrast ratios. Never convey information through color alone.

→ `references/accessibility.md`

### 3. Types

Extend native HTML attributes for every component. Each exported component wraps a single element. Always export prop types as `<Name>Props`. Spread props last so consumers can override. Avoid prop name conflicts with HTML attributes. Document custom props with JSDoc.

→ `references/types.md`

### 4. Styling

Use the `cn` utility (clsx + tailwind-merge). Define variants with CVA outside components. Order classes: base → variant → conditional → user overrides. Use CSS variables for dynamic values. Never hardcode styles that can't be overridden.

→ `references/styling.md`

### 5. State

Support both controlled and uncontrolled modes. Use `useControllableState` from Radix to merge both paths. Expose `value`, `defaultValue`, and `onValueChange` as the standard API surface.

→ `references/state.md`

### 6. Element Flexibility

Two patterns: `as` prop for simple element switching (layout, typography). `asChild` + Radix Slot for composing with other components (prop merging, ref forwarding, event composition). Prefer `asChild` for interactive components in the Radix/shadcn ecosystem.

→ `references/polymorphism.md` and `references/as-child.md`

### 7. Data Attributes

Expose state with `data-state` (open/closed, active/inactive) for CSS-driven styling. Identify components with `data-slot` for stable parent-targeting. Never create `openClassName`/`closedClassName` prop APIs. Use Tailwind's `data-[state=open]:` syntax.

→ `references/data-attributes.md`

## Artifact Taxonomy

Before building, classify what you're making:

| Type | Test | Example |
|------|------|---------|
| **Primitive** | Headless behavior + a11y, no styling? | Radix Dialog |
| **Component** | Styled, reusable UI unit? | shadcn Button |
| **Block** | Opinionated product-specific composition? | Pricing table |
| **Pattern** | Documentation of a recurring solution? | Typeahead search |
| **Page** | Complete single-route view? | Dashboard |
| **Template** | Multi-page scaffold with routing? | SaaS starter |
| **Utility** | Non-visual helper? | `cn`, `useId` |

→ `references/taxonomy.md`

## Decision Trees

### Compound component or single component?

- Does the component have distinct interactive parts (trigger, content, overlay)? → **Compound**
- Does it need to share state between parts? → **Compound with Context**
- Is it a single semantic element with variants? → **Single component with CVA**

### `as` or `asChild`?

| Scenario | Use |
|----------|-----|
| Simple element switching (div → section, span → h1) | `as` prop |
| Composing with another component (Button as Link) | `asChild` + Slot |
| Interactive trigger that needs prop merging | `asChild` + Slot |
| No dependency budget for @radix-ui/react-slot | `as` prop |
| Building in the Radix/shadcn ecosystem | `asChild` + Slot |

### How to expose state for styling?

| State type | Mechanism |
|-----------|-----------|
| Visual state (open/closed, active) | `data-state` attribute |
| Component identity for parent targeting | `data-slot` attribute |
| Variant selection (primary, sm/md/lg) | Props + CVA |
| Behavioral config (controlled, default values) | Props |
| Event handlers | Props |

## Reference Files

You MUST read the relevant reference files before implementing or reviewing. Each file contains the spec-level rules, patterns, anti-patterns, and code examples for its pillar.

| File | Pillar |
|------|--------|
| `references/composition.md` | Compound components, naming conventions, Context sharing |
| `references/accessibility.md` | Keyboard maps, ARIA, focus management, contrast, mobile a11y |
| `references/types.md` | HTML extension, single-element wrapping, exported types, prop conflicts |
| `references/styling.md` | cn utility, CVA, class ordering, design tokens, Tailwind patterns |
| `references/state.md` | Controlled/uncontrolled, useControllableState |
| `references/polymorphism.md` | The `as` prop, type-safe generics, when to use |
| `references/as-child.md` | Radix Slot, asChild pattern, prop merging, when to use |
| `references/data-attributes.md` | data-state, data-slot, attribute-driven styling, has-[] patterns |
| `references/taxonomy.md` | Artifact classification, vocabulary, heuristics |

## Workflows

### /component-create [name] [intent]

1. Read `references/taxonomy.md` — classify the artifact
2. Read `references/composition.md` — compound or single? naming?
3. Read `references/types.md` — extend HTML attributes, export types
4. Read `references/accessibility.md` — keyboard map, ARIA, focus
5. Read `references/styling.md` — cn + CVA for variants
6. Read `references/data-attributes.md` — data-state + data-slot
7. If interactive trigger → read `references/as-child.md`
8. If controlled + uncontrolled → read `references/state.md`
9. If element flexibility → read `references/polymorphism.md`

### /component-review [file]

1. Read `references/taxonomy.md` — classify
2. Read `references/composition.md` — monolithic? prop explosion?
3. Read `references/types.md` — HTML extension? exported types? prop conflicts?
4. Read `references/accessibility.md` — keyboard? ARIA? focus? contrast?
5. Read `references/styling.md` — cn? class order? CVA outside component?
6. Read `references/data-attributes.md` — data-state? data-slot?
7. Check: props spread last? single element wrapping? types exported?
8. Report by pillar: Composition → Accessibility → Types → Styling → State → Data Attributes
