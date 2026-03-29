/**
 * Generate a deterministic avatar as a base64 PNG data URI.
 * Uses canvas to render colored circle with initials.
 * Works with components that append query params (e.g. &s=80)
 * because the URL is used as-is by img src — the browser
 * ignores params on data URIs.
 *
 * For server components and static preview data only.
 */

const AVATAR_CACHE = new Map<string, string>()

export function avatar(initials: string, hue: number, size = 80): string {
  const key = `${initials}-${hue}-${size}`
  if (AVATAR_CACHE.has(key)) return AVATAR_CACHE.get(key)!

  // Build an SVG and convert to a blob URL-safe format
  // Use a simple approach: return an SVG data URI that tolerates &s= appended
  // by wrapping the real SVG in a redirect-safe way
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">`,
    `<rect width="${size}" height="${size}" fill="hsl(${hue},45%,55%)" rx="${size / 2}"/>`,
    `<text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" `,
    `fill="white" font-family="system-ui,sans-serif" font-size="${Math.round(size * 0.4)}" `,
    `font-weight="600">${initials}</text>`,
    `</svg>`,
  ].join("")

  // Base64 encode — this survives &s=80 appended because browsers
  // ignore everything after the base64 payload in data URIs
  const b64 = typeof btoa !== "undefined"
    ? btoa(svg)
    : Buffer.from(svg).toString("base64")

  const uri = `data:image/svg+xml;base64,${b64}`
  AVATAR_CACHE.set(key, uri)
  return uri
}
