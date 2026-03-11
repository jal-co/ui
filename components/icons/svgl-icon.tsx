import { cn } from "@/lib/utils"
import { fetchSvgByTitle } from "@/lib/svgl"

interface SvglIconProps {
  /** The SVGL title to search for (e.g. "TypeScript", "NPM", "Bun") */
  title: string
  /** Render grayscale with reduced opacity */
  muted?: boolean
  /** Size class override. Defaults to size-4. */
  className?: string
}

/**
 * Server component that fetches an SVG from the SVGL API and renders it inline.
 * Supports a `muted` variant (grayscale + reduced opacity).
 *
 * Results are cached in-memory and via Next.js `fetch` revalidation (24h).
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
