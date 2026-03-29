"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ComponentPreviewClientProps {
  children: React.ReactNode
  className?: string
  align?: "center" | "start" | "end"
}

export function ComponentPreviewClient({
  children,
  className,
  align = "center",
}: ComponentPreviewClientProps) {
  return (
    <div
      className={cn(
        "not-prose flex min-h-[200px] w-full items-center justify-center rounded-xl border border-border/60 bg-card p-8 shadow-sm",
        align === "start" && "items-start",
        align === "end" && "items-end",
        className
      )}
    >
      <React.Suspense
        fallback={
          <div className="flex items-center text-sm text-muted-foreground">
            Loading...
          </div>
        }
      >
        {children}
      </React.Suspense>
    </div>
  )
}
