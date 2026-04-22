/**
 * jalco-ui
 * DownloadSparkline
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Tiny inline SVG sparkline showing npm download trends over time. Pure SVG,
 * zero charting dependencies. Async server component — fetches data at build
 * time with ISR.
 *
 * Props:
 * - package: npm package name
 * - range?: "last-week" | "last-month" | "last-year" (default "last-month")
 * - variant?: "line" | "area" | "bar" (default "line")
 * - color?: stroke/fill color (default "currentColor")
 * - width?: SVG width in px (default 120)
 * - height?: SVG height in px (default 32)
 * - strokeWidth?: line stroke width (default 1.5)
 * - showEndpoint?: show a dot at the latest value (default true)
 * - showLabel?: show formatted total downloads label (default false)
 * - showTrend?: show percentage change indicator (default false)
 * - showDateRange?: show date range below the chart (default false)
 * - showBaseline?: show a faint average reference line (default false)
 * - data?: pre-fetched NpmDownloadPoint[] to skip the API call
 *
 * Notes:
 * - Async server component — no client JS required
 * - Fetches api.npmjs.org at build time, cached 1 hour via ISR
 * - No API key required
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  fetchNpmDownloads,
  formatDownloads,
  type NpmDownloadPoint,
  type NpmDownloadRange,
} from "@/registry/download-sparkline/lib/npm"

interface DownloadSparklineProps extends React.ComponentProps<"div"> {
  /** npm package name (e.g. "react", "@tanstack/react-query"). */
  package: string
  /** Time range. @default "last-month" */
  range?: NpmDownloadRange
  /** Sparkline chart type. @default "line" */
  variant?: "line" | "area" | "bar"
  /** Stroke/fill color. @default "currentColor" */
  color?: string
  /** SVG width in pixels. @default 120 */
  width?: number
  /** SVG height in pixels. @default 32 */
  height?: number
  /** Line stroke width. @default 1.5 */
  strokeWidth?: number
  /** Show a dot at the latest data point. @default true */
  showEndpoint?: boolean
  /** Show formatted total downloads label. @default false */
  showLabel?: boolean
  /** Show percentage change trend indicator (compares first half vs second half). @default false */
  showTrend?: boolean
  /** Show date range below the chart (e.g. "Mar 22 – Apr 21"). @default false */
  showDateRange?: boolean
  /** Show a faint dashed line at the average value. @default false */
  showBaseline?: boolean
  /** Pre-fetched download data. When provided, skips the npm API call. */
  data?: NpmDownloadPoint[]
}

function computeStats(points: NpmDownloadPoint[]) {
  const total = points.reduce((sum, p) => sum + p.downloads, 0)
  const avg = total / points.length

  const mid = Math.floor(points.length / 2)
  const firstHalf = points.slice(0, mid)
  const secondHalf = points.slice(mid)
  const firstAvg =
    firstHalf.reduce((s, p) => s + p.downloads, 0) / (firstHalf.length || 1)
  const secondAvg =
    secondHalf.reduce((s, p) => s + p.downloads, 0) / (secondHalf.length || 1)

  const trendPct =
    firstAvg > 0 ? ((secondAvg - firstAvg) / firstAvg) * 100 : 0

  const max = Math.max(...points.map((p) => p.downloads), 1)
  const min = Math.min(...points.map((p) => p.downloads))

  return { total, avg, max, min, trendPct }
}

