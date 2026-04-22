/**
 * jalco-ui
 * ReleaseBadge
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Live GitHub release badge showing latest tag, publish date, and pre-release
 * indicator. Three layouts: inline pill, horizontal row, and expanded card.
 * Async server component — fetches data at build time with ISR.
 *
 * Props:
 * - owner: GitHub username or organization
 * - repo: GitHub repository name
 * - layout?: "inline" | "row" | "card" (default "inline")
 * - variant?: visual style variant
 * - size?: badge size (inline/row only)
 * - showDate?: show publish date
 * - showPreRelease?: show pre-release indicator
 * - showAssets?: show download asset count (card only)
 * - data?: pre-fetched GitHubReleaseData to skip the API call
 *
 * Notes:
 * - Async server component — no client JS required
 * - Fetches api.github.com at build time, cached 1 hour via ISR
 * - Optional GITHUB_TOKEN env var raises rate limit to 5,000 req/hr
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import {
  fetchLatestRelease,
  formatRelativeDate,
  type GitHubReleaseData,
} from "@/registry/release-badge/lib/github"

function TagIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M1 7.775V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 0 1 0 2.474l-5.026 5.026a1.75 1.75 0 0 1-2.474 0l-6.25-6.25A1.752 1.752 0 0 1 1 7.775Zm1.5 0c0 .066.026.13.073.177l6.25 6.25a.25.25 0 0 0 .354 0l5.025-5.025a.25.25 0 0 0 0-.354l-6.25-6.25a.25.25 0 0 0-.177-.073H2.75a.25.25 0 0 0-.25.25ZM6 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
    </svg>
  )
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2" y="3" width="12" height="11" rx="1.5" />
      <path d="M5 1v3M11 1v3M2 7h12" />
    </svg>
  )
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 2v8m0 0 3-3m-3 3L5 7" />
      <path d="M3 12h10" />
    </svg>
  )
}

const inlineVariants = cva(
  "inline-flex items-center shrink-0 whitespace-nowrap font-medium transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        default:
          "rounded-md border border-border bg-muted/50 text-muted-foreground shadow-xs hover:bg-accent hover:text-accent-foreground",
        primary:
          "rounded-md bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        secondary:
          "rounded-md border border-transparent bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        outline:
          "rounded-md border border-border bg-background text-foreground shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        ghost:
          "rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        subtle:
          "rounded-full border border-border/60 bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground",
      },
      size: {
        sm: "h-7 gap-1.5 px-2.5 text-xs [&_svg]:size-3.5",
        default: "h-8 gap-2 px-3 text-sm [&_svg]:size-4",
        lg: "h-9 gap-2.5 px-4 text-sm [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const rowVariants = cva(
  "inline-flex items-center shrink-0 overflow-hidden whitespace-nowrap font-medium",
  {
    variants: {
      variant: {
        default:
          "rounded-md border border-border bg-muted/50 text-muted-foreground shadow-xs",
        secondary:
          "rounded-md border border-transparent bg-secondary text-secondary-foreground shadow-xs",
        outline:
          "rounded-md border border-border bg-background text-foreground shadow-xs dark:bg-input/30 dark:border-input",
        ghost: "rounded-md text-muted-foreground",
        subtle:
          "rounded-full border border-border/60 bg-muted/40 text-muted-foreground",
      },
      size: {
        sm: "h-7 text-xs [&_svg]:size-3 [&>[data-segment]]:gap-1.5 [&>[data-segment]]:px-2.5",
        default:
          "h-8 text-sm [&_svg]:size-3.5 [&>[data-segment]]:gap-2 [&>[data-segment]]:px-3",
        lg: "h-9 text-sm [&_svg]:size-4 [&>[data-segment]]:gap-2 [&>[data-segment]]:px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type InlineVariant = NonNullable<VariantProps<typeof inlineVariants>["variant"]>
type RowVariant = NonNullable<VariantProps<typeof rowVariants>["variant"]>
type BadgeSize = NonNullable<VariantProps<typeof inlineVariants>["size"]>

interface ReleaseBadgeBaseProps {
  /** GitHub username or organization (e.g. "vercel"). */
  owner: string
  /** GitHub repository name (e.g. "next.js"). */
  repo: string
  /** Show publish date. @default false for inline, true for row/card */
  showDate?: boolean
  /** Show pre-release indicator. @default true */
  showPreRelease?: boolean
  /** Show asset/download count (card only). @default true */
  showAssets?: boolean
  /** Pre-fetched release data. When provided, skips the GitHub API call. */
  data?: GitHubReleaseData
}

