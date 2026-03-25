import type { Metadata } from "next"
import { readdirSync } from "node:fs"
import { join } from "node:path"
import Link from "next/link"
import { docsNav, getActiveBadge } from "@/lib/docs"
import { getRegistryItem } from "@/lib/registry"
import { ThemeImage } from "@/components/docs/theme-image"

export const metadata: Metadata = {
  title: "Components — jal-co/ui",
  description:
    "Browse all jalco ui components. Polished, composable building blocks for React and Next.js.",
}

// Check which preview images exist at build time
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
  })()
)

function getComponentDescription(href: string): string | null {
  const slug = href.split("/").pop()
  if (!slug) return null
  const item = getRegistryItem(slug)
  return item?.description ?? null
}

function getSlug(href: string): string {
  return href.split("/").pop() ?? ""
}

export default function DocsPage() {
  const componentGroups = docsNav.filter(
    (group) => group.title !== "Getting Started"
  )

  const totalCount = componentGroups.reduce(
    (sum, group) => sum + group.items.filter((i) => !i.bundledIn).length,
    0
  )

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Components</h1>
        <p className="text-base text-muted-foreground">
          {totalCount} polished, composable components ready to install and
          adapt.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {componentGroups.map((group) => (
          <section key={group.title} className="flex flex-col gap-4">
            <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {group.title}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {group.items
                .filter((item) => !item.bundledIn)
                .map((item) => {
                  const description = getComponentDescription(item.href)
                  const badge = getActiveBadge(item)
                  const slug = getSlug(item.href)
                  const hasImage = availableImages.has(slug)

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group relative flex flex-col overflow-hidden rounded-xl border border-border transition-colors hover:border-foreground/20 hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                    >
                      {hasImage && (
                        <div className="relative overflow-hidden border-b border-border">
                          <ThemeImage
                            slug={slug}
                            title={item.title}
                          />
                        </div>
                      )}

                      <div className="flex flex-col gap-1.5 p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">
                            {item.title}
                          </span>
                          {badge && (
                            <span className="rounded-full border border-dashed border-ring/40 px-1.5 py-0.5 text-[10px] font-medium leading-none text-ring">
                              {badge}
                            </span>
                          )}
                        </div>
                        {description && (
                          <p className="line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
                            {description}
                          </p>
                        )}
                      </div>
                    </Link>
                  )
                })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
