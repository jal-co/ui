"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface DiffViewerCopyButtonProps extends Omit<React.ComponentProps<"button">, "value"> {
  value: string
}

export function DiffViewerCopyButton({ value, className, ...props }: DiffViewerCopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      data-slot="diff-viewer-copy-button"
      className={cn("inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50", className)}
      aria-label={copied ? "Copied" : "Copy code"}
      {...props}
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}
