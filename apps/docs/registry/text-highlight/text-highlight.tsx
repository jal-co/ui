/**
 * jalco-ui
 * TextHighlight
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Paragraph text with highlighted ranges that wrap correctly across
 * line breaks. Renders inline mark elements with colored backgrounds,
 * underlines, and optional label badges.
 */

import * as React from "react"
import { cn } from "@/lib/utils"

interface HighlightRange {
  /** Start character index (inclusive). */
  start: number
  /** End character index (exclusive). */
  end: number
  /** Highlight color. Accepts any CSS color value.
   * @default "oklch(0.85 0.15 85)" */
  color?: string
  /** Optional label shown as a small badge above the highlight. */
  label?: string
}

interface TextHighlightProps extends React.ComponentProps<"p"> {
  /** The text to render with highlights. */
  text: string
  /** Ranges to highlight. */
  ranges: HighlightRange[]
}

const DEFAULT_COLOR = "oklch(0.85 0.15 85)"

function TextHighlight({
  text,
  ranges,
  className,
  ...props
}: TextHighlightProps) {
  const sorted = React.useMemo(
    () => [...ranges].sort((a, b) => a.start - b.start),
    [ranges],
  )

  const fragments: React.ReactNode[] = []
  let cursor = 0

  for (const range of sorted) {
    const start = Math.max(0, range.start)
    const end = Math.min(text.length, range.end)
    if (start >= end) continue

    if (start > cursor) {
      fragments.push(
        <span key={`t-${cursor}`}>{text.slice(cursor, start)}</span>,
      )
    }

    const color = range.color ?? DEFAULT_COLOR

    fragments.push(
      <mark
        key={`h-${start}`}
        className="relative rounded-sm px-0.5 -mx-0.5 bg-transparent"
        style={{
          backgroundColor: `color-mix(in oklch, ${color} 25%, transparent)`,
          textDecorationLine: "underline",
          textDecorationColor: color,
          textDecorationThickness: "2px",
          textUnderlineOffset: "2px",
          color: "inherit",
        }}
      >
        {range.label && (
          <span
            className="absolute -top-5 left-0 rounded px-1 py-0.5 text-[10px] font-semibold leading-none whitespace-nowrap"
            style={{
              backgroundColor: color,
              color: "oklch(0.2 0 0)",
            }}
          >
            {range.label}
          </span>
        )}
        {text.slice(start, end)}
      </mark>,
    )

    cursor = end
  }

  if (cursor < text.length) {
    fragments.push(
      <span key={`t-${cursor}`}>{text.slice(cursor)}</span>,
    )
  }

  return (
    <p
      data-slot="text-highlight"
      className={cn("leading-7", className)}
      {...props}
    >
      {fragments}
    </p>
  )
}

export { TextHighlight, type TextHighlightProps, type HighlightRange }
