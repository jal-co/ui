"use client"

/**
 * jalco-ui
 * AiCopyButton
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Split button with a primary copy action and a dropdown of AI destinations.
 * Copy page content, view as markdown, or open in v0, ChatGPT, Claude, or Gemini.
 *
 * Props:
 * - value: string content to copy or send
 * - label?: primary button label (defaults to "Copy")
 * - targets?: array of AI targets to show in the dropdown
 * - variant?: visual style variant
 * - size?: button size
 * - brandColors?: render dropdown icons in official brand colors
 * - onCopy?: callback after copy
 *
 * Dependencies: radix-ui (DropdownMenu), lucide-react, class-variance-authority
 */

import * as React from "react"
import { Check, ChevronDown, Copy } from "lucide-react"
import { DropdownMenu } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Brand icons (not available in lucide-react)

type IconProps = React.SVGProps<SVGSVGElement>

function V0Icon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 40 20" fill="none" className={cn("size-4", className)} aria-hidden="true" {...props}>
      <path d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z" fill="currentColor" />
      <path d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z" fill="currentColor" />
    </svg>
  )
}

function OpenAIIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 260" className={cn("size-4", className)} aria-hidden="true" {...props}>
      <path fill="currentColor" d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z" />
    </svg>
  )
}

function ClaudeIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 257" className={cn("size-4", className)} aria-hidden="true" {...props}>
      <path fill="currentColor" d="m50.228 170.321 50.357-28.257.843-2.463-.843-1.361h-2.462l-8.426-.518-28.775-.778-24.952-1.037-24.175-1.296-6.092-1.297L0 125.796l.583-3.759 5.12-3.434 7.324.648 16.202 1.101 24.304 1.685 17.629 1.037 26.118 2.722h4.148l.583-1.685-1.426-1.037-1.101-1.037-25.147-17.045-27.22-18.017-14.258-10.37-7.713-5.25-3.888-4.925-1.685-10.758 7-7.713 9.397.649 2.398.648 9.527 7.323 20.35 15.75L94.817 91.9l3.889 3.24 1.555-1.102.195-.777-1.75-2.917-14.453-26.118-15.425-26.572-6.87-11.018-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0 82.05 1.426l4.472 3.888 6.61 15.101 10.694 23.786 16.591 32.34 4.861 9.592 2.592 8.879.973 2.722h1.685v-1.556l1.36-18.211 2.528-22.36 2.463-28.776.843-8.1 4.018-9.722 7.971-5.25 6.222 2.981 5.12 7.324-.713 4.73-3.046 19.768-5.962 30.98-3.889 20.739h2.268l2.593-2.593 10.499-13.934 17.628-22.036 7.778-8.749 9.073-9.657 5.833-4.601h11.018l8.1 12.055-3.628 12.443-11.342 14.388-9.398 12.184-13.48 18.147-8.426 14.518.778 1.166 2.01-.194 30.46-6.481 16.462-2.982 19.637-3.37 8.88 4.148.971 4.213-3.5 8.62-20.998 5.184-24.628 4.926-36.682 8.685-.454.324.519.648 16.526 1.555 7.065.389h17.304l32.21 2.398 8.426 5.574 5.055 6.805-.843 5.184-12.962 6.611-17.498-4.148-40.83-9.721-14-3.5h-1.944v1.167l11.666 11.406 21.387 19.314 26.767 24.887 1.36 6.157-3.434 4.86-3.63-.518-23.526-17.693-9.073-7.972-20.545-17.304h-1.36v1.814l4.73 6.935 25.017 37.59 1.296 11.536-1.814 3.76-6.481 2.268-7.13-1.297-14.647-20.544-15.1-23.138-12.185-20.739-1.49.843-7.194 77.448-3.37 3.953-7.778 2.981-6.48-4.925-3.436-7.972 3.435-15.749 4.148-20.544 3.37-16.333 3.046-20.285 1.815-6.74-.13-.454-1.49.194-15.295 20.999-23.267 31.433-18.406 19.702-4.407 1.75-7.648-3.954.713-7.064 4.277-6.286 25.47-32.405 15.36-20.092 9.917-11.6-.065-1.686h-.583L44.07 198.125l-12.055 1.555-5.185-4.86.648-7.972 2.463-2.593 20.35-13.999-.064.065Z" />
    </svg>
  )
}

function GeminiIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 296 298" fill="none" className={cn("size-4", className)} aria-hidden="true" {...props}>
      <path fill="currentColor" d="M141.201 4.886c2.282-6.17 11.042-6.071 13.184.148l5.985 17.37a184.004 184.004 0 0 0 111.257 113.049l19.304 6.997c6.143 2.227 6.156 10.91.02 13.155l-19.35 7.082a184.001 184.001 0 0 0-109.495 109.385l-7.573 20.629c-2.241 6.105-10.869 6.121-13.133.025l-7.908-21.296a184 184 0 0 0-109.02-108.658l-19.698-7.239c-6.102-2.243-6.118-10.867-.025-13.132l20.083-7.467A183.998 183.998 0 0 0 133.291 26.28l7.91-21.394Z" />
    </svg>
  )
}

function MarkdownIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 208 128" className={cn("size-4", className)} aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="10" d="M15 5h178a10 10 0 0 1 10 10v98a10 10 0 0 1-10 10H15a10 10 0 0 1-10-10V15A10 10 0 0 1 15 5z" />
      <path fill="currentColor" d="M30 98V30h20l20 25 20-25h20v68H90V59L70 84 50 59v39H30zm125 0-30-33h20V30h20v35h20l-30 33z" />
    </svg>
  )
}

// Targets

type BuiltInTarget =
  | "markdown"
  | "v0"
  | "chatgpt"
  | "claude"
  | "gemini"

interface AiTarget {
  /** Unique key for this target. */
  id: string
  /** Display label in the dropdown. */
  label: string
  /** Icon element rendered before the label. */
  icon: React.ReactNode
  /** Brand color class applied when `brandColors` is enabled. */
  brandColorClass?: string
  /**
   * Action when selected.
   * - `"copy"` — copies `value` to clipboard (default)
   * - `"url"` — opens a URL in a new tab (use `getUrl` to provide the URL)
   * - A callback function receiving the value
   */
  action?: "copy" | "url" | ((value: string) => void)
  /** URL builder for `action: "url"`. Receives the value string. */
  getUrl?: (value: string) => string
}

const builtInTargets: Record<BuiltInTarget, AiTarget> = {
  markdown: {
    id: "markdown",
    label: "View as Markdown",
    icon: <MarkdownIcon />,
    action: "copy",
  },
  v0: {
    id: "v0",
    label: "Open in v0",
    icon: <V0Icon />,
    brandColorClass: "text-foreground",
    action: "url",
    getUrl: (value) =>
      `https://v0.dev/chat?q=${encodeURIComponent(value)}`,
  },
  chatgpt: {
    id: "chatgpt",
    label: "Open in ChatGPT",
    icon: <OpenAIIcon />,
    brandColorClass: "text-[#10A37F]",
    action: "url",
    getUrl: (value) =>
      `https://chatgpt.com/?q=${encodeURIComponent(value)}`,
  },
  claude: {
    id: "claude",
    label: "Open in Claude",
    icon: <ClaudeIcon />,
    brandColorClass: "text-[#D97757]",
    action: "url",
    getUrl: (value) =>
      `https://claude.ai/new?q=${encodeURIComponent(value)}`,
  },
  gemini: {
    id: "gemini",
    label: "Open in Gemini",
    icon: <GeminiIcon />,
    brandColorClass: "text-[#4285F4]",
    action: "url",
    getUrl: (value) =>
      `https://gemini.google.com/app?q=${encodeURIComponent(value)}`,
  },
}

function resolveTargets(
  targets: (BuiltInTarget | AiTarget)[]
): AiTarget[] {
  return targets.map((t) =>
    typeof t === "string" ? builtInTargets[t] : t
  )
}

const defaultTargets: (BuiltInTarget | AiTarget)[] = [
  "markdown",
  "v0",
  "chatgpt",
  "claude",
  "gemini",
]

// Variants

