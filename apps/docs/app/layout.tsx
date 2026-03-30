import type { Metadata } from "next"
import { Sora, Public_Sans, Fira_Code, Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"

import "./globals.css"
import { cn } from "@/lib/utils";

const geistMono = Geist_Mono({subsets:['cyrillic','latin','latin-ext'],weight:['100','200','300','400','500','600','700','800','900'],variable:'--font-geist-mono'});

const geist = Geist({subsets:['cyrillic','latin','latin-ext'],weight:['100','200','300','400','500','600','700','800','900'],variable:'--font-geist'});

const sora = Sora({
  subsets: ["latin", "latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-sora",
})

const publicSans = Public_Sans({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-public-sans",
})

const firaCode = Fira_Code({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-fira-code",
})

const siteUrl = "https://ui.justinlevine.me"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "jal-co/ui",
    template: "%s — jal-co/ui",
  },
  description:
    "Open-source React component library. Polished, composable components for React and Tailwind CSS — distributed via a shadcn-compatible registry. Free forever, never paywalled.",
  keywords: [
    "react",
    "react components",
    "tailwindcss",
    "tailwind components",
    "component library",
    "shadcn",
    "shadcn registry",
    "open source",
    "ui components",
    "typescript",
  ],
  authors: [{ name: "Justin Levine", url: "https://justinlevine.me" }],
  creator: "Justin Levine",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "jal-co/ui",
    title: "jal-co/ui",
    description:
      "Open-source React component library. Polished, composable components for React and Tailwind CSS — distributed via a shadcn-compatible registry. Free forever, never paywalled.",
  },
  twitter: {
    card: "summary_large_image",
    title: "jal-co/ui",
    description:
      "Open-source React component library. Polished, composable components for React and Tailwind CSS — distributed via a shadcn-compatible registry. Free forever, never paywalled.",
  },
  alternates: {
    canonical: siteUrl,
  },
}

import Script from "next/script"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "jal-co/ui",
        url: siteUrl,
        description:
          "Open-source React component library. Polished, composable components for React and Tailwind CSS — distributed via a shadcn-compatible registry. Free forever, never paywalled.",
        author: {
          "@type": "Person",
          name: "Justin Levine",
          url: "https://justinlevine.me",
        },
      },
      {
        "@type": "SoftwareSourceCode",
        name: "jal-co/ui",
        url: "https://github.com/jal-co/ui",
        codeRepository: "https://github.com/jal-co/ui",
        programmingLanguage: ["TypeScript", "React"],
        license: "https://opensource.org/licenses/MIT",
        author: {
          "@type": "Person",
          name: "Justin Levine",
          url: "https://justinlevine.me",
        },
      },
    ],
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(sora.variable, publicSans.variable, firaCode.variable, "font-geist", "font-geist-mono", geist.variable, geistMono.variable)}
    >
      <head />
      <body className="antialiased">
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="1577ed14-ed62-48d4-a679-1e96a0f4ae54"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
