"use client"

import * as React from "react"
import { MasonryGrid } from "@/registry/masonry-grid/masonry-grid"

const items = [
  { title: "Quick thought", text: "Ship beats perfection." },
  { text: "The bug is never where you think it is." },
  { title: "Design", text: "A design system makes things feel intentional." },
  { text: "Good abstractions are discovered, not invented." },
  { title: "Typography", text: "If your UI looks wrong, check spacing first." },
  { text: "Documentation is the feature nobody asks for." },
]

export default function MasonryGridPreview() {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return <MasonryGrid items={items} columns={3} gap={8} />
}
