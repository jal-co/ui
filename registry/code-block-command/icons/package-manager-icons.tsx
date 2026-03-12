/**
 * jalco-ui
 * PackageManagerIcon
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Renders a package manager icon from pre-fetched SVG markup.
 */

import { cn } from "@/lib/utils"

interface PackageManagerIconProps {
  /** Raw SVG markup string. */
  svg: string
  muted?: boolean
  className?: string
}

/**
 * Renders a package manager icon from pre-fetched SVG markup.
 * Works in both server and client components since it only needs a string.
 */
export function PackageManagerIcon({ svg, muted, className }: PackageManagerIconProps) {
  return (
    <span
      className={cn(
        "inline-flex size-3.5 shrink-0 [&>svg]:size-full",
        muted && "grayscale opacity-50",
        className
      )}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
