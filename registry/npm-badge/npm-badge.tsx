/**
 * jalco-ui
 * NpmBadge
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Live npm package badge showing version, weekly downloads, license, and last
 * publish date. Three layouts: inline pill, horizontal row, and expanded card.
 * Async server component — fetches data at build time with ISR.
 *
 * Props:
 * - package: npm package name
 * - layout?: "inline" | "row" | "card" (default "inline")
 * - variant?: visual style variant
 * - size?: badge size (inline/row only)
 * - iconStyle?: "currentColor" | "npm" (default "currentColor")
 * - showDownloads?: show weekly download count
 * - showLicense?: show license badge
 * - showLastPublish?: show last publish date (card only)
 * - data?: pre-fetched NpmPackageData to skip the API call
 *
 * Notes:
 * - Async server component — no client JS required
 * - Fetches registry.npmjs.org + api.npmjs.org at build time, cached 1 hour via ISR
 * - No API key required
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import {
  fetchNpmPackage,
  formatDownloads,
  formatRelativeDate,
  type NpmPackageData,
} from "@/registry/npm-badge/lib/npm"

function NpmIcon({
  iconStyle = "currentColor",
  className,
}: {
  iconStyle?: "currentColor" | "npm"
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 256 256"
      aria-hidden="true"
      fill={iconStyle === "npm" ? "#CB3837" : "currentColor"}
      className={cn(className)}
    >
      <path d="M0 256V0h256v256H0zm26-230v204h102V52h51v178h51V26H26z" />
    </svg>
  )
}

function DownloadIcon({ className }: { className?: string }) {
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
      <path d="M8 2v8m0 0 3-3m-3 3L5 7" />
      <path d="M3 12h10" />
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

interface NpmBadgeBaseProps {
  /** npm package name (e.g. "react", "next", "@tanstack/react-query"). */
  package: string
  /**
   * Icon color style:
   * - `"currentColor"` — inherits text color from the variant (default)
   * - `"npm"` — npm red (#CB3837)
   */
  iconStyle?: "currentColor" | "npm"
  /** Show weekly download count. @default true for row/card, false for inline */
  showDownloads?: boolean
  /** Show license badge. @default true for card/row, false for inline */
  showLicense?: boolean
  /** Show last publish date. @default true for card only */
  showLastPublish?: boolean
  /** Pre-fetched package data. When provided, skips the npm API calls. */
  data?: NpmPackageData
}

interface NpmBadgeInlineProps extends NpmBadgeBaseProps {
  /** @default "inline" */
  layout?: "inline"
  /** Visual style variant. */
  variant?: InlineVariant
  /** Badge size. */
  size?: BadgeSize
  className?: string
}

interface NpmBadgeRowProps extends NpmBadgeBaseProps {
  layout: "row"
  /** Visual style variant. */
  variant?: RowVariant
  /** Badge size. */
  size?: BadgeSize
  className?: string
}

interface NpmBadgeCardProps extends NpmBadgeBaseProps {
  layout: "card"
  variant?: never
  size?: never
  className?: string
}

type NpmBadgeProps = NpmBadgeInlineProps | NpmBadgeRowProps | NpmBadgeCardProps

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

function InlineLayout({
  pkg,
  iconStyle,
  showDownloads,
  variant,
  size,
  className,
}: {
  pkg: NpmPackageData
  iconStyle: "currentColor" | "npm"
  showDownloads: boolean
  variant: InlineVariant
  size: BadgeSize
  className?: string
}) {
  return (
    <a
      href={`https://www.npmjs.com/package/${pkg.name}`}
      target="_blank"
      rel="noopener noreferrer"
      data-slot="npm-badge"
      aria-label={`${pkg.name} v${pkg.version} on npm${pkg.weeklyDownloads != null && showDownloads ? ` — ${pkg.weeklyDownloads.toLocaleString("en-US")} weekly downloads` : ""}`}
      className={cn(inlineVariants({ variant, size, className }))}
    >
      <NpmIcon iconStyle={iconStyle} className="shrink-0" />
      <span className="tabular-nums">v{pkg.version}</span>
      {showDownloads && pkg.weeklyDownloads != null && (
        <>
          <span className="h-3.5 w-px shrink-0 bg-current opacity-20" aria-hidden="true" />
          <span className="flex items-center gap-1 tabular-nums">
            <DownloadIcon className="size-3 opacity-60" />
            {formatDownloads(pkg.weeklyDownloads)}/wk
          </span>
        </>
      )}
    </a>
  )
}

