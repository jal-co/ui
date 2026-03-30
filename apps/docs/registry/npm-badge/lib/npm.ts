/**
 * jalco-ui
 * lib/npm
 * by Justin Levine
 * ui.justinlevine.me
 *
 * npm registry client for fetching package metadata (version, downloads, license, types, publish date).
 */

export interface NpmPackageData {
  /** Package name as published on npm. */
  name: string
  /** Latest version string (e.g. "19.2.0"). */
  version: string
  /** Package description from package.json. */
  description: string | null
  /** SPDX license identifier (e.g. "MIT"). */
  license: string | null
  /** Weekly download count from the npm downloads API. */
  weeklyDownloads: number | null
  /** ISO date string of the latest publish. */
  lastPublish: string | null
  /** Homepage URL from package.json. */
  homepage: string | null
}

/**
 * Fetch public metadata for an npm package.
 *
 * Combines data from:
 * - `registry.npmjs.org/<pkg>/latest` (~1-2 KB, version, license, description, homepage, publish timestamp)
 * - `api.npmjs.org` (~100 B, weekly downloads)
 *
 * Caches results for 1 hour via Next.js ISR. No API key required.
 * Returns `null` if the package doesn't exist or the request fails.
 */
export async function fetchNpmPackage(
  packageName: string
): Promise<NpmPackageData | null> {
  const encoded = encodeURIComponent(packageName)

  try {
    const [latestRes, downloadsRes] = await Promise.all([
      fetch(`https://registry.npmjs.org/${encoded}/latest`, {
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.npmjs.org/downloads/point/last-week/${encoded}`,
        { next: { revalidate: 3600 } }
      ),
    ])

    if (!latestRes.ok) return null
    const reg = await latestRes.json()

    if (typeof reg.name !== "string" || typeof reg.version !== "string") {
      return null
    }

    const downloads = downloadsRes.ok ? await downloadsRes.json() : null

    // Extract publish timestamp from the internal npm field.
    // The tmp string contains an epoch-ms timestamp after the package id.
    let lastPublish: string | null = null
    const tmp = reg._npmOperationalInternal?.tmp
    if (typeof tmp === "string") {
      const match = tmp.match(/_(\d{13})_/)
      if (match) {
        lastPublish = new Date(Number(match[1])).toISOString()
      }
    }

    const license =
      typeof reg.license === "string"
        ? reg.license
        : typeof reg.license === "object" && reg.license?.type
          ? reg.license.type
          : null

    return {
      name: reg.name,
      version: reg.version,
      description: reg.description ?? null,
      license,
      weeklyDownloads:
        typeof downloads?.downloads === "number"
          ? downloads.downloads
          : null,
      lastPublish,
      homepage: reg.homepage ?? null,
    }
  } catch {
    return null
  }
}

/**
 * Format a download count for compact display.
 *
 * - `75800000` → `"75.8M"`
 * - `1500000` → `"1.5M"`
 * - `236000` → `"236K"`
 * - `1500` → `"1.5K"`
 * - `842` → `"842"`
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
