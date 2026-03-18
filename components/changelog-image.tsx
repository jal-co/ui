"use client"

import * as React from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

interface ChangelogImageProps {
  slug: string
  title: string
}

export function ChangelogImage({ slug, title }: ChangelogImageProps) {
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
