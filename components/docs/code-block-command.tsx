"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { track } from "@/lib/analytics"
import { PackageManagerIcon } from "@/components/icons/package-manager-icons"

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
  /** Pre-fetched SVG markup keyed by package manager name */
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
    track("package_manager_selected", { package_manager: manager })
  }

  async function handleCopy() {
    const command = commands[active]
    if (!command) return
    await navigator.clipboard.writeText(command)
    const isInstall = command.includes("shadcn") && command.includes("add")
    track(isInstall ? "component_installed" : "code_copied", {
      command,
      package_manager: active,
      component: isInstall ? command.split("/r/")[1]?.replace(".json", "") : undefined,
    })
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
      <div className="overflow-x-auto px-4 py-3">
        <pre className="m-0">
          <code className="font-mono text-[13px] text-foreground">
            <span className="select-none text-muted-foreground">$ </span>
            {currentCommand}
          </code>
        </pre>
      </div>
    </div>
  )
}
