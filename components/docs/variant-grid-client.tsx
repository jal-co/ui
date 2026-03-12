"use client"

import * as React from "react"
import { Code } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { track } from "@/lib/analytics"

interface VariantItem {
  label: string
  preview: React.ReactNode
  usage: React.ReactNode
}

interface CodePanel {
  name: string
  code: string
  panel: React.ReactNode
}

interface VariantGridClientProps {
  variants: VariantItem[]
  /** Pre-rendered source file panels (shared across all variants). */
  codePanels: CodePanel[]
  installBlock: React.ReactNode
  columns?: "auto" | 1 | 2 | 3 | 4
  fullWidth?: boolean
  className?: string
}

export function VariantGridClient({
  variants,
  codePanels,
  installBlock,
  columns = "auto",
  fullWidth = false,
  className,
}: VariantGridClientProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)
  const [activeFile, setActiveFile] = React.useState(0)

  const gridCols =
    columns === 1
      ? "grid-cols-1"
      : columns === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : columns === 3
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : columns === 4
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"

  const active = openIndex !== null ? variants[openIndex] : null
  const hasMultipleFiles = codePanels.length > 1

  function handleOpen(index: number) {
    setActiveFile(0)
    setOpenIndex(index)
    track("component_code_viewed", { variant_label: variants[index]?.label })
  }

  return (
    <>
      <div className={cn("grid gap-3", gridCols, className)}>
        {variants.map((item, i) => (
          <VariantCell
            key={item.label}
            label={item.label}
            fullWidth={fullWidth}
            onCodeClick={() => handleOpen(i)}
          >
            {item.preview}
          </VariantCell>
        ))}
      </div>

      <Dialog
        open={openIndex !== null}
        onOpenChange={(open) => {
          if (!open) setOpenIndex(null)
        }}
      >
        <DialogContent className="flex max-h-[85vh] max-w-5xl flex-col gap-0 overflow-hidden p-0 sm:max-w-5xl">
          <DialogHeader className="shrink-0 gap-0 space-y-0 p-0">
            <div className="px-6 pt-6 pb-3">
              <DialogTitle>{active?.label}</DialogTitle>
            </div>

            {/* Usage snippet */}
            {active?.usage && (
              <div className="border-b border-border/60 px-4 py-3">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Usage
                </p>
                {active.usage}
              </div>
            )}

            {/* Install command */}
            {installBlock && (
              <div className="border-b border-border/60 px-4 py-3">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Install
                </p>
                {installBlock}
              </div>
            )}

            {/* File tabs */}
            {hasMultipleFiles && (
              <div
                className="flex gap-px border-b border-border/60 bg-muted/30 px-2"
                role="tablist"
                aria-label="Source files"
              >
                {codePanels.map((file, i) => (
                  <button
                    key={file.name}
                    type="button"
                    role="tab"
                    aria-selected={activeFile === i}
                    onClick={() => setActiveFile(i)}
                    className={cn(
                      "rounded-t-md px-3 py-2 font-mono text-xs transition-colors",
                      activeFile === i
                        ? "bg-background text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {file.name}
                  </button>
                ))}
              </div>
            )}
          </DialogHeader>

          {active && (
            <div className="min-h-0 flex-1 overflow-y-auto">
              {codePanels[activeFile]?.panel}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  VariantCell                                                       */
/* ------------------------------------------------------------------ */

function VariantCell({
  label,
  fullWidth,
  onCodeClick,
  children,
}: {
  label: string
  fullWidth?: boolean
  onCodeClick: () => void
  children: React.ReactNode
}) {
  return (
    <div className="group relative flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-4 shadow-xs transition-colors hover:border-border">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <button
          type="button"
          onClick={onCodeClick}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 group-hover:opacity-100"
          aria-label={`View code for ${label}`}
        >
          <Code className="size-3" />
          Code
        </button>
      </div>
      <div
        className={cn(
          "min-h-10 min-w-0 overflow-x-auto",
          fullWidth ? "[&>*]:w-full" : "flex items-center"
        )}
      >
        {children}
      </div>
    </div>
  )
}
