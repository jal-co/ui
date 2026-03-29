import { TestimonialCard } from "@/registry/testimonial/testimonial"

export default function TestimonialCardExample() {
  return (
    <div className="flex gap-4">
      <TestimonialCard testimonial={{ quote: "This completely transformed our developer onboarding.", author: "Sarah Chen", role: "CTO", company: "Acme Corp", rating: 5 }} />
      <TestimonialCard testimonial={{ quote: "Copy-paste components that actually look good out of the box.", author: "Taylor Kim", role: "Designer", company: "Umbrella" }} />
    </div>
  )
}
