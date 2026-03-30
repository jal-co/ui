/**
 * Enriches stub MDX pages by extracting ApiRefTable and Notes sections
 * from the old TSX pages (recovered from git history).
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs"
import { join, basename } from "node:path"
import { execSync } from "node:child_process"

const ROOT = process.cwd()
const MDX_DIR = join(ROOT, "content/docs/components")
const COMMIT = "11a4eec" // commit where TSX pages still exist

const files = readdirSync(MDX_DIR).filter((f) => f.endsWith(".mdx"))

// Components that already have rich content (skip these)
const RICH = new Set([
  "status-indicator", "commit-graph", "color-palette",
  "testimonial", "logo-cloud", "license-badge",
  "repo-card", "contributor-grid",
])

let enriched = 0

for (const file of files) {
  const name = basename(file, ".mdx")
  if (RICH.has(name)) continue

  const mdxPath = join(MDX_DIR, file)
  const mdx = readFileSync(mdxPath, "utf-8")

  // Skip if already has ApiRefTable
  if (mdx.includes("ApiRefTable")) continue

  // Recover old TSX from git
  let tsx: string
  try {
    tsx = execSync(
      `git show ${COMMIT}:apps/docs/app/docs/components/${name}/page.tsx`,
      { encoding: "utf-8", cwd: join(ROOT, "../..") }
    )
  } catch {
    console.log(`  skip: ${name} (not in git history)`)
    continue
  }

  // Extract all ApiRefTable blocks
  const apiBlocks: string[] = []
  const apiRegex = /<ApiRefTable[\s\S]*?\/>/g
  let match
  while ((match = apiRegex.exec(tsx)) !== null) {
    // Clean up TypeScript type annotations in descriptions
    let block = match[0]
    // Remove `as Status` type casts
    block = block.replace(/\s+as\s+[A-Z]\w*/g, "")
    apiBlocks.push(block)
  }

  // Extract notes section
  let notesContent = ""
  const notesMatch = tsx.match(
    /<h2[^>]*>Notes<\/h2>\s*<ul[^>]*>([\s\S]*?)<\/ul>/
  )
  if (notesMatch) {
    // Convert the notes list to markdown
    const listItems = notesMatch[1].matchAll(/<li>([\s\S]*?)<\/li>/g)
    const bullets: string[] = []
    for (const item of listItems) {
      let text = item[1].trim()
      // Convert <strong> to **
      text = text.replace(/<strong[^>]*>(.*?)<\/strong>/g, "**$1**")
      // Convert <code> to `code`
      text = text.replace(/<code[^>]*>(.*?)<\/code>/g, "`$1`")
      // Convert <a> to [text](url)
      text = text.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g, "[$2]($1)")
      // Remove remaining HTML tags
      text = text.replace(/<[^>]+>/g, "")
      // Clean up entities
      text = text.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
      // Clean up whitespace
      text = text.replace(/\s+/g, " ").trim()
      // Replace {" "} JSX spaces
      text = text.replace(/\{"\s*"\}/g, " ")
      if (text) bullets.push(`- ${text}`)
    }
    if (bullets.length > 0) {
      notesContent = bullets.join("\n")
    }
  }

  if (apiBlocks.length === 0 && !notesContent) {
    console.log(`  skip: ${name} (no API ref or notes found)`)
    continue
  }

  // Build the additions
  let additions = "\n"

  if (apiBlocks.length > 0) {
    additions += "\n## API Reference\n\n"
    additions += apiBlocks.join("\n\n") + "\n"
  }

  if (notesContent) {
    additions += "\n## Notes\n\n" + notesContent + "\n"
  }

  // Replace the existing "## Notes" section (from the auto-gen) with the richer content
  let newMdx = mdx
  // Remove the auto-generated notes
  newMdx = newMdx.replace(/\n## Notes\n\n[\s\S]*$/, "")
  // Append the rich content
  newMdx = newMdx.trimEnd() + additions

  writeFileSync(mdxPath, newMdx)
  console.log(`  ✓ ${name} (+${apiBlocks.length} API tables, ${notesContent ? "notes" : "no notes"})`)
  enriched++
}

console.log(`\nEnriched ${enriched} files`)
