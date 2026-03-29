/* eslint-disable @next/next/no-img-element */
/**
 * jalco-ui
 * ContributorGrid, ContributorList
 * by Justin Levine
 * ui.justinlevine.me
 *
 * GitHub contributor display with two layouts: a compact avatar grid and
 * a detailed list with names, counts, and profile links.
 *
 * Exports:
 * - ContributorGrid — wrapped avatar circles for landing pages and READMEs
 * - ContributorList — rows with avatar, name, contribution count, and link
 *
 * Props (shared):
 * - owner: GitHub username or organization
 * - repo: GitHub repository name
 * - contributors?: pre-fetched data (skips API call when provided)
 * - max?: maximum number of contributors to show (default 30)
 *
 * Notes:
 * - Async server component — no client JS required
 * - Fetches GitHub Contributors API with 1h ISR cache
 * - Optional GITHUB_TOKEN env var for higher rate limits
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { ContributorAvatar } from "@/registry/contributor-grid/contributor-grid-client"
import {
  fetchContributors,
  formatCount,
  type GitHubContributor,
} from "@/registry/contributor-grid/lib/github"

// Shared base props

interface ContributorBaseProps {
  /** GitHub username or organization. */
  owner: string
  /** GitHub repository name. */
  repo: string
  /** Pre-fetched contributor data. When provided, skips the GitHub API call. */
  contributors?: GitHubContributor[]
  /** Maximum number of contributors to display. @default 30 */
  max?: number
}

// ContributorGrid

type AvatarSize = "sm" | "md" | "lg"

const avatarSizes: Record<AvatarSize, { className: string; px: number }> = {
  sm: { className: "size-8", px: 32 },
  md: { className: "size-10", px: 40 },
  lg: { className: "size-12", px: 48 },
}

interface ContributorGridProps
  extends ContributorBaseProps,
    Omit<React.ComponentProps<"div">, "children"> {
  /** Avatar size. @default "md" */
  size?: AvatarSize
  /** Show contribution count in tooltips. @default true */
  showContributions?: boolean
}

async function ContributorGrid({
  owner,
  repo,
  contributors: contributorsProp,
  max = 30,
  size = "md",
  showContributions = true,
  className,
  ...props
}: ContributorGridProps) {
  const data = contributorsProp ?? (await fetchContributors(owner, repo, max))
  if (!data || data.length === 0) return null

  const display = data.slice(0, max)
  const avatarConfig = avatarSizes[size]
  const remaining = data.length > max ? data.length - max : 0

  return (
    <div
      data-slot="contributor-grid"
      className={cn("flex flex-wrap items-center -space-x-2", className)}
      role="list"
      aria-label={`Contributors to ${owner}/${repo}`}
      {...props}
    >
      {display.map((contributor, i) => (
        <ContributorAvatar
          key={contributor.login}
          contributor={contributor}
          imgSize={avatarConfig.px}
          avatarClassName={avatarConfig.className}
          showContributions={showContributions}
          style={{ zIndex: display.length - i }}
        />
      ))}
      {remaining > 0 && (
        <a
          href={`https://github.com/${owner}/${repo}/graphs/contributors`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "relative flex items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium text-muted-foreground transition-colors hover:z-10 hover:bg-accent hover:text-accent-foreground focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            avatarConfig.className
          )}
          aria-label={`${remaining} more contributors`}
        >
          +{remaining}
        </a>
      )}
    </div>
  )
}

// ContributorList

interface ContributorListProps
  extends ContributorBaseProps,
    Omit<React.ComponentProps<"div">, "children" | "title"> {
  /** Optional heading above the list. */
  title?: string
}

async function ContributorList({
  owner,
  repo,
  contributors: contributorsProp,
  max = 30,
  title,
  className,
  ...props
}: ContributorListProps) {
  const data = contributorsProp ?? (await fetchContributors(owner, repo, max))
  if (!data || data.length === 0) return null

  const display = data.slice(0, max)

  return (
    <div
      data-slot="contributor-list"
      className={cn(
        "overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm",
        className
      )}
      {...props}
    >
      {title && (
        <div className="flex items-center justify-between border-b border-border/40 px-4 py-3">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            {display.length}
          </span>
        </div>
      )}
      <div className="divide-y divide-border/40" role="list" aria-label={title ?? `Contributors to ${owner}/${repo}`}>
        {display.map((contributor, i) => (
          <a
            key={contributor.login}
            href={contributor.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
            className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
          >
            <span className="w-5 shrink-0 text-right text-xs tabular-nums text-muted-foreground/50">
              {i + 1}
            </span>
            <img
              src={`${contributor.avatarUrl}&s=80`}
              alt=""
              width={32}
              height={32}
              className="size-8 shrink-0 rounded-full border border-border/60 bg-muted"
              loading="lazy"
            />
            <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
              <span className="truncate text-sm font-medium text-foreground">
                {contributor.login}
              </span>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {formatCount(contributor.contributions)} commits
              </span>
            </div>
          </a>
        ))}
      </div>
      {data.length > max && (
        <a
          href={`https://github.com/${owner}/${repo}/graphs/contributors`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center border-t border-border/40 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
        >
          View all contributors →
        </a>
      )}
    </div>
  )
}

export {
  ContributorGrid,
  ContributorList,
  type ContributorGridProps,
  type ContributorListProps,
  type GitHubContributor,
}