interface ReleaseBadgeInlineProps
  extends ReleaseBadgeBaseProps,
    Omit<React.ComponentProps<"a">, "children"> {
  /** @default "inline" */
  layout?: "inline"
  variant?: InlineVariant
  size?: BadgeSize
}

interface ReleaseBadgeRowProps
  extends ReleaseBadgeBaseProps,
    Omit<React.ComponentProps<"div">, "children"> {
  layout: "row"
  variant?: RowVariant
  size?: BadgeSize
}

interface ReleaseBadgeCardProps
  extends ReleaseBadgeBaseProps,
    Omit<React.ComponentProps<"a">, "children"> {
  layout: "card"
  variant?: never
  size?: never
}

type ReleaseBadgeProps =
  | ReleaseBadgeInlineProps
  | ReleaseBadgeRowProps
  | ReleaseBadgeCardProps

function Divider({
  className,
  variant,
}: {
  className?: string
  variant?: string
}) {
  return (
    <span
      data-divider
      className={cn(
        "w-px self-stretch shrink-0",
        variant === "ghost"
          ? "bg-border/60"
          : variant === "secondary"
            ? "bg-secondary-foreground/20"
            : "bg-border",
        className
      )}
      aria-hidden="true"
    />
  )
}

function InlineLayout({
  release,
  showDate,
  showPreRelease,
  variant,
  size,
  className,
}: {
  release: GitHubReleaseData
  showDate: boolean
  showPreRelease: boolean
  variant: InlineVariant
  size: BadgeSize
  className?: string
}) {
  return (
    <a
      href={release.url}
      target="_blank"
      rel="noopener noreferrer"
      data-slot="release-badge"
      aria-label={`Latest release ${release.tag}${release.preRelease ? " (pre-release)" : ""}`}
      className={cn(inlineVariants({ variant, size, className }))}
    >
      <TagIcon className="shrink-0" />
      <span className="tabular-nums">{release.tag}</span>
      {showPreRelease && release.preRelease && (
        <span className="rounded bg-amber-500/15 px-1 py-px text-[10px] font-semibold leading-tight text-amber-600 dark:text-amber-400">
          pre
        </span>
      )}
      {showDate && (
        <>
          <span
            className="h-3.5 w-px shrink-0 bg-current opacity-20"
            aria-hidden="true"
          />
          <span className="flex items-center gap-1 text-[0.8em] opacity-70">
            {formatRelativeDate(release.publishedAt)}
          </span>
        </>
      )}
    </a>
  )
}

function RowLayout({
  release,
  showDate,
  showPreRelease,
  variant,
  size,
  className,
}: {
  release: GitHubReleaseData
  showDate: boolean
  showPreRelease: boolean
  variant: RowVariant
  size: BadgeSize
  className?: string
}) {
  const segments: {
    key: string
    label: string
    content: React.ReactNode
  }[] = [
    {
      key: "tag",
      label: `Release ${release.tag}`,
      content: (
        <>
          <TagIcon className="shrink-0 opacity-60" />
          <span className="tabular-nums">{release.tag}</span>
          {showPreRelease && release.preRelease && (
            <span className="rounded bg-amber-500/15 px-1 py-px text-[10px] font-semibold leading-tight text-amber-600 dark:text-amber-400">
              pre
            </span>
          )}
        </>
      ),
    },
  ]

  if (release.name) {
    segments.push({
      key: "name",
      label: release.name,
      content: (
        <span className="max-w-[14rem] truncate">{release.name}</span>
      ),
    })
  }

  if (showDate) {
    segments.push({
      key: "date",
      label: `Published ${formatRelativeDate(release.publishedAt)}`,
      content: (
        <>
          <CalendarIcon className="opacity-60" />
          <span>{formatRelativeDate(release.publishedAt)}</span>
        </>
      ),
    })
  }

  const hoverClass =
    variant === "default"
      ? "hover:bg-accent hover:text-accent-foreground"
      : variant === "secondary"
        ? "hover:bg-secondary/80"
        : variant === "outline"
          ? "hover:bg-accent hover:text-accent-foreground dark:hover:bg-input/50"
          : variant === "ghost"
            ? "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
            : "hover:bg-muted hover:text-foreground"

  return (
    <div
      data-slot="release-badge"
      role="group"
      aria-label={`${release.tag} release`}
      className={cn(rowVariants({ variant, size, className }))}
    >
      {segments.map((seg, i) => (
        <React.Fragment key={seg.key}>
          {i > 0 && <Divider variant={variant ?? "default"} />}
          <a
            href={release.url}
            target="_blank"
            rel="noopener noreferrer"
            data-segment
            aria-label={seg.label}
            className={cn(
              "inline-flex h-full items-center transition-colors",
              i === 0 && "rounded-l-[inherit]",
              i === segments.length - 1 && "rounded-r-[inherit]",
              hoverClass
            )}
          >
            {seg.content}
          </a>
        </React.Fragment>
      ))}
    </div>
  )
}

