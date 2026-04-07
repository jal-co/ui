/**
 * jalco-ui
 * PretextTestimonialMasonry
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Testimonial masonry layout where card heights are predicted by Pretext.
 * Cards flow into columns with zero layout shift — no DOM measurement.
 * Wraps TestimonialCard from the testimonial registry item.
 *
 * Dependencies: @chenglou/pretext, testimonial registry item
 *
 * Powered by Pretext by Cheng Lou — github.com/chenglou/pretext
 */

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  TestimonialCard,
  type Testimonial,
} from "@/registry/testimonial/testimonial"

import type { PreparedText } from "@chenglou/pretext"

const isBrowser = typeof window !== "undefined"

function getPretext() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("@chenglou/pretext") as typeof import("@chenglou/pretext")
}

interface PretextTestimonialMasonryProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Array of testimonials to display. */
  testimonials: Testimonial[]
  /** Number of columns. @default 3 */
  columns?: 2 | 3 | 4
  /** Gap between cards in pixels. @default 16 */
  gap?: number
  /** Title text above the grid. */
  title?: string
  /** CSS font shorthand for quote text measurement.
   * @default '14px/1.625 ui-sans-serif, system-ui, sans-serif' */
  font?: string
  /** Quote text line height in pixels. @default 22.75 */
  lineHeight?: number
}

const DEFAULT_FONT = "14px ui-sans-serif, system-ui, sans-serif"
const DEFAULT_LINE_HEIGHT = 22.75
const CARD_PADDING = 40
const CARD_FOOTER_HEIGHT = 52
const CARD_RATING_HEIGHT = 24
const CARD_QUOTE_OVERHEAD = 8

function PretextTestimonialMasonry({
  testimonials,
  columns = 3,
  gap = 16,
  title,
  font = DEFAULT_FONT,
  lineHeight = DEFAULT_LINE_HEIGHT,
  className,
  ...props
}: PretextTestimonialMasonryProps) {
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

  const prepared = React.useMemo(() => {
    if (!isBrowser) return [] as PreparedText[]
    const { prepare } = getPretext()
    return testimonials.map((t) => prepare(`\u201C${t.quote}\u201D`, font))
  }, [testimonials, font])

  const positioned = React.useMemo(() => {
    if (containerWidth <= 0 || prepared.length === 0) {
      return { cards: [] as { x: number; y: number; w: number; h: number; index: number }[], height: 0 }
    }

    const { layout } = getPretext()
    const colWidth = (containerWidth - (columns - 1) * gap) / columns
    const textWidth = Math.max(1, colWidth - CARD_PADDING)
    const colHeights = new Array(columns).fill(0) as number[]

    const cards = testimonials.map((t, i) => {
      let shortest = 0
      for (let c = 1; c < columns; c++) {
        if (colHeights[c]! < colHeights[shortest]!) shortest = c
      }

      const { height: quoteHeight } = layout(prepared[i]!, textWidth, lineHeight)
      const ratingExtra = t.rating ? CARD_RATING_HEIGHT : 0
      const cardHeight = CARD_PADDING + ratingExtra + quoteHeight + CARD_QUOTE_OVERHEAD + CARD_FOOTER_HEIGHT

      const x = shortest * (colWidth + gap)
      const y = colHeights[shortest]!
      colHeights[shortest]! += cardHeight + gap

      return { x, y, w: colWidth, h: cardHeight, index: i }
    })

    const height = Math.max(...colHeights)
    return { cards, height }
  }, [testimonials, prepared, containerWidth, columns, gap, lineHeight])

  return (
    <div
      data-slot="pretext-testimonial-masonry"
      className={cn("flex flex-col items-center gap-6", className)}
      {...props}
    >
      {title && (
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
      )}
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: positioned.height || "auto" }}
      >
        {containerWidth > 0 &&
          positioned.cards.map((card) => (
            <div
              key={card.index}
              className="absolute"
              style={{
                left: card.x,
                top: card.y,
                width: card.w,
              }}
            >
              <TestimonialCard
                testimonial={testimonials[card.index]!}
                className="h-full"
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export {
  PretextTestimonialMasonry,
  type PretextTestimonialMasonryProps,
}
