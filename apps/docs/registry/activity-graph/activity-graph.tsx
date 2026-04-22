"use client"

/**
 * jalco-ui
 * ActivityGraph
 * by Justin Levine
 * ui.justinlevine.me
 *
 * GitHub-style activity heatmap that visualizes daily counts as a color-intensity grid.
 * Renders month labels, day-of-week labels, and a Less/More legend.
 * Auto-sizes blocks to fit the container by default.
 *
 * Props:
 * - data: array of { date, count } entries
 * - colorScale?: 5-element tuple of CSS classes for intensity levels 0–4
 * - blockSize?: fixed cell size in pixels (omit to auto-fit)
 * - blockRadius?: cell border radius in pixels (default 2)
 * - weeks?: number of weeks to display (default 52)
 * - className?: additional CSS classes
 *
 * Dependencies: radix-ui (Tooltip)
 * Inspiration: GitHub contribution graph
 * Data fetching powered by github-contributions-api by @grubersjoe
 */

import * as React from "react"
import { Tooltip } from "radix-ui"
import { cn } from "@/lib/utils"

export interface ActivityEntry {
  /** ISO date string (YYYY-MM-DD). */
  date: string
  /** Activity count for this date. */
  count: number
}

export interface ActivityGraphProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Activity data entries. */
  data: ActivityEntry[]
  /**
   * Five CSS classes for intensity levels 0 through 4.
   * Level 0 is the empty/no-activity state.
   * Defaults to a GitHub-style green scale.
   */
  colorScale?: [string, string, string, string, string]
  /**
   * Fixed cell size in pixels. When omitted the component auto-sizes
   * blocks to fill the available container width.
   */
  blockSize?: number
  /** Cell border radius in pixels. @default 2 */
  blockRadius?: number
  /** Number of trailing weeks to display. @default 52 */
  weeks?: number
  className?: string
}

const DEFAULT_COLOR_SCALE: [string, string, string, string, string] = [
  "bg-muted",
  "bg-emerald-300/60 dark:bg-emerald-700/50",
  "bg-emerald-400/70 dark:bg-emerald-600/60",
  "bg-emerald-500 dark:bg-emerald-500/70",
  "bg-emerald-600 dark:bg-emerald-400",
]

const GAP = 2
const DAY_LABEL_WIDTH = 28
const MONTH_LABEL_HEIGHT = 16
const DAY_LABELS = ["Mon", "Wed", "Fri"] as const
const DAY_LABEL_INDICES = [1, 3, 5] as const

function getIntensity(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0
  if (max <= 0) return 0
  const ratio = count / max
  if (ratio <= 0.25) return 1
  if (ratio <= 0.5) return 2
  if (ratio <= 0.75) return 3
  return 4
}

function buildWeeks(
  data: ActivityEntry[],
  weekCount: number
): { date: Date; count: number }[][] {
  const countMap = new Map<string, number>()
  for (const entry of data) {
    countMap.set(entry.date, (countMap.get(entry.date) ?? 0) + entry.count)
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayDay = today.getDay()

  const endOfWeek = new Date(today)
  endOfWeek.setDate(today.getDate() + (6 - todayDay))

  const totalDays = weekCount * 7
  const startDate = new Date(endOfWeek)
  startDate.setDate(endOfWeek.getDate() - totalDays + 1)

  const weeks: { date: Date; count: number }[][] = []
  let currentWeek: { date: Date; count: number }[] = []

  for (let i = 0; i < totalDays; i++) {
    const d = new Date(startDate)
    d.setDate(startDate.getDate() + i)
    const key = d.toISOString().slice(0, 10)
    currentWeek.push({ date: d, count: countMap.get(key) ?? 0 })

    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek)
  }

  return weeks
}

function computeBlockSize(containerWidth: number, weekCount: number): number {
  const available = containerWidth - DAY_LABEL_WIDTH
  const size = (available - GAP * (weekCount - 1)) / weekCount
  return Math.max(4, Math.floor(size))
}

