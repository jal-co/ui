/**
 * jalco-ui
 * lib/licenses
 * by Justin Levine
 * ui.justinlevine.me
 *
 * SPDX license metadata and GitHub API client for fetching repository license info.
 */

export interface LicenseInfo {
  /** SPDX identifier (e.g. "MIT", "Apache-2.0"). */
  spdxId: string
  /** Full display name (e.g. "MIT License"). */
  name: string
  /** Short human-readable description. */
  description: string
  /** Whether OSI has approved this license. */
  osiApproved: boolean
  /** Category for grouping / color coding. */
  category: "permissive" | "copyleft" | "weak-copyleft" | "public-domain" | "proprietary" | "other"
  /** URL to the full license text (SPDX or choosealicense.com). */
  url: string
}

const KNOWN_LICENSES: Record<string, LicenseInfo> = {
  MIT: {
    spdxId: "MIT",
    name: "MIT License",
    description: "Short permissive license. Commercial use, modification, and distribution allowed.",
    osiApproved: true,
    category: "permissive",
    url: "https://choosealicense.com/licenses/mit/",
  },
  "Apache-2.0": {
    spdxId: "Apache-2.0",
    name: "Apache License 2.0",
    description: "Permissive license with patent protection. Requires preserved notices.",
    osiApproved: true,
    category: "permissive",
    url: "https://choosealicense.com/licenses/apache-2.0/",
  },
  "GPL-3.0": {
    spdxId: "GPL-3.0",
    name: "GNU GPL v3",
    description: "Strong copyleft. Derivative works must use the same license.",
    osiApproved: true,
    category: "copyleft",
    url: "https://choosealicense.com/licenses/gpl-3.0/",
  },
  "GPL-2.0": {
    spdxId: "GPL-2.0",
    name: "GNU GPL v2",
    description: "Strong copyleft. Derivative works must use the same license.",
    osiApproved: true,
    category: "copyleft",
    url: "https://choosealicense.com/licenses/gpl-2.0/",
  },
  "LGPL-3.0": {
    spdxId: "LGPL-3.0",
    name: "GNU LGPL v3",
    description: "Weak copyleft. Linking from proprietary code is allowed.",
    osiApproved: true,
    category: "weak-copyleft",
    url: "https://choosealicense.com/licenses/lgpl-3.0/",
  },
  "LGPL-2.1": {
    spdxId: "LGPL-2.1",
    name: "GNU LGPL v2.1",
    description: "Weak copyleft. Linking from proprietary code is allowed.",
    osiApproved: true,
    category: "weak-copyleft",
    url: "https://choosealicense.com/licenses/lgpl-2.1/",
  },
  "MPL-2.0": {
    spdxId: "MPL-2.0",
    name: "Mozilla Public License 2.0",
    description: "Weak copyleft. File-level copyleft with proprietary compatibility.",
    osiApproved: true,
    category: "weak-copyleft",
    url: "https://choosealicense.com/licenses/mpl-2.0/",
  },
  "BSD-2-Clause": {
    spdxId: "BSD-2-Clause",
    name: 'BSD 2-Clause "Simplified"',
    description: "Permissive license with minimal restrictions.",
    osiApproved: true,
    category: "permissive",
    url: "https://choosealicense.com/licenses/bsd-2-clause/",
  },
  "BSD-3-Clause": {
    spdxId: "BSD-3-Clause",
    name: 'BSD 3-Clause "New"',
    description: "Permissive license. No endorsement clause added.",
    osiApproved: true,
    category: "permissive",
    url: "https://choosealicense.com/licenses/bsd-3-clause/",
  },
  ISC: {
    spdxId: "ISC",
    name: "ISC License",
    description: "Permissive license functionally equivalent to MIT.",
    osiApproved: true,
    category: "permissive",
    url: "https://choosealicense.com/licenses/isc/",
  },
  "0BSD": {
    spdxId: "0BSD",
    name: "Zero-Clause BSD",
    description: "Public-domain equivalent. No conditions at all.",
    osiApproved: true,
    category: "public-domain",
    url: "https://choosealicense.com/licenses/0bsd/",
  },
  Unlicense: {
    spdxId: "Unlicense",
    name: "The Unlicense",
    description: "Public-domain dedication. No conditions whatsoever.",
    osiApproved: true,
    category: "public-domain",
    url: "https://choosealicense.com/licenses/unlicense/",
  },
  "CC0-1.0": {
    spdxId: "CC0-1.0",
    name: "CC0 1.0 Universal",
    description: "Public-domain dedication by Creative Commons.",
    osiApproved: false,
    category: "public-domain",
    url: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  "AGPL-3.0": {
    spdxId: "AGPL-3.0",
    name: "GNU AGPL v3",
    description: "Network copyleft. Server-side use triggers distribution requirements.",
    osiApproved: true,
    category: "copyleft",
    url: "https://choosealicense.com/licenses/agpl-3.0/",
  },
  "BSL-1.0": {
    spdxId: "BSL-1.0",
    name: "Boost Software License 1.0",
    description: "Permissive license. No attribution required for binaries.",
    osiApproved: true,
    category: "permissive",
    url: "https://choosealicense.com/licenses/bsl-1.0/",
  },
  "BUSL-1.1": {
    spdxId: "BUSL-1.1",
    name: "Business Source License 1.1",
    description: "Source-available. Converts to open-source after a change date.",
    osiApproved: false,
    category: "proprietary",
    url: "https://spdx.org/licenses/BUSL-1.1.html",
  },
  NOASSERTION: {
    spdxId: "NOASSERTION",
    name: "No License",
    description: "No license specified. All rights reserved by default.",
    osiApproved: false,
    category: "other",
    url: "https://choosealicense.com/no-permission/",
  },
}

/**
 * Resolve license metadata from an SPDX identifier.
 *
 * Handles common variations (case-insensitive, "only" suffix, "GPL-3.0-only" → "GPL-3.0").
 * Returns a fallback entry for unknown identifiers.
 */
export function resolveLicense(spdxId: string): LicenseInfo {
  const normalized = spdxId
    .replace(/-only$/i, "")
    .replace(/-or-later$/i, "")

  const direct = KNOWN_LICENSES[normalized] ?? KNOWN_LICENSES[spdxId]
  if (direct) return direct

  const upper = normalized.toUpperCase()
  for (const [key, value] of Object.entries(KNOWN_LICENSES)) {
    if (key.toUpperCase() === upper) return value
  }

  return {
    spdxId,
    name: spdxId,
    description: "License details not available.",
    osiApproved: false,
    category: "other",
    url: `https://spdx.org/licenses/${encodeURIComponent(spdxId)}.html`,
  }
}

export interface GitHubLicenseData {
  /** SPDX identifier from GitHub. */
  spdxId: string
  /** Full license name from GitHub. */
  name: string
  /** URL to the LICENSE file in the repository. */
  url: string
  /** Repository full name (owner/repo). */
  repoFullName: string
}

/**
 * Fetch license info for a GitHub repository.
 *
 * - Uses the public GitHub REST API — no API key required.
 * - Optionally authenticates with `process.env.GITHUB_TOKEN`.
 * - Caches the result for 1 hour via Next.js ISR.
 *
 * Returns `null` if the request fails or the repo has no license.
 */
export async function fetchGitHubLicense(
  owner: string,
  repo: string
): Promise<GitHubLicenseData | null> {
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

    const license = data.license
    if (!license || typeof license.spdx_id !== "string" || license.spdx_id === "NOASSERTION") {
      return null
    }

    return {
      spdxId: license.spdx_id,
      name: license.name ?? license.spdx_id,
      url: `https://github.com/${owner}/${repo}/blob/${data.default_branch ?? "main"}/LICENSE`,
      repoFullName: data.full_name ?? `${owner}/${repo}`,
    }
  } catch {
    return null
  }
}

