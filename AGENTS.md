# AGENTS.md

Guidance for humans and AI agents working in `jalco-ui`.

## Project intent

Jalco UI is a curated shadcn-style registry and documentation site by Justin Levine.

Goals:
- Keep the codebase polished, readable, and consistent.
- Optimize for public/open-source maintainability.
- Prefer simple, composable patterns over clever abstractions.
- Make examples, docs, and registry items production-quality.

## Core principles

- Favor clarity over novelty.
- Keep diffs focused and reviewable.
- Match existing patterns before introducing new ones.
- Make documentation part of the feature, not an afterthought.
- Build for accessibility, composability, and copy-paste ergonomics.
- Avoid unnecessary dependencies.

## Repository standards

### General
- Use consistent naming across files, exports, components, and docs.
- Keep folder structure predictable and shallow where possible.
- Prefer colocating small helpers with the feature that uses them.
- Use TypeScript where applicable.
- Avoid dead code, commented-out code, and placeholder implementations in committed work.

### Components
- Prefer small, composable components.
- Build accessible primitives and interactions by default.
- Use clear prop names and sensible defaults.
- Avoid overengineering APIs before real usage justifies it.
- When creating registry items, ensure they are installable, readable, and easy to adapt.

### Styling
- Keep styling patterns uniform across components and docs.
- Prefer existing utility/classname conventions over inventing new ones.
- Maintain visual consistency between preview examples, code blocks, and docs pages.
- Avoid one-off styling unless there is a documented reason.

### Documentation
- Every meaningful feature should include or update docs.
- Write concise, skimmable documentation.
- Prefer examples that reflect real usage.
- Keep installation instructions accurate for multiple package managers when relevant.
- If a component or block has constraints, call them out explicitly.

## Commit standards

This repository uses Conventional Commits.

Format:

```text
<type>(<scope>): <description>
```

Examples:
- `feat(registry): add initial component schema`
- `fix(docs): correct pnpm install command`
- `docs(intro): add registry overview page`
- `refactor(ui): simplify code block tabs`
- `chore(repo): add AGENTS.md guidance`

### Allowed types
- `feat`
- `fix`
- `docs`
- `refactor`
- `style`
- `test`
- `chore`
- `build`
- `ci`
- `perf`
- `revert`

### Commit rules
- Use the imperative mood.
- Keep the subject line concise.
- Do not end the subject line with a period.
- Keep commits focused to one logical change.
- Do not mix formatting-only changes with feature work unless necessary.
- Prefer small commits over large mixed commits.
- Never commit secrets, tokens, or local environment files.

## Pull request standards

PRs should be small, clear, and easy to review.

### PR checklist
- Summarize what changed.
- Explain why the change was made.
- Note any design or API decisions.
- Include screenshots/GIFs for UI changes when useful.
- Update docs if behavior, installation, or usage changed.
- Verify relevant commands/builds/tests before opening or merging.

### PR title
Use Conventional Commit style when possible.

Examples:
- `feat(docs): add component preview and code tabs`
- `fix(registry): resolve invalid item path`

## Agent workflow expectations

When working in this repository, agents should:
- Read existing files before editing them.
- Reuse established patterns and structure.
- Avoid broad rewrites unless explicitly requested.
- Call out tradeoffs when introducing new patterns.
- Prefer surgical edits with minimal blast radius.
- Keep generated output and formatting noise to a minimum.
- Document new conventions in this file or the relevant docs.

## Consistency rules

- Use one naming convention per concern and stick to it.
- Keep public APIs stable and intentional.
- Keep example data realistic and tidy.
- Align docs copy, component names, and registry item names.
- If introducing a new pattern, apply it consistently or document why it is exceptional.

## Open-source readiness

Because this code may be public:
- Write code and docs as if others will learn from them.
- Avoid private/internal shorthand in committed code.
- Prefer descriptive names over personal abbreviations.
- Keep onboarding friction low for contributors and users.
- Make installation and usage paths obvious.

## When unsure

If a decision is unclear, prefer:
1. readability
2. accessibility
3. consistency
4. maintainability
5. extensibility

## Initial conventions for Jalco UI

Until the project evolves further, default to:
- clean documentation-first structure
- shadcn-aligned ergonomics
- strong preview/code/install UX
- multi-package-manager install examples where relevant
- polished, production-quality examples over quantity
