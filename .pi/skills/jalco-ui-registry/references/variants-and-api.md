# Variants and API Design

Use this file when deciding how a Jalco UI component should expose customization.

## Core principle

Jalco UI should feel shadcn-style:
- composable
- easy to install
- easy to read
- easy to adapt
- not overloaded with speculative props

## When variants are important

Variants matter when they represent real reusable differences in presentation or interaction, such as:
- visual emphasis levels
- size scales
- shape or density changes used across examples
- segmented states that users will reasonably want to choose between

Good examples in the repo:
- `github-stars-button` exposes meaningful `variant` and `size`
- `github-button-group` exposes meaningful `variant`, `size`, and metric configuration

## When not to add variants

Do not add variants when:
- only one visual style is actually needed
- the variation is too one-off to deserve public API
- the difference is better handled by composition or `className`
- a boolean prop would create hidden style branches and unclear combinations

## Prefer composition over prop sprawl

Prefer:
- `children`
- clear slots or subcomponents
- composable wrappers
- `className` escape hatches
- narrow CVA variants with sensible defaults

Avoid stacking many props like:
- `isCompact`
- `showIcon`
- `withBorder`
- `isMuted`
- `isElevated`
- `showLabel`

unless those are clearly part of a stable public API.

## Good public API questions

Before exposing a prop, ask:
- will most consumers understand what this prop does?
- is it likely to be used more than once?
- does it map to a meaningful design-system choice?
- can it be documented clearly in one sentence?
- does it create hard-to-reason-about prop combinations?

If the answer is weak, keep the API smaller.

## Variant documentation rules

If a component exposes variants publicly:
- show them in the docs
- label the examples clearly
- mention defaults in the API reference when useful
- keep names conventional and unsurprising

Use labels like:
- Default
- Outline
- Ghost
- Subtle
- Small / Default / Large

## shadcn-style ergonomics

Good Jalco UI APIs usually have:
- a sensible default visual style
- a small variant surface
- consistent naming
- `className` support
- type-safe variant unions
- accessibility preserved regardless of variant

## Server vs client API decisions

Do not convert a component to client just to support avoidable convenience props.

Prefer:
- server components by default
- client-only subcomponents for narrowly interactive behavior

Example pattern:
- `code-line` stays server-rendered
- `code-line-copy-button` is client-only

## Review checklist for variants

Approve variants when all are true:
- they reflect real reusable states
- they improve adoption or customization
- they do not bloat the component API
- they are straightforward to preview and document
- they maintain consistent accessibility and styling behavior

Reject or simplify variants when:
- they feel speculative
- they duplicate what `className` already solves
- they create too many combinations to explain
- they distract from the component's main purpose
