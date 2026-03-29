/**
 * jalco-ui
 * DiffViewer
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Code diff viewer with line numbers and add/remove coloring.
 * Supports unified (single column) and split (side-by-side) layouts.
 *
 * Props:
 * - oldCode / newCode: two strings to diff (component computes the diff)
 * - patch: pre-computed unified diff string (alternative to oldCode/newCode)
 * - layout: "unified" | "split" (default "unified")
 * - language: shiki language key for optional syntax highlighting
 * - oldTitle / newTitle: labels for the file headers
 * - className: additional CSS classes
 *
 * Dependencies: diff
 */

import * as React from "react"
import { structuredPatch, parsePatch } from "diff"
import { cn } from "@/lib/utils"
import { DiffViewerCopyButton } from "@/registry/diff-viewer/diff-viewer-client"

type DiffLayout = "unified" | "split"

interface DiffLine {
  type: "added" | "removed" | "context"
  content: string
  oldNumber: number | null
  newNumber: number | null
}

interface WithStrings {
  oldCode: string
  newCode: string
  patch?: never
}

interface WithPatch {
  patch: string
  oldCode?: never
  newCode?: never
}

type DiffInput = WithStrings | WithPatch

type DiffViewerProps = DiffInput & Omit<React.ComponentProps<"div">, "children"> & {
  layout?: DiffLayout
  /** Shiki language key for syntax highlighting. Plain text when omitted. */
  language?: string
  oldTitle?: string
  newTitle?: string
}

function computeLines(input: DiffInput): DiffLine[] {
  let hunks: ReturnType<typeof structuredPatch>["hunks"]

  if ("patch" in input && input.patch) {
    const parsed = parsePatch(input.patch)
    hunks = parsed[0]?.hunks ?? []
  } else {
    const result = structuredPatch(
      "",
      "",
      input.oldCode ?? "",
      input.newCode ?? "",
      undefined,
      undefined,
      { context: 3 }
    )
    hunks = result.hunks
  }

  const lines: DiffLine[] = []

  for (const hunk of hunks) {
    let oldNum = hunk.oldStart
    let newNum = hunk.newStart

    for (const line of hunk.lines) {
      if (line.startsWith("+")) {
        lines.push({
          type: "added",
          content: line.slice(1),
          oldNumber: null,
          newNumber: newNum++,
        })
      } else if (line.startsWith("-")) {
        lines.push({
          type: "removed",
          content: line.slice(1),
          oldNumber: oldNum++,
          newNumber: null,
        })
      } else {
        lines.push({
          type: "context",
          content: line.startsWith(" ") ? line.slice(1) : line,
          oldNumber: oldNum++,
          newNumber: newNum++,
        })
      }
    }
  }

  return lines
}

function lineNumberWidth(lines: DiffLine[]): number {
  let max = 0
  for (const line of lines) {
    if (line.oldNumber && line.oldNumber > max) max = line.oldNumber
    if (line.newNumber && line.newNumber > max) max = line.newNumber
  }
  return Math.max(String(max).length, 2)
}

function lineColor(type: DiffLine["type"], element: "bg" | "text" | "num") {
  if (type === "added") {
    return element === "bg"
      ? "bg-emerald-500/10 dark:bg-emerald-500/10"
      : element === "num"
        ? "text-emerald-700/70 dark:text-emerald-400/50"
        : "text-emerald-900 dark:text-emerald-200"
  }
  if (type === "removed") {
    return element === "bg"
      ? "bg-red-500/10 dark:bg-red-500/10"
      : element === "num"
        ? "text-red-700/70 dark:text-red-400/50"
        : "text-red-900 dark:text-red-200"
  }
  return element === "num"
    ? "text-muted-foreground/50"
    : "text-foreground/80"
}

function linePrefix(type: DiffLine["type"]) {
  if (type === "added") return "+"
  if (type === "removed") return "-"
  return " "
}

