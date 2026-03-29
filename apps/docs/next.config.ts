import type { NextConfig } from "next"
import { existsSync, statSync, readdirSync } from "node:fs"
import { execSync } from "node:child_process"
import { join } from "node:path"
import { createMDX } from "fumadocs-mdx/next"

// Run preview codegen if the output is missing or any preview file is newer.
const OUTPUT = join(
  process.cwd(),
  "components/docs/__generated__/preview-imports.ts"
)
const PREVIEWS_DIR = join(process.cwd(), "components/docs/previews")

function needsCodegen(): boolean {
  if (!existsSync(OUTPUT)) return true
  try {
    const outMtime = statSync(OUTPUT).mtimeMs
    const files = readdirSync(PREVIEWS_DIR).filter((f) => f.endsWith(".tsx"))
    return files.some(
      (f) => statSync(join(PREVIEWS_DIR, f)).mtimeMs > outMtime
    )
  } catch {
    return true
  }
}

if (needsCodegen()) {
  try {
    execSync("tsx scripts/generate-preview-imports.ts", { stdio: "inherit" })
  } catch {
    console.warn(
      "⚠ Preview codegen failed — run `pnpm previews:generate` manually"
    )
  }
}

const nextConfig: NextConfig = {}

const withMDX = createMDX()

export default withMDX(nextConfig)
