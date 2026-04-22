# Review Checklist

Use this file to audit a Jalco UI component, docs page, or registry entry.

## Verdict categories

Use one of:
- approved
- approved with changes
- not ready

## 1. Installability

Check:
- does the registry item have the right file structure?
- are file paths in `registry.json` correct?
- are dependencies and registryDependencies accurate?
- can a consumer understand how to install it from the docs?

## 2. API quality

Check:
- is the public API small and understandable?
- are prop names clear?
- are defaults sensible?
- are variants justified?
- is there boolean-prop sprawl?
- would a consumer know how to adapt it after install?

## 3. Composition quality

Check:
- does the component feel shadcn-style and composable?
- does it prefer composition over excessive configuration?
- is `className` supported where appropriate?
- is the implementation readable and easy to own?

## 4. Accessibility

Check:
- keyboard interaction
- labels and semantics
- focus-visible treatment
- `aria-live`, `aria-label`, or grouping semantics where relevant
- whether variants preserve accessibility

## 5. Server/client discipline

Check:
- is `"use client"` only used when necessary?
- could interactive behavior be isolated into a smaller client subcomponent?
- is server-first behavior documented when important?

## 6. Styling and design-system consistency

Check:
- Tailwind utilities and tokens match repo conventions
- variants and sizes feel consistent with shadcn ergonomics
- styling feels polished but not overdesigned
- examples use realistic content

## 7. Comment and file-header quality

Check:
- Jalco-authored public-facing source files use Jalco UI's compact header style when appropriate
- public component entry files include the component name, concise description, and key props when helpful
- copied, upstream, generated, or template-derived files are not rewritten just to force comment-style consistency
- dependency or inspiration lines are present only when they add real value
- inline comments are minimal and useful
- there are no decorative AI-style separator banners
- comments do not restate obvious code

## 8. Docs readiness

Check:
- concise summary at the top
- installation command is correct
- usage example is realistic
- examples are labeled clearly
- features/API/notes sections only appear when justified
- docs copy matches registry metadata

## 9. Registry readiness

Check:
- naming alignment across folder, item name, exports, and docs slug
- correct file types in `registry.json`
- categories and metadata are justified
- descriptions are polished and public-facing

## 10. Suggested output style for reviews

Prefer this structure:
1. Verdict
2. What works well
3. Issues found
4. Recommended changes
5. Accessibility notes
6. API and composition notes
7. Styling and design-system notes
8. Comment and file-header notes
9. Registry and docs readiness
10. Suggested commit summary

## Red flags

Mark as `not ready` when you see issues like:
- broken naming alignment
- unnecessary client component conversion
- vague or bloated API
- undocumented exposed variants
- placeholder docs copy
- inaccurate registry metadata
- component behavior that is hard to own after installation
