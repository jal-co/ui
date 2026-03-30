"use client"

/* eslint-disable @next/next/no-img-element */

/**
 * jalco-ui
 * TestimonialCard, TestimonialGrid, TestimonialMarquee
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Customer testimonial display with three layouts: standalone card,
 * static grid, and infinite-scroll marquee.
 *
 * Exports:
 * - TestimonialCard — single testimonial with quote, author, and optional metadata
 * - TestimonialGrid — responsive grid of testimonial cards
 * - TestimonialMarquee — infinite-scroll testimonial strip for landing pages
 *
 * Notes:
 * - Client component — marquee uses CSS animation
 * - No external dependencies
 */

import * as React from "react"
import { cn } from "@/lib/utils"

interface Testimonial {
  /** The quote text. */
  quote: string
  /** Author display name. */
  author: string
  /** Author's role or title. */
  role?: string
  /** Company or organization name. */
  company?: string
  /** Author avatar image URL. */
  avatarUrl?: string
  /** Star rating (1–5). */
  rating?: number
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill={i < count ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={1.5}
          className={cn(
            "size-3.5",
            i < count ? "text-amber-400" : "text-muted-foreground/30"
          )}
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

// TestimonialCard

interface TestimonialCardProps extends Omit<React.ComponentProps<"blockquote">, "children"> {
  /** Testimonial data. */
  testimonial: Testimonial
}

function TestimonialCard({
  testimonial,
  className,
  ...props
}: TestimonialCardProps) {
  const { quote, author, role, company, avatarUrl, rating } = testimonial

  return (
    <blockquote
      data-slot="testimonial-card"
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-border/60 bg-card p-5 shadow-sm",
        className
      )}
      {...props}
    >
      {rating && <Stars count={rating} />}
      <p className="text-sm leading-relaxed text-foreground/80">
        &ldquo;{quote}&rdquo;
      </p>
      <footer className="flex items-center gap-3">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt=""
            width={36}
            height={36}
            className="size-9 rounded-full border border-border/60 bg-muted"
            loading="lazy"
          />
        ) : (
          <span className="flex size-9 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
            {initials(author)}
          </span>
        )}
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">{author}</span>
          {(role || company) && (
            <span className="text-xs text-muted-foreground">
              {[role, company].filter(Boolean).join(" · ")}
            </span>
          )}
        </div>
      </footer>
    </blockquote>
  )
}

// TestimonialGrid

interface TestimonialGridProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Array of testimonials to display. */
  testimonials: Testimonial[]
  /** Grid columns. @default 2 */
  columns?: 1 | 2 | 3
  /** Title text above the grid. */
  title?: string
}

const columnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
}

function TestimonialGrid({
  testimonials,
  columns = 2,
  title,
  className,
  ...props
}: TestimonialGridProps) {
  return (
    <div
      data-slot="testimonial-grid"
      className={cn("flex flex-col items-center gap-6", className)}
      {...props}
    >
      {title && (
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
      )}
      <div className={cn("grid w-full gap-4", columnClasses[columns])}>
        {testimonials.map((testimonial, i) => (
          <TestimonialCard
            key={`${testimonial.author}-${i}`}
            testimonial={testimonial}
          />
        ))}
      </div>
    </div>
  )
}

// TestimonialMarquee

interface TestimonialMarqueeProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Array of testimonials to display. */
  testimonials: Testimonial[]
  /** Title text above the marquee. */
  title?: string
  /** Animation duration in seconds. Lower = faster. @default 40 */
  duration?: number
  /** Speed multiplier. 2 = twice as fast, 0.5 = half speed. Overrides duration. */
  speed?: number
  /** Pause the marquee on hover. @default true */
  pauseOnHover?: boolean
  /** Scroll direction. @default "left" */
  direction?: "left" | "right"
}

function TestimonialMarquee({
  testimonials,
  title,
  duration = 40,
  speed,
  pauseOnHover = true,
  direction = "left",
  className,
  ...props
}: TestimonialMarqueeProps) {
  const resolvedDuration = speed ? 40 / speed : duration

  return (
    <div
      data-slot="testimonial-marquee"
      className={cn("flex flex-col items-center gap-6", className)}
      {...props}
    >
      {title && (
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
      )}
      <div
        className={cn(
          "group relative flex w-full overflow-hidden",
          "[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]",
          pauseOnHover && "[--marquee-play:running] hover:[--marquee-play:paused]"
        )}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-stretch"
            style={{
              animation: `testimonial-scroll ${resolvedDuration}s linear infinite`,
              animationDirection: direction === "right" ? "reverse" : "normal",
              animationPlayState: "var(--marquee-play, running)" as React.CSSProperties["animationPlayState"],
              gap: "1rem",
              paddingRight: "1rem",
            }}
            aria-hidden={copy === 1 ? "true" : undefined}
          >
            {testimonials.map((testimonial, i) => (
              <TestimonialCard
                key={`${testimonial.author}-${i}`}
                testimonial={testimonial}
                className="w-[320px] shrink-0 sm:w-[360px]"
              />
            ))}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes testimonial-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  )
}

export {
  TestimonialCard,
  TestimonialGrid,
  TestimonialMarquee,
  type TestimonialCardProps,
  type TestimonialGridProps,
  type TestimonialMarqueeProps,
  type Testimonial,
}
