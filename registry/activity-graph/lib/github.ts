/**
 * jalco-ui
 * lib/github (activity-graph)
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Fetches GitHub contribution data from the public contributions page.
 * No API key or authentication required.
 */

import type { ActivityEntry } from "@/registry/activity-graph/activity-graph"

export interface GitHubContributions {
  /** Total contributions in the period. */
  total: number
  /** Per-day contribution entries. */
  entries: ActivityEntry[]
}

/**
 * Fetch contribution data for a GitHub user.
 *
 * Scrapes the public `github.com/users/{username}/contributions` page,
 * which returns an HTML fragment with `data-date`, `data-level`, and
 * tooltip text containing exact counts.
 *
 * - No GitHub API key required.
 * - Caches for 1 hour via Next.js ISR (`next.revalidate`).
 * - Returns `null` if the request fails or parsing produces no data.
 */
export async function fetchGitHubContributions(
  username: string
): Promise<GitHubContributions | null> {
  try {
    const response = await fetch(
      `https://github.com/users/${encodeURIComponent(username)}/contributions`,
      {
        headers: {
          Accept: "text/html",
          "User-Agent": "jalco-ui/1.0",
        },
        next: { revalidate: 3600 },
      }
    )

    if (!response.ok) return null

    const html = await response.text()
    return parseContributionsHtml(html)
  } catch {
    return null
  }
}

const TOOLTIP_PATTERN =
  /for="contribution-day-component-(\d+-\d+)"[^>]*>([^<]+)</g

const CELL_PATTERN =
  /data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="contribution-day-component-(\d+-\d+)"/g

function parseContributionsHtml(
  html: string
): GitHubContributions | null {
  const tooltipCounts = new Map<string, number>()
  let match: RegExpExecArray | null

  while ((match = TOOLTIP_PATTERN.exec(html)) !== null) {
    const id = match[1]
    const text = match[2].trim()
    const countMatch = text.match(/^(\d+)\s+contribution/)
    tooltipCounts.set(id, countMatch ? parseInt(countMatch[1], 10) : 0)
  }

  const entries: ActivityEntry[] = []
  let total = 0

  while ((match = CELL_PATTERN.exec(html)) !== null) {
    const date = match[1]
    const id = match[2]
    const count = tooltipCounts.get(id) ?? 0
    if (count > 0) {
      entries.push({ date, count })
    }
    total += count
  }

  if (entries.length === 0 && total === 0) {
    const hasCells = html.includes("data-date=")
    if (!hasCells) return null
  }

  return { total, entries }
}