function formatShortDate(iso: string): string {
  const d = new Date(iso + "T00:00:00")
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function buildLinePath(
  points: NpmDownloadPoint[],
  width: number,
  height: number,
  padding: number
): string {
  if (points.length === 0) return ""

  const max = Math.max(...points.map((p) => p.downloads), 1)
  const min = Math.min(...points.map((p) => p.downloads))
  const range = max - min || 1
  const drawHeight = height - padding * 2
  const drawWidth = width - padding * 2

  return points
    .map((p, i) => {
      const x = padding + (i / (points.length - 1)) * drawWidth
      const y =
        padding + drawHeight - ((p.downloads - min) / range) * drawHeight
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(" ")
}

function buildAreaPath(
  points: NpmDownloadPoint[],
  width: number,
  height: number,
  padding: number
): string {
  if (points.length === 0) return ""

  const linePath = buildLinePath(points, width, height, padding)
  const drawWidth = width - padding * 2
  const lastX = padding + drawWidth
  const firstX = padding
  const bottom = height - padding

  return `${linePath} L ${lastX.toFixed(2)} ${bottom.toFixed(2)} L ${firstX.toFixed(2)} ${bottom.toFixed(2)} Z`
}

function getEndpoint(
  points: NpmDownloadPoint[],
  width: number,
  height: number,
  padding: number
): { x: number; y: number } | null {
  if (points.length === 0) return null

  const max = Math.max(...points.map((p) => p.downloads), 1)
  const min = Math.min(...points.map((p) => p.downloads))
  const range = max - min || 1
  const drawHeight = height - padding * 2
  const drawWidth = width - padding * 2

  const last = points[points.length - 1]
  return {
    x: padding + drawWidth,
    y:
      padding +
      drawHeight -
      ((last.downloads - min) / range) * drawHeight,
  }
}

function getBaselineY(
  avg: number,
  points: NpmDownloadPoint[],
  height: number,
  padding: number
): number {
  const max = Math.max(...points.map((p) => p.downloads), 1)
  const min = Math.min(...points.map((p) => p.downloads))
  const range = max - min || 1
  const drawHeight = height - padding * 2
  return padding + drawHeight - ((avg - min) / range) * drawHeight
}

function BaselineLine({
  y,
  width,
  padding,
  color,
}: {
  y: number
  width: number
  padding: number
  color: string
}) {
  return (
    <line
      x1={padding}
      y1={y}
      x2={width - padding}
      y2={y}
      stroke={color}
      strokeWidth={0.75}
      strokeDasharray="3 3"
      opacity={0.25}
    />
  )
}

function LineSparkline({
  points,
  width,
  height,
  color,
  strokeWidth,
  showEndpoint,
  showBaseline,
  avg,
}: {
  points: NpmDownloadPoint[]
  width: number
  height: number
  color: string
  strokeWidth: number
  showEndpoint: boolean
  showBaseline: boolean
  avg: number
}) {
  const padding = 2 + strokeWidth
  const path = buildLinePath(points, width, height, padding)
  const endpoint = showEndpoint
    ? getEndpoint(points, width, height, padding)
    : null
  const baselineY = showBaseline
    ? getBaselineY(avg, points, height, padding)
    : null

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      fill="none"
      aria-hidden="true"
      className="block"
    >
      {baselineY != null && (
        <BaselineLine
          y={baselineY}
          width={width}
          padding={padding}
          color={color}
        />
      )}
      <path
        d={path}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {endpoint && (
        <circle
          cx={endpoint.x}
          cy={endpoint.y}
          r={strokeWidth + 0.5}
          fill={color}
        />
      )}
    </svg>
  )
}

function AreaSparkline({
  points,
  width,
  height,
  color,
  strokeWidth,
  showEndpoint,
  showBaseline,
  avg,
}: {
  points: NpmDownloadPoint[]
  width: number
  height: number
  color: string
  strokeWidth: number
  showEndpoint: boolean
  showBaseline: boolean
  avg: number
}) {
  const padding = 2 + strokeWidth
  const linePath = buildLinePath(points, width, height, padding)
  const areaPath = buildAreaPath(points, width, height, padding)
  const endpoint = showEndpoint
    ? getEndpoint(points, width, height, padding)
    : null
  const baselineY = showBaseline
    ? getBaselineY(avg, points, height, padding)
    : null

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      fill="none"
      aria-hidden="true"
      className="block"
    >
      {baselineY != null && (
        <BaselineLine
          y={baselineY}
          width={width}
          padding={padding}
          color={color}
        />
      )}
      <path d={areaPath} fill={color} opacity={0.12} />
      <path
        d={linePath}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {endpoint && (
        <circle
          cx={endpoint.x}
          cy={endpoint.y}
          r={strokeWidth + 0.5}
          fill={color}
        />
      )}
    </svg>
  )
}

function BarSparkline({
  points,
  width,
  height,
  color,
  showBaseline,
  avg,
}: {
  points: NpmDownloadPoint[]
  width: number
  height: number
  color: string
  showBaseline: boolean
  avg: number
}) {
  if (points.length === 0) return null

  const padding = 2
  const max = Math.max(...points.map((p) => p.downloads), 1)
  const min = Math.min(...points.map((p) => p.downloads))
  const range = max - min || 1
  const drawHeight = height - padding * 2
  const drawWidth = width - padding * 2
  const gap = 1
  const barWidth = Math.max(
    1,
    (drawWidth - gap * (points.length - 1)) / points.length
  )
  const baselineY = showBaseline
    ? getBaselineY(avg, points, height, padding)
    : null

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      fill="none"
      aria-hidden="true"
      className="block"
    >
      {baselineY != null && (
        <BaselineLine
          y={baselineY}
          width={width}
          padding={padding}
          color={color}
        />
      )}
      {points.map((p, i) => {
        const barHeight = Math.max(
          1,
          ((p.downloads - min) / range) * drawHeight
        )
        const x = padding + i * (barWidth + gap)
        const y = padding + drawHeight - barHeight
        return (
          <rect
            key={p.day}
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            rx={Math.min(barWidth / 2, 1)}
            fill={color}
            opacity={0.7 + 0.3 * (i / (points.length - 1))}
          />
        )
      })}
    </svg>
  )
}

