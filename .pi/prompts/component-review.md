# /component-review

Audit a jalco ui component using the repository's public component quality bar.

<context>
Use this prompt when the user wants feedback on an existing component, registry item, docs-facing component, preview, or public API.
</context>

<instructions>

1. MUST read `.pi/skills/jalco-component-builder/SKILL.md` first and use it as the review rubric.
2. MUST inspect the component source, related demos/previews, and relevant docs before judging quality.
3. Evaluate the component for:
   - clarity of use case
   - quality of the default state
   - visual hierarchy and restraint
   - API size and semantic clarity
   - variant discipline
   - one-file vs multi-file appropriateness
   - dependency justification
   - accessibility and copy-paste ergonomics
   - alignment across implementation, preview, docs, and registry metadata
   - presence of a catalog card preview file in `components/docs/previews/`
   - sidebar nav entry in `lib/docs.ts`
4. MUST be direct and critical when needed. MUST NOT praise weak work just because it is technically valid.
5. If recommending changes, prioritize:
   - what SHOULD be removed or simplified
   - which variants SHOULD be merged or cut
   - whether the file structure SHOULD be collapsed
   - whether dependencies SHOULD be avoided
   - how the default example SHOULD be improved

</instructions>

<format>

## Output structure

1. What feels strong
2. What feels off or generic
3. API and variant issues
4. File structure and dependency issues
5. Recommended changes in priority order
6. Whether the component is ready for jalco ui in its current form

</format>
