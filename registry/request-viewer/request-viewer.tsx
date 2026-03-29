"use client"

/**
 * jalco-ui
 * RequestViewer
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Network request inspector showing headers, response body, and timing breakdown.
 * Designed for dev dashboards, API documentation, and debugging tools.
 *
 * Props:
 * - request: NetworkRequest object with method, url, status, headers, response, and timing
 * - defaultTab?: initial active tab ("headers" | "response" | "timing")
 * - className?: additional CSS classes
 *
 * Dependencies: lucide-react
 */

import * as React from "react"
import {
  ArrowDown,
  ArrowUp,
  Clock,
  FileText,
  Globe,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface HeaderEntry {
  name: string
  value: string
}

interface TimingEntry {
  /** Label for this timing phase (e.g. "DNS Lookup", "TLS Handshake"). */
  label: string
  /** Duration in milliseconds. */
  duration: number
  /** Optional color class. Falls back to a default palette per index. */
  colorClass?: string
}

interface NetworkRequest {
  /** HTTP method (GET, POST, etc.). */
  method: string
  /** Full request URL. */
  url: string
  /** HTTP status code. */
  status: number
  /** HTTP status text (e.g. "OK", "Not Found"). */
  statusText?: string
  /** Request headers. */
  requestHeaders?: HeaderEntry[]
  /** Response headers. */
  responseHeaders?: HeaderEntry[]
  /** Response body as a string. */
  responseBody?: string
  /** Content type of the response (used for display hints). */
  contentType?: string
  /** Timing breakdown for the request lifecycle. */
  timing?: TimingEntry[]
  /** Total request duration in milliseconds. */
  duration?: number
}

type Tab = "headers" | "response" | "timing"

function statusColor(status: number): string {
  if (status >= 200 && status < 300) return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
  if (status >= 300 && status < 400) return "bg-sky-500/15 text-sky-600 dark:text-sky-400"
  if (status >= 400 && status < 500) return "bg-amber-500/15 text-amber-600 dark:text-amber-400"
  if (status >= 500) return "bg-rose-500/15 text-rose-600 dark:text-rose-400"
  return "bg-muted text-muted-foreground"
}

function methodColor(method: string): string {
  switch (method.toUpperCase()) {
    case "GET":
      return "text-emerald-600 dark:text-emerald-400"
    case "POST":
      return "text-sky-600 dark:text-sky-400"
    case "PUT":
    case "PATCH":
      return "text-amber-600 dark:text-amber-400"
    case "DELETE":
      return "text-rose-600 dark:text-rose-400"
    default:
      return "text-muted-foreground"
  }
}

const defaultTimingColors = [
  "bg-sky-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-indigo-500",
]

function formatDuration(ms: number): string {
  if (ms < 1) return `${(ms * 1000).toFixed(0)}µs`
  if (ms < 1000) return `${ms.toFixed(ms < 10 ? 1 : 0)}ms`
  return `${(ms / 1000).toFixed(2)}s`
}

interface TabButtonProps {
  active: boolean
  onClick: () => void
  icon: LucideIcon
  label: string
  count?: number
  id?: string
  tabIndex?: number
}

function TabButton({ active, onClick, icon: Icon, label, count, id, tabIndex }: TabButtonProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      id={id}
      tabIndex={tabIndex}
      className={cn(
        "inline-flex items-center gap-1.5 border-b-2 px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "border-foreground text-foreground"
          : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
      )}
    >
      <Icon className="size-3.5" />
      {label}
      {count !== undefined && (
        <span
          className={cn(
            "ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none",
            active ? "bg-foreground/10" : "bg-muted"
          )}
        >
          {count}
        </span>
      )}
    </button>
  )
}

