import type { Metadata } from "next"
import { readdirSync } from "node:fs"
import { join } from "node:path"
import Link from "next/link"
import { docsNav } from "@/lib/docs"
import { getRegistryItem } from "@/lib/registry"
import { ChangelogImage } from "@/components/changelog-image"

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

function formatDate(iso: string): string {
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
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Changelog</h1>
        <p className="text-base text-muted-foreground">
          New components and updates to jalco ui.
        </p>
      </div>

      <div className="mt-12 flex flex-col gap-0">
        {grouped.map(({ date, entries }, groupIndex) => (
          <div key={date} className="relative flex gap-6 pb-12 sm:gap-8">
            {/* Timeline line */}
            {groupIndex < grouped.length - 1 && (
              <div className="absolute left-[7px] top-[28px] bottom-0 w-px bg-border sm:left-[79px]" />
            )}

            {/* Date label */}
            <div className="hidden w-16 shrink-0 pt-1 text-right sm:block">
              <time
                dateTime={date}
                className="text-xs font-medium text-muted-foreground"
              >
                {formatDate(date)}
              </time>
            </div>

            {/* Dot */}
            <div className="relative mt-2 shrink-0">
              <div className="size-[15px] rounded-full border-2 border-border bg-background" />
            </div>

            {/* Content */}
            <div className="flex min-w-0 flex-1 flex-col gap-6">
              <time
                dateTime={date}
                className="text-xs font-medium text-muted-foreground sm:hidden"
              >
                {formatDate(date)}
              </time>

              {entries.map((entry) => (
                <Link
                  key={entry.slug}
                  href={entry.href}
                  className="group flex flex-col gap-3 rounded-lg border border-border p-4 transition-colors hover:border-foreground/20 hover:bg-accent/50"
                >
                  {entry.hasImage && (
                    <div className="overflow-hidden rounded-md border border-border">
                      <ChangelogImage slug={entry.slug} title={entry.title} />
                    </div>
                  )}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground group-hover:text-foreground">
                        {entry.title}
                      </span>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {entry.category}
                      </span>
                    </div>
                    {entry.description && (
                      <p className="text-[13px] leading-relaxed text-muted-foreground">
                        {entry.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
