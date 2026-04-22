/**
 * jalco-ui
 * DiscordBadge
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Live Discord server badge showing member count with the Discord icon.
 * Two layouts: inline pill and expanded card. Async server component —
 * fetches data at build time with ISR via the public widget API.
 *
 * Props:
 * - serverId: Discord server/guild ID
 * - layout?: "inline" | "card" (default "inline")
 * - variant?: visual style variant (inline only)
 * - size?: badge size (inline only)
 * - iconStyle?: "currentColor" | "discord" (default "currentColor")
 * - inviteUrl?: override invite link
 * - showOnline?: show online member count
 * - data?: pre-fetched DiscordServerData to skip the API call
 *
 * Notes:
 * - Async server component — no client JS required
 * - Requires the target server to have the widget enabled
 * - Fetches discord.com widget API at build time, cached 1 hour via ISR
 * - No API key or bot token required
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import {
  fetchDiscordServer,
  formatMemberCount,
  type DiscordServerData,
} from "@/registry/discord-badge/lib/discord"

function DiscordIcon({
  iconStyle = "currentColor",
  className,
}: {
  iconStyle?: "currentColor" | "discord"
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 256 256"
      aria-hidden="true"
      fill={iconStyle === "discord" ? "#5865F2" : "currentColor"}
      className={className}
    >
      <path d="M216.856 38.178a208.917 208.917 0 0 0-51.616-16.004.782.782 0 0 0-.829.39 145.27 145.27 0 0 0-6.413 13.181 192.818 192.818 0 0 0-57.901 0 133.301 133.301 0 0 0-6.512-13.181.811.811 0 0 0-.83-.39 208.391 208.391 0 0 0-51.615 16.004.737.737 0 0 0-.34.294C13.494 79.946 3.627 119.86 8.455 159.197a.867.867 0 0 0 .329.594 209.722 209.722 0 0 0 63.153 31.926.824.824 0 0 0 .894-.295 149.878 149.878 0 0 0 12.905-20.993.798.798 0 0 0-.437-1.11 138.31 138.31 0 0 1-19.753-9.41.811.811 0 0 1-.079-1.345 105.21 105.21 0 0 0 3.918-3.07.777.777 0 0 1 .814-.105 149.352 149.352 0 0 0 127.595 0 .777.777 0 0 1 .824.095c1.27 1.024 2.584 2.088 3.928 3.08a.811.811 0 0 1-.07 1.345 129.664 129.664 0 0 1-19.763 9.4.801.801 0 0 0-.427 1.12 168.116 168.116 0 0 0 12.895 20.983.79.79 0 0 0 .894.305 209.026 209.026 0 0 0 63.262-31.926.867.867 0 0 0 .33-.584c5.771-59.66-9.671-111.502-40.933-157.449a.637.637 0 0 0-.33-.304ZM85.474 135.095c-13.626 0-24.86-12.513-24.86-27.876s11.028-27.876 24.86-27.876c13.936 0 25.066 12.618 24.86 27.876 0 15.363-11.028 27.876-24.86 27.876Zm91.895 0c-13.626 0-24.86-12.513-24.86-27.876s11.028-27.876 24.86-27.876c13.936 0 25.066 12.618 24.86 27.876 0 15.363-10.924 27.876-24.86 27.876Z" />
    </svg>
  )
}

function UsersIcon({ className }: { className?: string }) {
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
      <circle cx="6" cy="5" r="2.5" />
      <path d="M1.5 14c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5" />
      <circle cx="12" cy="5.5" r="1.5" />
      <path d="M14.5 14c0-1.657-1.343-3-3-3-.552 0-1.07.149-1.514.41" />
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
        discord:
          "rounded-md bg-[#5865F2] text-white shadow-xs hover:bg-[#4752C4]",
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

type InlineVariant = NonNullable<VariantProps<typeof inlineVariants>["variant"]>
type BadgeSize = NonNullable<VariantProps<typeof inlineVariants>["size"]>

interface DiscordBadgeBaseProps {
  /** Discord server/guild ID. */
  serverId: string
  /**
   * Icon color style:
   * - `"currentColor"` — inherits text color from the variant (default)
   * - `"discord"` — Discord blurple (#5865F2)
   */
  iconStyle?: "currentColor" | "discord"
  /** Override the invite link. By default uses the widget's instant invite URL. */
  inviteUrl?: string
  /** Show online member count. @default true for card, false for inline */
  showOnline?: boolean
  /** Pre-fetched server data. When provided, skips the Discord API call. */
  data?: DiscordServerData
}

