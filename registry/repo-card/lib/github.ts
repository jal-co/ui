/**
 * jalco-ui
 * lib/github (repo-card)
 * by Justin Levine
 * ui.justinlevine.me
 *
 * GitHub API client for fetching repository metadata including description,
 * language, topics, and license for the repo card component.
 */

export interface GitHubRepoData {
  /** Display name in `owner/repo` format. */
  fullName: string
  /** Repository description. */
  description: string | null
  /** Primary programming language (e.g. "TypeScript"). */
  language: string | null
  /** Language color hex from GitHub (e.g. "#3178c6"). */
  languageColor: string | null
  /** Number of stars. */
  stars: number
  /** Number of forks. */
  forks: number
  /** Number of open issues. */
  openIssues: number
  /** SPDX license identifier (e.g. "MIT"). */
  license: string | null
  /** Topic tags. */
  topics: string[]
  /** ISO date of last push. */
  updatedAt: string | null
  /** Whether the repo is a fork. */
  isFork: boolean
  /** Whether the repo is archived. */
  isArchived: boolean
  /** Homepage URL. */
  homepage: string | null
}

/**
 * GitHub language colors for common languages.
 * Fallback when the API doesn't provide a color.
 */
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  "C#": "#178600",
  "C++": "#f34b7d",
  C: "#555555",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Elixir: "#6e4a7e",
  Zig: "#ec915c",
  Haskell: "#5e5086",
  Lua: "#000080",
  Scala: "#c22d40",
  R: "#198CE7",
  Julia: "#a270ba",
  Nix: "#7e7eff",
  OCaml: "#3be133",
  MDX: "#fcb32c",
}

/**
 * Get the display color for a programming language.
 */
export function getLanguageColor(language: string): string {
  return LANGUAGE_COLORS[language] ?? "#8b8b8b"
}

/**
 * Fetch extended metadata for a GitHub repository.
 *
 * - Uses the public GitHub REST API — no API key required.
 * - Optionally authenticates with `process.env.GITHUB_TOKEN`.
 * - Caches the result for 1 hour via Next.js ISR.
 *
 * Returns `null` if the request fails or the repo doesn't exist.
 */
export async function fetchGitHubRepoData(
  owner: string,
  repo: string
): Promise<GitHubRepoData | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
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

    if (typeof data.full_name !== "string") return null

    return {
      fullName: data.full_name,
      description: data.description ?? null,
      language: data.language ?? null,
      languageColor: data.language ? getLanguageColor(data.language) : null,
      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
      openIssues: data.open_issues_count ?? 0,
      license: data.license?.spdx_id ?? null,
      topics: Array.isArray(data.topics) ? data.topics : [],
      updatedAt: data.pushed_at ?? null,
      isFork: data.fork ?? false,
      isArchived: data.archived ?? false,
      homepage: data.homepage || null,
    }
  } catch {
    return null
  }
}

/**
 * Format a number for compact display.
 */
export function formatCount(count: number): string {
  if (count >= 1_000_000) {
    const value = count / 1_000_000
    return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)}m`
  }
  if (count >= 1_000) {
    const value = count / 1_000
    return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)}k`
  }
  return count.toLocaleString("en-US")
}

/**
 * Format a relative time from an ISO date string.
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
