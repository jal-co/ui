"use client"

/**
 * jalco-ui
 * ContributorAvatar
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Client-side avatar with tooltip for the ContributorGrid component.
 */

/* eslint-disable @next/next/no-img-element */
import * as React from "react"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { formatCount, type GitHubContributor } from "@/registry/contributor-grid/lib/github"

interface ContributorAvatarProps extends React.ComponentProps<"a"> {
  contributor: GitHubContributor
  avatarClassName?: string
  imgSize: number
  showContributions?: boolean
}

export function ContributorAvatar({
  contributor,
  avatarClassName,
  imgSize,
  showContributions = true,
  className,
  style,
  ...props
}: ContributorAvatarProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={contributor.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          role="listitem"
          aria-label={showContributions ? `${contributor.login} — ${contributor.contributions} contributions` : contributor.login}
          data-slot="contributor-avatar"
          className={cn(
            "relative rounded-full outline-none transition-transform hover:z-10 hover:scale-110 focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
          )}
          style={style}
          {...props}
        >
          <img
            src={`${contributor.avatarUrl}&s=${imgSize * 2}`}
            alt=""
            width={imgSize}
            height={imgSize}
            className={cn(
              "rounded-full border-2 border-background bg-muted",
              avatarClassName
            )}
            loading="lazy"
          />
        </a>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={4}>
        <span className="font-medium">{contributor.login}</span>
        {showContributions && (
          <span className="ml-1.5 opacity-60">
            {formatCount(contributor.contributions)} contributions
          </span>
        )}
      </TooltipContent>
    </Tooltip>
  )
}
