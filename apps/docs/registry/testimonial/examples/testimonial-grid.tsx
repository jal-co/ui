import { TestimonialGrid } from "@/registry/testimonial/testimonial"

const testimonials = [
  { quote: "This completely transformed our developer onboarding.", author: "Sarah Chen", role: "CTO", company: "Acme Corp", rating: 5 },
  { quote: "The best component library I've used. Clean APIs, great docs.", author: "Alex Rivera", role: "Lead Engineer", company: "Globex", rating: 5 },
  { quote: "We shipped our docs site in a weekend.", author: "Jordan Lee", role: "Frontend Dev", company: "Initech", rating: 4 },
  { quote: "Copy-paste components that actually look good out of the box.", author: "Taylor Kim", role: "Designer", company: "Umbrella" },
]

export default function TestimonialGridExample() {
  return <TestimonialGrid testimonials={testimonials} title="What people are saying" />
}
