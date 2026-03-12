/**
 * jalco-ui
 * LanguageIcon
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Renders the bundled SVG icon for a programming language identifier.
 */

import { cn } from "@/lib/utils"
import { getLanguageIcon } from "@/registry/code-block/lib/language-icons"

interface LanguageIconProps {
  language: string
  muted?: boolean
  className?: string
}

/**
 * Renders the bundled SVG icon for a programming language.
 * Automatically maps language identifiers (tsx, py, go, etc.) to icons.
 * No network requests — all icons are bundled locally.
 */
export function LanguageIcon({ language, muted, className }: LanguageIconProps) {
  const svg = getLanguageIcon(language)
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
