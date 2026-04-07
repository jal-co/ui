"use client"

import * as React from "react"
import { PretextTestimonialMasonry } from "@/registry/pretext-testimonial/pretext-testimonial"
import type { Testimonial } from "@/registry/testimonial/testimonial"

const testimonials: Testimonial[] = [
  {
    quote: "jalco-ui components saved us weeks of work. The code blocks alone are worth it.",
    author: "Sarah Chen",
    role: "Staff Engineer",
    company: "Vercel",
    rating: 5,
  },
  {
    quote: "Finally, a registry that ships dev tools components. The JSON viewer and log viewer are exactly what our dashboard needed.",
    author: "Marcus Rivera",
    role: "Frontend Lead",
    company: "Linear",
  },
  {
    quote: "Clean, composable, well-documented. Everything a component library should be.",
    author: "Aisha Patel",
    role: "Design Engineer",
    company: "Stripe",
    rating: 5,
  },
  {
    quote: "The Pretext integration is brilliant. Shrinkwrap bubbles and masonry layouts without DOM measurement — this is the future.",
    author: "Tomasz Kowalski",
    role: "Senior Developer",
    company: "Supabase",
    rating: 5,
  },
  {
    quote: "We switched from three different libraries to jalco-ui. The shadcn registry install is seamless.",
    author: "Emily Nakamura",
    role: "Engineering Manager",
    company: "Planetscale",
  },
  {
    quote: "Best open source component docs I've seen. Copy-paste ergonomics done right.",
    author: "David Okonkwo",
    role: "Full Stack Developer",
    company: "Railway",
    rating: 4,
  },
]

export default function PretextTestimonialDemo() {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])
  if (!mounted) return <div className="h-[400px]" />

  return (
    <PretextTestimonialMasonry
      testimonials={testimonials}
      columns={3}
      title="What developers are saying"
    />
  )
}
