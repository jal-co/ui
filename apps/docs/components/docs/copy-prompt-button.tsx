"use client"

import * as React from "react"
import { Check, Sparkles } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { track } from "@/lib/analytics"

interface CopyPromptButtonProps {
  value: string
}

export function CopyPromptButton({ value }: CopyPromptButtonProps) {
  const [copied, setCopied] = React.useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
    track("prompt_copied", { source: "docs" })
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="h-7 gap-1.5 px-2.5 text-xs"
      aria-label={copied ? "Copied prompt" : "Copy AI prompt"}
    >
      {copied ? (
        <Check className="size-3.5" />
      ) : (
        <Sparkles className="size-3.5" />
      )}
      {copied ? "Copied!" : "Copy Prompt"}
    </Button>
  )
}
