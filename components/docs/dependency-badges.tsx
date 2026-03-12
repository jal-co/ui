import { cn } from "@/lib/utils"
import { depIcons } from "@/lib/dep-icons"

interface DependencyBadgesProps {
  /** npm package dependencies (e.g. ["shiki", "lucide-react"]) */
  dependencies?: string[]
  /** shadcn registry dependencies (e.g. ["button", "card", "input"]) */
  registryDependencies?: string[]
  className?: string
}

/**
 * Maps npm dependency names to their bundled icon key.
 * Extend as new dependencies are added to registry items.
 */
const depIconKeyMap: Record<string, string> = {
  shiki: "Shiki",
  zod: "Zod",
  react: "React",
  "react-dom": "React",
  "class-variance-authority": "Tailwind CSS",
  "tailwind-merge": "Tailwind CSS",
}

/**
 * Lucide has no SVGL entry — use their logo directly.
 * Returns [lightSrc, darkSrc] or null.
 */
function getLucideLogoUrls(dep: string): [string, string] | null {
  if (dep === "lucide-react" || dep === "lucide") {
    return [
      "https://lucide.dev/logo.light.svg",
      "https://lucide.dev/logo.dark.svg",
    ]
  }
  return null
}

function DependencyIcon({ name }: { name: string }) {
  // Check for lucide first (no SVGL entry)
  const lucideUrls = getLucideLogoUrls(name)
  if (lucideUrls) {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={lucideUrls[0]}
          alt=""
          aria-hidden="true"
          className="size-3 shrink-0 dark:hidden"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={lucideUrls[1]}
          alt=""
          aria-hidden="true"
          className="hidden size-3 shrink-0 dark:block"
        />
      </>
    )
  }

  // Try bundled icon
  const iconKey = depIconKeyMap[name]
  if (!iconKey) return null

  const svg = depIcons[iconKey]
  if (!svg) return null

  return (
    <span
      className="inline-flex size-3 shrink-0 [&>svg]:size-full"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

/**
 * Parse a registry dependency into a display name and optional source.
 */
function parseRegistryDep(dep: string): { name: string; source: "shadcn" | "svgl" | "other" } {
  if (dep.startsWith("https://svgl.app/")) {
    const match = dep.match(/\/r\/([^.]+)\.json$/)
    return { name: match?.[1] ?? dep, source: "svgl" }
  }
  if (dep.startsWith("http")) {
    const match = dep.match(/\/r\/([^.]+)\.json$/)
    return { name: match?.[1] ?? dep, source: "other" }
  }
  return { name: dep, source: "shadcn" }
}

function RegistryDepIcon({ source }: { source: "shadcn" | "svgl" | "other" }) {
  const key = source === "svgl" ? "Svgl" : "shadcn/ui"
  const svg = depIcons[key]
  if (!svg) return null

  return (
    <span
      className="inline-flex size-3 shrink-0 [&>svg]:size-full"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

/**
 * Dependency badges with logos for component doc pages.
 * All icons are bundled locally — no build-time API calls.
 */
export function DependencyBadges({
  dependencies = [],
  registryDependencies = [],
  className,
}: DependencyBadgesProps) {
  const all = [...registryDependencies, ...dependencies]
  if (all.length === 0) return null

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {registryDependencies
        .filter((dep) => !dep.startsWith("http"))
        .map((dep) => {
          const parsed = parseRegistryDep(dep)
          return (
            <span
              key={dep}
              className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-muted/50 px-2 py-0.5 text-xs font-medium text-muted-foreground"
            >
              <RegistryDepIcon source={parsed.source} />
              {parsed.name}
            </span>
          )
        })}
      {dependencies.map((dep) => (
        <span
          key={dep}
          className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-muted/50 px-2 py-0.5 text-xs font-medium text-muted-foreground"
        >
          <DependencyIcon name={dep} />
          {dep}
        </span>
      ))}
    </div>
  )
}
