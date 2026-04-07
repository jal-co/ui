"use client"

import * as React from "react"
import {
  usePretextWithSegments,
  usePretextLayout,
  useShrinkwrap,
  useBalancedWidth,
} from "@/registry/pretext/use-pretext"

const SAMPLE_TEXT =
  "Pretext measures text without the DOM. Pure arithmetic, accurate for CJK, Arabic, emoji, and everything else."
const FONT = "14px ui-sans-serif, system-ui, sans-serif"
const LINE_HEIGHT = 20

export default function PretextDemo() {
  const [mounted, setMounted] = React.useState(false)
  const [width, setWidth] = React.useState(280)
  React.useEffect(() => { setMounted(true) }, [])

  const prepared = usePretextWithSegments(SAMPLE_TEXT, FONT)
  const layoutResult = usePretextLayout(prepared, width, LINE_HEIGHT)
  const shrinkwrapped = useShrinkwrap(prepared, width)
  const balanced = useBalancedWidth(prepared, width)

  if (!mounted) return <div className="h-[260px]" />

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">
          Max width
        </label>
        <input
          type="range"
          min={120}
          max={500}
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          className="flex-1"
        />
        <span className="text-xs tabular-nums text-muted-foreground w-12 text-right">
          {width}px
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
          <p className="text-2xl font-bold tabular-nums">{layoutResult.lineCount}</p>
          <p className="text-[11px] text-muted-foreground">Lines</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
          <p className="text-2xl font-bold tabular-nums">{shrinkwrapped}</p>
          <p className="text-[11px] text-muted-foreground">Shrinkwrap</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
          <p className="text-2xl font-bold tabular-nums">{balanced}</p>
          <p className="text-[11px] text-muted-foreground">Balanced</p>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Max width ({width}px)
          </p>
          <p
            className="rounded-md border border-border/60 bg-card p-2 text-sm leading-5"
            style={{ maxWidth: width }}
          >
            {SAMPLE_TEXT}
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Shrinkwrap ({shrinkwrapped}px)
          </p>
          <p
            className="rounded-md border border-primary/30 bg-primary/5 p-2 text-sm leading-5"
            style={{ width: shrinkwrapped }}
          >
            {SAMPLE_TEXT}
          </p>
        </div>
      </div>
    </div>
  )
}