function CardLayout({
  release,
  showDate,
  showPreRelease,
  showAssets,
  className,
}: {
  release: GitHubReleaseData
  showDate: boolean
  showPreRelease: boolean
  showAssets: boolean
  className?: string
}) {
  const meta: { icon: React.ReactNode; value: string }[] = []

  if (showDate) {
    meta.push({
      icon: <CalendarIcon className="size-3 shrink-0 opacity-50" />,
      value: formatRelativeDate(release.publishedAt),
    })
  }

  if (showAssets && release.assetCount > 0) {
    meta.push({
      icon: <DownloadIcon className="size-3 shrink-0 opacity-50" />,
      value: `${release.assetCount} asset${release.assetCount === 1 ? "" : "s"}`,
    })
  }

  return (
    <a
      href={release.url}
      target="_blank"
      rel="noopener noreferrer"
      data-slot="release-badge"
      aria-label={`${release.tag} release on GitHub`}
      className={cn(
        "flex flex-col gap-2.5 rounded-lg border border-border bg-card p-4 shadow-xs transition-colors hover:border-foreground/20 hover:bg-accent/50",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <TagIcon className="size-4 shrink-0 opacity-70" />
          <span className="text-sm font-semibold truncate tabular-nums">
            {release.tag}
          </span>
          {showPreRelease && release.preRelease && (
            <span className="rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
              pre-release
            </span>
          )}
        </div>
      </div>

      {(release.name || meta.length > 0) && (
        <div className="flex flex-col gap-1.5">
          {release.name && (
            <p className="text-xs text-muted-foreground line-clamp-1">
              {release.name}
            </p>
          )}
          {meta.length > 0 && (
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {meta.map((item) => (
                <span
                  key={item.value}
                  className="inline-flex items-center gap-1 tabular-nums"
                >
                  {item.icon}
                  {item.value}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </a>
  )
}

async function ReleaseBadge(props: ReleaseBadgeProps) {
  const {
    owner,
    repo,
    layout = "inline",
    data: dataProp,
    className,
  } = props

  const release = dataProp ?? (await fetchLatestRelease(owner, repo))
  if (!release) return null

  if (layout === "card") {
    const {
      showDate = true,
      showPreRelease = true,
      showAssets = true,
    } = props
    return (
      <CardLayout
        release={release}
        showDate={showDate}
        showPreRelease={showPreRelease}
        showAssets={showAssets}
        className={className}
      />
    )
  }

  if (layout === "row") {
    const rowProps = props as ReleaseBadgeRowProps
    const {
      showDate = true,
      showPreRelease = true,
      variant = "default",
      size = "default",
    } = rowProps
    return (
      <RowLayout
        release={release}
        showDate={showDate}
        showPreRelease={showPreRelease}
        variant={variant}
        size={size}
        className={className}
      />
    )
  }

  const {
    showDate = false,
    showPreRelease = true,
    variant = "default",
    size = "default",
  } = props as ReleaseBadgeInlineProps
  return (
    <InlineLayout
      release={release}
      showDate={showDate}
      showPreRelease={showPreRelease}
      variant={variant}
      size={size}
      className={className}
    />
  )
}

export {
  ReleaseBadge,
  inlineVariants as releaseBadgeInlineVariants,
  rowVariants as releaseBadgeRowVariants,
}
export type {
  ReleaseBadgeProps,
  ReleaseBadgeInlineProps,
  ReleaseBadgeRowProps,
  ReleaseBadgeCardProps,
  GitHubReleaseData,
}
