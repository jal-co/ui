/**
 * jalco-ui
 * MasonryGrid
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Text-aware masonry layout where card heights are predicted by Pretext
 * without DOM measurement. Cards flow into columns with zero layout
 * shift, positioned using pure arithmetic.
 *
 * Dependencies: @chenglou/pretext (via pretext registry item)
 *
 * Powered by Pretext by Cheng Lou — github.com/chenglou/pretext
 */

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import type { PreparedText } from "@chenglou/pretext"

const isBrowser = typeof window !== "undefined"

function getPretext() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("@chenglou/pretext") as typeof import("@chenglou/pretext")
}

interface MasonryItem {
  /** Text content of the card. */
  text: string
  /** Optional title above the text. */
  title?: string
}

interface MasonryGridProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Array of items to display. */
  items: MasonryItem[]
  /** Number of columns. @default 3 */
  columns?: 2 | 3 | 4
  /** Gap between cards in pixels. @default 12 */
  gap?: number
  /** CSS font shorthand for body text measurement. Must match rendered font.
   * @default '14px/20px ui-sans-serif, system-ui, sans-serif' */
  font?: string
  /** Body text line height in pixels. @default 20 */
  lineHeight?: number
  /** Card padding in pixels. @default 16 */
  cardPadding?: number
}

const DEFAULT_FONT = "14px ui-sans-serif, system-ui, sans-serif"
const DEFAULT_LINE_HEIGHT = 20
const DEFAULT_CARD_PADDING = 16
const TITLE_HEIGHT = 28

function MasonryGrid({
  items,
  columns = 3,
  gap = 12,
  font = DEFAULT_FONT,
  lineHeight = DEFAULT_LINE_HEIGHT,
  cardPadding = DEFAULT_CARD_PADDING,
  className,
  ...props
}: MasonryGridProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = React.useState(0)

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width)
      }
    })
    observer.observe(el)
    setContainerWidth(el.clientWidth)
    return () => observer.disconnect()
  }, [])

  const prepared = React.useMemo(
    () => {
      if (!isBrowser) return [] as PreparedText[]
      const { prepare } = getPretext()
      return items.map((item) => prepare(item.text, font))
    },
    [items, font],
  )

  const positioned = React.useMemo(() => {
    if (containerWidth <= 0) return { cards: [] as { x: number; y: number; w: number; h: number; index: number }[], height: 0 }

    const colWidth = (containerWidth - (columns - 1) * gap) / columns
    const textWidth = Math.max(1, colWidth - cardPadding * 2)
    const colHeights = new Array(columns).fill(0) as number[]

    const cards = items.map((item, i) => {
      let shortest = 0
      for (let c = 1; c < columns; c++) {
        if (colHeights[c]! < colHeights[shortest]!) shortest = c
      }

      const { height: textHeight } = getPretext().layout(prepared[i]!, textWidth, lineHeight)
      const titleExtra = item.title ? TITLE_HEIGHT : 0
      const cardHeight = textHeight + titleExtra + cardPadding * 2

      const x = shortest * (colWidth + gap)
      const y = colHeights[shortest]!

      colHeights[shortest]! += cardHeight + gap

      return { x, y, w: colWidth, h: cardHeight, index: i }
    })

    const height = Math.max(...colHeights)
    return { cards, height }
  }, [items, prepared, containerWidth, columns, gap, cardPadding, lineHeight])

  return (
    <div
      ref={containerRef}
      data-slot="masonry-grid"
      className={cn("relative w-full", className)}
      style={{ height: positioned.height || "auto" }}
      {...props}
    >
      {containerWidth > 0 &&
        positioned.cards.map((card) => {
          const item = items[card.index]!
          return (
            <div
              key={card.index}
              className="absolute rounded-lg border border-border/60 bg-card p-4 shadow-sm"
              style={{
                left: card.x,
                top: card.y,
                width: card.w,
                height: card.h,
              }}
            >
              {item.title && (
                <p className="mb-1 text-sm font-semibold text-foreground">
                  {item.title}
                </p>
              )}
              <p className="text-sm leading-5 text-muted-foreground">
                {item.text}
              </p>
            </div>
          )
        })}
    </div>
  )
}

export { MasonryGrid, type MasonryGridProps, type MasonryItem }
