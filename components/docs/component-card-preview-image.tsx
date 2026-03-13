"use client"

import * as React from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

interface ComponentCardPreviewImageProps {
  slug: string
  title: string
}

export function ComponentCardPreviewImage({
  slug,
  title,
}: ComponentCardPreviewImageProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  // Avoid hydration mismatch — render nothing until mounted
  if (!mounted) {
    return <div className="h-[140px] bg-card" />
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
