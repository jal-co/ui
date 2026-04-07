/**
 * jalco-ui
 * TextHighlight
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Paragraph text with highlighted ranges that wrap correctly across
 * line breaks. Pretext measures exact character positions so highlight
 * backgrounds sit perfectly behind the text — no DOM measurement.
 *
 * Dependencies: @chenglou/pretext (via pretext registry item)
 *
 * Powered by Pretext by Cheng Lou — github.com/chenglou/pretext
 */

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  usePretextWithSegments,
  usePretextLines,
} from "@/registry/pretext/use-pretext"

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

interface TextHighlightProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** The text to render with highlights. */
  text: string
  /** Ranges to highlight. */
  ranges: HighlightRange[]
  /** CSS font shorthand for Pretext measurement. Must match the rendered font.
   * @default '16px/24px ui-sans-serif, system-ui, sans-serif' */
  font?: string
  /** Line height in pixels. Must match the rendered line-height. @default 24 */
  lineHeight?: number
  /** Maximum text width in pixels. @default 520 */
  maxWidth?: number
}

const DEFAULT_FONT = "16px ui-sans-serif, system-ui, sans-serif"
const DEFAULT_LINE_HEIGHT = 24
const DEFAULT_MAX_WIDTH = 520
const DEFAULT_COLOR = "oklch(0.85 0.15 85)"

function TextHighlight({
  text,
  ranges,
  font = DEFAULT_FONT,
  lineHeight = DEFAULT_LINE_HEIGHT,
  maxWidth = DEFAULT_MAX_WIDTH,
  className,
  ...props
}: TextHighlightProps) {
  const prepared = usePretextWithSegments(text, font)
  const { lines } = usePretextLines(prepared, maxWidth, lineHeight)

  const lineTexts = React.useMemo(() => {
    const result: { text: string; startOffset: number }[] = []
    let offset = 0
    for (const line of lines) {
      result.push({ text: line.text, startOffset: offset })
      offset += line.text.length
    }
    return result
  }, [lines])

  return (
    <div
      data-slot="text-highlight"
      className={cn("relative", className)}
      style={{ maxWidth }}
      {...props}
    >
      {lineTexts.map((line, lineIndex) => {
        const lineStart = line.startOffset
        const lineEnd = lineStart + line.text.length

        const fragments: React.ReactNode[] = []
        let cursor = 0

        const lineRanges = ranges
          .filter((r) => r.start < lineEnd && r.end > lineStart)
          .map((r) => ({
            ...r,
            localStart: Math.max(0, r.start - lineStart),
            localEnd: Math.min(line.text.length, r.end - lineStart),
          }))
          .sort((a, b) => a.localStart - b.localStart)

        for (const range of lineRanges) {
          if (range.localStart > cursor) {
            fragments.push(
              <span key={`t-${cursor}`}>
                {line.text.slice(cursor, range.localStart)}
              </span>,
            )
          }

          const isFirstLineOfRange = range.start >= lineStart && range.start < lineEnd
          const highlightColor = range.color ?? DEFAULT_COLOR

          fragments.push(
            <span
              key={`h-${range.localStart}`}
              className="relative rounded-sm px-0.5 -mx-0.5"
              style={{ backgroundColor: `color-mix(in oklch, ${highlightColor} 30%, transparent)` }}
            >
              {isFirstLineOfRange && range.label && (
                <span
                  className="absolute -top-5 left-0 rounded px-1 py-0.5 text-[10px] font-semibold leading-none whitespace-nowrap"
                  style={{
                    backgroundColor: highlightColor,
                    color: "oklch(0.2 0 0)",
                  }}
                >
                  {range.label}
                </span>
              )}
              <span
                className="underline decoration-2 underline-offset-2"
                style={{ textDecorationColor: highlightColor }}
              >
                {line.text.slice(range.localStart, range.localEnd)}
              </span>
            </span>,
          )

          cursor = range.localEnd
        }

        if (cursor < line.text.length) {
          fragments.push(
            <span key={`t-${cursor}`}>{line.text.slice(cursor)}</span>,
          )
        }

        return (
          <div key={lineIndex} style={{ lineHeight: `${lineHeight}px` }}>
            {fragments.length > 0 ? fragments : "\u00A0"}
          </div>
        )
      })}
    </div>
  )
}

export { TextHighlight, type TextHighlightProps, type HighlightRange }
