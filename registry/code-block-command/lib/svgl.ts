/**
 * jalco-ui
 * lib/svgl
 * by Justin Levine
 * ui.justinlevine.me
 *
 * SVGL API client for fetching SVG logos at build/render time.
 *
 * @see https://svgl.app
 * @see https://github.com/pheralb/svgl
 */

const API_BASE = "https://api.svgl.app"

type ThemeOptions = {
  dark: string
  light: string
}

interface SvglEntry {
  id: number
  title: string
  category: string | string[]
  route: string | ThemeOptions
  url: string
  wordmark?: string | ThemeOptions
  brandUrl?: string
}

const cache = new Map<string, string | null>()

function resolveRoute(route: string | ThemeOptions): string {
  return typeof route === "string" ? route : route.light
}

/**
 * Search the SVGL API for an SVG by title and return the raw SVG markup.
 */
export async function fetchSvgByTitle(title: string): Promise<string | null> {
  const cacheKey = title.toLowerCase()

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) ?? null
  }

  try {
    const res = await fetch(`${API_BASE}?search=${encodeURIComponent(title)}`, {
      next: { revalidate: 86400 },
    })

    if (!res.ok) {
      cache.set(cacheKey, null)
      return null
    }

    const data: SvglEntry[] = await res.json()
    const match = data.find(
      (entry) => entry.title.toLowerCase() === cacheKey
    )

    if (!match) {
      cache.set(cacheKey, null)
      return null
    }

    const svgUrl = resolveRoute(match.route)
    const svgRes = await fetch(svgUrl, {
      next: { revalidate: 86400 },
    })

    if (!svgRes.ok) {
      cache.set(cacheKey, null)
      return null
    }

    const svg = await svgRes.text()
    cache.set(cacheKey, svg)
    return svg
  } catch {
    cache.set(cacheKey, null)
    return null
  }
}

const packageManagerTitleMap: Record<string, string> = {
  pnpm: "Pnpm",
  npm: "NPM",
  yarn: "Yarn",
  bun: "Bun",
  shadcn: "shadcn/ui",
}

export function getPackageManagerSvglTitle(manager: string): string | null {
  return packageManagerTitleMap[manager.toLowerCase()] ?? null
}
