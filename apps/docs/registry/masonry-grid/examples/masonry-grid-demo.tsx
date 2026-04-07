"use client"

import * as React from "react"
import { MasonryGrid, type MasonryItem } from "@/registry/masonry-grid/masonry-grid"

const items: MasonryItem[] = [
  { title: "Quick thought", text: "Every great product started as someone's side project that got a little out of hand." },
  { text: "The best code is the code you didn't have to write. The second best is the code that's obvious enough you don't need comments." },
  { title: "Design systems", text: "A design system isn't about making everything look the same. It's about making everything feel intentional." },
  { text: "Shipping beats perfection. But shipping garbage beats nothing." },
  { title: "On debugging", text: "The bug is never where you think it is. It's in the code you wrote three weeks ago that you were absolutely sure was correct." },
  { text: "Good abstractions are discovered, not invented. Build the thing three times before you abstract it." },
  { title: "Typography", text: "If your UI looks wrong, it's probably a spacing issue. If it still looks wrong, it's a font-weight issue." },
  { text: "The hardest part of building a component library is saying no to the eighth variant." },
  { title: "Performance", text: "Users don't care about your framework choice. They care about whether the button works when they tap it." },
  { text: "Documentation is the feature nobody asks for but everyone needs." },
  { title: "Testing", text: "Write tests for the things that would embarrass you if they broke in production." },
  { text: "CSS is easy until it isn't, and then it's the hardest thing in the world." },
]

export default function MasonryGridDemo() {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])
  if (!mounted) return <div className="h-[500px]" />

  return <MasonryGrid items={items} columns={3} gap={12} />
}
