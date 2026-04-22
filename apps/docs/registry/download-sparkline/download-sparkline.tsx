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
  /** Show formatted total downloads label below the chart. @default false */
  showLabel?: boolean
  /** Pre-fetched download data. When provided, skips the npm API call. */
  data?: NpmDownloadPoint[]
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
      const y = padding + drawHeight - ((p.downloads - min) / range) * drawHeight
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

function LineSparkline({
  points,
  width,
  height,
  color,
  strokeWidth,
  showEndpoint,
}: {
  points: NpmDownloadPoint[]
  width: number
  height: number
  color: string
  strokeWidth: number
  showEndpoint: boolean
}) {
  const padding = 2 + strokeWidth
  const path = buildLinePath(points, width, height, padding)
  const endpoint = showEndpoint
    ? getEndpoint(points, width, height, padding)
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
}: {
  points: NpmDownloadPoint[]
  width: number
  height: number
  color: string
  strokeWidth: number
  showEndpoint: boolean
}) {
  const padding = 2 + strokeWidth
  const linePath = buildLinePath(points, width, height, padding)
  const areaPath = buildAreaPath(points, width, height, padding)
  const endpoint = showEndpoint
    ? getEndpoint(points, width, height, padding)
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
}: {
  points: NpmDownloadPoint[]
  width: number
  height: number
  color: string
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

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      fill="none"
      aria-hidden="true"
      className="block"
    >
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
            opacity={0.7 + (0.3 * (i / (points.length - 1)))}
          />
        )
      })}
    </svg>
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
  data: dataProp,
  className,
  ...rest
}: DownloadSparklineProps) {
  const points = dataProp ?? (await fetchNpmDownloads(packageName, range))
  if (points.length === 0) return null

  const total = points.reduce((sum, p) => sum + p.downloads, 0)

  const rangeLabel =
    range === "last-week"
      ? "7d"
      : range === "last-year"
        ? "1y"
        : "30d"

  return (
    <div
      data-slot="download-sparkline"
      className={cn("inline-flex items-center gap-2", className)}
      aria-label={`${packageName} downloads: ${formatDownloads(total)} over ${rangeLabel}`}
      {...rest}
    >
      {variant === "bar" ? (
        <BarSparkline
          points={points}
          width={width}
          height={height}
          color={color}
        />
      ) : variant === "area" ? (
        <AreaSparkline
          points={points}
          width={width}
          height={height}
          color={color}
          strokeWidth={strokeWidth}
          showEndpoint={showEndpoint}
        />
      ) : (
        <LineSparkline
          points={points}
          width={width}
          height={height}
          color={color}
          strokeWidth={strokeWidth}
          showEndpoint={showEndpoint}
        />
      )}
      {showLabel && (
        <span className="text-xs tabular-nums text-muted-foreground">
          {formatDownloads(total)}
          <span className="opacity-60">/{rangeLabel}</span>
        </span>
      )}
    </div>
  )
}

export { DownloadSparkline }
export type { DownloadSparklineProps, NpmDownloadPoint, NpmDownloadRange }
