"use client"

import * as React from "react"
import { BalancedText } from "@/registry/balanced-text/balanced-text"

const heading = "Build faster with components that measure text without the DOM"
const paragraph =
  "Pretext uses pure arithmetic to compute text height and line breaks. No layout reflow, no hidden elements, no guesswork — just accurate measurements at any width, for any language."

export default function BalancedTextDemo() {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])
  if (!mounted) return <div className="h-[200px]" />

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Unbalanced (default)
          </p>
          <h2 className="text-2xl font-bold tracking-tight" style={{ maxWidth: 400 }}>
            {heading}
          </h2>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Pretext balanced
          </p>
          <BalancedText
            text={heading}
            as="h2"
            font='700 24px ui-sans-serif, system-ui, sans-serif'
            maxWidth={400}
            className="text-2xl font-bold tracking-tight"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Unbalanced body
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed" style={{ maxWidth: 360 }}>
            {paragraph}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Pretext balanced body
          </p>
          <BalancedText
            text={paragraph}
            font="14px ui-sans-serif, system-ui, sans-serif"
            maxWidth={360}
            className="text-sm text-muted-foreground leading-relaxed"
          />
        </div>
      </div>
    </div>
  )
}
