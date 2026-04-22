/**
 * jalco-ui
 * lib/github (activity-graph)
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Fetches GitHub contribution data via the github-contributions-api
 * by Jonathan Gruber (@grubersjoe). No API key or authentication required.
 *
 * Attribution: https://github.com/grubersjoe/github-contributions-api
 */

import type { ActivityEntry } from "@/registry/activity-graph/activity-graph"

export interface GitHubContributions {
  /** Total contributions in the period. */
  total: number
  /** Per-day contribution entries. */
  entries: ActivityEntry[]
}

interface ApiContribution {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface ApiResponse {
  total: Record<string, number>
  contributions: ApiContribution[]
}

/**
 * Fetch contribution data for a GitHub user.
 *
 * Uses the github-contributions-api which returns structured JSON
 * with per-day counts and intensity levels.
 *
 * - No GitHub API key required.
 * - API results are cached upstream for 1 hour.
 * - Caches locally for 1 hour via Next.js ISR (`next.revalidate`).
 * - Returns `null` if the request fails or produces no data.
 */
export async function fetchGitHubContributions(
  username: string
): Promise<GitHubContributions | null> {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "jalco-ui/1.0",
        },
        next: { revalidate: 3600 },
      }
    )

    if (!response.ok) return null

    const data: ApiResponse = await response.json()

    const entries: ActivityEntry[] = data.contributions
      .filter((c) => c.count > 0)
      .map((c) => ({ date: c.date, count: c.count }))

    const total = Object.values(data.total).reduce((sum, n) => sum + n, 0)

    if (entries.length === 0 && total === 0) return null

    return { total, entries }
  } catch {
    return null
  }
}
