"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useReducedMotion } from "motion/react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
// Types inlined from fumadocs-core/page-tree/definitions
interface TreeRoot {
  name: React.ReactNode
  children: TreeNode[]
  $id?: string
}

type TreeNode =
  | { type: "page"; name: React.ReactNode; url: string; $id?: string }
  | { type: "separator"; name?: React.ReactNode; $id?: string }
  | { type: "folder"; name: React.ReactNode; children: TreeNode[]; $id?: string }
import { getLatestRelease } from "@/lib/releases"

const latestReleaseSlugs = new Set(
  getLatestRelease().components.map((c) => c.name)
)

function getSlugFromUrl(url: string): string {
  return url.split("/").pop() ?? ""
}

function isNewComponent(url: string): boolean {
  return latestReleaseSlugs.has(getSlugFromUrl(url))
}

const staticPages = [
  { name: "Components", url: "/docs" },
  { name: "Installation", url: "/docs/installation" },
  { name: "Color Themes", url: "/docs/themes" },
  { name: "Releases", url: "/docs/releases" },
]

interface FumadocsSidebarProps {
  tree: TreeRoot
}

export function FumadocsSidebar({ tree }: FumadocsSidebarProps) {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()
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
      <div ref={scrollRef} className="h-full overflow-y-auto p-4 pb-14 no-scrollbar">
        <nav className="flex flex-col gap-1">
          <div className="flex flex-col gap-1 pb-2">
            <p className="px-2 pb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Getting Started
            </p>
            {staticPages.map((page) => {
              const isActive = pathname === page.url
              return (
                <Link
                  key={page.url}
                  href={page.url}
                  className={cn(
                    "relative flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                    isActive ? "font-medium text-accent-foreground" : "text-muted-foreground"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-md bg-accent"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 500, damping: 35 }
                      }
                    />
                  )}
                  <span className="relative z-10">{page.name}</span>
                </Link>
              )
            })}
          </div>
          {tree.children.map((node) => {
            // Flatten the Components folder directly into the sidebar
            if (node.type === "folder" && node.children) {
              return node.children.map((child) => (
                <SidebarNode key={child.$id} node={child} pathname={pathname} prefersReducedMotion={prefersReducedMotion} />
              ))
            }
            return <SidebarNode key={node.$id} node={node} pathname={pathname} prefersReducedMotion={prefersReducedMotion} />
          })}
        </nav>
      </div>

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-20 flex flex-col items-center transition-opacity duration-200",
          canScroll ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="h-8 w-full bg-gradient-to-t from-background to-transparent" />
        <button
          type="button"
          aria-label="Scroll down for more"
          onClick={() => scrollRef.current?.scrollBy({ top: 120, behavior: "smooth" })}
          className="flex w-full cursor-pointer flex-col items-center gap-0.5 bg-background pb-3 pt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">More</span>
          <ChevronDown className="size-3 motion-safe:animate-pulse text-muted-foreground" />
        </button>
      </div>
    </div>
  )
}

function SidebarNode({
  node,
  pathname,
  prefersReducedMotion,
}: {
  node: TreeNode
  pathname: string
  prefersReducedMotion: boolean | null
}) {
  if (node.type === "separator") {
    return (
      <p className="px-2 pt-5 pb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {node.name}
      </p>
    )
  }

  if (node.type === "folder") {
    return (
      <div className="flex flex-col gap-1">
        <p className="px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {node.name}
        </p>
        {node.children.map((child) => (
          <SidebarNode key={child.$id} node={child} pathname={pathname} prefersReducedMotion={prefersReducedMotion} />
        ))}
      </div>
    )
  }

  if (node.type === "page") {
    const isActive = pathname === node.url
    const isNew = node.url ? isNewComponent(node.url) : false

    return (
      <Link
        href={node.url ?? "#"}
        className={cn(
          "relative flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
          isActive ? "font-medium text-accent-foreground" : "text-muted-foreground"
        )}
      >
        {isActive && (
          <motion.span
            layoutId="sidebar-active"
            className="absolute inset-0 rounded-md bg-accent"
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 500, damping: 35 }
            }
          />
        )}
        <span className="relative z-10">{node.name}</span>
        {isNew && (
          <span className="relative z-10 rounded-full border border-dashed border-ring/40 px-1.5 py-0.5 text-[10px] font-medium leading-none text-ring">
            New
          </span>
        )}
      </Link>
    )
  }

  return null
}
