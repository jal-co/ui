"use client"

/**
 * jalco-ui
 * LogViewer
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Scrollable log output component for displaying streaming logs or CLI-style
 * output in web apps. Supports colored log levels, timestamps, line numbers,
 * auto-scrolling, and search.
 *
 * Exports:
 * - LogViewerTerminal — full CLI-style interface with toolbar, line numbers, and timestamps
 * - LogViewerMinimal — simple scrolling log lines for compact contexts
 * - LogViewerFilterable — includes level filtering (info/warn/error/debug)
 *
 * Dependencies: lucide-react
 */

import * as React from "react"
import {
  ArrowDown,
  Check,
  Circle,
  Copy,
  Download,
  Filter,
  Pause,
  Play,
  Search,
  Terminal,
  Trash2,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Types

export type LogLevel = "info" | "warn" | "error" | "debug" | "verbose"

export interface LogEntry {
  /** Log level. */
  level: LogLevel
  /** Log message text. */
  message: string
  /** ISO timestamp string. When omitted, the current time is used for display. */
  timestamp?: string
}

/** Per-level color classes. Each key is optional — omitted levels use defaults. */
export type LevelColors = {
  /** CSS class for the level label text (e.g. "text-rose-500 dark:text-rose-400"). */
  text: string
  /** CSS class for the colored dot (e.g. "bg-rose-500"). */
  dot: string
  /** CSS class for the filter badge when active (e.g. "bg-rose-500/15 text-rose-600"). */
  badge: string
}

/** Partial map of log levels to custom color classes. */
export type LevelColorScale = Partial<Record<LogLevel, Partial<LevelColors>>>

// Default colors

const DEFAULT_LEVEL_COLORS: Record<LogLevel, LevelColors> = {
  error: {
    text: "text-rose-500 dark:text-rose-400",
    dot: "bg-rose-500",
    badge: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  },
  warn: {
    text: "text-amber-500 dark:text-amber-400",
    dot: "bg-amber-500",
    badge: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  },
  info: {
    text: "text-sky-500 dark:text-sky-400",
    dot: "bg-sky-500",
    badge: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  },
  debug: {
    text: "text-violet-500 dark:text-violet-400",
    dot: "bg-violet-500",
    badge: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  },
  verbose: {
    text: "text-zinc-400 dark:text-zinc-500",
    dot: "bg-zinc-400 dark:bg-zinc-500",
    badge: "bg-muted text-muted-foreground",
  },
}

const LEVEL_LABELS: Record<LogLevel, string> = {
  error: "ERR",
  warn: "WRN",
  info: "INF",
  debug: "DBG",
  verbose: "VRB",
}

function resolveLevelColors(
  level: LogLevel,
  colorScale?: LevelColorScale
): LevelColors {
  const defaults = DEFAULT_LEVEL_COLORS[level]
  const overrides = colorScale?.[level]
  if (!overrides) return defaults
  return {
    text: overrides.text ?? defaults.text,
    dot: overrides.dot ?? defaults.dot,
    badge: overrides.badge ?? defaults.badge,
  }
}

// Utilities

function formatTimestamp(ts?: string): string {
  const d = ts ? new Date(ts) : new Date()
  return d.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
}

function formatTimestampFull(ts?: string): string {
  const d = ts ? new Date(ts) : new Date()
  const ms = d.getMilliseconds().toString().padStart(3, "0")
  return `${d.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })}.${ms}`
}

function useCopy() {
  const [copied, setCopied] = React.useState(false)

  const copy = React.useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API unavailable in insecure contexts
    }
  }, [])

  return { copied, copy }
}

function useAutoScroll(entries: LogEntry[], enabled: boolean) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [isAtBottom, setIsAtBottom] = React.useState(true)

  React.useEffect(() => {
    if (!enabled || !isAtBottom) return
    const el = scrollRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [entries.length, enabled, isAtBottom])

  const handleScroll = React.useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const threshold = 40
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < threshold
    setIsAtBottom(atBottom)
  }, [])

  const scrollToBottom = React.useCallback(() => {
    const el = scrollRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
      setIsAtBottom(true)
    }
  }, [])

  return { scrollRef, isAtBottom, handleScroll, scrollToBottom }
}

