import type { ReactNode } from "react"
import Link from "next/link"
import { FumadocsSidebar } from "@/components/docs/fumadocs-sidebar"
import { MobileNav } from "@/components/docs/mobile-nav"
import { ThemeSwitcher } from "@/components/docs/theme-switcher"
import { Button } from "@/registry/ui/button"
import { source } from "@/lib/source"

import { JalcoLogo } from "@/components/icons/jalco-logo"
import { GitHubStarsButton } from "@/registry/github-stars-button/github-stars-button"


export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Dot grid background */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: [
            "linear-gradient(to right, color-mix(in oklab, var(--color-muted-foreground) 10%, transparent) 1px, transparent 1px)",
            "linear-gradient(to bottom, color-mix(in oklab, var(--color-muted-foreground) 10%, transparent) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "28px 28px",
          maskImage:
            "linear-gradient(to right, black, transparent 30%, transparent 70%, black)",
          WebkitMaskImage:
            "linear-gradient(to right, black, transparent 30%, transparent 70%, black)",
        }}
      />
      <div className="relative mx-auto flex min-h-screen max-w-[1600px] flex-col border-x border-dashed border-border bg-background">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
        <MobileNav />

        <Link
          href="/docs"
          className="flex items-center gap-2 rounded-md text-sm font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <JalcoLogo className="h-5 w-auto" />
          <span className="hidden sm:inline">jal-co/ui</span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 text-sm md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/docs">Components</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/docs/releases">Releases</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/docs/installation">Installation</Link>
          </Button>
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <GitHubStarsButton
            owner="jal-co"
            repo="ui"
            variant="primary"
            size="sm"
            showRepo
          />
          <ThemeSwitcher />
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden w-64 shrink-0 border-r md:block">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)]">
            <FumadocsSidebar tree={source.pageTree} />
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-8 sm:px-8">
          <div className="mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
    </div>
  )
}
