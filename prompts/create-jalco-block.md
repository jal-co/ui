# Pi Mono Prompt: Create Jalco UI Block

You are working inside the Jalco UI repository.

Before making any changes, load and follow this Pi skill:
- `~/.pi/agent/skills/jalco-ui-registry/SKILL.md`

Then read these files:
- `AGENTS.md`
- `package.json`
- `registry.json`
- `README.md`
- `app/docs/page.mdx`
- `app/docs/installation/page.mdx`

Then inspect the current registry structure and similar examples.

## Task

Create a new Jalco UI registry block for:

{{BLOCK_REQUEST}}

## Required skill routing

Load the relevant Jalco UI skill references:
- `references/repo-map.md`
- `references/component-workflow.md`
- `references/variants-and-api.md`
- `references/docs-patterns.md`
- `references/registry-patterns.md`

## Working rules

- Work as a repo-aware implementation agent.
- Follow Jalco UI standards from `AGENTS.md` and the `jalco-ui-registry` skill.
- Optimize for installability, docs-readiness, and visual polish.
- Use realistic content structure and good layout hierarchy.
- Prefer semantic HTML and accessible interactions.
- Keep the block responsive and easy to adapt.
- Use Tailwind v4-friendly design-system patterns.
- Keep naming aligned across folders, exports, docs, and `registry.json`.

## Required process

1. Read the required files first.
2. Inspect similar existing blocks or components.
3. Explain the implementation approach briefly.
4. Create or propose the necessary files in the correct registry structure.
5. Draft the `registry.json` entry if needed.
6. Provide docs-ready preview and installation copy.
7. Briefly assess the result for accessibility, composition quality, variant quality, and registry fit.

## Output format

Return these sections:

1. **Plan**
2. **Chosen registry type**
3. **Files reviewed**
4. **Relevant existing patterns**
5. **Files to create or update**
6. **Implementation**
7. **Registry entry draft**
8. **Docs copy**
9. **Accessibility and composition review**
10. **Notes or tradeoffs**

## Quality bar

The result should feel like:
- a public-quality Jalco UI block
- something attractive in a docs gallery
- something a developer could install and adapt with minimal friction
