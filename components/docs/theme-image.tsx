"use client"

import * as React from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

interface ThemeImageProps {
  slug: string
  title: string
}

/**
 * Preview image that swaps between light and dark variants based on the
 * active theme. Uses aspect-ratio for the SSR placeholder to avoid layout
 * shift once the client hydrates.
 */
export function ThemeImage({ slug, title }: ThemeImageProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="aspect-[2/1] bg-card" />
  }

  const mode = resolvedTheme === "light" ? "light" : "dark"

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
