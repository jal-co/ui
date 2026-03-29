/**
 * Creates minimal MDX files for remaining TSX component pages.
 * Uses the existing preview files via ComponentPreview name="<name>-preview".
 * Extracts title, description, and notes from the TSX page.
 *
 * Usage: tsx scripts/create-mdx-from-tsx.ts all
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, rmSync } from "node:fs"
import { join } from "node:path"

const ROOT = process.cwd()
const COMP_DIR = join(ROOT, "app/docs/components")
const MDX_DIR = join(ROOT, "content/docs/components")

const target = process.argv[2]
if (!target) { console.error("Usage: tsx scripts/create-mdx-from-tsx.ts [name|all]"); process.exit(1) }

const names = target === "all"
  ? readdirSync(COMP_DIR, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)
  : [target]

let ok = 0, skip = 0

for (const name of names) {
  const tsxPath = join(COMP_DIR, name, "page.tsx")
  const mdxPath = join(MDX_DIR, `${name}.mdx`)

  if (!existsSync(tsxPath)) { console.log(`  skip: ${name} (no tsx)`); skip++; continue }
  if (existsSync(mdxPath)) { console.log(`  skip: ${name} (mdx exists)`); skip++; continue }

  const src = readFileSync(tsxPath, "utf-8")

  // Extract title and description
  const titleM = src.match(/title:\s*"([^"]+)"/)
  const descM = src.match(/description:\s*\n?\s*"([^"]+)"/)
  const title = titleM?.[1] ?? name
  const desc = (descM?.[1] ?? "").replace(/"/g, '\\"')

  // Extract the first import line to determine the main component import path
  const mainImportM = src.match(/import.*from\s+"@\/registry\/([^"]+)"/)
  const importPath = mainImportM?.[1]?.replace(/\/[^/]+$/, "") ?? name

  // Extract component names from imports
  const componentImports = [...src.matchAll(/import\s*{([^}]+)}\s*from\s*"@\/registry\//g)]
    .flatMap(m => m[1].split(",").map(s => s.trim()).filter(s => !s.startsWith("type ") && s && !s.includes("type ")))
  const mainComponent = componentImports[0] ?? name.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join("")

  // Check for sourceFiles
  const sourceFilesM = src.match(/const sourceFiles\s*=\s*(\[[\s\S]*?\])/)
  const sourceFiles = sourceFilesM?.[1] ?? `["registry/${name}/${name}.tsx"]`

  // Check for async
  const isAsync = /async function/.test(src)

  // Check for revalidate
  const revalM = src.match(/export const revalidate\s*=\s*(\d+)/)

  // Check for requirements section
  const hasRequirements = src.includes("requirements={")

  // Extract notes section content (simplified)
  const notesM = src.match(/<h2[^>]*>Notes<\/h2>\s*<ul[^>]*>([\s\S]*?)<\/ul>/s)

  // Build MDX
  let mdx = `---\ntitle: "${title}"\ndescription: "${desc}"\n---\n\n`

  mdx += `<ComponentPreview name="${name}-preview" />\n\n`
  mdx += `## Installation\n\n<InstallBlock name="${name}" />\n\n`
  mdx += `## Usage\n\n`
  mdx += "```tsx\n"
  mdx += `import { ${mainComponent} } from "@/components/${name}"\n`
  mdx += "```\n\n"
  mdx += "```tsx\n"
  mdx += `<${mainComponent} />\n`
  mdx += "```\n\n"

  if (isAsync) {
    mdx += "Async server component — fetches data at build time with ISR caching.\n\n"
  }

  // Notes
  mdx += "## Notes\n\n"
  if (isAsync) {
    mdx += "- **Async server component.** No client JS required.\n"
    mdx += "- **ISR caching.** Data is cached for 1 hour via `next.revalidate`.\n"
  } else if (src.includes('"use client"') || src.includes("Client component")) {
    mdx += "- **Client component.** Uses interactive state on the client.\n"
  } else {
    mdx += "- **Server component.** No client JS required.\n"
  }
  mdx += "- See the [source code](https://github.com/jal-co/ui) for the full API.\n"

  writeFileSync(mdxPath, mdx)

  // Delete old TSX dir
  rmSync(join(COMP_DIR, name), { recursive: true, force: true })

  console.log(`  ✓ ${name}`)
  ok++
}

console.log(`\nDone: ${ok} converted, ${skip} skipped`)
