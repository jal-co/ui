/**
 * jalco-ui
 * CIBadge
 * by Justin Levine
 * ui.justinlevine.me
 *
 * GitHub Actions CI status badge showing passing, failing, pending, or cancelled
 * state with colored status dot and optional duration. Two layouts: inline pill
 * and expanded card. Async server component — fetches data at build time with ISR.
 *
 * Props:
 * - owner: GitHub username or organization
 * - repo: GitHub repository name
 * - workflow?: workflow filename (e.g. "ci.yml") or workflow ID
 * - branch?: branch to filter by
 * - layout?: "inline" | "card" (default "inline")
 * - size?: badge size (inline only)
 * - showDuration?: show run duration
 * - showBranch?: show branch name
 * - showWorkflow?: show workflow name
 * - data?: pre-fetched CIStatusData to skip the API call
 *
 * Notes:
 * - Async server component — no client JS required
 * - Fetches api.github.com at build time, cached 10 minutes via ISR
 * - Optional GITHUB_TOKEN env var raises rate limit to 5,000 req/hr
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import {
  fetchCIStatus,
  formatDuration,
  formatRelativeDate,
  type CIStatus,
  type CIStatusData,
} from "@/registry/ci-badge/lib/github"

const statusConfig: Record<
  CIStatus,
  { label: string; dotClass: string; textClass: string }
> = {
  success: {
    label: "passing",
    dotClass: "bg-emerald-500",
    textClass: "text-emerald-700 dark:text-emerald-400",
  },
  failure: {
    label: "failing",
    dotClass: "bg-red-500",
    textClass: "text-red-700 dark:text-red-400",
  },
  pending: {
    label: "pending",
    dotClass: "bg-amber-500 animate-pulse",
    textClass: "text-amber-700 dark:text-amber-400",
  },
  cancelled: {
    label: "cancelled",
    dotClass: "bg-zinc-400",
    textClass: "text-zinc-600 dark:text-zinc-400",
  },
  skipped: {
    label: "skipped",
    dotClass: "bg-zinc-400",
    textClass: "text-zinc-600 dark:text-zinc-400",
  },
}

function ClockIcon({ className }: { className?: string }) {
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
      <circle cx="8" cy="8" r="6" />
      <path d="M8 5v3l2 2" />
    </svg>
  )
}

function GitBranchIcon({ className }: { className?: string }) {
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
      <circle cx="5" cy="3.5" r="1.5" />
      <circle cx="5" cy="12.5" r="1.5" />
      <circle cx="11" cy="6.5" r="1.5" />
      <path d="M5 5v6M9.5 6.5H7a2 2 0 0 1-2-2" />
    </svg>
  )
}

function WorkflowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25ZM6.5 6.5v8h3v-8Zm4.5 0v8h3.25a.25.25 0 0 0 .25-.25v-7.75Zm0-1.5h3.5v-3.25a.25.25 0 0 0-.25-.25H11ZM5 1.5H1.75a.25.25 0 0 0-.25.25V5H5Zm0 4H1.5v5H5Zm0 6.5H1.5v2.25c0 .138.112.25.25.25H5ZM6.5 5h3V1.5h-3Z" />
    </svg>
  )
}

const inlineVariants = cva(
  "inline-flex items-center shrink-0 whitespace-nowrap font-medium transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
  {
    variants: {
      size: {
        sm: "h-7 gap-1.5 px-2.5 text-xs",
        default: "h-8 gap-2 px-3 text-sm",
        lg: "h-9 gap-2.5 px-4 text-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

type BadgeSize = NonNullable<VariantProps<typeof inlineVariants>["size"]>

interface CIBadgeBaseProps {
  /** GitHub username or organization (e.g. "vercel"). */
  owner: string
  /** GitHub repository name (e.g. "next.js"). */
  repo: string
  /** Workflow filename (e.g. "ci.yml") or workflow ID. Fetches the latest run across all workflows if omitted. */
  workflow?: string
  /** Branch to filter by. Uses the repo's default branch if omitted. */
  branch?: string
  /** Show run duration. @default true for card, false for inline */
  showDuration?: boolean
  /** Show branch name. @default true for card, false for inline */
  showBranch?: boolean
  /** Show workflow name. @default false for inline, true for card */
  showWorkflow?: boolean
  /** Pre-fetched CI status data. When provided, skips the GitHub API call. */
  data?: CIStatusData
}

interface CIBadgeInlineProps
  extends CIBadgeBaseProps,
    Omit<React.ComponentProps<"a">, "children"> {
  /** @default "inline" */
  layout?: "inline"
  size?: BadgeSize
}

interface CIBadgeCardProps
  extends CIBadgeBaseProps,
    Omit<React.ComponentProps<"a">, "children"> {
  layout: "card"
  size?: never
}

type CIBadgeProps = CIBadgeInlineProps | CIBadgeCardProps