function HeadersTable({
  title,
  headers,
  icon: Icon,
}: {
  title: string
  headers: HeaderEntry[]
  icon: LucideIcon
}) {
  if (headers.length === 0) return null

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <Icon className="size-3.5 text-muted-foreground" />
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </h4>
      </div>
      <div className="overflow-hidden rounded-lg border border-border/60">
        {headers.map((header, i) => (
          <div
            key={`${header.name}-${i}`}
            className={cn(
              "flex gap-4 px-3 py-2 text-sm",
              i !== headers.length - 1 && "border-b border-border/40"
            )}
          >
            <span className="w-[200px] shrink-0 truncate font-mono text-xs font-medium text-foreground">
              {header.name}
            </span>
            <span className="min-w-0 flex-1 break-all font-mono text-xs text-muted-foreground">
              {header.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function HeadersPanel({ request }: { request: NetworkRequest }) {
  const hasRequest = (request.requestHeaders?.length ?? 0) > 0
  const hasResponse = (request.responseHeaders?.length ?? 0) > 0

  if (!hasRequest && !hasResponse) {
    return <EmptyState message="No headers available." />
  }

  return (
    <div className="flex flex-col gap-5 p-4">
      {hasRequest && (
        <HeadersTable
          title="Request Headers"
          headers={request.requestHeaders!}
          icon={ArrowUp}
        />
      )}
      {hasResponse && (
        <HeadersTable
          title="Response Headers"
          headers={request.responseHeaders!}
          icon={ArrowDown}
        />
      )}
    </div>
  )
}

function ResponsePanel({ request }: { request: NetworkRequest }) {
  if (!request.responseBody) {
    return <EmptyState message="No response body available." />
  }

  const isJson = request.contentType?.includes("json") || looksLikeJson(request.responseBody)
  const formatted = isJson ? tryFormatJson(request.responseBody) : request.responseBody

  return (
    <div className="flex flex-col gap-2 p-4">
      {request.contentType && (
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-[10px] font-medium text-muted-foreground">
            {request.contentType}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {byteSize(request.responseBody)}
          </span>
        </div>
      )}
      <div className="overflow-auto rounded-lg border border-border/60 bg-muted/30">
        <pre className="p-4 text-xs leading-relaxed text-foreground">
          <code>{formatted}</code>
        </pre>
      </div>
    </div>
  )
}

function looksLikeJson(str: string): boolean {
  const trimmed = str.trim()
  return (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
    (trimmed.startsWith("[") && trimmed.endsWith("]"))
}

function tryFormatJson(str: string): string {
  try {
    return JSON.stringify(JSON.parse(str), null, 2)
  } catch {
    return str
  }
}

function byteSize(str: string): string {
  const bytes = new Blob([str]).size
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function TimingPanel({ request }: { request: NetworkRequest }) {
  if (!request.timing || request.timing.length === 0) {
    return <EmptyState message="No timing data available." />
  }

  const maxDuration = Math.max(...request.timing.map((t) => t.duration))
  const totalDuration = request.duration ?? request.timing.reduce((sum, t) => sum + t.duration, 0)

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Total */}
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Total Duration
        </span>
        <span className="font-mono text-sm font-semibold text-foreground">
          {formatDuration(totalDuration)}
        </span>
      </div>

      {/* Waterfall */}
      <div className="flex flex-col gap-2.5">
        {request.timing.map((entry, i) => {
          const percentage = maxDuration > 0 ? (entry.duration / maxDuration) * 100 : 0
          const barColor = entry.colorClass ?? defaultTimingColors[i % defaultTimingColors.length]

          return (
            <div key={`${entry.label}-${i}`} className="flex items-center gap-3">
              <span className="w-[120px] shrink-0 truncate text-xs text-muted-foreground">
                {entry.label}
              </span>
              <div className="relative h-5 flex-1 overflow-hidden rounded-md bg-muted/50">
                <div
                  className={cn("h-full rounded-md transition-all", barColor)}
                  style={{
                    width: `${Math.max(percentage, 2)}%`,
                    opacity: percentage === 0 ? 0.3 : 1,
                  }}
                />
              </div>
              <span className="w-[64px] shrink-0 text-right font-mono text-xs text-muted-foreground">
                {formatDuration(entry.duration)}
              </span>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 border-t border-border/40 pt-3">
        {request.timing.map((entry, i) => {
          const barColor = entry.colorClass ?? defaultTimingColors[i % defaultTimingColors.length]
          return (
            <div key={`legend-${entry.label}-${i}`} className="flex items-center gap-1.5">
              <span className={cn("size-2.5 rounded-full", barColor)} />
              <span className="text-[10px] text-muted-foreground">{entry.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center py-10 text-sm text-muted-foreground">
      {message}
    </div>
  )
}

interface RequestViewerProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Network request data to display. */
  request: NetworkRequest
  /** Initial active tab. Defaults to "headers". */
  defaultTab?: Tab
}

const TABS: Tab[] = ["headers", "response", "timing"]

function RequestViewer({
  request,
  defaultTab = "headers",
  className,
  ...props
}: RequestViewerProps) {
  const [activeTab, setActiveTab] = React.useState<Tab>(defaultTab)

  const headerCount =
    (request.requestHeaders?.length ?? 0) + (request.responseHeaders?.length ?? 0)
  const timingCount = request.timing?.length ?? 0

  const handleTabKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      let newIndex = TABS.indexOf(activeTab)

      switch (e.key) {
        case "ArrowLeft":
          newIndex = newIndex > 0 ? newIndex - 1 : TABS.length - 1
          break
        case "ArrowRight":
          newIndex = newIndex < TABS.length - 1 ? newIndex + 1 : 0
          break
        case "Home":
          newIndex = 0
          break
        case "End":
          newIndex = TABS.length - 1
          break
        default:
          return
      }

      e.preventDefault()
      setActiveTab(TABS[newIndex])

      const tabEl = document.getElementById(`request-viewer-tab-${TABS[newIndex]}`)
      tabEl?.focus()
    },
    [activeTab]
  )

  return (
    <div
      data-slot="request-viewer"
      className={cn(
        "overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm",
        className
      )}
      {...props}
    >
      {/* Request summary */}
      <div className="flex flex-wrap items-center gap-3 border-b border-border/40 px-4 py-3">
        <span
          className={cn(
            "font-mono text-sm font-bold uppercase",
            methodColor(request.method)
          )}
        >
          {request.method}
        </span>
        <span className="min-w-0 flex-1 truncate font-mono text-sm text-muted-foreground">
          {request.url}
        </span>
        <span
          className={cn(
            "inline-flex items-center rounded-md px-2.5 py-0.5 font-mono text-xs font-semibold",
            statusColor(request.status)
          )}
        >
          {request.status}
          {request.statusText && ` ${request.statusText}`}
        </span>
        {request.duration !== undefined && (
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3" />
            {formatDuration(request.duration)}
          </span>
        )}
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Request details"
        className="flex border-b border-border/40 bg-muted/20 px-1"
        onKeyDown={handleTabKeyDown}
      >
        <TabButton
          active={activeTab === "headers"}
          onClick={() => setActiveTab("headers")}
          icon={FileText}
          label="Headers"
          count={headerCount > 0 ? headerCount : undefined}
          id="request-viewer-tab-headers"
          tabIndex={activeTab === "headers" ? 0 : -1}
        />
        <TabButton
          active={activeTab === "response"}
          onClick={() => setActiveTab("response")}
          icon={Globe}
          label="Response"
          id="request-viewer-tab-response"
          tabIndex={activeTab === "response" ? 0 : -1}
        />
        <TabButton
          active={activeTab === "timing"}
          onClick={() => setActiveTab("timing")}
          icon={Clock}
          label="Timing"
          count={timingCount > 0 ? timingCount : undefined}
          id="request-viewer-tab-timing"
          tabIndex={activeTab === "timing" ? 0 : -1}
        />
      </div>

      {/* Tab panels */}
      <div role="tabpanel">
        {activeTab === "headers" && <HeadersPanel request={request} />}
        {activeTab === "response" && <ResponsePanel request={request} />}
        {activeTab === "timing" && <TimingPanel request={request} />}
      </div>
    </div>
  )
}

export {
  RequestViewer,
  type RequestViewerProps,
  type NetworkRequest,
  type HeaderEntry,
  type TimingEntry,
  type Tab,
}
