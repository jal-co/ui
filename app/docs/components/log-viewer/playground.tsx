"use client"

import * as React from "react"
import {
  LogViewerTerminal,
  LogViewerMinimal,
  LogViewerFilterable,
  type LogEntry,
  type LogLevel,
} from "@/registry/log-viewer/log-viewer"

/* ------------------------------------------------------------------ */
/*  Streaming simulator                                               */
/* ------------------------------------------------------------------ */

const STREAM_MESSAGES: { level: LogLevel; message: string }[] = [
  { level: "info", message: "Incoming request: GET /api/users" },
  { level: "debug", message: "Auth middleware — validating token" },
  { level: "debug", message: "Token verified for user:4821" },
  { level: "info", message: "Query: SELECT * FROM users WHERE org_id = $1" },
  { level: "info", message: "Response 200 in 14ms (3 rows)" },
  { level: "info", message: "Incoming request: POST /api/webhooks" },
  { level: "debug", message: "Parsing JSON body (content-length: 2048)" },
  { level: "warn", message: "Webhook signature verification slow (340ms)" },
  { level: "info", message: "Webhook processed: invoice.paid" },
  { level: "info", message: "Incoming request: GET /api/health" },
  { level: "info", message: "Health check OK — all services green" },
  { level: "error", message: "ECONNRESET: Connection to cache lost" },
  { level: "warn", message: "Falling back to database for session lookup" },
  { level: "info", message: "Cache reconnected after 1.2s" },
  { level: "debug", message: "Cache warmed: 24 keys restored" },
  { level: "info", message: "Incoming request: PUT /api/users/4821" },
  { level: "info", message: "User updated successfully" },
  { level: "verbose", message: "GC pause: 1.8ms" },
  { level: "verbose", message: "Event loop lag: 0.2ms" },
  { level: "info", message: "Background job completed: report.generate" },
]

function useStreamingLogs(baseEntries: LogEntry[]) {
  const [entries, setEntries] = React.useState<LogEntry[]>(baseEntries)
  const [streaming, setStreaming] = React.useState(false)
  const indexRef = React.useRef(0)
  const intervalRef = React.useRef<ReturnType<typeof setInterval>>(null)

  function start() {
    if (streaming) return
    setStreaming(true)
    intervalRef.current = setInterval(() => {
      const msg = STREAM_MESSAGES[indexRef.current % STREAM_MESSAGES.length]
      indexRef.current++
      setEntries((prev) => [
        ...prev,
        {
          level: msg.level,
          message: msg.message,
          timestamp: new Date().toISOString(),
        },
      ])
    }, 600 + Math.random() * 800)
  }

  function stop() {
    setStreaming(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  function clear() {
    setEntries([])
    indexRef.current = 0
  }

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return { entries, streaming, start, stop, clear }
}

/* ------------------------------------------------------------------ */
/*  Live Demo                                                         */
/* ------------------------------------------------------------------ */

export function LogViewerPlayground({
  sampleData,
}: {
  sampleData: LogEntry[]
}) {
  const [variant, setVariant] = React.useState<
    "terminal" | "minimal" | "filterable"
  >("terminal")
  const { entries, streaming, start, stop, clear } =
    useStreamingLogs(sampleData)

  return (
    <div className="flex flex-col gap-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Variant selector */}
        <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-muted/30 p-0.5">
          {(["terminal", "minimal", "filterable"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVariant(v)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                variant === v
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={streaming ? stop : start}
            className={`inline-flex h-8 items-center gap-1.5 rounded-md border px-3 text-xs font-medium transition-colors ${
              streaming
                ? "border-rose-500/30 bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 dark:text-rose-400"
                : "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 dark:text-emerald-400"
            }`}
          >
            <span
              className={`size-1.5 rounded-full ${
                streaming
                  ? "animate-pulse bg-rose-500"
                  : "bg-emerald-500"
              }`}
            />
            {streaming ? "Stop streaming" : "Start streaming"}
          </button>
        </div>
      </div>

      {/* Viewer */}
      {variant === "terminal" && (
        <LogViewerTerminal
          entries={entries}
          title="Application Logs"
          maxHeight={360}
          onClear={clear}
        />
      )}
      {variant === "minimal" && (
        <LogViewerMinimal entries={entries} maxHeight={360} timestamps />
      )}
      {variant === "filterable" && (
        <LogViewerFilterable
          entries={entries}
          title="Application Logs"
          maxHeight={360}
          levels={["error", "warn", "info", "debug", "verbose"]}
          onClear={clear}
        />
      )}
    </div>
  )
}
