# Artifact Taxonomy

Precise terminology and classification heuristics from the components.build spec.

## Classification Flow

1. Encapsulates a single behavior or a11y concern, with no styling? → **Primitive**
2. Styled, reusable UI element adding visual design? → **Component**
3. Solves a concrete product use case with opinionated composition? → **Block**
4. Scaffolds a page/flow with routing/providers? → **Template**
5. Documentation of a recurring solution, independent of implementation? → **Pattern**
6. Non-visual logic for ergonomics/composition? → **Utility**

## Definitions

### Primitive

Lowest-level building block. Behavior and accessibility without styling.

- Completely headless (unstyled)
- Encapsulates semantics, focus management, keyboard interaction, ARIA wiring, portals
- Single responsibility; composable into styled components
- Exhaustive a11y behavior for its role
- Examples: Radix UI Primitives, React Aria, Base UI, Headless UI

### Component

Styled, reusable UI unit adding visual design to primitives.

- Clear props API; supports controlled and uncontrolled usage
- Default styling but override-friendly (classes, tokens, slots)
- Keyboard accessible and screen-reader friendly
- Composable (children/slots, render props, compound subcomponents)
- Examples: shadcn/ui components, Material UI, Ant Design

### Block

Opinionated, production-ready composition solving a concrete interface use case.

- Strong defaults, copy-paste friendly, easily themed
- Minimal logic beyond layout and orchestration
- Accepts data via props; never hides data behind fetches without a documented adapter
- Not reusable like a component — you don't import blocks, blocks import components
- Good candidates for registry distribution
- Examples: Pricing table, auth screens, onboarding stepper, AI chat panel

### Pattern

Specific composition solving a UI/UX problem. Describes behavior, a11y, keyboard map, failure modes.

- Examples: Form validation with inline errors, confirming destructive actions, typeahead search

### Page

Complete single-route view composed of multiple blocks.

- Focuses on layout and block orchestration
- Self-contained for a single URL/route
- Examples: Landing page, dashboard page, product detail page

### Template

Multi-page collection bundling pages, routing, shared layouts, global providers, project structure.

- Comprehensive starting point; fork and customize
- Examples: SaaS starter, e-commerce template

### Utility

Non-visual helper for developer ergonomics or composition.

- Side-effect free (unless documented)
- Testable in isolation; supports tree-shaking
- Examples: `useControllableState`, `useId`, `cn`, keybinding helpers

## API and Composition Vocabulary

| Term | Definition |
|------|-----------|
| **Props API** | Public configuration surface. Stable, typed, documented. |
| **Children / Slots** | Placeholders for caller-provided content. Implicit (JSX children) or named (`icon`, `footer`). |
| **Render Prop** | Function child delegating rendering while parent supplies state/data. |
| **Controlled** | Value driven by props with `onChange`. Parent owns state. |
| **Uncontrolled** | Internal state with `defaultValue` and optional imperative reset. |
| **Provider / Context** | Top-level component supplying shared state to a subtree. |
| **Portal** | Rendering outside DOM hierarchy for layering (modals, popovers, toasts). |
| **Headless** | Behavior and a11y without styling. Consumer supplies appearance. |
| **Styled** | Ships with default visual design but remains override-friendly. |
| **Variants** | Discrete style/behavior permutations via props (`size`, `variant`). Not separate components. |
| **Design Tokens** | Named, platform-agnostic values parameterizing visual design. |
