import { LogoCloudMarquee } from "@/registry/logo-cloud/logo-cloud"

const logos = [
  { src: "/logos/nextjs.png", alt: "Next.js" },
  { src: "/logos/react.png", alt: "React" },
  { src: "/logos/tailwindcss.png", alt: "Tailwind CSS" },
  { src: "/logos/typescript.png", alt: "TypeScript" },
  { src: "/logos/vercel.png", alt: "Vercel" },
  { src: "/logos/github.png", alt: "GitHub" },
  { src: "/logos/linear.png", alt: "Linear" },
  { src: "/logos/stripe.png", alt: "Stripe" },
]

export const animated = true

export default async function LogoCloudPreview() {
  return <LogoCloudMarquee logos={logos} duration={20} />
}
