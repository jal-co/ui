import { readFileSync } from "node:fs"
import { join } from "node:path"
import registryData from "@/registry.json"

interface RegistryItem {
  name: string
  type: string
  title: string
  description: string
  dependencies?: string[]
  registryDependencies?: string[]
  categories?: string[]
  files: { path: string; type: string }[]
}

const REGISTRY_BASE = "https://ui.justinlevine.me/r"

/**
 * Extract the JSDoc header comment from a component source file.
 */
function extractHeaderComment(source: string): string | null {
  const match = source.match(/^\/\*\*[\s\S]*?\*\//)
  return match ? match[0] : null
}

/**
 * Generate an AI-friendly prompt for a specific registry component.
 *
 * The prompt gives an AI model everything it needs to help a user:
 * - What the component does
 * - How to install it
 * - What props/variants are available
 * - How to configure it
 */
export function generateComponentPrompt(registryName: string): string {
  const item = (registryData.items as RegistryItem[]).find(
    (i) => i.name === registryName
  )
  if (!item) return ""

  // Read the main component file to extract props/docs from the header
  const mainFile = item.files.find((f) => f.type === "registry:component")
  let headerComment = ""
  if (mainFile) {
    try {
      const source = readFileSync(
        join(process.cwd(), mainFile.path),
        "utf-8"
      )
      headerComment = extractHeaderComment(source) ?? ""
    } catch {
      // File not found — skip
    }
  }

  const installCmd = `npx shadcn@latest add ${REGISTRY_BASE}/${item.name}.json`

  const lines: string[] = [
    `# ${item.title}`,
    "",
    `> From the jalco ui registry (${REGISTRY_BASE})`,
    "",
    `## What it does`,
    "",
    item.description,
    "",
    `## Install`,
    "",
    "Run this command in the user's project root:",
    "",
    "```bash",
    installCmd,
    "```",
    "",
    "This will download the component source and install any required dependencies.",
    "",
  ]

  if (item.dependencies?.length) {
    lines.push(
      `## Dependencies`,
      "",
      `This component requires: ${item.dependencies.join(", ")}`,
      "",
      "These are installed automatically by the shadcn CLI.",
      ""
    )
  }

  if (headerComment) {
    lines.push(
      `## Component API`,
      "",
      "Here is the full component documentation from the source:",
      "",
      headerComment,
      ""
    )
  }

  lines.push(
    `## Your task`,
    "",
    `Help the user set up the ${item.title} component in their project.`,
    "",
    "1. Run the install command above.",
    "2. Ask the user what variant or configuration they need.",
    "3. Provide a working usage example based on their answer.",
    "4. If they have questions about props, refer to the Component API section above.",
    "",
    `Registry URL: ${REGISTRY_BASE}/${item.name}.json`,
    `Docs: https://ui.justinlevine.me/docs/components/${item.name}`,
  )

  return lines.join("\n")
}

/**
 * Generate an AI-friendly prompt for the installation page.
 *
 * Explains the jalco ui registry, how to install components,
 * and lists all available components.
 */
export function generateInstallationPrompt(): string {
  const items = registryData.items as RegistryItem[]

  const componentList = items
    .map(
      (item) =>
        `- **${item.title}** (\`${item.name}\`): ${item.description}`
    )
    .join("\n")

  return [
    "# jal-co/ui — Installation Guide",
    "",
    "> A curated shadcn-style component registry by Justin Levine.",
    "> Registry: https://ui.justinlevine.me/r",
    "> Docs: https://ui.justinlevine.me/docs",
    "",
    "## Prerequisites",
    "",
    "The user's project needs:",
    "- Next.js (App Router recommended)",
    "- Tailwind CSS v4",
    "- shadcn/ui initialized (`npx shadcn@latest init`)",
    "",
    "## How to install a component",
    "",
    "```bash",
    "npx shadcn@latest add https://ui.justinlevine.me/r/{component-name}.json",
    "```",
    "",
    "Replace `{component-name}` with the component name from the list below.",
    "",
    "This will:",
    "1. Download the component source into the user's project",
    "2. Install any required npm dependencies",
    "3. Add any shadcn registry dependencies",
    "",
    "## Available components",
    "",
    componentList,
    "",
    "## Your task",
    "",
    "Help the user install jalco ui components in their project.",
    "",
    "1. Ask which component(s) they want to install.",
    "2. Confirm their project has the prerequisites above.",
    "3. Provide the exact install command for each component.",
    "4. After installation, offer to help configure or customize the component.",
    "5. If they want details on a specific component, provide the docs URL.",
  ].join("\n")
}
