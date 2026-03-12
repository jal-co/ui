import type { Metadata } from "next"
import { Sora, Public_Sans, Fira_Code } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

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

export const metadata: Metadata = {
  title: "Jalco UI",
  description: "A curated shadcn-style registry by Justin Levine.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${publicSans.variable} ${firaCode.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
