import { SvglIcon } from "@/components/icons/svgl-icon"
import { getLanguageSvglTitle } from "@/lib/svgl"

interface LanguageIconProps {
  language: string
  muted?: boolean
  className?: string
}

/**
 * Renders the SVGL icon for a programming language.
 * Automatically maps language identifiers (tsx, py, go, etc.) to SVGL titles.
 * Server component — fetches SVG at build/render time.
 */
export async function LanguageIcon({ language, muted, className }: LanguageIconProps) {
  const title = getLanguageSvglTitle(language)
  if (!title) return null

  return <SvglIcon title={title} muted={muted} className={className} />
}
