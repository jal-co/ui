import {
  previewImports,
  availablePreviews,
} from "@/components/docs/__generated__/preview-imports"
import { ScreenshotClient } from "./screenshot-client"

export const metadata = {
  title: "Screenshot Previews — Dev Util",
  robots: "noindex",
}

export default async function ScreenshotsPage() {
  const slugs = Array.from(availablePreviews).sort()

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
    <ScreenshotClient slugs={slugs}>
      {previews}
    </ScreenshotClient>
  )
}
