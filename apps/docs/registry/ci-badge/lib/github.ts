/**
 * jalco-ui
 * lib/github
 * by Justin Levine
 * ui.justinlevine.me
 *
 * GitHub Actions API client for fetching workflow run status.
 */

export type CIStatus =
  | "success"
  | "failure"
  | "pending"
  | "cancelled"
  | "skipped"

export interface CIStatusData {
  /** Workflow name (e.g. "CI", "Deploy"). */
  workflowName: string
  /** Current status of the latest run. */
  status: CIStatus
  /** HTML URL to the workflow run on GitHub. */
  url: string
  /** Branch the run was triggered on. */
  branch: string
  /** ISO date string of when the run started. */
  startedAt: string | null
  /** Duration in seconds (if completed). */
  durationSeconds: number | null
}

/**
 * Fetch the latest workflow run status for a GitHub repository.
 *
 * - Uses the public GitHub REST API.
 * - Optionally authenticates with `process.env.GITHUB_TOKEN` to raise
 *   the rate limit from 60 → 5,000 requests per hour.
 * - Caches the result for 10 minutes via Next.js ISR.
 *
 * @param owner - GitHub username or organization
 * @param repo - GitHub repository name
 * @param workflow - Workflow filename (e.g. "ci.yml") or workflow ID
 * @param branch - Branch to filter runs by (defaults to repo default branch)
 *
 * Returns `null` if the request fails or no runs are found.
 */
export async function fetchCIStatus(
  owner: string,
  repo: string,
  workflow?: string,
  branch?: string
): Promise<CIStatusData | null> {
  try {
    const params = new URLSearchParams({ per_page: "1" })
    if (branch) params.set("branch", branch)

    const workflowPath = workflow
      ? `/workflows/${encodeURIComponent(workflow)}`
      : ""

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/actions${workflowPath}/runs?${params}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        next: { revalidate: 600 },
      }
    )
    if (!response.ok) return null
    const data = await response.json()

    const run = data.workflow_runs?.[0]
    if (!run) return null

    const status = mapStatus(run.status, run.conclusion)

    let durationSeconds: number | null = null
    if (run.run_started_at && run.updated_at) {
      const start = new Date(run.run_started_at).getTime()
      const end = new Date(run.updated_at).getTime()
      if (end > start) {
        durationSeconds = Math.round((end - start) / 1000)
      }
    }

    return {
      workflowName: run.name ?? "CI",
      status,
      url: run.html_url,
      branch: run.head_branch ?? branch ?? "main",
      startedAt: run.run_started_at ?? null,
      durationSeconds,
    }
  } catch {
    return null
  }
}

function mapStatus(
  status: string,
  conclusion: string | null
): CIStatus {
  if (status === "completed") {
    if (conclusion === "success") return "success"
    if (conclusion === "failure") return "failure"
    if (conclusion === "cancelled") return "cancelled"
    if (conclusion === "skipped") return "skipped"
    return "failure"
  }
  return "pending"
}

/**
 * Format a duration in seconds into a human-readable label.
 *
 * - `45` → "45s"
 * - `125` → "2m 5s"
 * - `3661` → "1h 1m"
 */
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  if (mins < 60) {
    return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`
  }
  const hrs = Math.floor(mins / 60)
  const remainMins = mins % 60
  return remainMins > 0 ? `${hrs}h ${remainMins}m` : `${hrs}h`
}

/**
 * Format an ISO date into a relative label.
 */
export function formatRelativeDate(iso: string): string {
  const date = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / 86_400_000)

  if (diffDays === 0) {
    const diffHrs = Math.floor(diffMs / 3_600_000)
    if (diffHrs === 0) {
      const diffMins = Math.floor(diffMs / 60_000)
      return diffMins <= 1 ? "just now" : `${diffMins}m ago`
    }
    return `${diffHrs}h ago`
  }
  if (diffDays === 1) return "yesterday"
  if (diffDays < 30) return `${diffDays}d ago`
  const months = Math.floor(diffDays / 30)
  if (months < 12) return `${months}mo ago`
  const years = Math.floor(diffDays / 365)
  return `${years}y ago`
}
