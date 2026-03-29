"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  githubButtonGroupVariants,
  type MetricKey,
} from "@/registry/github-button-group/github-button-group"
import { formatCount, type GitHubRepo } from "@/registry/github-button-group/lib/github"
import {
  ComponentPlayground,
  type PlaygroundControl,
} from "@/components/docs/component-playground"

const controls: PlaygroundControl[] = [
  {
    name: "variant",
    type: "select",
    options: ["default", "secondary", "outline", "ghost", "subtle"],
    default: "default",
  },
  {
    name: "size",
    type: "select",
    options: ["sm", "default", "lg"],
    default: "default",
  },
  {
    name: "showRepo",
    type: "boolean",
    label: "showRepo",
    default: false,
  },
  {
    name: "iconStyle",
    type: "select",
    label: "iconStyle",
    options: ["currentColor", "github", "copilot", "muted"],
    default: "currentColor",
  },
]

type IconStyle = "currentColor" | "github" | "copilot" | "muted"

function GitHubIcon({ iconStyle = "currentColor", className }: { iconStyle?: IconStyle; className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={cn(className, iconStyle === "github" && "text-[#0FBF3E]", iconStyle === "copilot" && "text-[#8534F3]", iconStyle === "muted" && "opacity-50 grayscale")} fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
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

const METRIC_ICONS: Record<MetricKey, React.ReactNode> = {
  stars: <StarIcon />,
  forks: <ForkIcon />,
  watchers: <EyeIcon />,
  issues: <IssueIcon />,
}

const METRIC_LABELS: Record<MetricKey, string> = {
  stars: "Star",
  forks: "Fork",
  watchers: "Watch",
  issues: "Issues",
}

const METRIC_VALUES: Record<MetricKey, (d: GitHubRepo) => number> = {
  stars: (d) => d.stars,
  forks: (d) => d.forks,
  watchers: (d) => d.watchers,
  issues: (d) => d.issues,
}

function PreviewGroup({
  data,
  variant = "default",
  size = "default",
  showRepo = false,
  iconStyle = "currentColor",
}: {
  data: GitHubRepo
  variant: string
  size: string
  showRepo: boolean
  iconStyle: IconStyle
}) {
  const metrics: MetricKey[] = ["stars", "forks", "watchers"]
  const owner = data.fullName.split("/")[0]
  const repo = data.fullName.split("/")[1]

  const dividerClass =
    variant === "ghost" ? "bg-border/60" : variant === "secondary" ? "bg-secondary-foreground/20" : "bg-border"
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
  const borderClass =
    variant === "ghost" ? "border-border/60" : variant === "secondary" ? "border-secondary-foreground/20" : "border-border"

  return (
    <div
      role="group"
      aria-label={`${data.fullName} on GitHub`}
      className={cn(githubButtonGroupVariants({ variant: variant as "default", size: size as "default" }))}
    >
      {showRepo && (
        <>
          <a
            href={`https://github.com/${owner}/${repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("inline-flex h-full items-center rounded-l-[inherit] transition-colors outline-none", hoverClass)}
          >
            <GitHubIcon iconStyle={iconStyle} className="shrink-0" />
            <span className="max-w-[12rem] truncate">{data.fullName}</span>
          </a>
          <span className={cn("w-px self-stretch shrink-0", dividerClass)} aria-hidden="true" />
        </>
      )}
      {metrics.map((key, i) => {
        const count = METRIC_VALUES[key](data)
        return (
          <React.Fragment key={key}>
            {i > 0 && <span className={cn("w-px self-stretch shrink-0", dividerClass)} aria-hidden="true" />}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className={cn(
                "inline-flex h-full items-center transition-colors outline-none",
                i === 0 && !showRepo && "rounded-l-[inherit]",
                i === metrics.length - 1 && "rounded-r-[inherit]",
                hoverClass
              )}
            >
              {METRIC_ICONS[key]}
              <span>{METRIC_LABELS[key]}</span>
              <span className={cn("ml-0.5 border-l pl-2 tabular-nums", borderClass)}>
                {formatCount(count)}
              </span>
            </a>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export function GitHubButtonGroupPlayground({ data }: { data: GitHubRepo }) {
  return (
    <ComponentPlayground
      componentName="GitHubButtonGroup"
      importPath="@/components/github-button-group"
      staticProps={{ owner: data.fullName.split("/")[0], repo: data.fullName.split("/")[1] }}
      controls={controls}
      render={(props) => (
        <PreviewGroup
          data={data}
          variant={(props.variant as string) ?? "default"}
          size={(props.size as string) ?? "default"}
          showRepo={(props.showRepo as boolean) ?? false}
          iconStyle={(props.iconStyle as IconStyle) ?? "currentColor"}
        />
      )}
    />
  )
}