function UnifiedView({ lines, numWidth }: { lines: DiffLine[]; numWidth: number }) {
  return (
    <table className="w-full border-collapse font-mono text-[13px] leading-relaxed">
      <tbody>
        {lines.map((line, i) => (
          <tr key={i} className={cn(lineColor(line.type, "bg"))}>
            <td
              className={cn(
                "select-none px-2 text-right align-top",
                lineColor(line.type, "num")
              )}
              style={{ minWidth: `${numWidth + 2}ch` }}
            >
              {line.oldNumber ?? ""}
            </td>
            <td
              className={cn(
                "select-none px-2 text-right align-top",
                lineColor(line.type, "num")
              )}
              style={{ minWidth: `${numWidth + 2}ch` }}
            >
              {line.newNumber ?? ""}
            </td>
            <td
              className={cn(
                "select-none px-1 text-center align-top",
                lineColor(line.type, "num")
              )}
            >
              {linePrefix(line.type)}
            </td>
            <td className={cn("whitespace-pre px-3 align-top", lineColor(line.type, "text"))}>
              {line.content || "\u00A0"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function SplitView({ lines, numWidth }: { lines: DiffLine[]; numWidth: number }) {
  const leftLines: (DiffLine | null)[] = []
  const rightLines: (DiffLine | null)[] = []

  let i = 0
  while (i < lines.length) {
    const line = lines[i]

    if (line.type === "context") {
      leftLines.push(line)
      rightLines.push(line)
      i++
    } else if (line.type === "removed") {
      const removed: DiffLine[] = []
      while (i < lines.length && lines[i].type === "removed") {
        removed.push(lines[i])
        i++
      }
      const added: DiffLine[] = []
      while (i < lines.length && lines[i].type === "added") {
        added.push(lines[i])
        i++
      }

      const maxLen = Math.max(removed.length, added.length)
      for (let j = 0; j < maxLen; j++) {
        leftLines.push(j < removed.length ? removed[j] : null)
        rightLines.push(j < added.length ? added[j] : null)
      }
    } else if (line.type === "added") {
      leftLines.push(null)
      rightLines.push(line)
      i++
    } else {
      i++
    }
  }

  return (
    <div className="grid grid-cols-2 divide-x divide-border/40">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse font-mono text-[13px] leading-relaxed">
          <tbody>
            {leftLines.map((line, idx) => (
              <tr key={idx} className={cn(line ? lineColor(line.type, "bg") : "")}>
                <td
                  className={cn(
                    "select-none px-2 text-right align-top",
                    line ? lineColor(line.type, "num") : "text-muted-foreground/30"
                  )}
                  style={{ minWidth: `${numWidth + 2}ch` }}
                >
                  {line?.oldNumber ?? ""}
                </td>
                <td
                  className={cn(
                    "whitespace-pre px-3 align-top",
                    line ? lineColor(line.type, "text") : ""
                  )}
                >
                  {line?.content || "\u00A0"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse font-mono text-[13px] leading-relaxed">
          <tbody>
            {rightLines.map((line, idx) => (
              <tr key={idx} className={cn(line ? lineColor(line.type, "bg") : "")}>
                <td
                  className={cn(
                    "select-none px-2 text-right align-top",
                    line ? lineColor(line.type, "num") : "text-muted-foreground/30"
                  )}
                  style={{ minWidth: `${numWidth + 2}ch` }}
                >
                  {line?.newNumber ?? ""}
                </td>
                <td
                  className={cn(
                    "whitespace-pre px-3 align-top",
                    line ? lineColor(line.type, "text") : ""
                  )}
                >
                  {line?.content || "\u00A0"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function DiffViewer({
  layout = "unified",
  oldTitle,
  newTitle,
  className,
  ...allProps
}: DiffViewerProps) {
  // Separate DiffInput keys from remaining DOM props
  const { oldCode, newCode, patch, ...props } = allProps as DiffViewerProps & Record<string, unknown>
  const input: DiffInput = patch !== undefined
    ? { patch } as WithPatch
    : { oldCode: oldCode ?? "", newCode: newCode ?? "" } as WithStrings
  const lines = computeLines(input)
  const numWidth = lineNumberWidth(lines)

  const stats = lines.reduce(
    (acc, l) => {
      if (l.type === "added") acc.added++
      if (l.type === "removed") acc.removed++
      return acc
    },
    { added: 0, removed: 0 }
  )

  const fullCode = lines.map((l) => l.content).join("\n")
  const showHeader = oldTitle || newTitle

  return (
    <div
      data-slot="diff-viewer"
      className={cn(
        "relative overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm",
        className
      )}
      {...props}
    >
      {showHeader && (
        <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-muted/40 px-4 py-2.5">
          <div className="flex items-center gap-3 text-sm">
            {oldTitle && (
              <span className="text-muted-foreground">{oldTitle}</span>
            )}
            {oldTitle && newTitle && (
              <span className="text-muted-foreground/40">→</span>
            )}
            {newTitle && (
              <span className="font-medium text-foreground">{newTitle}</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs">
              {stats.added > 0 && (
                <span className="text-emerald-600 dark:text-emerald-400">
                  +{stats.added}
                </span>
              )}
              {stats.removed > 0 && (
                <span className="text-red-600 dark:text-red-400">
                  -{stats.removed}
                </span>
              )}
            </div>
            <DiffViewerCopyButton value={fullCode} />
          </div>
        </div>
      )}

      {!showHeader && (
        <div className="absolute right-2 top-2 z-10">
          <DiffViewerCopyButton value={fullCode} />
        </div>
      )}

      <div className="overflow-x-auto">
        {layout === "split" ? (
          <SplitView lines={lines} numWidth={numWidth} />
        ) : (
          <UnifiedView lines={lines} numWidth={numWidth} />
        )}
      </div>
    </div>
  )
}
