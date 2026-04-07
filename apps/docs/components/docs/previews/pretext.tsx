"use client"

import * as React from "react"
import {
  usePretextWithSegments,
  usePretextLayout,
  useShrinkwrap,
} from "@/registry/pretext/use-pretext"

const TEXT = "Pure arithmetic text measurement for layouts at any width."
const FONT = "14px ui-sans-serif, system-ui, sans-serif"

export default function PretextPreview() {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])

  const prepared = usePretextWithSegments(TEXT, FONT)
  const result = usePretextLayout(prepared, 200, 20)
  const shrink = useShrinkwrap(prepared, 200)

  if (!mounted) return null

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-md border border-border/60 bg-muted/30 p-2">
          <p className="text-lg font-bold tabular-nums">{result.lineCount}</p>
          <p className="text-[10px] text-muted-foreground">Lines</p>
        </div>
        <div className="rounded-md border border-border/60 bg-muted/30 p-2">
          <p className="text-lg font-bold tabular-nums">{result.height}</p>
          <p className="text-[10px] text-muted-foreground">Height</p>
        </div>
        <div className="rounded-md border border-border/60 bg-muted/30 p-2">
          <p className="text-lg font-bold tabular-nums">{shrink}</p>
          <p className="text-[10px] text-muted-foreground">Shrinkwrap</p>
        </div>
      </div>
      <p className="rounded-md border border-border/60 bg-card p-2 text-sm leading-5" style={{ width: shrink }}>
        {TEXT}
      </p>
    </div>
  )
}
