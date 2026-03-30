/**
 * jalco-ui
 * Kbd
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Keyboard shortcut key rendered as a styled keycap. Three visual profiles
 * inspired by real keycap shapes: flat, raised, and sculpted. Optional color
 * schemes inspired by popular keycap sets.
 *
 * Props:
 * - children: key label (e.g. "⌘", "K", "Shift")
 * - variant: "flat" | "raised" | "sculpted" (default "raised")
 * - size: "sm" | "md" | "lg" (default "md")
 * - colorScheme: named palette or custom { bg, text, border } object
 * - className: additional CSS classes
 *
 * Compose multiple <Kbd> elements inline for key combos.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

interface KbdColorScheme {
  bg: string
  text: string
  border: string
}

const builtInSchemes: Record<string, KbdColorScheme> = {
  dolch: { bg: "#2D2D2D", text: "#868686", border: "#1A1A1A" },
  olivia: { bg: "#1C1C1C", text: "#E8B4B8", border: "#111111" },
  botanical: { bg: "#D5C4A1", text: "#2D4A3E", border: "#B8A88A" },
  oblivion: { bg: "#36393E", text: "#868B8E", border: "#25272B" },
  "8008": { bg: "#333333", text: "#F472B6", border: "#222222" },
  laser: { bg: "#2B1B54", text: "#FF71CE", border: "#1A1040" },
  mizu: { bg: "#E8E8E8", text: "#2E5D8A", border: "#CFCFCF" },
  dracula: { bg: "#282A36", text: "#F8F8F2", border: "#1A1B24" },
  hammerhead: { bg: "#1A1A2E", text: "#16C79A", border: "#0F0F1E" },
  wob: { bg: "#1A1A1A", text: "#FFFFFF", border: "#0D0D0D" },
  bow: { bg: "#F5F5F5", text: "#1A1A1A", border: "#DCDCDC" },
  cream: { bg: "#F5E6C8", text: "#5C4A32", border: "#E0D0B0" },
}

type BuiltInColorScheme = keyof typeof builtInSchemes

function resolveScheme(
  scheme: BuiltInColorScheme | KbdColorScheme | undefined
): KbdColorScheme | null {
  if (!scheme) return null
  if (typeof scheme === "string") return builtInSchemes[scheme] ?? null
  return scheme
}

const kbdVariants = cva(
  "inline-flex items-center justify-center font-mono font-medium leading-none select-none",
  {
    variants: {
      variant: {
        flat: ["rounded-md border border-border/80 bg-transparent text-foreground/80"],
        raised: [
          "rounded-md border border-border bg-muted/60 text-foreground",
          "border-b-[2px] border-b-border",
          "shadow-[0_1px_0_0_var(--color-border),inset_0_1px_0_0_rgba(255,255,255,0.06)]",
        ],
        sculpted: [
          "rounded-lg text-foreground",
          "border border-border/80 border-b-[3px] border-b-border",
          "bg-gradient-to-b from-muted/80 to-muted/40",
          "shadow-[0_2px_0_0_var(--color-border),0_3px_6px_-2px_rgba(0,0,0,0.15),inset_0_1px_0_0_rgba(255,255,255,0.1)]",
        ],
      },
      size: {
        sm: "min-h-5 min-w-5 px-1 text-[10px]",
        md: "min-h-6 min-w-6 px-1.5 text-[11px]",
        lg: "min-h-8 min-w-8 px-2 text-xs",
      },
    },
    defaultVariants: {
      variant: "raised",
      size: "md",
    },
  }
)

type KbdVariantProps = VariantProps<typeof kbdVariants>

interface KbdProps
  extends React.ComponentProps<"kbd">,
    KbdVariantProps {
  /** Named color scheme or custom { bg, text, border } palette. */
  colorScheme?: BuiltInColorScheme | KbdColorScheme
}

function colorStyles(
  scheme: KbdColorScheme | null,
  variant: KbdVariantProps["variant"]
): React.CSSProperties | undefined {
  if (!scheme) return undefined

  const base: React.CSSProperties = {
    color: scheme.text,
    borderColor: scheme.border,
  }

  if (variant === "flat") {
    return { ...base, background: "transparent" }
  }

  if (variant === "sculpted") {
    return {
      ...base,
      background: `linear-gradient(to bottom, ${scheme.bg}, ${scheme.border})`,
      borderBottomColor: scheme.border,
      boxShadow: `0 2px 0 0 ${scheme.border}, 0 3px 6px -2px rgba(0,0,0,0.25), inset 0 1px 0 0 rgba(255,255,255,0.1)`,
    }
  }

  // raised
  return {
    ...base,
    background: scheme.bg,
    borderBottomColor: scheme.border,
    boxShadow: `0 1px 0 0 ${scheme.border}, inset 0 1px 0 0 rgba(255,255,255,0.06)`,
  }
}

function Kbd({
  children,
  variant,
  size,
  colorScheme,
  className,
  style,
  ...props
}: KbdProps) {
  const resolved = resolveScheme(colorScheme)

  return (
    <kbd
      data-slot="kbd"
      className={cn(kbdVariants({ variant, size }), className)}
      style={{ ...colorStyles(resolved, variant), ...style }}
      {...props}
    >
      {children}
    </kbd>
  )
}

interface KbdComboProps {
  /** Array of key labels to render as a combo (e.g. ["⌘", "Shift", "K"]). */
  keys: string[]
  /** Separator between keys. Defaults to no separator (keys are adjacent). */
  separator?: React.ReactNode
  variant?: KbdVariantProps["variant"]
  size?: KbdVariantProps["size"]
  /** Named color scheme or custom { bg, text, border } palette. */
  colorScheme?: BuiltInColorScheme | KbdColorScheme
  className?: string
}

function KbdCombo({
  keys,
  separator,
  variant,
  size,
  colorScheme,
  className,
}: KbdComboProps) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      {keys.map((key, i) => (
        <React.Fragment key={i}>
          {i > 0 && separator !== undefined && (
            <span className="text-[10px] text-muted-foreground/60">
              {separator}
            </span>
          )}
          <Kbd variant={variant} size={size} colorScheme={colorScheme}>
            {key}
          </Kbd>
        </React.Fragment>
      ))}
    </span>
  )
}

export { Kbd, KbdCombo, kbdVariants, builtInSchemes }
export type { KbdProps, KbdComboProps, KbdColorScheme, BuiltInColorScheme }
