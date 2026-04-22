/**
 * jalco-ui
 * lib/github
 * by Justin Levine
 * ui.justinlevine.me
 *
 * GitHub API client for fetching latest release metadata (tag, date, pre-release, notes).
 */

export interface GitHubReleaseData {
  /** Tag name (e.g. "v1.2.0", "2026.04.0"). */
  tag: string
  /** Release title (e.g. "Batch 1"). */
  name: string | null
  /** Whether this is marked as a pre-release. */
  preRelease: boolean
  /** Whether this is a draft release. */
  draft: boolean
  /** ISO date string of the release publish date. */
  publishedAt: string
  /** HTML URL to the release page on GitHub. */
  url: string
  /** Release body / notes (markdown). */
  body: string | null
  /** Number of release assets (downloadable files). */
  assetCount: number
}

/**
 * Fetch the latest release for a GitHub repository.
 *
 * - Uses the public GitHub REST API — no API key required.
 * - Optionally authenticates with `process.env.GITHUB_TOKEN` to raise
 *   the rate limit from 60 → 5,000 requests per hour.
 * - Caches the result for 1 hour via Next.js ISR (`next.revalidate`).
 *
 * Returns `null` if the request fails or the repo has no releases.
 */
export async function fetchLatestRelease(
  owner: string,
  repo: string
): Promise<GitHubReleaseData | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases/latest`,
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

    if (typeof data.tag_name !== "string") return null

    return {
      tag: data.tag_name,
      name: data.name ?? null,
      preRelease: data.prerelease === true,
      draft: data.draft === true,
      publishedAt: data.published_at,
      url: data.html_url,
      body: data.body ?? null,
      assetCount: Array.isArray(data.assets) ? data.assets.length : 0,
    }
  } catch {
    return null
  }
}

/**
 * Format an ISO date into a relative or short label.
 *
 * - Same day → "today"
 * - Yesterday → "yesterday"
 * - Within 30 days → "Xd ago"
 * - Within 12 months → "Xmo ago"
 * - Older → "Xy ago"
 */
export function formatRelativeDate(iso: string): string {
  const date = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / 86_400_000)

  if (diffDays === 0) return "today"
  if (diffDays === 1) return "yesterday"
  if (diffDays < 30) return `${diffDays}d ago`
  const months = Math.floor(diffDays / 30)
  if (months < 12) return `${months}mo ago`
  const years = Math.floor(diffDays / 365)
  return `${years}y ago`
}
