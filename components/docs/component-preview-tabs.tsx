"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type Tab = "preview" | "code"

interface CodePanel {
  name: string
  code: string
  panel: React.ReactNode
}

interface ComponentPreviewTabsProps {
  previewPanel: React.ReactNode
  codePanels: CodePanel[]
}

export function ComponentPreviewTabs({
  previewPanel,
  codePanels,
}: ComponentPreviewTabsProps) {
  const [active, setActive] = React.useState<Tab>("preview")
  const [activeFile, setActiveFile] = React.useState(0)

  const hasMultipleFiles = codePanels.length > 1

  return (
    <div className="overflow-hidden rounded-xl border border-border/60 shadow-sm">
      {/* Primary tabs: Preview / Code */}
      <div
        className="flex border-b border-border/60 bg-muted/40"
        role="tablist"
        aria-label="Component preview"
      >
        <button
          type="button"
          role="tab"
          aria-selected={active === "preview"}
          onClick={() => setActive("preview")}
          className={cn(
            "px-4 py-2.5 text-sm font-medium transition-colors",
            active === "preview"
              ? "border-b-2 border-foreground text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Preview
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={active === "code"}
          onClick={() => setActive("code")}
          className={cn(
            "px-4 py-2.5 text-sm font-medium transition-colors",
            active === "code"
              ? "border-b-2 border-foreground text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Code
        </button>
      </div>

      {/* Content */}
      {active === "preview" ? (
        <div role="tabpanel" aria-label="Preview">
          {previewPanel}
        </div>
      ) : (
        <div role="tabpanel" aria-label="Code">
          {/* File sub-tabs (only when multiple files) */}
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
          {codePanels[activeFile]?.panel}
        </div>
      )}
    </div>
  )
}
