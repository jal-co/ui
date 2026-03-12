"use client"

/**
 * jalco-ui
 * CodeBlockCommand
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Tabbed package manager command block with copy button, persistent tab selection,
 * and optional SVGL-powered icons.
 *
 * Props:
 * - pnpm?: pnpm command string
 * - yarn?: yarn command string
 * - npm?: npm command string
 * - bun?: bun command string
 * - shadcn?: shadcn CLI command string
 * - icons?: pre-fetched SVG markup keyed by manager name
 * - iconStyle?: "none" | "colored" | "muted"
 * - show?: ordered subset of managers to display
 * - colorTheme?: { bg, fg } for editor-style code area coloring
 *
 * Dependencies: lucide-react
 */

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { PackageManagerIcon } from "@/registry/code-block-command/icons/package-manager-icons"

type PackageManager = "pnpm" | "yarn" | "npm" | "bun" | "shadcn"

const STORAGE_KEY = "jalco-ui-pkg-manager"

const managers: PackageManager[] = ["pnpm", "yarn", "npm", "bun", "shadcn"]

type IconStyle = "none" | "colored" | "muted"

interface CodeBlockCommandProps {
  pnpm?: string
  yarn?: string
  npm?: string
  bun?: string
  shadcn?: string
  /** Pre-fetched SVG markup keyed by package manager name. */
  icons?: Partial<Record<PackageManager, string>>
  /**
   * Icon display style:
   * - `"none"` — no icons shown
   * - `"colored"` — full-color icons (default)
   * - `"muted"` — grayscale + reduced opacity icons
   */
  iconStyle?: IconStyle
  /**
   * Which tabs to display, in order. Only managers listed here (that also
   * have a command) will render. When omitted, all managers with a command
   * are shown in the default order.
   *
   * @example ["yarn", "bun", "shadcn"]
   */
  show?: PackageManager[]
  /**
   * Editor color theme for the code area.
   * Provide `{ bg, fg }` hex strings to override the default styling.
   */
  colorTheme?: { bg: string; fg: string }
  className?: string
}

export function CodeBlockCommand({
  pnpm,
  yarn,
  npm,
  bun,
  shadcn,
  icons = {},
  iconStyle = "colored",
  show,
  colorTheme,
  className,
}: CodeBlockCommandProps) {
  const commands: Partial<Record<PackageManager, string>> = {
    ...(pnpm && { pnpm }),
    ...(yarn && { yarn }),
    ...(npm && { npm }),
    ...(bun && { bun }),
    ...(shadcn && { shadcn }),
  }

  const available = (show ?? managers).filter((m) => commands[m])

  const [active, setActive] = React.useState<PackageManager>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY) as PackageManager | null
      if (stored && commands[stored]) return stored
    }
    return available[0] ?? "pnpm"
  })

  const [copied, setCopied] = React.useState(false)

  function handleSelect(manager: PackageManager) {
    setActive(manager)
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, manager)
    }
  }

  async function handleCopy() {
    const command = commands[active]
    if (!command) return
    await navigator.clipboard.writeText(command)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  const currentCommand = commands[active] ?? ""

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/40">
        <div className="flex" role="tablist" aria-label="Package manager">
          {available.map((manager) => (
            <button
              key={manager}
              type="button"
              role="tab"
              aria-selected={active === manager}
              onClick={() => handleSelect(manager)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium transition-colors",
                active === manager
                  ? "border-b-2 border-foreground text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {iconStyle !== "none" && icons[manager] ? (
                <PackageManagerIcon svg={icons[manager]} muted={iconStyle === "muted"} />
              ) : null}
              {manager}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-2.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          aria-label={copied ? "Copied command" : "Copy command"}
        >
          {copied ? (
            <Check className="size-3.5" />
          ) : (
            <Copy className="size-3.5" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div
        className="overflow-x-auto px-4 py-3"
        style={
          colorTheme
            ? { backgroundColor: colorTheme.bg, color: colorTheme.fg }
            : undefined
        }
      >
        <pre className="m-0">
          <code
            className={cn(
              "font-mono text-[13px]",
              !colorTheme && "text-foreground"
            )}
          >
            <span
              className={cn(!colorTheme && "text-muted-foreground")}
              style={
                colorTheme
                  ? { color: `${colorTheme.fg}80`, userSelect: "none" }
                  : { userSelect: "none" }
              }
            >
              ${" "}
            </span>
            {currentCommand}
          </code>
        </pre>
      </div>
    </div>
  )
}
