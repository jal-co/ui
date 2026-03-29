/* eslint-disable @next/next/no-img-element */
"use client"

/**
 * jalco-ui
 * LogoCloud, LogoCloudMarquee
 * by Justin Levine
 * ui.justinlevine.me
 *
 * "Trusted by" logo display with two layouts: a static wrapped grid
 * and an infinite-scroll marquee. Grayscale by default, full color
 * on hover.
 *
 * Exports:
 * - LogoCloud — static wrapped grid for about pages and docs
 * - LogoCloudMarquee — smooth infinite scroll for landing pages
 *
 * Props (shared):
 * - logos?: array of { src, alt, href? } for data-driven rendering
 * - children?: ReactNode for custom logo elements (overrides logos)
 * - grayscale?: apply grayscale filter with color on hover (default true)
 *
 * Notes:
 * - Client component — marquee uses CSS animation + pause on hover
 * - No external dependencies — pure CSS animation
 */

import * as React from "react"
import { cn } from "@/lib/utils"

interface Logo {
  /** Image source URL. */
  src: string
  /** Alt text for accessibility. */
  alt: string
  /** Optional link URL. Wraps the logo in an anchor when provided. */
  href?: string
}

// LogoCloud (static grid)

interface LogoCloudProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Logo data for data-driven rendering. Ignored when children are provided. */
  logos?: Logo[]
  /** Custom logo elements. Overrides the logos prop. */
  children?: React.ReactNode
  /** Apply grayscale with color on hover. @default true */
  grayscale?: boolean
  /** Title text displayed above the logos. */
  title?: string
}

function LogoCloud({
  logos,
  children,
  grayscale = true,
  title,
  className,
  ...props
}: LogoCloudProps) {
  const content = children ?? logos?.map((logo, i) => (
    <LogoItem key={`${logo.alt}-${i}`} logo={logo} grayscale={grayscale} />
  ))

  return (
    <div
      data-slot="logo-cloud"
      className={cn("flex flex-col items-center gap-6", className)}
      {...props}
    >
      {title && (
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12">
        {content}
      </div>
    </div>
  )
}

// LogoCloudMarquee (infinite scroll)

interface LogoCloudMarqueeProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Logo data for data-driven rendering. Ignored when children are provided. */
  logos?: Logo[]
  /** Custom logo elements. Overrides the logos prop. */
  children?: React.ReactNode
  /** Apply grayscale with color on hover. @default true */
  grayscale?: boolean
  /** Title text displayed above the marquee. */
  title?: string
  /** Animation duration in seconds. Lower = faster. @default 30 */
  duration?: number
  /** Speed multiplier. 2 = twice as fast, 0.5 = half speed. Overrides duration. */
  speed?: number
  /** Pause the marquee on hover. @default true */
  pauseOnHover?: boolean
  /** Scroll direction. @default "left" */
  direction?: "left" | "right"
}

function LogoCloudMarquee({
  logos,
  children,
  grayscale = true,
  title,
  duration = 30,
  speed,
  pauseOnHover = true,
  direction = "left",
  className,
  ...props
}: LogoCloudMarqueeProps) {
  const items = children
    ? React.Children.toArray(children)
    : logos?.map((logo, i) => (
        <LogoItem key={`${logo.alt}-${i}`} logo={logo} grayscale={grayscale} />
      )) ?? []

  return (
    <div
      data-slot="logo-cloud-marquee"
      className={cn("flex flex-col items-center gap-6", className)}
      {...props}
    >
      {title && (
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
      )}
      <div
        className={cn(
          "group relative flex w-full overflow-hidden",
          "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
          pauseOnHover && "[--marquee-play:running] hover:[--marquee-play:paused]"
        )}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            style={{
              animation: `marquee-scroll ${speed ? 30 / speed : duration}s linear infinite`,
              animationDirection: direction === "right" ? "reverse" : "normal",
              animationPlayState: "var(--marquee-play, running)" as React.CSSProperties["animationPlayState"],
              gap: "2rem",
              paddingRight: "2rem",
            }}
            aria-hidden={copy === 1 ? "true" : undefined}
          >
            {items}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  )
}

// Shared logo item renderer

function LogoItem({
  logo,
  grayscale,
}: {
  logo: Logo
  grayscale: boolean
}) {
  const img = (
    <img
      src={logo.src}
      alt={logo.alt}
      className={cn(
        "h-8 w-auto max-w-[120px] object-contain transition-all duration-200 sm:h-10",
        grayscale && "opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
      )}
      loading="lazy"
      draggable={false}
    />
  )

  if (logo.href) {
    return (
      <a
        href={logo.href}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:rounded-sm"
        aria-label={logo.alt}
      >
        {img}
      </a>
    )
  }

  return <div className="shrink-0">{img}</div>
}

export {
  LogoCloud,
  LogoCloudMarquee,
  type LogoCloudProps,
  type LogoCloudMarqueeProps,
  type Logo,
}
