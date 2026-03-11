import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import {
  fetchGitHubRepo,
  formatCount,
  type GitHubRepo,
} from "@/registry/github-stars-button/lib/github"

/* --------------------------------------------------------------------- */
/*  Icons                                                                */
/* --------------------------------------------------------------------- */

type IconStyle = "currentColor" | "github" | "copilot" | "muted"

function GitHubIcon({
  iconStyle = "currentColor",
  className,
}: {
  iconStyle?: IconStyle
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cn(
        className,
        iconStyle === "github" && "text-[#0FBF3E]",
        iconStyle === "copilot" && "text-[#8534F3]",
        iconStyle === "muted" && "opacity-50 grayscale"
      )}
      fill="currentColor"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

/* --------------------------------------------------------------------- */
/*  Metric config                                                        */
/* --------------------------------------------------------------------- */

type MetricKey = "stars" | "forks" | "watchers" | "issues"

interface MetricConfig {
  label: string
  icon: React.ReactNode
  href: (owner: string, repo: string) => string
  value: (data: GitHubRepo) => number
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
    </svg>
  )
}

function ForkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
    </svg>
  )
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14s-3.671-.992-4.933-2.078C1.797 10.831.88 9.577.43 8.899a1.62 1.62 0 0 1 0-1.798c.45-.678 1.367-1.932 2.637-3.023C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5s2.825-.742 3.955-1.715c1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5s-2.825.742-3.955 1.715c-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z" />
    </svg>
  )
}

function IssueIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
    </svg>
  )
}

const METRICS: Record<MetricKey, MetricConfig> = {
  stars: {
    label: "Star",
    icon: <StarIcon />,
    href: (o, r) => `https://github.com/${o}/${r}/stargazers`,
    value: (d) => d.stars,
  },
  forks: {
    label: "Fork",
    icon: <ForkIcon />,
    href: (o, r) => `https://github.com/${o}/${r}/forks`,
    value: (d) => d.forks,
  },
  watchers: {
    label: "Watch",
    icon: <EyeIcon />,
    href: (o, r) => `https://github.com/${o}/${r}/watchers`,
    value: (d) => d.watchers,
  },
  issues: {
    label: "Issues",
    icon: <IssueIcon />,
    href: (o, r) => `https://github.com/${o}/${r}/issues`,
    value: (d) => d.issues,
  },
}

/* --------------------------------------------------------------------- */
/*  CVA variants                                                         */
/* --------------------------------------------------------------------- */

const githubButtonGroupVariants = cva(
  "inline-flex items-center shrink-0 overflow-hidden whitespace-nowrap font-medium",
  {
    variants: {
      variant: {
        default:
          "rounded-md border border-border bg-muted/50 text-muted-foreground shadow-xs",
        outline:
          "rounded-md border border-border bg-background text-foreground shadow-xs dark:bg-input/30 dark:border-input",
        ghost:
          "rounded-md text-muted-foreground",
        subtle:
          "rounded-full border border-border/60 bg-muted/40 text-muted-foreground",
      },
      size: {
        sm: "h-7 text-xs [&_svg]:size-3 [&_a]:gap-1.5 [&_a]:px-2.5",
        default: "h-8 text-sm [&_svg]:size-3.5 [&_a]:gap-2 [&_a]:px-3",
        lg: "h-9 text-sm [&_svg]:size-4 [&_a]:gap-2 [&_a]:px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/* --------------------------------------------------------------------- */
/*  Component                                                            */
/* --------------------------------------------------------------------- */

interface GitHubButtonGroupProps
  extends Omit<React.ComponentProps<"div">, "children">,
    VariantProps<typeof githubButtonGroupVariants> {
  /** GitHub username or organization. */
  owner: string
  /** GitHub repository name. */
  repo: string
  /**
   * Which metrics to display, in order.
   * @default ["stars", "forks", "watchers"]
   */
  metrics?: MetricKey[]
  /** Show the owner/repo label as a leading segment. */
  showRepo?: boolean
  /**
   * Icon display style for the GitHub octocat (shown when `showRepo` is true,
   * or as a standalone leading icon).
   * - `"currentColor"` — inherits text color (default)
   * - `"github"` — GitHub green (#0FBF3E)
   * - `"copilot"` — Copilot purple (#8534F3)
   * - `"muted"` — grayscale with reduced opacity
   */
  iconStyle?: IconStyle
}

async function GitHubButtonGroup({
  owner,
  repo,
  metrics = ["stars", "forks", "watchers"],
  showRepo = false,
  iconStyle = "currentColor",
  variant,
  size,
  className,
  ...props
}: GitHubButtonGroupProps) {
  const data = await fetchGitHubRepo(owner, repo)
  if (!data) return null

  const dividerClass = variant === "ghost" ? "bg-border/60" : "bg-border"
  const hoverClass =
    variant === "default"
      ? "hover:bg-accent hover:text-accent-foreground"
      : variant === "outline"
        ? "hover:bg-accent hover:text-accent-foreground dark:hover:bg-input/50"
        : variant === "ghost"
          ? "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
          : "hover:bg-muted hover:text-foreground"

  return (
    <div
      data-slot="github-button-group"
      role="group"
      aria-label={`${data.fullName} on GitHub`}
      className={cn(githubButtonGroupVariants({ variant, size, className }))}
      {...props}
    >
      {showRepo && (
        <>
          <a
            href={`https://github.com/${owner}/${repo}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${data.fullName} on GitHub`}
            className={cn(
              "inline-flex h-full items-center rounded-l-[inherit] transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:z-10",
              hoverClass
            )}
          >
            <GitHubIcon iconStyle={iconStyle} className="shrink-0" />
            <span className="max-w-[12rem] truncate">{data.fullName}</span>
          </a>
          <span
            className={cn("w-px self-stretch shrink-0", dividerClass)}
            aria-hidden="true"
          />
        </>
      )}
      {metrics.map((key, i) => {
        const metric = METRICS[key]
        const count = metric.value(data)
        return (
          <React.Fragment key={key}>
            {i > 0 && (
              <span
                className={cn("w-px self-stretch shrink-0", dividerClass)}
                aria-hidden="true"
              />
            )}
            <a
              href={metric.href(owner, repo)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${count.toLocaleString("en-US")} ${metric.label.toLowerCase()}${count !== 1 ? (metric.label === "Watch" ? "es" : "s") : ""}`}
              className={cn(
                "inline-flex h-full items-center transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:z-10",
                i === 0 && !showRepo && "rounded-l-[inherit]",
                i === metrics.length - 1 && "rounded-r-[inherit]",
                hoverClass
              )}
            >
              {metric.icon}
              <span>{metric.label}</span>
              <span
                className={cn(
                  "ml-0.5 border-l pl-2 tabular-nums",
                  variant === "ghost" ? "border-border/60" : "border-border"
                )}
              >
                {formatCount(count)}
              </span>
            </a>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export {
  GitHubButtonGroup,
  githubButtonGroupVariants,
  type GitHubButtonGroupProps,
  type MetricKey,
}
