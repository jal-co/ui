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

// In-memory cache (lives for the duration of the build / server process)
const cache = new Map<string, string | null>()

/**
 * Resolve the SVG URL from a route, preferring light variant for theme objects.
 */
function resolveRoute(route: string | ThemeOptions): string {
  return typeof route === "string" ? route : route.light
}

/**
 * Search the SVGL API for an SVG by title and return the raw SVG markup.
 * Results are cached in-memory so repeated calls don't hit the API.
 *
 * @param title - The SVG title to search for (e.g. "TypeScript", "Bun", "NPM")
 * @returns The SVG markup string, or null if not found
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

/**
 * Maps common language identifiers to their SVGL title.
 */
const languageTitleMap: Record<string, string> = {
  ts: "TypeScript",
  tsx: "TypeScript",
  typescript: "TypeScript",
  js: "JavaScript",
  jsx: "JavaScript",
  javascript: "JavaScript",
  py: "Python",
  python: "Python",
  go: "Go",
  golang: "Go",
  html: "HTML5",
  css: "CSS",
  ruby: "Ruby",
  rb: "Ruby",
  swift: "Swift",
  kotlin: "Kotlin",
  kt: "Kotlin",
  java: "Java",
  dart: "Dart",
  lua: "Lua",
  scala: "Scala",
  graphql: "GraphQL",
  gql: "GraphQL",
  rust: "Rust",
  rs: "Rust",
  bash: "Bash",
  sh: "Bash",
  json: "JSON",
}

/**
 * Maps package manager names to their SVGL title.
 */
const packageManagerTitleMap: Record<string, string> = {
  pnpm: "Pnpm",
  npm: "NPM",
  yarn: "Yarn",
  bun: "Bun",
  shadcn: "shadcn/ui",
}

/**
 * Get the SVGL title for a language identifier.
 */
export function getLanguageSvglTitle(language: string): string | null {
  return languageTitleMap[language.toLowerCase()] ?? null
}

/**
 * Get the SVGL title for a package manager.
 */
export function getPackageManagerSvglTitle(manager: string): string | null {
  return packageManagerTitleMap[manager.toLowerCase()] ?? null
}