interface DiscordBadgeInlineProps
  extends DiscordBadgeBaseProps,
    Omit<React.ComponentProps<"a">, "children"> {
  /** @default "inline" */
  layout?: "inline"
  variant?: InlineVariant
  size?: BadgeSize
}

interface DiscordBadgeCardProps
  extends DiscordBadgeBaseProps,
    Omit<React.ComponentProps<"a">, "children"> {
  layout: "card"
  variant?: never
  size?: never
}

type DiscordBadgeProps = DiscordBadgeInlineProps | DiscordBadgeCardProps

function InlineLayout({
  server,
  iconStyle,
  showOnline,
  inviteUrl,
  variant,
  size,
  className,
}: {
  server: DiscordServerData
  iconStyle: "currentColor" | "discord"
  showOnline: boolean
  inviteUrl: string | null
  variant: InlineVariant
  size: BadgeSize
  className?: string
}) {
  const href = inviteUrl ?? server.instantInvite
  const Comp = href ? "a" : "span"
  const linkProps = href
    ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
    : {}

  return (
    <Comp
      {...linkProps}
      data-slot="discord-badge"
      aria-label={`${server.name} on Discord — ${formatMemberCount(server.onlineCount)} online`}
      className={cn(inlineVariants({ variant, size, className }))}
    >
      <DiscordIcon
        iconStyle={variant === "discord" ? "currentColor" : iconStyle}
        className="shrink-0"
      />
      <span className="tabular-nums">
        {formatMemberCount(server.onlineCount)}
      </span>
      {showOnline && (
        <span className="flex items-center gap-1">
          <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
          <span className="text-[0.8em] opacity-70">online</span>
        </span>
      )}
    </Comp>
  )
}

function CardLayout({
  server,
  iconStyle,
  showOnline,
  inviteUrl,
  className,
}: {
  server: DiscordServerData
  iconStyle: "currentColor" | "discord"
  showOnline: boolean
  inviteUrl: string | null
  className?: string
}) {
  const href = inviteUrl ?? server.instantInvite

  const content = (
    <>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <DiscordIcon
            iconStyle={iconStyle}
            className="size-5 shrink-0"
          />
          <span className="text-sm font-semibold truncate">
            {server.name}
          </span>
        </div>
        {showOnline && (
          <span className="inline-flex items-center gap-1.5 shrink-0 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            {formatMemberCount(server.onlineCount)} online
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1 tabular-nums">
          <UsersIcon className="size-3 shrink-0 opacity-50" />
          {formatMemberCount(server.onlineCount)} members
        </span>
      </div>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-slot="discord-badge"
        aria-label={`Join ${server.name} on Discord`}
        className={cn(
          "flex flex-col gap-2.5 rounded-lg border border-border bg-card p-4 shadow-xs transition-colors hover:border-foreground/20 hover:bg-accent/50",
          className
        )}
      >
        {content}
      </a>
    )
  }

  return (
    <div
      data-slot="discord-badge"
      aria-label={`${server.name} on Discord`}
      className={cn(
        "flex flex-col gap-2.5 rounded-lg border border-border bg-card p-4 shadow-xs",
        className
      )}
    >
      {content}
    </div>
  )
}

async function DiscordBadge(props: DiscordBadgeProps) {
  const {
    serverId,
    layout = "inline",
    iconStyle = "currentColor",
    inviteUrl,
    data: dataProp,
    className,
  } = props

  const server = dataProp ?? (await fetchDiscordServer(serverId))
  if (!server) return null

  const resolvedInvite = inviteUrl ?? null

  if (layout === "card") {
    const { showOnline = true } = props
    return (
      <CardLayout
        server={server}
        iconStyle={iconStyle}
        showOnline={showOnline}
        inviteUrl={resolvedInvite}
        className={className}
      />
    )
  }

  const {
    showOnline = false,
    variant = "default",
    size = "default",
  } = props as DiscordBadgeInlineProps
  return (
    <InlineLayout
      server={server}
      iconStyle={iconStyle}
      showOnline={showOnline}
      inviteUrl={resolvedInvite}
      variant={variant}
      size={size}
      className={className}
    />
  )
}

export { DiscordBadge, inlineVariants as discordBadgeInlineVariants }
export type {
  DiscordBadgeProps,
  DiscordBadgeInlineProps,
  DiscordBadgeCardProps,
  DiscordServerData,
}
