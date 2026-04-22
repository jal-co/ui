import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Heart, ExternalLink, Star, Plus } from "lucide-react"
import { JalcoLogo } from "@/components/icons/jalco-logo"
import { ThemeSwitcher } from "@/components/docs/theme-switcher"
import { GitHubStarsButton } from "@/registry/github-stars-button/github-stars-button"
import { SiteFooter } from "@/components/docs/footer"
import { Button } from "@/registry/ui/button"

export const metadata: Metadata = {
  title: "Sponsor — jal-co/ui",
  description:
    "Support jal-co/ui. Every component is free and always will be — but if you want to help, this is the way.",
}

const GITHUB_SPONSORS_URL = "https://github.com/sponsors/jal-co"

interface Stargazer {
  login: string
  avatar_url: string
}

async function getStargazers(): Promise<Stargazer[]> {
  const pages: Stargazer[] = []
  let page = 1
  // Fetch up to 5 pages (500 stargazers) to be safe
  while (page <= 5) {
    const res = await fetch(
      `https://api.github.com/repos/jal-co/ui/stargazers?per_page=100&page=${page}`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        // Revalidate every hour, but keep serving stale data on error
        // so the section never disappears from a transient failure.
        next: { revalidate: 3600, tags: ["stargazers"] },
      }
    )
    if (!res.ok) break
    const data: Stargazer[] = await res.json()
    if (data.length === 0) break
    pages.push(...data)
    if (data.length < 100) break
    page++
  }
  // Filter out the org account
  return pages.filter((s) => s.login !== "jal-co")
}

const tiers = [
  {
    name: "Gold",
    slots: 3,
    sponsors: [] as { name: string; href: string; logo?: string }[],
    colors: {
      bg: "linear-gradient(145deg, #d4a84b 0%, #f5d98a 30%, #c9952e 60%, #e8c55a 100%)",
      text: "#5c3d0e",
      border: "#c9952e",
      slotBg: "rgba(212, 168, 75, 0.08)",
      slotBorder: "rgba(201, 149, 46, 0.25)",
    },
  },
  {
    name: "Silver",
    slots: 3,
    sponsors: [] as { name: string; href: string; logo?: string }[],
    colors: {
      bg: "linear-gradient(145deg, #a8a8a8 0%, #d4d4d4 30%, #8a8a8a 60%, #c0c0c0 100%)",
      text: "#2a2a2a",
      border: "#8a8a8a",
      slotBg: "rgba(168, 168, 168, 0.06)",
      slotBorder: "rgba(138, 138, 138, 0.2)",
    },
  },
  {
    name: "Bronze",
    slots: 4,
    sponsors: [] as { name: string; href: string; logo?: string }[],
    colors: {
      bg: "linear-gradient(145deg, #b5745a 0%, #d4956e 30%, #8c5a3e 60%, #c98a68 100%)",
      text: "#3d1e0e",
      border: "#8c5a3e",
      slotBg: "rgba(181, 116, 90, 0.06)",
      slotBorder: "rgba(140, 90, 62, 0.2)",
    },
  },
]