function RowLayout({
  pkg,
  iconStyle,
  showDownloads,
  showLicense,
  variant,
  size,
  className,
}: {
  pkg: NpmPackageData
  iconStyle: "currentColor" | "npm"
  showDownloads: boolean
  showLicense: boolean
  variant: RowVariant
  size: BadgeSize
  className?: string
}) {
  const segments: { key: string; label: string; content: React.ReactNode }[] = [
    {
      key: "version",
      label: `${pkg.name} version ${pkg.version}`,
      content: (
        <>
          <NpmIcon iconStyle={iconStyle} className="shrink-0" />
          <span className="max-w-[14rem] truncate">{pkg.name}</span>
          <span className="tabular-nums opacity-60">v{pkg.version}</span>
        </>
      ),
    },
  ]

  if (showDownloads && pkg.weeklyDownloads != null) {
    segments.push({
      key: "downloads",
      label: `${pkg.weeklyDownloads.toLocaleString("en-US")} weekly downloads`,
      content: (
        <>
          <DownloadIcon className="opacity-60" />
          <span className="tabular-nums">
            {formatDownloads(pkg.weeklyDownloads)}/wk
          </span>
        </>
      ),
    })
  }

  if (showLicense && pkg.license) {
    segments.push({
      key: "license",
      label: `${pkg.license} license`,
      content: (
        <>
          <LicenseIcon className="opacity-60" />
          <span>{pkg.license}</span>
        </>
      ),
    })
  }

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

  return (
    <div
      data-slot="npm-badge"
      role="group"
      aria-label={`${pkg.name} on npm`}
      className={cn(rowVariants({ variant, size, className }))}
    >
      {segments.map((seg, i) => (
        <React.Fragment key={seg.key}>
          {i > 0 && <Divider variant={variant ?? "default"} />}
          <span
            data-segment
            role="presentation"
            aria-label={seg.label}
            className={cn(
              "inline-flex h-full items-center transition-colors",
              i === 0 && "rounded-l-[inherit]",
              i === segments.length - 1 && "rounded-r-[inherit]",
              hoverClass
            )}
          >
            {seg.content}
          </span>
        </React.Fragment>
      ))}
    </div>
  )
}

function CardLayout({
  pkg,
  iconStyle,
  showDownloads,
  showLicense,
  showLastPublish,
  className,
}: {
  pkg: NpmPackageData
  iconStyle: "currentColor" | "npm"
  showDownloads: boolean
  showLicense: boolean
  showLastPublish: boolean
  className?: string
}) {
  const meta: { icon: React.ReactNode; value: string }[] = []

  if (showDownloads && pkg.weeklyDownloads != null) {
    meta.push({
      icon: <DownloadIcon className="size-3 shrink-0 opacity-50" />,
      value: `${formatDownloads(pkg.weeklyDownloads)}/wk`,
    })
  }
  if (showLicense && pkg.license) {
    meta.push({
      icon: <LicenseIcon className="size-3 shrink-0 opacity-50" />,
      value: pkg.license,
    })
  }
  if (showLastPublish && pkg.lastPublish) {
    meta.push({
      icon: <ClockIcon className="size-3 shrink-0 opacity-50" />,
      value: formatRelativeDate(pkg.lastPublish),
    })
  }

  return (
    <a
      href={`https://www.npmjs.com/package/${pkg.name}`}
      target="_blank"
      rel="noopener noreferrer"
      data-slot="npm-badge"
      aria-label={`${pkg.name} on npm`}
      className={cn(
        "flex flex-col gap-2.5 rounded-lg border border-border bg-card p-4 shadow-xs transition-colors hover:border-foreground/20 hover:bg-accent/50",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <NpmIcon
            iconStyle={iconStyle}
            className="size-5 shrink-0"
          />
          <span className="text-sm font-semibold truncate">{pkg.name}</span>
        </div>
        <span className="inline-flex items-center shrink-0 rounded border border-border bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-muted-foreground">
          v{pkg.version}
        </span>
      </div>

      {(pkg.description || meta.length > 0) && (
        <div className="flex flex-col gap-1.5">
          {pkg.description && (
            <p className="text-xs text-muted-foreground line-clamp-1">
              {pkg.description}
            </p>
          )}
          {meta.length > 0 && (
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {meta.map((item) => (
                <span key={item.value} className="inline-flex items-center gap-1 tabular-nums">
                  {item.icon}
                  {item.value}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </a>
  )
}

async function NpmBadge(props: NpmBadgeProps) {
  const {
    package: packageName,
    layout = "inline",
    iconStyle = "currentColor",
    data: dataProp,
    className,
  } = props

  const pkg = dataProp ?? (await fetchNpmPackage(packageName))
  if (!pkg) return null

  if (layout === "card") {
    const {
      showDownloads = true,
      showLicense = true,
      showLastPublish = true,
    } = props
    return (
      <CardLayout
        pkg={pkg}
        iconStyle={iconStyle}
        showDownloads={showDownloads}
        showLicense={showLicense}
        showLastPublish={showLastPublish}
        className={className}
      />
    )
  }

  if (layout === "row") {
    const rowProps = props as NpmBadgeRowProps
    const {
      showDownloads = true,
      showLicense = true,
      variant = "default",
      size = "default",
    } = rowProps
    return (
      <RowLayout
        pkg={pkg}
        iconStyle={iconStyle}
        showDownloads={showDownloads}
        showLicense={showLicense}
        variant={variant}
        size={size}
        className={className}
      />
    )
  }

  const {
    showDownloads = false,
    variant = "default",
    size = "default",
  } = props as NpmBadgeInlineProps
  return (
    <InlineLayout
      pkg={pkg}
      iconStyle={iconStyle}
      showDownloads={showDownloads}
      variant={variant}
      size={size}
      className={className}
    />
  )
}

export { NpmBadge, inlineVariants as npmBadgeInlineVariants, rowVariants as npmBadgeRowVariants }
export type { NpmBadgeProps, NpmBadgeInlineProps, NpmBadgeRowProps, NpmBadgeCardProps, NpmPackageData }
