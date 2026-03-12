/**
 * jalco-ui
 * SvglIcon
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Renders an SVG icon fetched from the SVGL API at build/render time.
 */

import { cn } from "@/lib/utils"
import { fetchSvgByTitle } from "@/registry/code-block/lib/svgl"

interface SvglIconProps {
  /** SVGL title to search for (e.g. "TypeScript", "React", "Bun"). */
  title: string
  muted?: boolean
  className?: string
}

/**
 * Renders an SVG icon fetched from the SVGL API.
 * Server component — fetches SVG at build/render time, cached for 24h.
 */
export async function SvglIcon({ title, muted, className }: SvglIconProps) {
  const svg = await fetchSvgByTitle(title)
  if (!svg) return null

  return (
    <span
      className={cn(
        "inline-flex size-4 shrink-0 [&>svg]:size-full",
        muted && "grayscale opacity-50",
        className
      )}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