function TrendIndicator({ trendPct }: { trendPct: number }) {
  const isUp = trendPct > 0
  const isFlat = Math.abs(trendPct) < 0.5
  const formatted = `${isUp ? "+" : ""}${trendPct.toFixed(1)}%`

  if (isFlat) {
    return (
      <span className="inline-flex items-center gap-0.5 text-xs tabular-nums text-muted-foreground">
        {formatted}
      </span>
    )
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-xs font-medium tabular-nums",
        isUp
          ? "text-emerald-600 dark:text-emerald-400"
          : "text-red-600 dark:text-red-400"
      )}
    >
      <svg
        viewBox="0 0 10 10"
        fill="currentColor"
        aria-hidden="true"
        className={cn("size-2.5", !isUp && "rotate-180")}
      >
        <path d="M5 1L9 6H1L5 1Z" />
      </svg>
      {formatted}
    </span>
  )
}

async function DownloadSparkline({
  package: packageName,
  range = "last-month",
  variant = "line",
  color = "currentColor",
  width = 120,
  height = 32,
  strokeWidth = 1.5,
  showEndpoint = true,
  showLabel = false,
  showTrend = false,
  showDateRange = false,
  showBaseline = false,
  data: dataProp,
  className,
  ...rest
}: DownloadSparklineProps) {
  const points = dataProp ?? (await fetchNpmDownloads(packageName, range))
  if (points.length === 0) return null

  const stats = computeStats(points)

  const rangeLabel =
    range === "last-week"
      ? "7d"
      : range === "last-year"
        ? "1y"
        : "30d"

  const dateStart = points[0].day
  const dateEnd = points[points.length - 1].day

  const chartProps = { showBaseline, avg: stats.avg }

  return (
    <div
      data-slot="download-sparkline"
      className={cn("inline-flex flex-col gap-1", className)}
      aria-label={`${packageName} downloads: ${formatDownloads(stats.total)} over ${rangeLabel}`}
      {...rest}
    >
      <div className="inline-flex items-center gap-2">
        {variant === "bar" ? (
          <BarSparkline
            points={points}
            width={width}
            height={height}
            color={color}
            {...chartProps}
          />
        ) : variant === "area" ? (
          <AreaSparkline
            points={points}
            width={width}
            height={height}
            color={color}
            strokeWidth={strokeWidth}
            showEndpoint={showEndpoint}
            {...chartProps}
          />
        ) : (
          <LineSparkline
            points={points}
            width={width}
            height={height}
            color={color}
            strokeWidth={strokeWidth}
            showEndpoint={showEndpoint}
            {...chartProps}
          />
        )}
        <div className="inline-flex flex-col gap-0.5">
          {showLabel && (
            <span className="text-xs tabular-nums text-muted-foreground">
              {formatDownloads(stats.total)}
              <span className="opacity-60">/{rangeLabel}</span>
            </span>
          )}
          {showTrend && <TrendIndicator trendPct={stats.trendPct} />}
        </div>
      </div>
      {showDateRange && (
        <span className="text-[10px] tabular-nums text-muted-foreground/60">
          {formatShortDate(dateStart)} – {formatShortDate(dateEnd)}
        </span>
      )}
    </div>
  )
}

export { DownloadSparkline }
export type { DownloadSparklineProps, NpmDownloadPoint, NpmDownloadRange }
