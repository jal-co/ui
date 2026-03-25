"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { docsNav } from "@/lib/docs"

function getFlatItems() {
  return docsNav.flatMap((group) =>
    group.items.filter((item) => !item.bundledIn)
  )
}

export function PrevNextNav() {
  const pathname = usePathname()
  const items = getFlatItems()
  const currentIndex = items.findIndex((item) => item.href === pathname)

  if (currentIndex === -1) return null

  const prev = currentIndex > 0 ? items[currentIndex - 1] : null
  const next = currentIndex < items.length - 1 ? items[currentIndex + 1] : null

  if (!prev && !next) return null

  return (
    <nav className="mt-12 flex items-stretch gap-4 border-t pt-8">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-1 flex-col gap-1 rounded-xl border px-4 py-3 transition-colors hover:border-foreground/20 hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ChevronLeft className="size-3" />
            Previous
          </span>
          <span className="text-sm font-medium">{prev.title}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex flex-1 flex-col items-end gap-1 rounded-xl border px-4 py-3 text-right transition-colors hover:border-foreground/20 hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            Next
            <ChevronRight className="size-3" />
          </span>
          <span className="text-sm font-medium">{next.title}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  )
}
