/**
 * jalco-ui
 * lib/github (contributor-grid)
 * by Justin Levine
 * ui.justinlevine.me
 *
 * GitHub API client for fetching repository contributors.
 */

export interface GitHubContributor {
  /** GitHub username. */
  login: string
  /** Avatar image URL. */
  avatarUrl: string
  /** Profile URL. */
  profileUrl: string
  /** Number of contributions to the repository. */
  contributions: number
}

/**
 * Fetch contributors for a GitHub repository.
 *
 * - Uses the public GitHub REST API — no API key required.
 * - Optionally authenticates with `process.env.GITHUB_TOKEN` to raise
 *   the rate limit from 60 → 5 000 requests per hour.
 * - Caches the result for 1 hour via Next.js ISR (`next.revalidate`).
 * - Returns up to `max` contributors sorted by contribution count (descending).
 *
 * Returns `null` if the request fails or the repo doesn't exist.
 */
export async function fetchContributors(
  owner: string,
  repo: string,
  max: number = 30
): Promise<GitHubContributor[] | null> {
  try {
    const perPage = Math.min(max, 100)
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=${perPage}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        next: { revalidate: 3600 },
      }
    )
    if (!response.ok) return null
    const data = await response.json()
    if (!Array.isArray(data)) return null

    return data
      .filter(
        (c: Record<string, unknown>) =>
          typeof c.login === "string" && typeof c.contributions === "number"
      )
      .slice(0, max)
      .map((c: Record<string, unknown>) => ({
        login: c.login as string,
        avatarUrl: (c.avatar_url as string) ?? "",
        profileUrl: (c.html_url as string) ?? `https://github.com/${c.login}`,
        contributions: c.contributions as number,
      }))
  } catch {
    return null
  }
}

/**
 * Format a contribution count for compact display.
 */
export function formatCount(count: number): string {
  if (count >= 1_000) {
    const value = count / 1_000
    return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)}k`
  }
  return count.toLocaleString("en-US")
}
