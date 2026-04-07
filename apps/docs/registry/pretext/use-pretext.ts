/**
 * jalco-ui
 * usePretext hooks
 * by Justin Levine
 * ui.justinlevine.me
 *
 * React hooks wrapping @chenglou/pretext for DOM-free text measurement.
 * Provides prepare/layout lifecycle management, shrinkwrap search,
 * and line-balanced width computation.
 *
 * Powered by Pretext by Cheng Lou — github.com/chenglou/pretext
 */

"use client"

import * as React from "react"
import type {
  PreparedText,
  PreparedTextWithSegments,
  LayoutResult,
  LayoutLinesResult,
  PrepareOptions,
} from "@chenglou/pretext"

export type { PreparedText, PreparedTextWithSegments, LayoutResult, LayoutLinesResult, PrepareOptions }

const isBrowser = typeof window !== "undefined"

function getPretext() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("@chenglou/pretext") as typeof import("@chenglou/pretext")
}

const EMPTY_LAYOUT: LayoutResult = { lineCount: 0, height: 0 }
const EMPTY_LINES: LayoutLinesResult = { lineCount: 0, height: 0, lines: [] }

/**
 * Prepare text for Pretext measurement. Runs `prepare()` once and caches
 * the result until `text`, `font`, or `options` change.
 *
 * The returned handle is opaque — pass it to `usePretextLayout`.
 */
export function usePretext(
  text: string,
  font: string,
  options?: PrepareOptions,
): PreparedText | null {
  const whiteSpace = options?.whiteSpace ?? "normal"

  return React.useMemo(() => {
    if (!isBrowser) return null
    return getPretext().prepare(text, font, options)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, font, whiteSpace])
}

/**
 * Prepare text with segment data for advanced layout (line-by-line rendering,
 * shrinkwrap, balancing). Same as `usePretext` but returns the richer handle.
 */
export function usePretextWithSegments(
  text: string,
  font: string,
  options?: PrepareOptions,
): PreparedTextWithSegments | null {
  const whiteSpace = options?.whiteSpace ?? "normal"

  return React.useMemo(() => {
    if (!isBrowser) return null
    return getPretext().prepareWithSegments(text, font, options)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, font, whiteSpace])
}

/**
 * Layout prepared text at a given width and line height. Pure arithmetic —
 * no DOM reads. Returns line count and total height.
 *
 * Re-runs on every `maxWidth` or `lineHeight` change (~0.0002ms).
 */
export function usePretextLayout(
  prepared: PreparedText | null,
  maxWidth: number,
  lineHeight: number,
): LayoutResult {
  return React.useMemo(() => {
    if (!prepared) return EMPTY_LAYOUT
    return getPretext().layout(prepared, maxWidth, lineHeight)
  }, [prepared, maxWidth, lineHeight])
}

/**
 * Layout prepared text and return full line data (text, width, cursors).
 * Heavier than `usePretextLayout` — use when you need per-line info
 * for custom rendering.
 */
export function usePretextLines(
  prepared: PreparedTextWithSegments | null,
  maxWidth: number,
  lineHeight: number,
): LayoutLinesResult {
  return React.useMemo(() => {
    if (!prepared) return EMPTY_LINES
    return getPretext().layoutWithLines(prepared, maxWidth, lineHeight)
  }, [prepared, maxWidth, lineHeight])
}

/**
 * Find the tightest width that produces the same line count as `maxWidth`.
 * Binary-searches widths using `walkLineRanges` — no DOM measurement.
 *
 * Returns the shrinkwrapped width in pixels.
 */
export function useShrinkwrap(
  prepared: PreparedTextWithSegments | null,
  maxWidth: number,
): number {
  return React.useMemo(() => {
    if (!prepared || maxWidth <= 0) return 0

    const { walkLineRanges } = getPretext()

    let baseLineCount = 0
    walkLineRanges(prepared, maxWidth, () => { baseLineCount++ })
    if (baseLineCount <= 1) {
      let singleLineWidth = 0
      walkLineRanges(prepared, maxWidth, (line) => { singleLineWidth = line.width })
      return Math.ceil(singleLineWidth) || 0
    }

    let lo = 1
    let hi = Math.ceil(maxWidth)

    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2)
      let midLineCount = 0
      walkLineRanges(prepared, mid, () => { midLineCount++ })

      if (midLineCount <= baseLineCount) {
        hi = mid
      } else {
        lo = mid + 1
      }
    }

    return lo
  }, [prepared, maxWidth])
}

/**
 * Find the width where all lines are roughly equal length (balanced text).
 * Binary-searches for the narrowest width that keeps the same line count
 * as `maxWidth`, then returns that width.
 *
 * CSS `text-wrap: balance` only works up to ~6 lines and is inconsistent
 * cross-browser. This works on any length and is deterministic.
 */
export function useBalancedWidth(
  prepared: PreparedTextWithSegments | null,
  maxWidth: number,
): number {
  return React.useMemo(() => {
    if (!prepared || maxWidth <= 0) return 0

    const { walkLineRanges } = getPretext()

    let baseLineCount = 0
    walkLineRanges(prepared, maxWidth, () => { baseLineCount++ })
    if (baseLineCount <= 1) return maxWidth

    let lo = 1
    let hi = Math.ceil(maxWidth)

    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2)
      let midLineCount = 0
      walkLineRanges(prepared, mid, () => { midLineCount++ })

      if (midLineCount <= baseLineCount) {
        hi = mid
      } else {
        lo = mid + 1
      }
    }

    return lo
  }, [prepared, maxWidth])
}
