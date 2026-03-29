/**
 * jalco-ui
 * StatusIndicator
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Operational status badge with colored dot and label for dashboards,
 * status pages, and header bars.
 *
 * Props:
 * - status: operational | degraded | partial-outage | major-outage | maintenance | incident | unknown
 * - label?: custom label text (auto-generated from status when omitted)
 * - size?: sm | md | lg
 *
 * Notes:
 * - Server component — no client JS required
 * - No external dependencies
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

type Status =
  | "operational"
  | "degraded"
  | "partial-outage"
  | "major-outage"
  | "maintenance"
  | "incident"
  | "unknown"

const STATUS_CONFIG: Record<Status, { label: string; dot: string; text: string }> = {
  operational: {
    label: "Operational",
    dot: "bg-emerald-500",
    text: "text-emerald-700 dark:text-emerald-400",
  },
  degraded: {
    label: "Degraded",
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-400",
  },
  "partial-outage": {
    label: "Partial Outage",
    dot: "bg-orange-500",
    text: "text-orange-700 dark:text-orange-400",
  },
  "major-outage": {
    label: "Major Outage",
    dot: "bg-rose-500",
    text: "text-rose-700 dark:text-rose-400",
  },
  maintenance: {
    label: "Maintenance",
    dot: "bg-sky-500",
    text: "text-sky-700 dark:text-sky-400",
  },
  incident: {
    label: "Incident",
    dot: "bg-rose-500",
    text: "text-rose-700 dark:text-rose-400",
  },
  unknown: {
    label: "Unknown",
    dot: "bg-zinc-400 dark:bg-zinc-500",
    text: "text-zinc-600 dark:text-zinc-400",
  },
}

const statusIndicatorVariants = cva(
  "inline-flex items-center gap-2 rounded-full border font-medium",
  {
    variants: {
      size: {
        sm: "h-6 px-2.5 text-[11px] [&>[data-slot=status-dot]]:size-1.5",
        md: "h-7 px-3 text-xs [&>[data-slot=status-dot]]:size-2",
        lg: "h-8 px-3.5 text-sm [&>[data-slot=status-dot]]:size-2.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

interface StatusIndicatorProps
  extends Omit<React.ComponentProps<"span">, "children">,
    VariantProps<typeof statusIndicatorVariants> {
  /** Current operational status. */
  status: Status
  /** Custom label text. Auto-generated from status when omitted. */
  label?: string
}

function StatusIndicator({
  status,
  label,
  size,
  className,
  ...props
}: StatusIndicatorProps) {
  const config = STATUS_CONFIG[status]
  const displayLabel = label ?? config.label

  return (
    <span
      data-slot="status-indicator"
      data-status={status}
      role="status"
      aria-label={displayLabel}
      className={cn(
        statusIndicatorVariants({ size }),
        "border-border/60 bg-card shadow-xs",
        className
      )}
      {...props}
    >
     <span
       data-slot="status-dot"
        className={cn("relative shrink-0 rounded-full", config.dot)}
        aria-hidden="true"
      >
        <span
          className={cn("absolute inset-0 rounded-full animate-ping opacity-40", config.dot)}
        />
      </span>
      <span className={cn("whitespace-nowrap", config.text)}>
        {displayLabel}
      </span>
    </span>
  )
}

export {
  StatusIndicator,
  statusIndicatorVariants,
  STATUS_CONFIG,
  type StatusIndicatorProps,
  type Status,
}