const aiCopyButtonVariants = cva(
  "inline-flex items-center shrink-0 whitespace-nowrap font-medium transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        default:
          "border border-border bg-muted/50 text-muted-foreground shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary:
          "border border-transparent bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        outline:
          "border border-border bg-background text-foreground shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        ghost:
          "text-muted-foreground hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        primary:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
      },
      size: {
        sm: "h-7 text-xs",
        default: "h-8 text-sm",
        lg: "h-9 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Component

interface AiCopyButtonProps
  extends Omit<React.ComponentProps<"div">, "children">,
    VariantProps<typeof aiCopyButtonVariants> {
  /** The string content to copy or send to AI targets. */
  value: string
  /** Primary button label. Defaults to "Copy". */
  label?: string
  /** AI targets shown in the dropdown. Accepts built-in keys or custom target objects. */
  targets?: (BuiltInTarget | AiTarget)[]
  /** Render dropdown icons in their official brand colors. */
  brandColors?: boolean
  /** Callback fired after the primary copy action completes. */
  onCopy?: () => void
}

function AiCopyButton({
  value,
  label = "Copy",
  targets = defaultTargets,
  brandColors = false,
  variant,
  size,
  onCopy,
  className,
  ...props
}: AiCopyButtonProps) {
  const [copied, setCopied] = React.useState(false)
  const resolved = resolveTargets(targets)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      onCopy?.()
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API may be unavailable in insecure contexts
    }
  }

  function handleTarget(target: AiTarget) {
    if (target.action === "url" && target.getUrl) {
      window.open(target.getUrl(value), "_blank", "noopener,noreferrer")
    } else if (typeof target.action === "function") {
      target.action(value)
    } else {
      // default: copy
      handleCopy()
    }
  }

  const sizeClasses = {
    sm: {
      main: "gap-1.5 px-2.5 [&_svg]:size-3",
      divider: "h-3.5",
      trigger: "px-1.5 [&_svg]:size-3",
    },
    default: {
      main: "gap-2 px-3 [&_svg]:size-3.5",
      divider: "h-4",
      trigger: "px-2 [&_svg]:size-3.5",
    },
    lg: {
      main: "gap-2 px-3.5 [&_svg]:size-4",
      divider: "h-4",
      trigger: "px-2.5 [&_svg]:size-4",
    },
  }

  const s = sizeClasses[size ?? "default"]

  return (
    <div
      data-slot="ai-copy-button"
      className={cn(
        "inline-flex items-center",
        aiCopyButtonVariants({ variant, size }),
        "rounded-md p-0",
        className
      )}
      {...props}
    >
      {/* Primary copy button */}
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "inline-flex h-full items-center rounded-l-md outline-none transition-colors",
          "hover:bg-black/5 dark:hover:bg-white/5",
          s.main
        )}
        aria-label={copied ? "Copied" : `${label} to clipboard`}
      >
        {copied ? (
          <Check className="text-emerald-500" />
        ) : (
          <Copy />
        )}
        <span>{copied ? "Copied" : label}</span>
      </button>

      {/* Divider */}
      <span
        className={cn("w-px shrink-0 bg-border/60", s.divider)}
        aria-hidden="true"
      />

      {/* Dropdown trigger */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            className={cn(
              "inline-flex h-full items-center justify-center rounded-r-md outline-none transition-colors",
              "hover:bg-black/5 dark:hover:bg-white/5",
              s.trigger
            )}
            aria-label="More options"
          >
            <ChevronDown />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            side="bottom"
            align="end"
            sideOffset={6}
            className={cn(
              "z-50 min-w-[180px] overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md",
              "animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
            )}
          >
            {resolved.map((target) => (
              <DropdownMenu.Item
                key={target.id}
                onSelect={() => handleTarget(target)}
                className={cn(
                  "flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm outline-none transition-colors",
                  "focus:bg-accent focus:text-accent-foreground",
                  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                )}
              >
                <span className={cn(
                  "flex size-4 shrink-0 items-center justify-center",
                  brandColors && target.brandColorClass
                    ? target.brandColorClass
                    : "text-muted-foreground"
                )}>
                  {target.icon}
                </span>
                {target.label}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}

export {
  AiCopyButton,
  aiCopyButtonVariants,
  builtInTargets,
  type AiCopyButtonProps,
  type AiTarget,
  type BuiltInTarget,
}
