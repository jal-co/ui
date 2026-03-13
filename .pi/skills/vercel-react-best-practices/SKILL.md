---
name: vercel-react-best-practices
description: React and Next.js performance optimization guidelines from Vercel Engineering. This skill should be used when writing, reviewing, or refactoring React/Next.js code to ensure optimal performance patterns. Triggers on tasks involving React components, Next.js pages, data fetching, bundle optimization, or performance improvements.
license: MIT
metadata:
  author: vercel
  version: "1.0.0"
---

<overview>

# Vercel React Best Practices

Comprehensive performance optimization guide for React and Next.js applications, maintained by Vercel. Contains 58 rules across 8 categories, prioritized by impact to guide automated refactoring and code generation.

</overview>

<context>

## When to Apply

Reference these guidelines when:
- Writing new React components or Next.js pages
- Implementing data fetching (client or server-side)
- Reviewing code for performance issues
- Refactoring existing React/Next.js code
- Optimizing bundle size or load times

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Eliminating Waterfalls | CRITICAL | `async-` |
| 2 | Bundle Size Optimization | CRITICAL | `bundle-` |
| 3 | Server-Side Performance | HIGH | `server-` |
| 4 | Client-Side Data Fetching | MEDIUM-HIGH | `client-` |
| 5 | Re-render Optimization | MEDIUM | `rerender-` |
| 6 | Rendering Performance | MEDIUM | `rendering-` |
| 7 | JavaScript Performance | LOW-MEDIUM | `js-` |
| 8 | Advanced Patterns | LOW | `advanced-` |

</context>

<rules>

## Quick Reference

### 1. Eliminating Waterfalls (CRITICAL)

- `async-defer-await` — MUST move await into branches where actually used
- `async-parallel` — MUST use Promise.all() for independent operations
- `async-dependencies` — SHOULD use better-all for partial dependencies
- `async-api-routes` — MUST start promises early, await late in API routes
- `async-suspense-boundaries` — SHOULD use Suspense to stream content

### 2. Bundle Size Optimization (CRITICAL)

- `bundle-barrel-imports` — MUST import directly, avoid barrel files
- `bundle-dynamic-imports` — SHOULD use next/dynamic for heavy components
- `bundle-defer-third-party` — SHOULD load analytics/logging after hydration
- `bundle-conditional` — SHOULD load modules only when feature is activated
- `bundle-preload` — MAY preload on hover/focus for perceived speed

### 3. Server-Side Performance (HIGH)

- `server-auth-actions` — MUST authenticate server actions like API routes
- `server-cache-react` — SHOULD use React.cache() for per-request deduplication
- `server-cache-lru` — MAY use LRU cache for cross-request caching
- `server-dedup-props` — SHOULD avoid duplicate serialization in RSC props
- `server-hoist-static-io` — SHOULD hoist static I/O (fonts, logos) to module level
- `server-serialization` — SHOULD minimize data passed to client components
- `server-parallel-fetching` — SHOULD restructure components to parallelize fetches
- `server-after-nonblocking` — MAY use after() for non-blocking operations

### 4. Client-Side Data Fetching (MEDIUM-HIGH)

- `client-swr-dedup` — SHOULD use SWR for automatic request deduplication
- `client-event-listeners` — SHOULD deduplicate global event listeners
- `client-passive-event-listeners` — SHOULD use passive listeners for scroll
- `client-localstorage-schema` — SHOULD version and minimize localStorage data

### 5. Re-render Optimization (MEDIUM)

- `rerender-defer-reads` — SHOULD NOT subscribe to state only used in callbacks
- `rerender-memo` — SHOULD extract expensive work into memoized components
- `rerender-memo-with-default-value` — SHOULD hoist default non-primitive props
- `rerender-dependencies` — SHOULD use primitive dependencies in effects
- `rerender-derived-state` — SHOULD subscribe to derived booleans, not raw values
- `rerender-derived-state-no-effect` — MUST derive state during render, not effects
- `rerender-functional-setstate` — SHOULD use functional setState for stable callbacks
- `rerender-lazy-state-init` — SHOULD pass function to useState for expensive values
- `rerender-simple-expression-in-memo` — SHOULD NOT use memo for simple primitives
- `rerender-move-effect-to-event` — SHOULD put interaction logic in event handlers
- `rerender-transitions` — MAY use startTransition for non-urgent updates
- `rerender-use-ref-transient-values` — SHOULD use refs for transient frequent values

### 6. Rendering Performance (MEDIUM)

- `rendering-animate-svg-wrapper` — SHOULD animate div wrapper, not SVG element
- `rendering-content-visibility` — MAY use content-visibility for long lists
- `rendering-hoist-jsx` — SHOULD extract static JSX outside components
- `rendering-svg-precision` — SHOULD reduce SVG coordinate precision
- `rendering-hydration-no-flicker` — SHOULD use inline script for client-only data
- `rendering-hydration-suppress-warning` — MAY suppress expected mismatches
- `rendering-activity` — MAY use Activity component for show/hide
- `rendering-conditional-render` — MUST use ternary, not && for conditionals
- `rendering-usetransition-loading` — SHOULD prefer useTransition for loading state

### 7. JavaScript Performance (LOW-MEDIUM)

- `js-batch-dom-css` — SHOULD group CSS changes via classes or cssText
- `js-index-maps` — SHOULD build Map for repeated lookups
- `js-cache-property-access` — SHOULD cache object properties in loops
- `js-cache-function-results` — MAY cache function results in module-level Map
- `js-cache-storage` — SHOULD cache localStorage/sessionStorage reads
- `js-combine-iterations` — SHOULD combine multiple filter/map into one loop
- `js-length-check-first` — SHOULD check array length before expensive comparison
- `js-early-exit` — SHOULD return early from functions
- `js-hoist-regexp` — SHOULD hoist RegExp creation outside loops
- `js-min-max-loop` — MAY use loop for min/max instead of sort
- `js-set-map-lookups` — SHOULD use Set/Map for O(1) lookups
- `js-tosorted-immutable` — SHOULD use toSorted() for immutability

### 8. Advanced Patterns (LOW)

- `advanced-event-handler-refs` — MAY store event handlers in refs
- `advanced-init-once` — SHOULD initialize app once per app load
- `advanced-use-latest` — MAY use useLatest for stable callback refs

</rules>

<instructions>

## How to Use

Read individual rule files for detailed explanations and code examples:

```
rules/async-parallel.md
rules/bundle-barrel-imports.md
```

Each rule file contains:
- Brief explanation of why it matters
- Incorrect code example with explanation
- Correct code example with explanation
- Additional context and references

## Full Compiled Document

For the complete guide with all rules expanded: `AGENTS.md`

</instructions>
