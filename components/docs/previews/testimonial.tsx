import { TestimonialMarquee } from "@/registry/testimonial/testimonial"

const testimonials = [
  { quote: "This completely transformed our developer onboarding. Setup time went from days to minutes.", author: "Sarah Chen", role: "CTO", company: "Acme Corp", avatarUrl: "https://github.com/shadcn.png?", rating: 5 },
  { quote: "The best component library I've used. Clean APIs, great docs, actually accessible.", author: "Alex Rivera", role: "Lead Engineer", company: "Globex", rating: 5 },
  { quote: "We shipped our docs site in a weekend. The code blocks alone saved us weeks.", author: "Jordan Lee", role: "Frontend Dev", company: "Initech", avatarUrl: "https://github.com/leerob.png?", rating: 4 },
  { quote: "Copy-paste components that actually look good out of the box. No fighting with styles.", author: "Taylor Kim", role: "Designer", company: "Umbrella" },
]

export const animated = true

export default async function TestimonialPreview() {
  return <TestimonialMarquee testimonials={testimonials} duration={25} />
}
