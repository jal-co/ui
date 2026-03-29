"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { track } from "@/lib/analytics"

interface CodeBlockCopyButtonProps {
  value: string
}

export function CodeBlockCopyButton({ value }: CodeBlockCopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
    track("code_copied", { source: "code_block" })
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className="h-8 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
      aria-label={copied ? "Copied code" : "Copy code"}
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {copied ? "Copied" : "Copy"}
    </Button>
  )
}
