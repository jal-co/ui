"use client"

/**
 * jalco-ui
 * ComponentPlayground
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Interactive prop editor embedded in component docs pages.
 * Renders a live preview, prop controls, and a copyable code snippet.
 */

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface BooleanControl {
  name: string
  type: "boolean"
  label?: string
  default?: boolean
}

interface SelectControl {
  name: string
  type: "select"
  label?: string
  options: string[]
  default?: string
}

interface NumberControl {
  name: string
  type: "number"
  label?: string
  default?: number
  min?: number
  max?: number
  step?: number
}

interface TextControl {
  name: string
  type: "text"
  label?: string
  default?: string
  placeholder?: string
}

interface PresetControl {
  name: string
  type: "preset"
  label?: string
  /** Named presets. The `label` is shown in the UI, `value` is passed to the component, and `code` (if provided) is used in the generated snippet. */
  presets: { label: string; value: unknown; code?: string }[]
  default?: string
}

export type PlaygroundControl =
  | BooleanControl
  | SelectControl
  | NumberControl
  | TextControl
  | PresetControl

interface ComponentPlaygroundProps {
  /** Prop controls shown in the sidebar panel. */
  controls: PlaygroundControl[]
  /** Component display name for the code snippet (e.g. "GitHubStarsButton"). */
  componentName: string
  /** Import path for the code snippet (e.g. "@/components/github-stars-button"). */
  importPath: string
  /** Props that are always applied but not editable (e.g. data, owner, repo). */
  staticProps?: Record<string, unknown>
  /** Prop names to exclude from the generated code snippet (e.g. pre-fetched data). */
  hideFromCode?: string[]
  /** Render the component with the current prop values. */
  render: (props: Record<string, unknown>) => React.ReactNode
  className?: string
}

function formatPropValue(value: unknown): string {
  if (typeof value === "string") return `"${value}"`
  if (typeof value === "boolean") return String(value)
  if (typeof value === "number") return String(value)
  if (Array.isArray(value)) {
    return `[${value.map((v) => formatPropValue(v)).join(", ")}]`
  }
  if (typeof value === "object" && value !== null) {
    return JSON.stringify(value)
  }
  return String(value)
}

function generateCode(
  componentName: string,
  importPath: string,
  staticProps: Record<string, unknown>,
  dynamicProps: Record<string, unknown>,
  controls: PlaygroundControl[],
  hideFromCode?: Set<string>
): string {
  const allProps = { ...staticProps, ...dynamicProps }

  const defaultMap = new Map<string, unknown>()
  for (const c of controls) {
    if (c.default !== undefined) {
      defaultMap.set(c.name, c.default)
    }
  }

  const presetMap = new Map<string, PresetControl>()
  for (const c of controls) {
    if (c.type === "preset") presetMap.set(c.name, c)
  }

  const propEntries: string[] = []
  for (const [key, value] of Object.entries(allProps)) {
    if (hideFromCode?.has(key)) continue
    if (value === undefined || value === null) continue
    if (value === false) continue

    const isDefault = defaultMap.has(key) && defaultMap.get(key) === value
    if (isDefault && !(key in staticProps)) continue

    const preset = presetMap.get(key)
    if (preset) {
      const selected = preset.presets.find((p) => p.label === value)
      if (selected?.code) {
        propEntries.push(`${key}={${selected.code}}`)
      }
      continue
    }

    if (value === true) {
      propEntries.push(key)
    } else if (typeof value === "string") {
      propEntries.push(`${key}=${formatPropValue(value)}`)
    } else {
      propEntries.push(`${key}={${formatPropValue(value)}}`)
    }
  }

  const propsStr = propEntries.length > 0 ? ` ${propEntries.join(" ")}` : ""

  return `import { ${componentName} } from "${importPath}"\n\n<${componentName}${propsStr} />`
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? (
        <Check className="size-3.5 text-emerald-500" />
      ) : (
        <Copy className="size-3.5" />
      )}
    </button>
  )
}

