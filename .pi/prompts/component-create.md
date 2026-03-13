# /component-create

Build a new jalco ui component through the standard repository workflow.

<context>
Use this prompt when the user wants to create a new component, block, registry item, or docs-facing UI artifact.
</context>

<instructions>

1. Create a feature branch: `feat/<component-name>`.
2. Read `.pi/skills/jalco-component-builder/SKILL.md` first and treat it as the primary workflow.
3. If the request is underspecified, use the `question` or `questionnaire` tool to clarify the component before coding.
4. Use concise, Socratic questioning to determine:
   - the core use case
   - whether this is a primitive, composed component, or block
   - whether it belongs in the public registry, docs site only, or both
   - the intended default feel and strongest default state
   - the minimum public API
   - which variants are truly justified
   - whether the component should stay in one file
   - whether any dependency is genuinely needed
5. SHOULD prefer a single-file implementation unless multiple files materially improve readability, runtime correctness, reuse, or installability.
6. Use supporting references named in `jalco-component-builder` as needed, especially for shadcn ergonomics, Tailwind v4 patterns, composition, React/Next implementation quality, and accessibility.
7. Reuse established Jalco and shadcn variant language when appropriate, but MUST NOT add variants mechanically.
8. SHOULD prefer strong default styling, realistic preview content, and restrained visual treatment over decorative complexity.
9. If this is a public component, MUST update the docs, preview/demo coverage, and any relevant registry metadata in the same change.
10. MUST create a catalog card preview at `components/docs/previews/<registry-name>.tsx` showing key variants, and run `pnpm previews:generate`.
11. MUST add the sidebar nav entry in `lib/docs.ts` with `badge: "New"` and `badgeAdded` set to today's ISO date.
12. MUST generate screenshots via `/dev/screenshots` — save `<name>-dark.png` and `<name>-light.png` to `public/previews/`.
13. MUST run `pnpm registry:build` and `pnpm build` to verify.
14. MUST open a PR using the component template and attach dark/light screenshots.
15. MUST keep comments compact and useful. Use Jalco-style file headers when appropriate. MUST NOT add decorative separator banners.

</instructions>

<format>

## Output expectations

Before implementing, briefly state:
- the component's use case
- the proposed API shape
- the justified variants
- the one-file vs multi-file decision
- any dependency decision

Then implement the component and related docs updates.

</format>
