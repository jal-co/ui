import { TestimonialMarquee } from "@/registry/testimonial/testimonial"

const testimonials = [
  { quote: "This completely transformed our developer onboarding. Setup time went from days to minutes.", author: "Sarah Chen", role: "CTO", company: "Acme Corp", rating: 5 },
  { quote: "The best component library I've used. Clean APIs, great docs, actually accessible.", author: "Alex Rivera", role: "Lead Engineer", company: "Globex", rating: 5 },
  { quote: "We shipped our docs site in a weekend. The code blocks alone saved us weeks.", author: "Jordan Lee", role: "Frontend Dev", company: "Initech", rating: 4 },
  { quote: "Copy-paste components that actually look good out of the box.", author: "Taylor Kim", role: "Designer", company: "Umbrella" },
]

export default function TestimonialDemo() {
  return <TestimonialMarquee testimonials={testimonials} duration={25} />
}