function getMonthLabels(
  weeks: { date: Date; count: number }[][],
  blockSize: number
): { label: string; offset: number }[] {
  const months: { label: string; offset: number }[] = []
  let lastKey = ""

  for (let w = 0; w < weeks.length; w++) {
    const firstDay = weeks[w][0]
    const key = `${firstDay.date.getFullYear()}-${firstDay.date.getMonth()}`

    if (key !== lastKey) {
      months.push({
        label: firstDay.date.toLocaleString("en-US", { month: "short" }),
        offset: w * (blockSize + GAP),
      })
      lastKey = key
    }
  }

  return months
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function ActivityGraph({
  data,
  colorScale = DEFAULT_COLOR_SCALE,
  blockSize: fixedBlockSize,
  blockRadius = 2,
  weeks: weekCount = 52,
  className,
  ...props
}: ActivityGraphProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [autoSize, setAutoSize] = React.useState<number | null>(null)

  React.useEffect(() => {
    if (fixedBlockSize != null) return

    const el = containerRef.current
    if (!el) return

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width
      if (width && width > 0) {
        setAutoSize(computeBlockSize(width, weekCount))
      }
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [fixedBlockSize, weekCount])

  const blockSize = fixedBlockSize ?? autoSize ?? 10
  const weeks = buildWeeks(data, weekCount)
  const maxCount = Math.max(...data.map((d) => d.count), 0)
  const monthLabels = getMonthLabels(weeks, blockSize)

  const gridWidth = weeks.length * (blockSize + GAP) - GAP
  const gridHeight = 7 * (blockSize + GAP) - GAP
  const totalWidth = DAY_LABEL_WIDTH + gridWidth

  const isAutoFit = fixedBlockSize == null
  const showGraph = fixedBlockSize != null || autoSize != null

  return (
    <div
      ref={containerRef}
      className={cn(
        isAutoFit ? "w-full" : "overflow-x-auto",
        className
      )}
      role="img"
      aria-label="Activity graph"
      data-slot="activity-graph"
      {...props}
    >
      {showGraph && (
        <div
          className="flex flex-col gap-2"
          style={{ minWidth: isAutoFit ? undefined : totalWidth }}
        >
          <div
            className="relative"
            style={{
              width: isAutoFit ? "100%" : totalWidth,
              height: MONTH_LABEL_HEIGHT + gridHeight,
            }}
          >
            {monthLabels.map((m, i) => (
              <span
                key={`${m.label}-${i}`}
                className="absolute text-[10px] leading-none text-muted-foreground"
                style={{ left: DAY_LABEL_WIDTH + m.offset, top: 0 }}
              >
                {m.label}
              </span>
            ))}

            {DAY_LABELS.map((label, i) => (
              <span
                key={label}
                className="absolute text-[10px] leading-none text-muted-foreground"
                style={{
                  left: 0,
                  top:
                    MONTH_LABEL_HEIGHT +
                    DAY_LABEL_INDICES[i] * (blockSize + GAP) +
                    blockSize / 2 -
                    4,
                }}
              >
                {label}
              </span>
            ))}

            <div
              className="absolute"
              style={{
                left: DAY_LABEL_WIDTH,
                top: MONTH_LABEL_HEIGHT,
                display: "flex",
                gap: GAP,
              }}
            >
              {weeks.map((week, wi) => (
                <div key={wi} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
                  {week.map((day, di) => {
                    const intensity = getIntensity(day.count, maxCount)
                    return (
                      <Tooltip.Provider key={di} delayDuration={100}>
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <div
                              className={cn(
                                "transition-colors",
                                colorScale[intensity]
                              )}
                              style={{
                                width: blockSize,
                                height: blockSize,
                                borderRadius: blockRadius,
                              }}
                            />
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              side="top"
                              sideOffset={4}
                              className="z-50 rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
                            >
                              <p className="font-medium">
                                {day.count} contribution{day.count === 1 ? "" : "s"}
                              </p>
                              <p className="text-muted-foreground">
                                {formatDate(day.date)}
                              </p>
                              <Tooltip.Arrow className="fill-popover" />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </Tooltip.Provider>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-end text-[10px] text-muted-foreground">
            <span>Less</span>
            {colorScale.map((cls, i) => (
              <div
                key={i}
                className={cn(cls)}
                style={{
                  width: blockSize,
                  height: blockSize,
                  borderRadius: blockRadius,
                }}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      )}
    </div>
  )
}