/** Category display config for color-coding. */
export const CATEGORY_CONFIG: Record<
  LicenseInfo["category"],
  { label: string; color: string; textColor: string }
> = {
  permissive: {
    label: "Permissive",
    color: "bg-emerald-500/15 dark:bg-emerald-500/20",
    textColor: "text-emerald-700 dark:text-emerald-400",
  },
  copyleft: {
    label: "Copyleft",
    color: "bg-amber-500/15 dark:bg-amber-500/20",
    textColor: "text-amber-700 dark:text-amber-400",
  },
  "weak-copyleft": {
    label: "Weak Copyleft",
    color: "bg-sky-500/15 dark:bg-sky-500/20",
    textColor: "text-sky-700 dark:text-sky-400",
  },
  "public-domain": {
    label: "Public Domain",
    color: "bg-violet-500/15 dark:bg-violet-500/20",
    textColor: "text-violet-700 dark:text-violet-400",
  },
  proprietary: {
    label: "Proprietary",
    color: "bg-rose-500/15 dark:bg-rose-500/20",
    textColor: "text-rose-700 dark:text-rose-400",
  },
  other: {
    label: "Other",
    color: "bg-zinc-500/15 dark:bg-zinc-500/20",
    textColor: "text-zinc-600 dark:text-zinc-400",
  },
}
