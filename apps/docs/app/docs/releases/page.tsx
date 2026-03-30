import type { Metadata } from "next"
import { readdirSync } from "node:fs"
import { join } from "node:path"
import Link from "next/link"
import { releases } from "@/lib/releases"
import { ThemeImage } from "@/components/docs/theme-image"

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "What's new in jalco ui — releases, new components, and improvements.",
}

const PREVIEWS_DIR = join(process.cwd(), "public/previews")
const previewFiles = (() => {
  try {
    return readdirSync(PREVIEWS_DIR)
  } catch {
    return []
  }
})()
const availableImages = new Set(
  previewFiles
    .filter((f) => f.endsWith("-dark.png"))
    .map((f) => f.replace("-dark.png", ""))
)
const availableVideos = new Set(
  previewFiles
    .filter((f) => f.endsWith("-dark.webm"))
    .map((f) => f.replace("-dark.webm", ""))
)

function formatDate(iso: string): string {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export default function ChangelogPage() {
  return (
    <article className="flex flex-col gap-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight">Changelog</h1>
        <p className="text-lg text-muted-foreground">
          Releases, new components, and improvements to jalco ui.
        </p>
      </header>

      <div className="flex flex-col gap-20">
        {releases.map((release, releaseIndex) => (
          <section key={release.version} className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold tracking-tight">
                  {release.title}
                </h2>
                <span className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs font-mono font-medium text-muted-foreground">
                  {release.version}
                </span>
                {releaseIndex === 0 && (
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    Latest
                  </span>
                )}
              </div>
              <time
                dateTime={release.date}
                className="text-sm text-muted-foreground"
              >
                {formatDate(release.date)}
              </time>
              <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                {release.summary}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                New components ({release.components.length})
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                {release.components.map((component) => {
                  const hasImage = availableImages.has(component.name)
                  const hasVideo = availableVideos.has(component.name)

                  return (
                    <Link
                      key={component.name}
                      href={`/docs/components/${component.name}`}
                      className="group flex flex-col overflow-hidden rounded-xl border border-border transition-colors hover:border-foreground/20 hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                    >
                      {hasImage && (
                        <div className="overflow-hidden border-b border-border">
                          <ThemeImage
                            slug={component.name}
                            title={component.title}
                            hasVideo={hasVideo}
                          />
                        </div>
                      )}
                      <div className="flex flex-col gap-1.5 p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">
                            {component.title}
                          </span>
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                            {component.category}
                          </span>
                        </div>
                        <p className="line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
                          {component.description}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {release.improvements && release.improvements.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  Improvements
                </h3>
                <ul className="flex flex-col gap-2">
                  {release.improvements.map((improvement) => (
                    <li
                      key={improvement.title}
                      className="flex flex-col gap-0.5 rounded-lg border border-border/60 bg-card p-3"
                    >
                      <span className="text-sm font-medium text-foreground">
                        {improvement.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {improvement.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}
      </div>
    </article>
  )
}
