import { LogoCloudMarquee } from "@/registry/logo-cloud/logo-cloud"

const logos = [
  { src: "/logos/nextjs.svg", alt: "Next.js" },
  { src: "/logos/react.svg", alt: "React" },
  { src: "/logos/tailwindcss.svg", alt: "Tailwind CSS" },
  { src: "/logos/typescript.svg", alt: "TypeScript" },
  { src: "/logos/vercel.svg", alt: "Vercel" },
  { src: "/logos/github.svg", alt: "GitHub" },
  { src: "/logos/linear.svg", alt: "Linear" },
  { src: "/logos/stripe.svg", alt: "Stripe" },
]

export default function LogoCloudDemo() {
  return <LogoCloudMarquee logos={logos} duration={20} />
}
