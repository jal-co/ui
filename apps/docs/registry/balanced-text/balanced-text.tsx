/**
 * jalco-ui
 * BalancedText
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Text wrapper that uses Pretext to balance line widths so all lines
 * are roughly equal length. CSS `text-wrap: balance` only works up
 * to ~6 lines and is inconsistent cross-browser. This is deterministic
 * and works on any length.
 *
 * Dependencies: @chenglou/pretext (via pretext registry item)
 *
 * Powered by Pretext by Cheng Lou — github.com/chenglou/pretext
 */

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  usePretextWithSegments,
  useBalancedWidth,
} from "@/registry/pretext/use-pretext"

interface BalancedTextProps extends React.ComponentProps<"div"> {
  /** The text string to balance. */
  text: string
  /** CSS font shorthand for Pretext measurement. Must match the rendered font.
   * @default '16px ui-sans-serif, system-ui, sans-serif' */
  font?: string
  /** Maximum width in pixels. The balanced width will never exceed this. @default 600 */
  maxWidth?: number
  /** HTML element to render as. @default "p" */
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div"
}

const DEFAULT_FONT = "16px ui-sans-serif, system-ui, sans-serif"
const DEFAULT_MAX_WIDTH = 600

function BalancedText({
  text,
  font = DEFAULT_FONT,
  maxWidth = DEFAULT_MAX_WIDTH,
  as: Tag = "p",
  className,
  style,
  ...props
}: BalancedTextProps) {
  const prepared = usePretextWithSegments(text, font)
  const balancedWidth = useBalancedWidth(prepared, maxWidth)

  return (
    <Tag
      data-slot="balanced-text"
      className={cn(className)}
      style={{ maxWidth: balancedWidth || maxWidth, ...style }}
      {...props}
    >
      {text}
    </Tag>
  )
}

export { BalancedText, type BalancedTextProps }
