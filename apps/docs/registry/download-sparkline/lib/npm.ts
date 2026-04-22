/**
 * jalco-ui
 * lib/npm
 * by Justin Levine
 * ui.justinlevine.me
 *
 * npm API client for fetching download time-series data for sparkline rendering.
 */

export interface NpmDownloadPoint {
  /** ISO date string (YYYY-MM-DD). */
  day: string
  /** Download count for this day. */
  downloads: number
}

export type NpmDownloadRange = "last-week" | "last-month" | "last-year"

/**
 * Fetch daily download counts for an npm package over a given range.
 *
 * Uses the npm downloads API:
 * - `api.npmjs.org/downloads/range/<period>/<package>`
 * - No API key required.
 * - Caches the result for 1 hour via Next.js ISR.
 *
 * Returns an empty array if the request fails or the package doesn't exist.
 */
export async function fetchNpmDownloads(
  packageName: string,
  range: NpmDownloadRange = "last-month"
): Promise<NpmDownloadPoint[]> {
  const encoded = encodeURIComponent(packageName)

  try {
    const response = await fetch(
      `https://api.npmjs.org/downloads/range/${range}/${encoded}`,
      { next: { revalidate: 3600 } }
    )
    if (!response.ok) return []

    const data = await response.json()
    if (!Array.isArray(data.downloads)) return []

    return data.downloads.map(
      (d: { day: string; downloads: number }) => ({
        day: d.day,
        downloads: d.downloads,
      })
    )
  } catch {
    return []
  }
}

/**
 * Format a download count for compact display.
 */
export function formatDownloads(count: number): string {
  if (count >= 1_000_000) {
    const value = count / 1_000_000
    return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)}M`
  }
  if (count >= 1_000) {
    const value = count / 1_000
    return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)}K`
  }
  return count.toLocaleString("en-US")
}
