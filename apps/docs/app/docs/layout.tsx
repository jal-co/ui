import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Heart } from "lucide-react"
import { FumadocsSidebar } from "@/components/docs/fumadocs-sidebar"
import { MobileNav } from "@/components/docs/mobile-nav"
import { ThemeSwitcher } from "@/components/docs/theme-switcher"
import { Button } from "@/registry/ui/button"
import { source } from "@/lib/source"

import { JalcoLogo } from "@/components/icons/jalco-logo"
import { GitHubStarsButton } from "@/registry/github-stars-button/github-stars-button"
import { SiteFooter } from "@/components/docs/footer"


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
      <div className="sticky top-0 z-30">
      <div className="flex items-center justify-center gap-2 border-b bg-foreground px-4 py-1.5 text-background">
        <p className="text-xs font-medium tracking-wide sm:text-sm">
          Introducing <span className="font-bold">shieldcn</span> — README badges, shadcn style.
        </p>
        <Link
          href="https://www.shieldcn.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold underline underline-offset-2 hover:opacity-80 sm:text-sm"
        >
          Check it out <ArrowRight className="size-3" />
        </Link>
      </div>
      <header className="flex h-14 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6 flex h-14 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
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
            <Link href="/docs/installation">Installation</Link>
          </Button>
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
            <Link href="/sponsor">
              <Heart className="size-3.5" />
              Sponsor
            </Link>
          </Button>
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
      </div>

      <div className="flex flex-1">
        <aside className="hidden w-64 shrink-0 border-r md:block">
          <div className="sticky top-[5.75rem] h-[calc(100vh-5.75rem)]">
            <FumadocsSidebar tree={source.pageTree} />
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-8 sm:px-8">
          <div className="mx-auto w-full">
            {children}
          </div>
        </main>
      </div>

      <SiteFooter />
    </div>
    </div>
  )
}
