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
      viewBox="0 -28.5 256 256"
      aria-hidden="true"
      fill={iconStyle === "discord" ? "#5865F2" : "currentColor"}
      className={className}
    >
      <path
        d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
        fillRule="nonzero"
      />
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