function exportLogs(entries: LogEntry[]): void {
  const text = entries
    .map(
      (e) =>
        `[${formatTimestampFull(e.timestamp)}] [${LEVEL_LABELS[e.level]}] ${e.message}`
    )
    .join("\n")
  const blob = new Blob([text], { type: "text/plain" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `logs-${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

function highlightSearch(text: string, query: string): React.ReactNode {
  if (!query) return text
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"))
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="rounded-sm bg-amber-300/40 px-0.5 text-inherit dark:bg-amber-400/30">
        {part}
      </mark>
    ) : (
      part
    )
  )
}

// Small Toolbar Button

function ToolbarButton({
  onClick,
  label,
  active,
  children,
  className,
}: {
  onClick: () => void
  label: string
  active?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-md transition-colors outline-none",
        "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        active && "bg-accent text-accent-foreground",
        className
      )}
    >
      {children}
    </button>
  )
}

// LogViewerTerminal

interface LogViewerTerminalProps extends Omit<React.ComponentProps<"div">, "children" | "title"> {
  /** Log entries to display. */
  entries: LogEntry[]
  /** Title shown in the toolbar. @default "Logs" */
  title?: string
  /** Maximum visible height in pixels. @default 400 */
  maxHeight?: number
  /** Show line numbers. @default true */
  lineNumbers?: boolean
  /** Show timestamps. @default true */
  timestamps?: boolean
  /** Enable auto-scroll to bottom on new entries. @default true */
  autoScroll?: boolean
  /** Custom colors per log level. Merges with defaults — only override what you need. */
  colorScale?: LevelColorScale
  /** Called when the user clicks "Clear". When provided, a clear button appears. */
  onClear?: () => void
}

function LogViewerTerminal({
  entries,
  title = "Logs",
  maxHeight = 400,
  lineNumbers = true,
  timestamps = true,
  autoScroll = true,
  colorScale,
  onClear,
  className,
  ...props
}: LogViewerTerminalProps) {
  const [paused, setPaused] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const { copied, copy } = useCopy()
  const { scrollRef, isAtBottom, handleScroll, scrollToBottom } = useAutoScroll(
    entries,
    autoScroll && !paused
  )

  const filteredEntries = searchQuery
    ? entries.filter((e) => e.message.toLowerCase().includes(searchQuery.toLowerCase()))
    : entries

  const lineNumberWidth = Math.max(String(entries.length).length, 3)

  function handleCopyAll() {
    const text = entries
      .map(
        (e) =>
          `[${formatTimestampFull(e.timestamp)}] [${LEVEL_LABELS[e.level]}] ${e.message}`
      )
      .join("\n")
    copy(text)
  }

  return (
    <div
      data-slot="log-viewer-terminal"
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm",
        className
      )}
      {...props}
    >
      {/* Toolbar */}
      <div className="flex items-center gap-2 border-b border-border/40 bg-muted/30 px-3 py-2">
        <Terminal className="size-3.5 shrink-0 text-muted-foreground" />
        <span className="flex-1 truncate text-sm font-medium text-foreground">
          {title}
        </span>

        <span className="mr-1 text-[10px] tabular-nums text-muted-foreground">
          {filteredEntries.length}
          {searchQuery && ` / ${entries.length}`} lines
        </span>

        <div className="flex items-center gap-0.5">
          <ToolbarButton
            onClick={() => {
              setSearchOpen(!searchOpen)
              if (searchOpen) setSearchQuery("")
            }}
            label={searchOpen ? "Close search" : "Search"}
            active={searchOpen}
          >
            <Search className="size-3.5" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => setPaused(!paused)}
            label={paused ? "Resume auto-scroll" : "Pause auto-scroll"}
            active={paused}
          >
            {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
          </ToolbarButton>

          <ToolbarButton onClick={handleCopyAll} label={copied ? "Copied" : "Copy all logs"}>
            {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
          </ToolbarButton>

          <ToolbarButton onClick={() => exportLogs(entries)} label="Download logs">
            <Download className="size-3.5" />
          </ToolbarButton>

          {onClear && (
            <ToolbarButton onClick={onClear} label="Clear logs">
              <Trash2 className="size-3.5" />
            </ToolbarButton>
          )}
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="flex items-center gap-2 border-b border-border/40 bg-muted/20 px-3 py-1.5">
          <Search className="size-3.5 shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter logs…"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            autoFocus
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="inline-flex size-5 items-center justify-center rounded text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="size-3" />
            </button>
          )}
        </div>
      )}

      {/* Log output */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="overflow-auto bg-card font-mono text-xs leading-relaxed [scrollbar-width:thin]"
        style={{ maxHeight }}
        role="log"
        aria-live="polite"
        aria-label={title}
      >
        {filteredEntries.length === 0 ? (
          <div className="flex items-center justify-center py-10 text-sm text-muted-foreground">
            {searchQuery ? "No matching log entries." : "No log entries."}
          </div>
        ) : (
          filteredEntries.map((entry, i) => {
            const colors = resolveLevelColors(entry.level, colorScale)
            return (
              <div
                key={i}
                className="flex gap-3 border-b border-border/20 px-3 py-1 transition-colors hover:bg-muted/30"
              >
                {lineNumbers && (
                  <span
                    className="shrink-0 select-none text-right text-muted-foreground/50"
                    style={{ width: `${lineNumberWidth}ch` }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                )}
                {timestamps && (
                  <span className="shrink-0 text-muted-foreground/60">
                    {formatTimestampFull(entry.timestamp)}
                  </span>
                )}
                <span
                  className={cn(
                    "w-[3ch] shrink-0 text-right font-semibold",
                    colors.text
                  )}
                >
                  {LEVEL_LABELS[entry.level]}
                </span>
                <span className="min-w-0 flex-1 whitespace-pre-wrap break-all text-foreground/90">
                  {highlightSearch(entry.message, searchQuery)}
                </span>
              </div>
            )
          })
        )}
      </div>

      {/* Scroll-to-bottom indicator */}
      {!isAtBottom && (
        <button
          type="button"
          onClick={scrollToBottom}
          className="flex w-full items-center justify-center gap-1.5 border-t border-border/40 bg-muted/30 py-1.5 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
          aria-label="Scroll to latest"
        >
          <ArrowDown className="size-3" />
          New logs below
        </button>
      )}
    </div>
  )
}

// LogViewerMinimal

interface LogViewerMinimalProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Log entries to display. */
  entries: LogEntry[]
  /** Maximum visible height in pixels. @default 300 */
  maxHeight?: number
  /** Show timestamps. @default false */
  timestamps?: boolean
  /** Enable auto-scroll to bottom on new entries. @default true */
  autoScroll?: boolean
  /** Custom colors per log level. Merges with defaults — only override what you need. */
  colorScale?: LevelColorScale
}

function LogViewerMinimal({
  entries,
  maxHeight = 300,
  timestamps = false,
  autoScroll = true,
  colorScale,
  className,
  ...props
}: LogViewerMinimalProps) {
  const { scrollRef, isAtBottom, handleScroll, scrollToBottom } = useAutoScroll(
    entries,
    autoScroll
  )

  return (
    <div
      data-slot="log-viewer-minimal"
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border border-border/60 bg-card shadow-sm",
        className
      )}
      {...props}
    >
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="overflow-auto font-mono text-xs leading-relaxed [scrollbar-width:thin]"
        style={{ maxHeight }}
        role="log"
        aria-live="polite"
        aria-label="Log output"
      >
        {entries.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
            No log entries.
          </div>
        ) : (
          entries.map((entry, i) => {
            const colors = resolveLevelColors(entry.level, colorScale)
            return (
              <div
                key={i}
                className="flex items-start gap-2 border-b border-border/20 px-3 py-1.5"
              >
                <Circle
                  className={cn("mt-[3px] size-2 shrink-0 fill-current", colors.text)}
                  aria-label={entry.level}
                />
                {timestamps && (
                  <span className="shrink-0 text-muted-foreground/60">
                    {formatTimestamp(entry.timestamp)}
                  </span>
                )}
                <span className="min-w-0 flex-1 whitespace-pre-wrap break-all text-foreground/90">
                  {entry.message}
                </span>
              </div>
            )
          })
        )}
      </div>

      {!isAtBottom && (
        <button
          type="button"
          onClick={scrollToBottom}
          className="flex w-full items-center justify-center gap-1.5 border-t border-border/40 bg-muted/20 py-1 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
          aria-label="Scroll to latest"
        >
          <ArrowDown className="size-3" />
        </button>
      )}
    </div>
  )
}

// LogViewerFilterable

interface LogViewerFilterableProps extends Omit<React.ComponentProps<"div">, "children" | "title"> {
  /** Log entries to display. */
  entries: LogEntry[]
  /** Title shown in the header. @default "Logs" */
  title?: string
  /** Maximum visible height in pixels. @default 400 */
  maxHeight?: number
  /** Show timestamps. @default true */
  timestamps?: boolean
  /** Enable auto-scroll to bottom on new entries. @default true */
  autoScroll?: boolean
  /** Levels shown in the filter bar. @default ["error", "warn", "info", "debug"] */
  levels?: LogLevel[]
  /** Custom colors per log level. Merges with defaults — only override what you need. */
  colorScale?: LevelColorScale
  /** Called when the user clicks "Clear". When provided, a clear button appears. */
  onClear?: () => void
}

function LogViewerFilterable({
  entries,
  title = "Logs",
  maxHeight = 400,
  timestamps = true,
  autoScroll = true,
  levels = ["error", "warn", "info", "debug"],
  colorScale,
  onClear,
  className,
  ...props
}: LogViewerFilterableProps) {
  const [activeLevels, setActiveLevels] = React.useState<Set<LogLevel>>(
    () => new Set(levels)
  )
  const [searchQuery, setSearchQuery] = React.useState("")
  const { copied, copy } = useCopy()
  const { scrollRef, isAtBottom, handleScroll, scrollToBottom } = useAutoScroll(
    entries,
    autoScroll
  )

  function toggleLevel(level: LogLevel) {
    setActiveLevels((prev) => {
      const next = new Set(prev)
      if (next.has(level)) {
        next.delete(level)
      } else {
        next.add(level)
      }
      return next
    })
  }

  const filteredEntries = entries.filter((e) => {
    if (!activeLevels.has(e.level)) return false
    if (searchQuery && !e.message.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const levelCounts = React.useMemo(() => {
    const counts: Partial<Record<LogLevel, number>> = {}
    for (const entry of entries) {
      counts[entry.level] = (counts[entry.level] ?? 0) + 1
    }
    return counts
  }, [entries])

  function handleCopyFiltered() {
    const text = filteredEntries
      .map(
        (e) =>
          `[${formatTimestampFull(e.timestamp)}] [${LEVEL_LABELS[e.level]}] ${e.message}`
      )
      .join("\n")
    copy(text)
  }

  return (
    <div
      data-slot="log-viewer-filterable"
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border/40 bg-muted/30 px-3 py-2">
        <Filter className="size-3.5 shrink-0 text-muted-foreground" />
        <span className="flex-1 truncate text-sm font-medium text-foreground">
          {title}
        </span>

        <span className="mr-1 text-[10px] tabular-nums text-muted-foreground">
          {filteredEntries.length} / {entries.length}
        </span>

        <div className="flex items-center gap-0.5">
          <ToolbarButton
            onClick={handleCopyFiltered}
            label={copied ? "Copied" : "Copy filtered logs"}
          >
            {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
          </ToolbarButton>

          <ToolbarButton onClick={() => exportLogs(filteredEntries)} label="Download logs">
            <Download className="size-3.5" />
          </ToolbarButton>

          {onClear && (
            <ToolbarButton onClick={onClear} label="Clear logs">
              <Trash2 className="size-3.5" />
            </ToolbarButton>
          )}
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/40 bg-muted/10 px-3 py-2">
        {/* Level toggles */}
        <div className="flex items-center gap-1">
          {levels.map((level) => {
            const colors = resolveLevelColors(level, colorScale)
            const isActive = activeLevels.has(level)
            const count = levelCounts[level] ?? 0
            return (
              <button
                key={level}
                type="button"
                onClick={() => toggleLevel(level)}
                role="checkbox"
                aria-checked={isActive}
                aria-label={`${isActive ? "Hide" : "Show"} ${level} logs`}
                className={cn(
                  "inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-colors outline-none",
                  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                  isActive
                    ? colors.badge
                    : "bg-muted/50 text-muted-foreground/50 line-through"
                )}
              >
                <Circle
                  className={cn(
                    "size-1.5 fill-current",
                    isActive ? colors.text : "text-muted-foreground/30"
                  )}
                />
                {LEVEL_LABELS[level]}
                {count > 0 && (
                  <span className="tabular-nums">{count}</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Inline search */}
        <div className="ml-auto flex items-center gap-1.5 rounded-md border border-border/40 bg-background px-2 py-1">
          <Search className="size-3 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter…"
            className="w-24 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none sm:w-32"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="inline-flex size-4 items-center justify-center rounded text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="size-3" />
            </button>
          )}
        </div>
      </div>

      {/* Log output */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="overflow-auto font-mono text-xs leading-relaxed [scrollbar-width:thin]"
        style={{ maxHeight }}
        role="log"
        aria-live="polite"
        aria-label={title}
      >
        {filteredEntries.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-1 py-10 text-sm text-muted-foreground">
            <span>No matching log entries.</span>
            {(searchQuery || activeLevels.size < levels.length) && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("")
                  setActiveLevels(new Set(levels))
                }}
                className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
              >
                Reset filters
              </button>
            )}
          </div>
        ) : (
          filteredEntries.map((entry, i) => {
            const colors = resolveLevelColors(entry.level, colorScale)
            return (
              <div
                key={i}
                className="flex items-start gap-3 border-b border-border/20 px-3 py-1.5 transition-colors hover:bg-muted/30"
              >
                <Circle
                  className={cn("mt-[5px] size-2 shrink-0 fill-current", colors.text)}
                  aria-hidden="true"
                />
                {timestamps && (
                  <span className="shrink-0 text-muted-foreground/60">
                    {formatTimestamp(entry.timestamp)}
                  </span>
                )}
                <span
                  className={cn(
                    "w-[3ch] shrink-0 text-right font-semibold",
                    colors.text
                  )}
                >
                  {LEVEL_LABELS[entry.level]}
                </span>
                <span className="min-w-0 flex-1 whitespace-pre-wrap break-all text-foreground/90">
                  {highlightSearch(entry.message, searchQuery)}
                </span>
              </div>
            )
          })
        )}
      </div>

      {/* Scroll-to-bottom indicator */}
      {!isAtBottom && (
        <button
          type="button"
          onClick={scrollToBottom}
          className="flex w-full items-center justify-center gap-1.5 border-t border-border/40 bg-muted/30 py-1.5 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
          aria-label="Scroll to latest"
        >
          <ArrowDown className="size-3" />
          New logs below
        </button>
      )}
    </div>
  )
}

// Exports

export {
  LogViewerTerminal,
  LogViewerMinimal,
  LogViewerFilterable,
  DEFAULT_LEVEL_COLORS,
  LEVEL_LABELS,
  type LogViewerTerminalProps,
  type LogViewerMinimalProps,
  type LogViewerFilterableProps,
}
