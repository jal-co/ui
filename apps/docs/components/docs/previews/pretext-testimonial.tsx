"use client"

import * as React from "react"
import { PretextTestimonialMasonry } from "@/registry/pretext-testimonial/pretext-testimonial"

const testimonials = [
  { quote: "Clean, composable, well-documented.", author: "Aisha Patel", role: "Design Engineer", company: "Stripe", rating: 5 as const },
  { quote: "The Pretext integration is brilliant. Shrinkwrap and masonry without DOM measurement.", author: "Tomasz Kowalski", role: "Senior Developer", company: "Supabase" },
  { quote: "Best open source component docs I've seen.", author: "David Okonkwo", role: "Developer", company: "Railway", rating: 4 as const },
  { quote: "Saved us weeks of work.", author: "Sarah Chen", role: "Staff Engineer", company: "Vercel", rating: 5 as const },
]

export default function PretextTestimonialPreview() {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <PretextTestimonialMasonry testimonials={testimonials} columns={2} gap={10} />
  )
}
