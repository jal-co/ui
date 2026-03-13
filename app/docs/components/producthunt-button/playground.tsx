"use client"

import { cn } from "@/lib/utils"
import {
  producthuntButtonVariants,
} from "@/registry/producthunt-button/producthunt-button"
import { formatCount } from "@/registry/producthunt-button/lib/producthunt"
import {
  ComponentPlayground,
  type PlaygroundControl,
} from "@/components/docs/component-playground"

const controls: PlaygroundControl[] = [
  {
    name: "variant",
    type: "select",
    options: ["default", "producthunt", "primary", "secondary", "outline", "ghost", "subtle"],
    default: "default",
  },
  {
    name: "size",
    type: "select",
    options: ["sm", "default", "lg"],
    default: "default",
  },
  {
    name: "showName",
    type: "boolean",
    label: "showName",
    default: false,
  },
  {
    name: "iconStyle",
    type: "select",
    label: "iconStyle",
    options: ["currentColor", "brand", "muted"],
    default: "currentColor",
  },
]

type IconStyle = "currentColor" | "brand" | "muted"

function ProductHuntIcon({
  iconStyle = "currentColor",
  className,
}: {
  iconStyle?: IconStyle
  className?: string
}) {
  if (iconStyle === "brand") {
    return (
      <svg
        viewBox="0 0 26.245 26.256"
        aria-hidden="true"
        className={className}
      >
        <path d="M26.254 13.128c0 7.253-5.875 13.128-13.128 13.128S-.003 20.382-.003 13.128 5.872 0 13.125 0s13.128 5.875 13.128 13.128" fill="#DA552F" />
        <path d="M14.876 13.128h-3.72V9.2h3.72c1.083 0 1.97.886 1.97 1.97s-.886 1.97-1.97 1.97m0-6.564H8.53v13.128h2.626v-3.938h3.72c2.538 0 4.595-2.057 4.595-4.595s-2.057-4.595-4.595-4.595" fill="#fff" />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 26.245 26.256"
      aria-hidden="true"
      className={cn(className, iconStyle === "muted" && "opacity-50 grayscale")}
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.254 13.128c0 7.253-5.875 13.128-13.128 13.128S-.003 20.382-.003 13.128 5.872 0 13.125 0s13.128 5.875 13.128 13.128ZM14.876 6.564H8.53v13.128h2.626v-3.938h3.72c2.538 0 4.595-2.057 4.595-4.595s-2.057-4.595-4.595-4.595Zm0 6.564h-3.72V9.2h3.72c1.083 0 1.97.886 1.97 1.97s-.886 1.97-1.97 1.97Z"
      />
    </svg>
  )
}

function UpvoteIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="currentColor"
      className={className}
    >
      <path d="M6.579 3.467c.71-1.067 2.132-1.067 2.842 0L12.975 8.8c.878 1.318.043 3.2-1.422 3.2H4.447c-1.464 0-2.3-1.882-1.422-3.2z" />
    </svg>
  )
}

function PreviewButton({
  upvotes,
  variant,
  size,
  showName,
  iconStyle,
}: {
  upvotes: number
  variant: string
  size: string
  showName: boolean
  iconStyle: IconStyle
}) {
  const name = "Notion"

  return (
    <a
      href="https://www.producthunt.com/posts/notion"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} on Product Hunt — ${upvotes.toLocaleString("en-US")} upvotes`}
      className={cn(
        producthuntButtonVariants({
          variant: variant as "default",
          size: size as "default",
        })
      )}
    >
      <ProductHuntIcon iconStyle={iconStyle} className="shrink-0" />
      {showName && (
        <span className="max-w-[12rem] truncate">{name}</span>
      )}
      {upvotes !== null && (
        <>
          {showName && (
            <span className="h-3.5 w-px shrink-0 bg-border" aria-hidden="true" />
          )}
          <span className="inline-flex items-center gap-1 tabular-nums">
            <UpvoteIcon className="size-2.5 opacity-60" />
            {formatCount(upvotes)}
          </span>
        </>
      )}
    </a>
  )
}

export function ProductHuntButtonPlayground({ upvotes }: { upvotes: number }) {
  return (
    <ComponentPlayground
      componentName="ProductHuntButton"
      importPath="@/components/producthunt-button"
      staticProps={{ slug: "notion", upvotes, name: "Notion" }}
      hideFromCode={["upvotes", "name"]}
      controls={controls}
      render={(props) => (
        <PreviewButton
          upvotes={upvotes}
          variant={(props.variant as string) ?? "default"}
          size={(props.size as string) ?? "default"}
          showName={(props.showName as boolean) ?? false}
          iconStyle={(props.iconStyle as IconStyle) ?? "currentColor"}
        />
      )}
    />
  )
}
