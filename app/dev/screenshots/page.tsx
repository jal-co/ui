import { notFound } from "next/navigation"
import { readdirSync } from "node:fs"
import { join } from "node:path"
import {
  previewImports,
  availablePreviews,
  animatedPreviews,
} from "@/components/docs/__generated__/preview-imports"
import { ScreenshotClient } from "./screenshot-client"

export const metadata = {
  title: "Screenshot Previews — Dev Util",
  robots: "noindex",
}

function getExistingFiles(): string[] {
  try {
    return readdirSync(join(process.cwd(), "public/previews"))
  } catch {
    return []
  }
}

export default async function ScreenshotsPage() {
  if (process.env.NODE_ENV !== "development") notFound()
  const slugs = Array.from(availablePreviews).sort()
  const animatedSlugs = Array.from(animatedPreviews).sort()
  const existingFiles = getExistingFiles()

  const previews = await Promise.all(
    slugs.map(async (slug) => {
      const importer = previewImports[slug]
      if (!importer) return null
      const mod = await importer()
      const Preview = mod.default
      return <Preview key={slug} />
    })
  )

  return (
    <ScreenshotClient
      slugs={slugs}
      animatedSlugs={animatedSlugs}
      existingFiles={existingFiles}
    >
      {previews}
    </ScreenshotClient>
  )
}
