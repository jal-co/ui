"use client"

import * as React from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

interface ThemeImageProps {
  slug: string
  title: string
  /** Whether a WebM video exists for this component. */
  hasVideo?: boolean
}

/**
 * Preview image that swaps between light and dark variants based on the
 * active theme. When hasVideo is true, renders an autoplaying looped video
 * instead of the static PNG.
 */
export function ThemeImage({ slug, title, hasVideo }: ThemeImageProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="aspect-[2/1] bg-card" />
  }

  const mode = resolvedTheme === "light" ? "light" : "dark"

  if (hasVideo) {
    return (
      <video
        src={`/previews/${slug}-${mode}.webm`}
        autoPlay
        loop
        muted
        playsInline
        className="w-full aspect-[2/1]"
      />
    )
  }

  return (
    <Image
      src={`/previews/${slug}-${mode}.png`}
      alt={`${title} preview`}
      width={1280}
      height={640}
      className="w-full"
      unoptimized
    />
  )
}
