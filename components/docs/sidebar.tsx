"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { docsNav, getActiveBadge } from "@/lib/docs"

export function Sidebar() {
  const pathname = usePathname()
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [canScroll, setCanScroll] = React.useState(false)

  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    function check() {
      if (!el) return
      setCanScroll(el.scrollHeight > el.clientHeight + 2)
    }

    check()

    el.addEventListener("scroll", check, { passive: true })

    const ro = new ResizeObserver(check)
    ro.observe(el)

    return () => {
      el.removeEventListener("scroll", check)
      ro.disconnect()
    }
  }, [])

  // Re-check when scrolling — hide when near bottom
  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    function onScroll() {
      if (!el) return
      const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 16
      setCanScroll(!nearBottom && el.scrollHeight > el.clientHeight + 2)
    }

    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="relative h-full">
      <div
        ref={scrollRef}
        className="h-full overflow-y-auto p-4 pb-14 no-scrollbar"
      >
        <nav className="flex flex-col gap-6">
          {docsNav.map((group) => (
            <div key={group.title} className="flex flex-col gap-1">
              <p className="px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {group.title}
              </p>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                    item.bundledIn && "ml-3 text-[13px]",
                    pathname === item.href
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.title}
                  {getActiveBadge(item) && (
                    <span className="rounded-full border border-dashed border-[#ff4f00]/40 px-1.5 py-0.5 text-[10px] font-medium leading-none text-[#ff4f00]">
                      {getActiveBadge(item)}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>

      {/* Scroll indicator */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex flex-col items-center transition-opacity duration-200",
          canScroll ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        {/* Fade mask */}
        <div className="h-8 w-full bg-gradient-to-t from-background to-transparent" />
        {/* Button */}
        <button
          type="button"
          aria-label="Scroll down for more"
          onClick={() => {
            scrollRef.current?.scrollBy({ top: 120, behavior: "smooth" })
          }}
          className="flex w-full cursor-pointer flex-col items-center gap-0.5 bg-background pb-3 pt-1"
        >
          <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            More
          </span>
          <ChevronDown className="size-3 animate-bounce text-muted-foreground" />
        </button>
      </div>
    </div>
  )
}
