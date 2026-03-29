/**
 * jalco-ui
 * RepoCard
 * by Justin Levine
 * ui.justinlevine.me
 *
 * GitHub repository preview card with description, language dot, star and fork
 * counts, license, and topic tags. Async server component — fetches data at
 * build time with ISR.
 *
 * Props:
 * - owner: GitHub username or organization
 * - repo: GitHub repository name
 * - variant?: visual style variant
 * - size?: card size
 * - showLanguage?: show primary language
 * - showTopics?: show topic tags
 * - showLicense?: show license identifier
 * - showUpdated?: show last updated date
 * - data?: pre-fetched GitHubRepoData to skip the API call
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
  fetchGitHubRepoData,
  formatCount,
  formatRelativeDate,
  type GitHubRepoData,
} from "@/registry/repo-card/lib/github"

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="currentColor"
      className={className}
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z" />
    </svg>
  )
}

function ForkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0zM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zM8 12.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z" />
    </svg>
  )
}

function LicenseIcon({ className }: { className?: string }) {
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
      <path d="M6 14H3.5a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 3.5 2h9A1.5 1.5 0 0 1 14 3.5V6" />
      <path d="M5 5h6M5 8h3" />
      <circle cx="11.5" cy="11.5" r="2.5" />
      <path d="M10 13.5 9.5 16l2-1 2 1-.5-2.5" />
    </svg>
  )
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

function ArchiveIcon({ className }: { className?: string }) {
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
      <rect x="2" y="2" width="12" height="4" rx="1" />
      <path d="M2 6v6.5a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5V6" />
      <path d="M6.5 9.5h3" />
    </svg>
  )
}

const repoCardVariants = cva(
  "flex flex-col gap-3 rounded-lg border transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-border bg-card shadow-xs hover:border-foreground/20 hover:bg-accent/50",
        outline:
          "border-border bg-background shadow-xs hover:bg-accent/50 dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        ghost:
          "border-transparent hover:bg-accent/50 dark:hover:bg-accent/30",
        muted:
          "border-border/60 bg-muted/30 hover:bg-muted/60",
      },
      size: {
        sm: "p-3 [&_[data-slot=repo-name]]:text-sm [&_[data-slot=repo-description]]:text-xs [&_[data-slot=repo-meta]]:text-[11px]",
        default: "p-4 [&_[data-slot=repo-name]]:text-sm [&_[data-slot=repo-description]]:text-xs [&_[data-slot=repo-meta]]:text-xs",
        lg: "p-5 [&_[data-slot=repo-name]]:text-base [&_[data-slot=repo-description]]:text-sm [&_[data-slot=repo-meta]]:text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface RepoCardProps
  extends Omit<React.ComponentProps<"a">, "children">,
    VariantProps<typeof repoCardVariants> {
  /** GitHub username or organization. */
  owner: string
  /** GitHub repository name. */
  repo: string
  /** Show primary language with colored dot. @default true */
  showLanguage?: boolean
  /** Show topic tags. @default true */
  showTopics?: boolean
  /** Show license identifier. @default true */
  showLicense?: boolean
  /** Show last updated date. @default true */
  showUpdated?: boolean
  /** Maximum number of topic tags to display. @default 4 */
  maxTopics?: number
  /** Pre-fetched repository data. When provided, skips the GitHub API call. */
  data?: GitHubRepoData
}

async function RepoCard({
  owner,
  repo,
  variant,
  size,
  showLanguage = true,
  showTopics = true,
  showLicense = true,
  showUpdated = true,
  maxTopics = 4,
  data: dataProp,
  className,
  ...props
}: RepoCardProps) {
  const repoData = dataProp ?? (await fetchGitHubRepoData(owner, repo))
  if (!repoData) return null

  const topics = repoData.topics.slice(0, maxTopics)
  const hasMoreTopics = repoData.topics.length > maxTopics

  return (
    <a
      href={`https://github.com/${owner}/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      data-slot="repo-card"
      data-archived={repoData.isArchived || undefined}
      data-fork={repoData.isFork || undefined}
      aria-label={`${repoData.fullName} on GitHub — ${repoData.stars.toLocaleString("en-US")} stars`}
      className={cn(repoCardVariants({ variant, size, className }))}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <GitHubIcon className="size-4 shrink-0 text-muted-foreground" />
          <span data-slot="repo-name" className="font-semibold truncate">
            {repoData.fullName}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {repoData.isArchived && (
            <span className="inline-flex items-center gap-1 rounded border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium text-amber-700 dark:text-amber-400">
              <ArchiveIcon className="size-2.5" />
              Archived
            </span>
          )}
          {repoData.isFork && (
            <span className="inline-flex items-center gap-1 rounded border border-border bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              <ForkIcon className="size-2.5" />
              Fork
            </span>
          )}
        </div>
      </div>

      {repoData.description && (
        <p data-slot="repo-description" className="text-muted-foreground line-clamp-2">
          {repoData.description}
        </p>
      )}

      {showTopics && topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {topics.map((topic) => (
            <span
              key={topic}
              className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary"
            >
              {topic}
            </span>
          ))}
          {hasMoreTopics && (
            <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              +{repoData.topics.length - maxTopics}
            </span>
          )}
        </div>
      )}

      <div data-slot="repo-meta" className="flex items-center gap-3 text-muted-foreground">
        {showLanguage && repoData.language && (
          <span className="inline-flex items-center gap-1.5">
            <span
              className="size-2.5 rounded-full shrink-0"
              style={{ backgroundColor: repoData.languageColor ?? "#8b8b8b" }}
              aria-hidden="true"
            />
            {repoData.language}
          </span>
        )}

        <span className="inline-flex items-center gap-1 tabular-nums">
          <StarIcon className="size-3.5 opacity-60" />
          {formatCount(repoData.stars)}
        </span>

        {repoData.forks > 0 && (
          <span className="inline-flex items-center gap-1 tabular-nums">
            <ForkIcon className="size-3.5 opacity-60" />
            {formatCount(repoData.forks)}
          </span>
        )}

        {showLicense && repoData.license && repoData.license !== "NOASSERTION" && (
          <span className="inline-flex items-center gap-1">
            <LicenseIcon className="size-3 opacity-50" />
            {repoData.license}
          </span>
        )}

        {showUpdated && repoData.updatedAt && (
          <span className="inline-flex items-center gap-1 ml-auto">
            <ClockIcon className="size-3 opacity-50" />
            {formatRelativeDate(repoData.updatedAt)}
          </span>
        )}
      </div>
    </a>
  )
}

export { RepoCard, repoCardVariants }
export type { RepoCardProps, GitHubRepoData }
