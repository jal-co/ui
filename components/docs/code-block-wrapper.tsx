"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type Overflow = "default" | "scrollable" | "collapsible"

interface CodeBlockWrapperProps {
  overflow: Overflow
  maxHeight?: number
  muted?: boolean
  children: React.ReactNode
}

export function CodeBlockWrapper({
  overflow,
  maxHeight = 280,
  muted = false,
  children,
}: CodeBlockWrapperProps) {
  const [expanded, setExpanded] = React.useState(false)

  if (overflow === "default") {
    return <div className="overflow-x-auto">{children}</div>
  }

  if (overflow === "scrollable") {
    return (
      <div className="overflow-auto" style={{ maxHeight }}>
        {children}
      </div>
    )
  }

  // collapsible
  return (
    <div className="relative">
      <div
        className={cn("overflow-hidden transition-all", !expanded && "relative")}
        style={!expanded ? { maxHeight } : undefined}
      >
        {children}
        {!expanded && (
          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t to-transparent",
              muted ? "from-muted/30" : "from-card"
            )}
          />
        )}
      </div>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "flex w-full items-center justify-center gap-1.5 border-t py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground",
          muted
            ? "border-border/40 bg-muted/10 hover:bg-muted/30"
            : "border-border/60 bg-muted/30 hover:bg-muted/50"
        )}
      >
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform",
            expanded && "rotate-180"
          )}
        />
        {expanded ? "Show less" : "Show more"}
      </button>
    </div>
  )
}
