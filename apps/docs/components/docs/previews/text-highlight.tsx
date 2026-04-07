"use client"

import * as React from "react"
import { TextHighlight } from "@/registry/text-highlight/text-highlight"

const text = "Pretext measures text without the DOM using pure arithmetic. It handles CJK, Arabic, and emoji correctly."
const ranges = [
  { start: 0, end: 7, color: "oklch(0.75 0.15 150)" },
  { start: 41, end: 56, color: "oklch(0.8 0.15 85)" },
  { start: 74, end: 102, color: "oklch(0.75 0.12 280)" },
]

export default function TextHighlightPreview() {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <TextHighlight
      text={text}
      ranges={ranges}
      maxWidth={340}
      className="text-sm text-foreground"
    />
  )
}
