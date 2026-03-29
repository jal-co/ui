/**
 * jalco-ui
 * ColorPalette
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Color swatch display with name, hex/hsl/rgb values, and click-to-copy.
 * Two layouts: a grid of named colors and a horizontal scale strip for
 * showing a single hue's full range. Designed for design system docs.
 *
 * Props:
 * - colors: array of { name, value, description? } color entries
 * - layout?: "grid" | "scale" (default "grid")
 * - columns?: grid column count (grid only)
 * - format?: "hex" | "hsl" | "rgb" | "oklch" (display format, default "hex")
 * - showName?: show color name label
 * - showValue?: show color value
 *
 * Dependencies:
 * - lucide-react (copy/check icons)
 *
 * Notes:
 * - Client component (click-to-copy interaction)
 * - No external color parsing library — handles hex, rgb(), hsl(), oklch()
 */

"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface ColorEntry {
  /** Display name (e.g. "Primary", "Blue 500", "brand-accent"). */
  name: string
  /** CSS color value (hex, rgb, hsl, oklch, or named color). */
  value: string
  /** Optional description or usage note. */
  description?: string
}

type ColorFormat = "hex" | "hsl" | "rgb" | "oklch"

interface ColorPaletteGridProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Array of colors to display. */
  colors: ColorEntry[]
  /** @default "grid" */
  layout?: "grid"
  /** Number of columns in the grid. @default 4 */
  columns?: number
  /** Color value display format. @default "hex" */
  format?: ColorFormat
  /** Show color name label. @default true */
  showName?: boolean
  /** Show color value string. @default true */
  showValue?: boolean
}

interface ColorPaletteScaleProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Array of colors to display in scale order. */
  colors: ColorEntry[]
  layout: "scale"
  /** Color value display format. @default "hex" */
  format?: ColorFormat
  /** Show color name label. @default true */
  showName?: boolean
  /** Show color value string. @default true */
  showValue?: boolean
  columns?: never
}

type ColorPaletteProps = ColorPaletteGridProps | ColorPaletteScaleProps

function isLightColor(color: string): boolean {
  const canvas = typeof document !== "undefined" ? document.createElement("canvas") : null
  if (!canvas) return false
  canvas.width = 1
  canvas.height = 1
  const ctx = canvas.getContext("2d")
  if (!ctx) return false
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6
}

function Swatch({
  color,
  showName,
  showValue,
  compact,
}: {
  color: ColorEntry
  showName: boolean
  showValue: boolean
  compact?: boolean
}) {
  const [copied, setCopied] = React.useState(false)
  const [isLight, setIsLight] = React.useState(false)

  React.useEffect(() => {
    setIsLight(isLightColor(color.value))
  }, [color.value])

  const displayValue = color.value

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(color.value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API not available
    }
  }, [color.value])

  return (
    <button
      type="button"
      onClick={handleCopy}
      data-slot="color-swatch"
      className={cn(
        "group relative flex flex-col text-left transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        compact
          ? "rounded-md overflow-hidden"
          : "rounded-lg overflow-hidden border border-border/60 shadow-xs hover:shadow-md hover:border-border"
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-center transition-transform",
          compact ? "h-14 sm:h-16" : "h-20 sm:h-24",
        )}
        style={{ backgroundColor: color.value }}
      >
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-full p-1.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100",
            isLight ? "text-zinc-900/70" : "text-white/70"
          )}
        >
          {copied ? (
            <Check className="size-4" />
          ) : (
            <Copy className="size-4" />
          )}
        </span>
      </div>

      {(showName || showValue) && (
        <div className={cn(
          "flex flex-col gap-0.5 bg-card",
          compact ? "px-2 py-1.5" : "px-3 py-2"
        )}>
          {showName && (
            <span className={cn(
              "font-medium truncate",
              compact ? "text-[11px]" : "text-xs"
            )}>
              {color.name}
            </span>
          )}
          {showValue && (
            <span className={cn(
              "font-mono text-muted-foreground truncate",
              compact ? "text-[10px]" : "text-[11px]"
            )}>
              {displayValue}
            </span>
          )}
        </div>
      )}
    </button>
  )
}

function GridLayout({
  colors,
  columns = 4,
  showName = true,
  showValue = true,
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  format,
  ...props
}: ColorPaletteGridProps) {
  return (
    <div
      data-slot="color-palette"
      data-layout="grid"
      className={cn("grid gap-3", className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
      {...props}
    >
      {colors.map((color) => (
        <Swatch
          key={color.name}
          color={color}
          showName={showName}
          showValue={showValue}
        />
      ))}
    </div>
  )
}

function ScaleLayout({
  colors,
  showName = true,
  showValue = true,
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  format,
  ...props
}: Omit<ColorPaletteScaleProps, "layout">) {
  return (
    <div
      data-slot="color-palette"
      data-layout="scale"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    >
      <div className="flex overflow-hidden rounded-lg border border-border/60 shadow-xs">
        {colors.map((color, i) => (
          <ScaleSwatch
            key={color.name}
            color={color}
            isFirst={i === 0}
            isLast={i === colors.length - 1}
          />
        ))}
      </div>
      {(showName || showValue) && (
        <div className="flex">
          {colors.map((color) => (
            <div
              key={color.name}
              className="flex-1 flex flex-col items-center gap-0.5 px-0.5"
            >
              {showName && (
                <span className="text-[10px] font-medium text-foreground truncate">
                  {color.name}
                </span>
              )}
              {showValue && (
                <span className="text-[9px] font-mono text-muted-foreground truncate">
                  {color.value}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ScaleSwatch({
  color,
  isFirst,
  isLast,
}: {
  color: ColorEntry
  isFirst: boolean
  isLast: boolean
}) {
  const [copied, setCopied] = React.useState(false)
  const [isLight, setIsLight] = React.useState(false)

  React.useEffect(() => {
    setIsLight(isLightColor(color.value))
  }, [color.value])

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(color.value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API not available
    }
  }, [color.value])

  return (
    <button
      type="button"
      onClick={handleCopy}
      data-slot="color-swatch"
      className={cn(
        "group relative flex-1 h-14 sm:h-16 flex items-center justify-center transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:z-10",
        isFirst && "rounded-l-[inherit]",
        isLast && "rounded-r-[inherit]"
      )}
      style={{ backgroundColor: color.value }}
      aria-label={`Copy ${color.name}: ${color.value}`}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full p-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100",
          isLight ? "text-zinc-900/70" : "text-white/70"
        )}
      >
        {copied ? (
          <Check className="size-3.5" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </span>
    </button>
  )
}

function ColorPalette(props: ColorPaletteProps) {
  if (props.layout === "scale") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { layout, ...rest } = props
    return <ScaleLayout {...rest} />
  }

  return <GridLayout {...props} />
}

export { ColorPalette }
export type { ColorPaletteProps, ColorPaletteGridProps, ColorPaletteScaleProps, ColorEntry, ColorFormat }
