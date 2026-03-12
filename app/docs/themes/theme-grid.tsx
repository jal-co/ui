"use client"

import * as React from "react"
import { Check } from "lucide-react"
import {
  jsonThemes,
  type JsonColorTheme,
} from "@/registry/json-viewer/lib/themes"
import { track } from "@/lib/analytics"

const themeEntries = Object.entries(jsonThemes) as [string, JsonColorTheme][]

function DefaultSwatch() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border/60 text-left">
      <div className="flex items-center gap-[3px] bg-card px-2.5 py-2 font-mono text-[10px] leading-tight">
        <span className="text-muted-foreground">{"{"}</span>
        <span className="text-violet-600 dark:text-violet-400">
          &quot;k&quot;
        </span>
        <span className="text-muted-foreground">:</span>
        <span className="text-emerald-600 dark:text-emerald-400">
          &quot;v&quot;
        </span>
        <span className="text-muted-foreground">,</span>
        <span className="text-violet-600 dark:text-violet-400">
          &quot;n&quot;
        </span>
        <span className="text-muted-foreground">:</span>
        <span className="text-sky-600 dark:text-sky-400">42</span>
        <span className="text-muted-foreground">,</span>
        <span className="text-violet-600 dark:text-violet-400">
          &quot;b&quot;
        </span>
        <span className="text-muted-foreground">:</span>
        <span className="text-amber-600 dark:text-amber-400">true</span>
        <span className="text-muted-foreground">{"}"}</span>
      </div>
      <div className="flex items-center gap-1 border-t border-border/40 px-2.5 py-1.5">
        <span className="truncate text-[11px] font-medium text-foreground">
          Default
        </span>
        <span className="ml-auto text-[10px] text-muted-foreground">
          no theme
        </span>
      </div>
    </div>
  )
}

function ThemeSwatch({
  name,
  theme,
}: {
  name: string
  theme: JsonColorTheme
}) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(name).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
      track("theme_name_copied", { theme_name: name })
    })
  }, [name])

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy theme name: ${name}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border/60 text-left transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div
        className="flex items-center gap-[3px] px-2.5 py-2 font-mono text-[10px] leading-tight"
        style={{ backgroundColor: theme.bg, color: theme.fg }}
      >
        <span style={{ color: theme.punctuation }}>{"{"}</span>
        <span style={{ color: theme.key }}>&quot;k&quot;</span>
        <span style={{ color: theme.punctuation }}>:</span>
        <span style={{ color: theme.string }}>&quot;v&quot;</span>
        <span style={{ color: theme.punctuation }}>,</span>
        <span style={{ color: theme.key }}>&quot;n&quot;</span>
        <span style={{ color: theme.punctuation }}>:</span>
        <span style={{ color: theme.number }}>42</span>
        <span style={{ color: theme.punctuation }}>,</span>
        <span style={{ color: theme.key }}>&quot;b&quot;</span>
        <span style={{ color: theme.punctuation }}>:</span>
        <span style={{ color: theme.boolean }}>true</span>
        <span style={{ color: theme.punctuation }}>{"}"}</span>
      </div>
      <div className="flex items-center justify-between gap-1 border-t border-border/40 px-2.5 py-1.5">
        <span className="truncate text-[11px] font-medium text-foreground">
          {name}
        </span>
        {copied && <Check className="size-3 shrink-0 text-emerald-500" />}
      </div>
    </button>
  )
}

export function ThemeGrid() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      <DefaultSwatch />
      {themeEntries.map(([name, theme]) => (
        <ThemeSwatch key={name} name={name} theme={theme} />
      ))}
    </div>
  )
}