export default async function SponsorPage() {
  const stargazers = await getStargazers()
  return (
    <div className="relative min-h-screen">
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: [
            "linear-gradient(to right, color-mix(in oklab, var(--color-muted-foreground) 10%, transparent) 1px, transparent 1px)",
            "linear-gradient(to bottom, color-mix(in oklab, var(--color-muted-foreground) 10%, transparent) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-[1600px] flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
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

        <main className="flex flex-1 items-start justify-center">
          <div
            className="hidden w-4 shrink-0 self-stretch border-l border-dashed border-border md:block"
            style={{
              background:
                "repeating-linear-gradient(45deg, transparent, transparent 2px, color-mix(in oklab, var(--color-border) 60%, transparent) 2px, color-mix(in oklab, var(--color-border) 60%, transparent) 3.5px), var(--background)",
            }}
          />
          <div className="flex w-full max-w-3xl flex-col border-x border-dashed border-border bg-background">
          {/* Hero */}
          <section className="flex flex-col gap-6 border-b px-6 py-14 sm:px-10">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <Heart className="size-3.5" />
                Sponsor
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                I&apos;ll never charge, but if you want to help
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                jal-co/ui is an open source React component library distributed
                through the shadcn registry. Every component is free and that&apos;s
                not changing.
              </p>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                I&apos;m not going to paywall components or gate features behind a
                sponsorship tier. That&apos;s not the point. But if something from
                the registry saved you an afternoon, or you just like that this
                exists in the open, sponsoring is a nice way to say so. It helps
                me justify spending real time on it instead of treating it like a
                side-of-desk thing.
              </p>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Any amount is genuinely appreciated. And if money&apos;s not your
                thing, starring the repo or sharing a component you liked works
                too.
              </p>
            </div>

            <a
              href={GITHUB_SPONSORS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="gap-2">
                <Heart className="size-4" />
                Sponsor on GitHub
                <ExternalLink className="size-3.5 opacity-60" />
              </Button>
            </a>
          </section>



          {/* Sponsors */}
          <section className="flex flex-col">


            {tiers.map((tier) => {
              const filled = tier.sponsors.length
              const empty = tier.slots - filled

              return (
                <div key={tier.name} className="flex flex-col gap-3 border-b px-6 py-6 sm:px-10">
                  {/* Plaque header */}
                  <div
                    className="relative flex items-center justify-center rounded-md px-8 py-2.5"
                    style={{
                      background: tier.colors.bg,
                      boxShadow: `inset 0 1px 1px rgba(255,255,255,0.35), inset 0 -1px 2px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.12)`,
                    }}
                  >
                    {/* Rivets */}
                    {["left-2.5 top-1/2 -translate-y-1/2", "right-2.5 top-1/2 -translate-y-1/2"].map((pos) => (
                      <span
                        key={pos}
                        className={`absolute size-2 rounded-full ${pos}`}
                        style={{
                          background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), transparent 50%), ${tier.colors.bg}`,
                          boxShadow: `inset 0 1px 2px rgba(0,0,0,0.3), inset 0 -1px 1px rgba(255,255,255,0.2), 0 1px 1px rgba(255,255,255,0.15)`,
                          border: `1px solid rgba(0,0,0,0.15)`,
                        }}
                      />
                    ))}
                    <h3
                      className="text-xs font-extrabold uppercase tracking-[0.2em]"
                      style={{ color: tier.colors.text }}
                    >
                      {tier.name}
                    </h3>
                  </div>

                  {/* Sponsor slots */}
                  <div
                    className="grid gap-2"
                    style={{
                      gridTemplateColumns: `repeat(${Math.min(tier.slots, 4)}, 1fr)`,
                    }}
                  >
                    {tier.sponsors.map((sponsor) => (
                      <a
                        key={sponsor.name}
                        href={sponsor.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center rounded-md border p-6 transition-all hover:scale-[1.02]"
                        style={{
                          backgroundColor: tier.colors.slotBg,
                          borderColor: tier.colors.slotBorder,
                        }}
                      >
                        {sponsor.logo ? (
                          <Image
                            src={sponsor.logo}
                            alt={sponsor.name}
                            width={120}
                            height={32}
                            className="h-8 w-auto opacity-60 transition-opacity group-hover:opacity-100"
                            unoptimized
                          />
                        ) : (
                          <span className="text-sm font-medium text-foreground">
                            {sponsor.name}
                          </span>
                        )}
                      </a>
                    ))}

                    {Array.from({ length: empty }).map((_, i) => (
                      <a
                        key={`empty-${tier.name}-${i}`}
                        href={GITHUB_SPONSORS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center rounded-md border border-dashed p-8 transition-all hover:scale-[1.02]"
                        style={{
                          borderColor: tier.colors.slotBorder,
                        }}
                      >
                        <Plus className="size-5" style={{ color: tier.colors.border, opacity: 0.5 }} />
                      </a>
                    ))}
                  </div>
                </div>
              )
            })}
          </section>

          {/* Stargazers */}
          {stargazers.length > 0 && (
            <section className="flex flex-col border-b">
              <div className="flex items-center gap-3 px-6 py-3 sm:px-10">
                <h3 className="text-xs font-bold uppercase tracking-wide text-foreground">
                  Stargazers
                </h3>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {stargazers.length}
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-0 border-t py-4">
                {stargazers.map((user) => (
                  <a
                    key={user.login}
                    href={`https://github.com/${user.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={user.login}
                    className="group relative p-1.5 transition-colors hover:bg-accent/50"
                  >
                    <Image
                      src={user.avatar_url}
                      alt={user.login}
                      width={36}
                      height={36}
                      className="rounded-full ring-1 ring-border transition-all group-hover:ring-foreground/30 group-hover:scale-110"
                      unoptimized
                    />
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="flex flex-col items-center gap-5 px-6 py-14 sm:px-10">
            <div className="flex flex-col items-center gap-2 text-center">
              <h2 className="text-lg font-bold tracking-tight">
                Want to support the project?
              </h2>
              <p className="max-w-sm text-sm text-muted-foreground">
                Every bit helps — whether it&apos;s a sponsorship, a star, or sharing
                something you found useful.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={GITHUB_SPONSORS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="default" className="gap-2">
                  <Heart className="size-4" />
                  Become a Sponsor
                </Button>
              </a>
              <a
                href="https://github.com/jal-co/ui"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="default" className="gap-2">
                  <Star className="size-4" />
                  Star on GitHub
                </Button>
              </a>
            </div>
          </section>
          </div>
          <div
            className="hidden w-4 shrink-0 self-stretch border-r border-dashed border-border md:block"
            style={{
              background:
                "repeating-linear-gradient(45deg, transparent, transparent 2px, color-mix(in oklab, var(--color-border) 60%, transparent) 2px, color-mix(in oklab, var(--color-border) 60%, transparent) 3.5px), var(--background)",
            }}
          />
        </main>

        <SiteFooter />
      </div>
    </div>
  )
}
