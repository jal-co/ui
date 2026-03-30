import * as React from "react"
import { Index } from "@/registry/__index__"
import { ComponentPreview as BasePreview } from "@/components/docs/component-preview"
interface ComponentPreviewProps {
  /** Registry item or example name (e.g. "status-indicator-demo"). */
  name: string
  className?: string
}

/**
 * MDX wrapper around the real ComponentPreview.
 * Resolves a component from the registry index, finds its source files,
 * and renders the tabbed Preview/Code container.
 */
export async function ComponentPreview({ name, className }: ComponentPreviewProps) {
  const entry = Index[name]

  if (!entry) {
    return (
      <p className="text-sm text-muted-foreground">
        Component <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">{name}</code> not found.
      </p>
    )
  }

  const Component = entry.component
  if (!Component) return null

  // Resolve source files for the Code tab
  const files = (entry.files ?? []).map((f: { path: string }) => f.path).filter(Boolean)

  return (
    <BasePreview files={files} className={className}>
      <React.Suspense
        fallback={<div className="flex items-center text-sm text-muted-foreground">Loading...</div>}
      >
        <Component />
      </React.Suspense>
    </BasePreview>
  )
}
