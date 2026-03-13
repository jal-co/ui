import type { ReactNode } from "react"
import Link from "next/link"
import { Sidebar } from "@/components/docs/sidebar"
import { MobileNav } from "@/components/docs/mobile-nav"
import { ThemeSwitcher } from "@/components/docs/theme-switcher"
import { JalcoLogo } from "@/components/icons/jalco-logo"
import { GitHubStarsButton } from "@/registry/github-stars-button/github-stars-button"
import { ProductHuntButton } from "@/registry/producthunt-button/producthunt-button"

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col border-x border-dashed border-border">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
        <MobileNav />

        <Link
          href="/docs"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <JalcoLogo className="h-5 w-auto" />
          <span className="hidden sm:inline">jal-co/ui</span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 text-sm md:flex">
          <Link
            href="/docs"
            className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            Components
          </Link>
          <Link
            href="/docs/installation"
            className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            Installation
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <ProductHuntButton
            slug="jalco-ui"
            variant="producthunt"
            size="sm"
            iconStyle="brand"
          />
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
            <Sidebar />
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 md:px-12">
          <div className="mx-auto max-w-3xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
