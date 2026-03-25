import type { Metadata } from "next"
import { readdirSync } from "node:fs"
import { join } from "node:path"
import Link from "next/link"
import { docsNav } from "@/lib/docs"
import { getRegistryItem } from "@/lib/registry"
import { ThemeImage } from "@/components/docs/theme-image"

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "What's new in jalco ui — latest components, updates, and additions.",
}

interface ChangelogEntry {
  title: string
  slug: string
  href: string
  description: string | null
  category: string
  dateAdded: string
  hasImage: boolean
}

const PREVIEWS_DIR = join(process.cwd(), "public/previews")
const availableImages = new Set(
  (() => {
    try {
      return readdirSync(PREVIEWS_DIR)
        .filter((f) => f.endsWith("-dark.png"))
        .map((f) => f.replace("-dark.png", ""))
    } catch {
      return []
    }
  })(),
)

function getEntries(): ChangelogEntry[] {
  const entries: ChangelogEntry[] = []

  for (const group of docsNav) {
    for (const item of group.items) {
      if (!item.href.includes("/components/") || item.bundledIn) continue
      if (!item.dateAdded) continue

      const slug = item.href.split("/").pop() ?? ""
      const registryItem = getRegistryItem(slug)

      entries.push({
        title: item.title,
        slug,
        href: item.href,
        description: registryItem?.description ?? null,
        category: group.title,
        dateAdded: item.dateAdded,
        hasImage: availableImages.has(slug),
      })
    }
  }

  entries.sort(
    (a, b) =>
      new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime(),
  )

  return entries
}

function formatDateHeading(iso: string): string {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

function groupByDate(
  entries: ChangelogEntry[],
): { date: string; entries: ChangelogEntry[] }[] {
  const map = new Map<string, ChangelogEntry[]>()
  for (const entry of entries) {
    const existing = map.get(entry.dateAdded)
    if (existing) existing.push(entry)
    else map.set(entry.dateAdded, [entry])
  }
  return Array.from(map, ([date, entries]) => ({ date, entries }))
}

export default function ChangelogPage() {
  const entries = getEntries()
  const grouped = groupByDate(entries)

  return (
    <article className="flex flex-col gap-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight">Changelog</h1>
        <p className="text-lg text-muted-foreground">
          New components, updates, and improvements to jalco ui.
        </p>
      </header>

      <div className="flex flex-col gap-16">
        {grouped.map(({ date, entries }) => (
          <section key={date} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <time
                dateTime={date}
                className="text-2xl font-semibold tracking-tight"
              >
                {formatDateHeading(date)}
              </time>
              <p className="text-sm text-muted-foreground">
                {entries.length} new component{entries.length > 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {entries.map((entry) => (
                <div key={entry.slug} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-medium">{entry.title}</h3>
                      <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                        {entry.category}
                      </span>
                    </div>
                    {entry.description && (
                      <p className="text-muted-foreground leading-relaxed">
                        {entry.description}
                      </p>
                    )}
                  </div>

                  {entry.hasImage && (
                    <Link
                      href={entry.href}
                      className="group overflow-hidden rounded-xl border border-border transition-colors hover:border-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                    >
                      <ThemeImage slug={entry.slug} title={entry.title} />
                    </Link>
                  )}

                  <div>
                    <Link
                      href={entry.href}
                      className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                    >
                      View documentation →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}
