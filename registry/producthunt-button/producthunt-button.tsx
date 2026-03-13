/**
 * jalco-ui
 * ProductHuntButton
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Link button showing a Product Hunt post's upvote count with the PH logo.
 * Supports pre-fetched data or async fetching via the PH GraphQL API.
 *
 * Props:
 * - slug: Product Hunt post slug
 * - upvotes?: pre-fetched upvote count (skips API call when provided with name)
 * - name?: pre-fetched product name
 * - tagline?: pre-fetched product tagline
 * - showName?: show product name alongside the upvote count
 * - showTagline?: show tagline below the button (card layout only)
 * - layout?: "inline" | "card" (default "inline")
 * - variant?: visual style variant
 * - size?: button size
 * - iconStyle?: icon color treatment
 *
 * Notes:
 * - Async server component
 * - Requires PRODUCTHUNT_TOKEN env var for API fetching
 * - Works without token when upvotes/name are pre-fetched
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import {
  fetchProductHuntPost,
  formatCount,
  type ProductHuntPost,
} from "@/registry/producthunt-button/lib/producthunt"

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

const producthuntButtonVariants = cva(
  "inline-flex items-center shrink-0 whitespace-nowrap font-medium transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        default:
          "rounded-md border border-border bg-muted/50 text-muted-foreground shadow-xs hover:bg-accent hover:text-accent-foreground",
        primary:
          "rounded-md bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        producthunt:
          "rounded-md bg-[#DA552F] text-white shadow-xs hover:bg-[#DA552F]/90",
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

interface ProductHuntButtonBaseProps
  extends Omit<React.ComponentProps<"a">, "children">,
    VariantProps<typeof producthuntButtonVariants> {
  /** Product Hunt post slug (e.g. "my-awesome-product"). */
  slug: string
  /** Pre-fetched upvote count. When provided with `name`, skips the API call. */
  upvotes?: number
  /** Pre-fetched product name. */
  name?: string
  /** Pre-fetched product tagline. */
  tagline?: string
  /** Show the product name alongside the upvote count. */
  showName?: boolean
  /**
   * Icon display style:
   * - `"currentColor"` — inherits text color from the button variant (default)
   * - `"brand"` — Product Hunt orange (#DA552F)
   * - `"muted"` — grayscale with reduced opacity
   */
  iconStyle?: IconStyle
}

interface ProductHuntButtonInlineProps extends ProductHuntButtonBaseProps {
  /** @default "inline" */
  layout?: "inline"
}

interface ProductHuntButtonCardProps extends ProductHuntButtonBaseProps {
  layout: "card"
  /** Show tagline below the product name in card layout. @default true */
  showTagline?: boolean
}

type ProductHuntButtonProps =
  | ProductHuntButtonInlineProps
  | ProductHuntButtonCardProps

async function ProductHuntButton(props: ProductHuntButtonProps) {
  const {
    slug,
    upvotes: upvotesProp,
    name: nameProp,
    tagline: taglineProp,
    showName = false,
    iconStyle = "currentColor",
    variant,
    size,
    layout = "inline",
    className,
    ...anchorProps
  } = props

  const hasPreFetched = upvotesProp != null && nameProp != null
  const data = hasPreFetched ? null : await fetchProductHuntPost(slug)

  if (!hasPreFetched && !data) return null

  const upvotes = upvotesProp ?? data?.upvotes ?? null
  const name = nameProp ?? data?.name ?? slug
  const tagline = taglineProp ?? data?.tagline ?? ""
  const url = data?.url ?? `https://www.producthunt.com/posts/${slug}`

  if (layout === "card") {
    const showTagline =
      (props as ProductHuntButtonCardProps).showTagline !== false

    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        data-slot="producthunt-button"
        aria-label={`${name} on Product Hunt${upvotes !== null ? ` — ${upvotes.toLocaleString("en-US")} upvotes` : ""}`}
        className={cn(
          "flex items-start gap-3.5 rounded-lg border border-border bg-card p-4 shadow-xs transition-colors hover:border-foreground/20 hover:bg-accent/50",
          className
        )}
        {...anchorProps}
      >
        <ProductHuntIcon
          iconStyle={iconStyle === "currentColor" ? "brand" : iconStyle}
          className="size-8 shrink-0 mt-0.5"
        />
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold truncate">{name}</span>
            {upvotes !== null && (
              <span className="inline-flex items-center shrink-0 gap-1 rounded border border-border bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-muted-foreground">
                <UpvoteIcon className="size-2.5" />
                {formatCount(upvotes)}
              </span>
            )}
          </div>
          {showTagline && tagline && (
            <p className="text-xs text-muted-foreground line-clamp-1">
              {tagline}
            </p>
          )}
        </div>
      </a>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      data-slot="producthunt-button"
      aria-label={`${name} on Product Hunt${upvotes !== null ? ` — ${upvotes.toLocaleString("en-US")} upvotes` : ""}`}
      className={cn(
        producthuntButtonVariants({ variant, size, className })
      )}
      {...anchorProps}
    >
      <ProductHuntIcon iconStyle={iconStyle} className="shrink-0" />
      {showName && (
        <span className="max-w-[12rem] truncate">{name}</span>
      )}
      {upvotes !== null && (
        <>
          {showName && (
            <span
              className="h-3.5 w-px shrink-0 bg-border"
              aria-hidden="true"
            />
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

export {
  ProductHuntButton,
  producthuntButtonVariants,
  type ProductHuntButtonProps,
  type ProductHuntButtonInlineProps,
  type ProductHuntButtonCardProps,
  type ProductHuntPost,
}
