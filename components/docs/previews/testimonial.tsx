import { TestimonialMarquee } from "@/registry/testimonial/testimonial"

const testimonials = [
  { quote: "This completely transformed our developer onboarding. Setup time went from days to minutes.", author: "Sarah Chen", role: "CTO", company: "Acme Corp", avatarUrl: "/avatars/shadcn.png", rating: 5 },
  { quote: "The best component library I've used. Clean APIs, great docs, actually accessible.", author: "Alex Rivera", role: "Lead Engineer", company: "Globex", avatarUrl: "/avatars/rauchg.png", rating: 5 },
  { quote: "We shipped our docs site in a weekend. The code blocks alone saved us weeks.", author: "Jordan Lee", role: "Frontend Dev", company: "Initech", avatarUrl: "/avatars/leerob.png", rating: 4 },
  { quote: "Copy-paste components that actually look good out of the box. No fighting with styles.", author: "Taylor Kim", role: "Designer", company: "Umbrella", avatarUrl: "/avatars/timneutkens.png" },
  { quote: "Replaced three internal libraries with this. Everything just works together.", author: "Morgan Blake", role: "Staff Engineer", company: "Stark Industries", avatarUrl: "/avatars/haydenbleasel.png", rating: 5 },
  { quote: "Our design team loves the defaults. Engineering loves the DX. Rare combo.", author: "Casey Park", role: "VP Engineering", company: "Massive Dynamic", avatarUrl: "/avatars/shuding.png", rating: 5 },
]

export const animated = true

export default async function TestimonialPreview() {
  return <TestimonialMarquee testimonials={testimonials} duration={30} />
}
