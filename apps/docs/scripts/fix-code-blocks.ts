/**
 * Replaces markdown ```tsx code blocks in MDX files with <CodeLine> components.
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs"
import { join, basename } from "node:path"

const MDX_DIR = join(process.cwd(), "content/docs/components")

const files = readdirSync(MDX_DIR).filter((f) => f.endsWith(".mdx"))

let fixed = 0

for (const file of files) {
  const path = join(MDX_DIR, file)
  let content = readFileSync(path, "utf-8")
  const name = basename(file, ".mdx")

  // Match ```tsx\n...\n``` blocks and replace with <CodeLine>
  const codeBlockRegex = /```tsx\n([\s\S]*?)```/g
  let match
  const replacements: { from: string; to: string }[] = []

  while ((match = codeBlockRegex.exec(content)) !== null) {
    const fullMatch = match[0]
    const code = match[1].trim()

    // Escape backticks inside the code for JSX template literal
    const escaped = code.replace(/`/g, "\\`").replace(/\$/g, "\\$")

    const replacement = `<CodeLine code={\`${escaped}\`} />`
    replacements.push({ from: fullMatch, to: replacement })
  }

  if (replacements.length === 0) continue

  for (const { from, to } of replacements) {
    content = content.replace(from, to)
  }

  writeFileSync(path, content)
  console.log(`  ✓ ${name} (${replacements.length} code blocks)`)
  fixed++
}

console.log(`\nFixed ${fixed} files`)
