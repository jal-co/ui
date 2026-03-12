"use client"

import { cn } from "@/lib/utils"
import {
  githubStarsButtonVariants,
} from "@/registry/github-stars-button/github-stars-button"
import { formatCount } from "@/registry/github-stars-button/lib/github"
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

function PreviewButton({
  stars,
  variant,
  size,
  showRepo,
  iconStyle,
}: {
  stars: number
  variant: string
  size: string
  showRepo: boolean
  iconStyle: IconStyle
}) {
  const fullName = "shadcn-ui/ui"

  return (
    <a
      href="https://github.com/shadcn-ui/ui"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${fullName} on GitHub — ${stars.toLocaleString("en-US")} stars`}
      className={cn(
        githubStarsButtonVariants({
          variant: variant as "default",
          size: size as "default",
        })
      )}
    >
      <GitHubIcon iconStyle={iconStyle} className="shrink-0" />
      {showRepo && (
        <span className="max-w-[12rem] truncate">{fullName}</span>
      )}
      {stars !== null && (
        <>
          {showRepo && (
            <span className="h-3.5 w-px shrink-0 bg-border" aria-hidden="true" />
          )}
          <span className="tabular-nums">{formatCount(stars)}</span>
        </>
      )}
    </a>
  )
}

export function GitHubStarsButtonPlayground({ stars }: { stars: number }) {
  return (
    <ComponentPlayground
      componentName="GitHubStarsButton"
      importPath="@/components/github-stars-button"
      staticProps={{ owner: "shadcn-ui", repo: "ui", stars }}
      hideFromCode={["stars"]}
      controls={controls}
      render={(props) => (
        <PreviewButton
          stars={stars}
          variant={(props.variant as string) ?? "default"}
          size={(props.size as string) ?? "default"}
          showRepo={(props.showRepo as boolean) ?? false}
          iconStyle={(props.iconStyle as IconStyle) ?? "currentColor"}
        />
      )}
    />
  )
}
