import type { ReactNode } from "react"
import Link from "next/link"
import { Sidebar } from "@/components/docs/sidebar"
import { MobileNav } from "@/components/docs/mobile-nav"
import { ThemeSwitcher } from "@/components/docs/theme-switcher"
import { JalcoLogo } from "@/components/icons/jalco-logo"
import { GitHubStarsButton } from "@/registry/github-stars-button/github-stars-button"

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
        <MobileNav />
        <Link
          href="/docs"
          className="flex items-center gap-2 text-sm font-semibold"
        >
          <JalcoLogo className="h-6 w-auto" />
          Jalco UI
        </Link>
        <nav className="ml-6 hidden items-center gap-4 text-sm text-muted-foreground sm:flex">
          <Link
            href="/docs"
            className="transition-colors hover:text-foreground"
          >
            Docs
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <GitHubStarsButton
            owner="jal-co"
            repo="ui"
            variant="ghost"
            size="sm"
          />
          <ThemeSwitcher />
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden w-56 shrink-0 border-r md:block">
          <div className="sticky top-14 overflow-y-auto p-4">
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
