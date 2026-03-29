/**
 * jalco-ui
 * LicenseBadge
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Software license badge with SPDX identifier, category color-coding, and
 * OSI-approved indicator. Three layouts: inline pill, segmented row, and
 * expanded card. Accepts a license string directly or fetches from the
 * GitHub API via owner/repo.
 *
 * Props:
 * - license?: SPDX identifier (e.g. "MIT", "Apache-2.0")
 * - owner?: GitHub username or organization (for API fetch)
 * - repo?: GitHub repository name (for API fetch)
 * - layout?: "inline" | "row" | "card" (default "inline")
 * - variant?: visual style variant (inline/row only)
 * - size?: badge size (inline/row only)
 * - showCategory?: show license category tag
 * - showDescription?: show license description (card only)
 *
 * Notes:
 * - Async server component
 * - When owner/repo provided, fetches GitHub API with 1h ISR cache
 * - When license prop provided directly, no API call is made
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import {
  resolveLicense,
  fetchGitHubLicense,
  CATEGORY_CONFIG,
  type LicenseInfo,
  type GitHubLicenseData,
} from "@/registry/license-badge/lib/licenses"

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

function OsiIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 2.4a5.6 5.6 0 0 1 3.24 10.16l-1.6-4.4a1.6 1.6 0 1 0-3.28 0l-1.6 4.4A5.6 5.6 0 0 1 8 2.4z" />
    </svg>
  )
}

function ExternalLinkIcon({ className }: { className?: string }) {
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
      <path d="M6.5 3.5H3.5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-3" />
      <path d="M9.5 2.5h4v4" />
      <path d="M13.5 2.5 7.5 8.5" />
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

interface LicenseBadgeBaseProps {
  /** SPDX license identifier (e.g. "MIT", "Apache-2.0"). When provided, skips the GitHub API call. */
  license?: string
  /** GitHub username or organization. Used to fetch license from the GitHub API. */
  owner?: string
  /** GitHub repository name. Used with owner to fetch license from the GitHub API. */
  repo?: string
  /** Show license category tag (e.g. "Permissive", "Copyleft"). @default false for inline, true for row/card */
  showCategory?: boolean
  /** Show OSI-approved indicator. @default true */
  showOsi?: boolean
  /** Show license description. @default true for card only */
  showDescription?: boolean
  /** URL to link to. Auto-detected when using owner/repo. */
  href?: string
}

interface LicenseBadgeInlineProps extends LicenseBadgeBaseProps, Omit<React.ComponentProps<"a">, "children" | "href"> {
  /** @default "inline" */
  layout?: "inline"
  /** Visual style variant. */
  variant?: InlineVariant
  /** Badge size. */
  size?: BadgeSize
}

interface LicenseBadgeRowProps extends LicenseBadgeBaseProps, Omit<React.ComponentProps<"div">, "children"> {
  layout: "row"
  /** Visual style variant. */
  variant?: RowVariant
  /** Badge size. */
  size?: BadgeSize
}

interface LicenseBadgeCardProps extends LicenseBadgeBaseProps, Omit<React.ComponentProps<"a">, "children" | "href"> {
  layout: "card"
  variant?: never
  size?: never
}

type LicenseBadgeProps = LicenseBadgeInlineProps | LicenseBadgeRowProps | LicenseBadgeCardProps

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

function CategoryTag({
  info,
  className,
}: {
  info: LicenseInfo
  className?: string
}) {
  const config = CATEGORY_CONFIG[info.category]
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium leading-none",
        config.color,
        config.textColor,
        className
      )}
    >
      {config.label}
    </span>
  )
}

function InlineLayout({
  info,
  href,
  showCategory,
  showOsi,
  variant,
  size,
  className,
  ...props
}: {
  info: LicenseInfo
  href: string
  showCategory: boolean
  showOsi: boolean
  variant: InlineVariant
  size: BadgeSize
  className?: string
} & Omit<React.ComponentProps<"a">, "children" | "href">) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-slot="license-badge"
      data-category={info.category}
      aria-label={`${info.name}${info.osiApproved ? " — OSI approved" : ""}`}
      className={cn(inlineVariants({ variant, size, className }))}
      {...props}
    >
      <LicenseIcon className="shrink-0" />
      <span>{info.spdxId}</span>
      {showOsi && info.osiApproved && (
        <OsiIcon className="size-3 shrink-0 opacity-50" />
      )}
      {showCategory && <CategoryTag info={info} />}
    </a>
  )
}