function InlineLayout({
  ci,
  showDuration,
  showBranch,
  showWorkflow,
  size,
  className,
}: {
  ci: CIStatusData
  showDuration: boolean
  showBranch: boolean
  showWorkflow: boolean
  size: BadgeSize
  className?: string
}) {
  const config = statusConfig[ci.status]

  return (
    <a
      href={ci.url}
      target="_blank"
      rel="noopener noreferrer"
      data-slot="ci-badge"
      data-status={ci.status}
      aria-label={`${ci.workflowName}: ${config.label}`}
      className={cn(
        inlineVariants({ size }),
        "rounded-md border border-border bg-muted/50 text-muted-foreground shadow-xs hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      <span
        className={cn("size-2 shrink-0 rounded-full", config.dotClass)}
        aria-hidden="true"
      />
      {showWorkflow && (
        <span className="max-w-[10rem] truncate">{ci.workflowName}</span>
      )}
      <span className={cn("font-semibold", config.textClass)}>
        {config.label}
      </span>
      {showBranch && (
        <>
          <span
            className="h-3.5 w-px shrink-0 bg-current opacity-20"
            aria-hidden="true"
          />
          <span className="flex items-center gap-1 opacity-70">
            <GitBranchIcon className="size-3" />
            <span className="max-w-[6rem] truncate text-[0.85em]">
              {ci.branch}
            </span>
          </span>
        </>
      )}
      {showDuration && ci.durationSeconds != null && (
        <>
          <span
            className="h-3.5 w-px shrink-0 bg-current opacity-20"
            aria-hidden="true"
          />
          <span className="flex items-center gap-1 opacity-70 text-[0.85em] tabular-nums">
            <ClockIcon className="size-3" />
            {formatDuration(ci.durationSeconds)}
          </span>
        </>
      )}
    </a>
  )
}

function CardLayout({
  ci,
  showDuration,
  showBranch,
  showWorkflow,
  className,
}: {
  ci: CIStatusData
  showDuration: boolean
  showBranch: boolean
  showWorkflow: boolean
  className?: string
}) {
  const config = statusConfig[ci.status]

  const meta: { icon: React.ReactNode; value: string }[] = []

  if (showBranch) {
    meta.push({
      icon: <GitBranchIcon className="size-3 shrink-0 opacity-50" />,
      value: ci.branch,
    })
  }

  if (showDuration && ci.durationSeconds != null) {
    meta.push({
      icon: <ClockIcon className="size-3 shrink-0 opacity-50" />,
      value: formatDuration(ci.durationSeconds),
    })
  }

  if (ci.startedAt) {
    meta.push({
      icon: null,
      value: formatRelativeDate(ci.startedAt),
    })
  }

  return (
    <a
      href={ci.url}
      target="_blank"
      rel="noopener noreferrer"
      data-slot="ci-badge"
      data-status={ci.status}
      aria-label={`${ci.workflowName}: ${config.label}`}
      className={cn(
        "flex flex-col gap-2.5 rounded-lg border border-border bg-card p-4 shadow-xs transition-colors hover:border-foreground/20 hover:bg-accent/50",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {showWorkflow && (
            <>
              <WorkflowIcon className="size-4 shrink-0 opacity-60" />
              <span className="text-sm font-semibold truncate">
                {ci.workflowName}
              </span>
            </>
          )}
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold",
            ci.status === "success" &&
              "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
            ci.status === "failure" &&
              "bg-red-500/10 text-red-700 dark:text-red-400",
            ci.status === "pending" &&
              "bg-amber-500/10 text-amber-700 dark:text-amber-400",
            (ci.status === "cancelled" || ci.status === "skipped") &&
              "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400"
          )}
        >
          <span
            className={cn("size-1.5 rounded-full", config.dotClass)}
            aria-hidden="true"
          />
          {config.label}
        </span>
      </div>

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
    </a>
  )
}

async function CIBadge(props: CIBadgeProps) {
  const {
    owner,
    repo,
    workflow,
    branch,
    layout = "inline",
    data: dataProp,
    className,
  } = props

  const ci = dataProp ?? (await fetchCIStatus(owner, repo, workflow, branch))
  if (!ci) return null

  if (layout === "card") {
    const {
      showDuration = true,
      showBranch = true,
      showWorkflow = true,
    } = props
    return (
      <CardLayout
        ci={ci}
        showDuration={showDuration}
        showBranch={showBranch}
        showWorkflow={showWorkflow}
        className={className}
      />
    )
  }

  const {
    showDuration = false,
    showBranch = false,
    showWorkflow = false,
    size = "default",
  } = props as CIBadgeInlineProps
  return (
    <InlineLayout
      ci={ci}
      showDuration={showDuration}
      showBranch={showBranch}
      showWorkflow={showWorkflow}
      size={size}
      className={className}
    />
  )
}

export { CIBadge, inlineVariants as ciBadgeInlineVariants }
export type { CIBadgeProps, CIBadgeInlineProps, CIBadgeCardProps, CIStatusData }
