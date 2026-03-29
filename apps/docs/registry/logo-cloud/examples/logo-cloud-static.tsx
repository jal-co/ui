import { LogoCloud } from "@/registry/logo-cloud/logo-cloud"

const logos = [
  { src: "https://svgl.app/library/nextjs_icon_dark.svg", alt: "Next.js" },
  { src: "https://svgl.app/library/react_dark.svg", alt: "React" },
  { src: "https://svgl.app/library/tailwindcss.svg", alt: "Tailwind CSS" },
  { src: "https://svgl.app/library/typescript.svg", alt: "TypeScript" },
  { src: "https://svgl.app/library/vercel_dark.svg", alt: "Vercel" },
  { src: "https://svgl.app/library/github_dark.svg", alt: "GitHub" },
]

export default function LogoCloudStatic() {
  return <LogoCloud logos={logos} title="Trusted by" />
}
