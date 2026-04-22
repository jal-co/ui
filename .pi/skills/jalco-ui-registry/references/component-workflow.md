# Component Workflow

Use this workflow when creating or substantially revising a Jalco UI registry item.

## Step 1: Understand the request

Clarify:
- is this a component, block, docs utility, or multi-file registry item?
- what problem does it solve?
- who installs it and customizes it?
- does it need to be interactive?
- does it belong in Jalco UI at all?

If the request is vague, identify the smallest useful artifact that feels publishable.

## Step 2: Read the repo before building

Read:
- `/Users/justin/Documents/Github/jalco-ui/AGENTS.md`
- `/Users/justin/Documents/Github/jalco-ui/registry.json`
- `/Users/justin/Documents/Github/jalco-ui/package.json`

Then inspect:
- the closest matching file in `registry/`
- the closest matching docs page in `app/docs/components/`

## Step 3: Choose the correct registry shape

Common Jalco UI patterns:
- simple single-file item → `registry/<name>/<name>.tsx`
- multi-file item → colocate `components/`, `lib/`, or `hooks/` under `registry/<name>/`
- primitive dependency reuse → import from `@/registry/ui/*` when appropriate

Prefer the smallest structure that still feels clean and installable.

## Step 4: Design the API

Before coding, decide:
- whether the component should be server or client
- what props are truly public API
- whether variants are justified
- whether customization is best expressed as composition, children, slots, className, or CVA variants

Do not add props just because they might be useful someday.

## Step 5: Implement like a public registry item

Target quality bar:
- readable source
- minimal dependencies
- strong defaults
- easy to own after installation
- accessibility considered by default
- realistic markup and copy
- consistent Jalco UI comment and header style

Use `"use client"` only when required by state, effects, browser APIs, event-heavy interactivity, or client-only dependencies.

Comment rules during implementation:
- use a compact top-of-file header for Jalco-authored public-facing source files when attribution or dependency context is useful
- for public component entry files, include the component name, a one-sentence description, and key props when helpful
- prefer the Jalco UI header shape: `jalco-ui`, component name, `by Justin Levine`, `ui.justinlevine.me`, then optional description, props, dependencies, inspiration, and runtime notes
- keep inline comments minimal and useful
- do not add decorative separator banners or AI-style section headings
- do not mass-retrofit copied, upstream, generated, or template-derived files unless they are being meaningfully rewritten

## Step 6: Add or update `registry.json`

For each public item, ensure:
- `name` matches the folder and install URL
- `type` is correct
- `title` is human-readable
- `description` is concise and docs-aligned
- `dependencies` lists package dependencies only when required
- `registryDependencies` lists upstream shadcn registry items when required
- `files` paths and types are correct
- `categories` are used when they improve organization

## Step 7: Write the docs page

For a public-facing component, create or update:
- `/Users/justin/Documents/Github/jalco-ui/app/docs/components/<slug>/page.tsx`

Typical docs flow:
1. metadata
2. title + concise description
3. dependency badges
4. preview
5. installation command
6. usage import + basic example
7. examples / features / customization / API / notes as justified

Only include sections that improve adoption.

## Step 8: Review before calling it done

Check:
- Does this feel installable and useful?
- Is the API smaller and clearer than the first draft?
- Are variants justified and shown in docs?
- Is the docs copy polished and aligned with metadata?
- Is the implementation consistent with existing Jalco UI work?

## Common anti-patterns

Avoid:
- boolean-prop-heavy APIs
- variants without real visual meaning
- generic placeholder examples
- unnecessary client components
- docs that repeat obvious implementation details
- registry metadata that drifts from actual behavior
- over-abstracting before multiple real use cases exist