function ControlRow({
  control,
  value,
  onChange,
}: {
  control: PlaygroundControl
  value: unknown
  onChange: (value: unknown) => void
}) {
  const label = control.label ?? control.name

  switch (control.type) {
    case "boolean":
      return (
        <label className="flex items-center justify-between gap-3">
          <span className="text-sm text-muted-foreground">{label}</span>
          <button
            type="button"
            role="switch"
            aria-checked={!!value}
            onClick={() => onChange(!value)}
            className={cn(
              "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors",
              value ? "bg-foreground" : "bg-muted-foreground/30"
            )}
          >
            <span
              className={cn(
                "pointer-events-none block size-4 rounded-full bg-background shadow-sm transition-transform",
                value ? "translate-x-[18px]" : "translate-x-[2px]",
                "mt-[2px]"
              )}
            />
          </button>
        </label>
      )

    case "select":
      return (
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-muted-foreground">{label}</span>
          <div className="flex flex-wrap gap-1">
            {control.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onChange(option)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                  value === option
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </label>
      )

    case "number":
      return (
        <label className="flex items-center justify-between gap-3">
          <span className="text-sm text-muted-foreground">{label}</span>
          <input
            type="number"
            value={value as number}
            min={control.min}
            max={control.max}
            step={control.step ?? 1}
            onChange={(e) => onChange(Number(e.target.value))}
            className="h-8 w-20 rounded-md border border-border bg-background px-2.5 text-right text-sm tabular-nums outline-none focus:border-ring focus:ring-1 focus:ring-ring"
          />
        </label>
      )

    case "text":
      return (
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-muted-foreground">{label}</span>
          <input
            type="text"
            value={(value as string) ?? ""}
            placeholder={control.placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="h-8 rounded-md border border-border bg-background px-2.5 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring"
          />
        </label>
      )

    case "preset":
      return (
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-muted-foreground">{label}</span>
          <div className="flex flex-wrap gap-1">
            {control.presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => onChange(preset.label)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                  value === preset.label
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </label>
      )
  }
}

export function ComponentPlayground({
  controls,
  componentName,
  importPath,
  staticProps = {},
  hideFromCode,
  render,
  className,
}: ComponentPlaygroundProps) {
  const [values, setValues] = React.useState<Record<string, unknown>>(() => {
    const initial: Record<string, unknown> = {}
    for (const c of controls) {
      initial[c.name] = c.default ?? (c.type === "boolean" ? false : c.type === "number" ? 0 : "")
    }
    return initial
  })

  function setValue(name: string, value: unknown) {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const resolvedValues = React.useMemo(() => {
    const resolved: Record<string, unknown> = { ...values }
    for (const c of controls) {
      if (c.type === "preset") {
        const selected = c.presets.find((p) => p.label === resolved[c.name])
        if (selected) resolved[c.name] = selected.value
      }
    }
    return resolved
  }, [values, controls])

  const allProps = { ...staticProps, ...resolvedValues }
  const hiddenSet = React.useMemo(
    () => (hideFromCode ? new Set(hideFromCode) : undefined),
    [hideFromCode]
  )
  const code = generateCode(componentName, importPath, staticProps, values, controls, hiddenSet)

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border/60 shadow-sm",
        className
      )}
    >
      <div className="flex flex-col lg:flex-row">
        <div className="flex min-h-[200px] min-w-0 flex-1 items-center justify-center overflow-x-auto border-b border-border/60 p-6 lg:border-b-0 lg:border-r">
          {render(allProps)}
        </div>

        <div className="flex w-full flex-col gap-4 bg-muted/20 p-4 lg:w-72 lg:shrink-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Props
          </p>
          <div className="flex flex-col gap-3">
            {controls.map((control) => (
              <ControlRow
                key={control.name}
                control={control}
                value={values[control.name]}
                onChange={(v) => setValue(control.name, v)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-border/60 bg-muted/10">
        <div className="absolute right-2 top-2 z-10">
          <CopyButton value={code} />
        </div>
        <pre className="overflow-x-auto p-4 pr-12 font-mono text-[13px] leading-relaxed text-muted-foreground">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
