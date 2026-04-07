"use client"

import * as React from "react"
import { BalancedText } from "@/registry/balanced-text/balanced-text"

export default function BalancedTextPreview() {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div className="flex flex-col gap-4">
      <BalancedText
        text="Build faster with components that measure text without the DOM"
        as="h2"
        font='700 24px ui-sans-serif, system-ui, sans-serif'
        maxWidth={380}
        className="text-2xl font-bold tracking-tight"
      />
      <BalancedText
        text="Pure arithmetic text measurement for accurate layouts at any width, in any language."
        font="14px ui-sans-serif, system-ui, sans-serif"
        maxWidth={340}
        className="text-sm text-muted-foreground"
      />
    </div>
  )
}