function RowLayout({
  info,
  href,
  showCategory,
  showOsi,
  variant,
  size,
  className,
}: {
  info: LicenseInfo
  href: string
  showCategory: boolean
  showOsi: boolean
  variant: RowVariant
  size: BadgeSize
  className?: string
}) {
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

  const segments: { key: string; label: string; content: React.ReactNode }[] = [
    {
      key: "license",
      label: info.name,
      content: (
        <>
          <LicenseIcon className="shrink-0" />
          <span>{info.spdxId}</span>
        </>
      ),
    },
  ]

  if (showCategory) {
    segments.push({
      key: "category",
      label: `${CATEGORY_CONFIG[info.category].label} license`,
      content: <CategoryTag info={info} />,
    })
  }

  if (showOsi && info.osiApproved) {
    segments.push({
      key: "osi",
      label: "OSI approved",
      content: (
        <>
          <OsiIcon className="opacity-60" />
          <span>OSI</span>
        </>
      ),
    })
  }

  return (
    <div
      data-slot="license-badge"
      data-category={info.category}
      role="group"
      aria-label={info.name}
      className={cn(rowVariants({ variant, size, className }))}
    >
      {segments.map((seg, i) => (
        <React.Fragment key={seg.key}>
          {i > 0 && <Divider variant={variant ?? "default"} />}
          {i === 0 ? (
            <a
              data-segment
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={seg.label}
              className={cn(
                "inline-flex h-full items-center transition-colors rounded-l-[inherit]",
                segments.length === 1 && "rounded-r-[inherit]",
                hoverClass
              )}
            >
              {seg.content}
            </a>
          ) : (
            <span
              data-segment
              role="presentation"
              aria-label={seg.label}
              className={cn(
                "inline-flex h-full items-center transition-colors",
                i === segments.length - 1 && "rounded-r-[inherit]",
                hoverClass
              )}
            >
              {seg.content}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

function CardLayout({
  info,
  href,
  repoFullName,
  showCategory,
  showOsi,
  showDescription,
  className,
  ...props
}: {
  info: LicenseInfo
  href: string
  repoFullName?: string
  showCategory: boolean
  showOsi: boolean
  showDescription: boolean
  className?: string
} & Omit<React.ComponentProps<"a">, "children" | "href">) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-slot="license-badge"
      data-category={info.category}
      aria-label={`${info.name}${repoFullName ? ` — ${repoFullName}` : ""}`}
      className={cn(
        "flex flex-col gap-2.5 rounded-lg border border-border bg-card p-4 shadow-xs transition-colors hover:border-foreground/20 hover:bg-accent/50",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <LicenseIcon className="size-5 shrink-0 text-muted-foreground" />
          <span className="text-sm font-semibold truncate">{info.name}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {showOsi && info.osiApproved && (
            <span className="inline-flex items-center gap-1 rounded border border-border bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              <OsiIcon className="size-2.5" />
              OSI
            </span>
          )}
          {showCategory && <CategoryTag info={info} />}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        {showDescription && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {info.description}
          </p>
        )}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 font-mono tabular-nums">
            {info.spdxId}
          </span>
          {repoFullName && (
            <>
              <span className="h-3 w-px bg-border" aria-hidden="true" />
              <span className="inline-flex items-center gap-1 truncate">
                <ExternalLinkIcon className="size-3 shrink-0 opacity-50" />
                {repoFullName}
              </span>
            </>
          )}
        </div>
      </div>
    </a>
  )
}

async function LicenseBadge(props: LicenseBadgeProps) {
  const {
    license: licenseProp,
    owner,
    repo,
    layout = "inline",
    href: hrefProp,
    className,
  } = props

  let spdxId = licenseProp
  let githubData: GitHubLicenseData | null = null

  if (!spdxId && owner && repo) {
    githubData = await fetchGitHubLicense(owner, repo)
    if (!githubData) return null
    spdxId = githubData.spdxId
  }

  if (!spdxId) return null

  const info = resolveLicense(spdxId)
  const href = hrefProp ?? githubData?.url ?? info.url

  if (layout === "card") {
    const {
      showCategory = true,
      showOsi = true,
      showDescription = true,
      ...rest
    } = props as LicenseBadgeCardProps
    return (
      <CardLayout
        info={info}
        href={href}
        repoFullName={githubData?.repoFullName}
        showCategory={showCategory}
        showOsi={showOsi}
        showDescription={showDescription}
        className={className}
        {...rest}
      />
    )
  }

  if (layout === "row") {
    const {
      showCategory = true,
      showOsi = true,
      variant = "default",
      size = "default",
    } = props as LicenseBadgeRowProps
    return (
      <RowLayout
        info={info}
        href={href}
        showCategory={showCategory}
        showOsi={showOsi}
        variant={variant}
        size={size}
        className={className}
      />
    )
  }

  const inlineProps = props as LicenseBadgeInlineProps
  const {
    showCategory = false,
    showOsi = true,
    variant = "default",
    size = "default",
    ...rest
  } = inlineProps
  return (
    <InlineLayout
      info={info}
      href={href}
      showCategory={showCategory}
      showOsi={showOsi}
      variant={variant}
      size={size}
      className={className}
      {...rest}
    />
  )
}

export { LicenseBadge, inlineVariants as licenseBadgeInlineVariants, rowVariants as licenseBadgeRowVariants }
export type { LicenseBadgeProps, LicenseBadgeInlineProps, LicenseBadgeRowProps, LicenseBadgeCardProps, LicenseInfo }
