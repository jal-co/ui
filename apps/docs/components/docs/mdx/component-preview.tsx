import * as React from "react"
import { Index } from "@/registry/__index__"
import { ComponentPreviewClient } from "./component-preview-client"

interface ComponentPreviewProps {
  name: string
  className?: string
  align?: "center" | "start" | "end"
}

export function ComponentPreview({
  name,
  className,
  align = "center",
}: ComponentPreviewProps) {
  const entry = Index[name]
  const Component = entry?.component

  if (!Component) {
    return (
      <p className="text-sm text-muted-foreground">
        Component{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    )
  }

  return (
    <ComponentPreviewClient className={className} align={align}>
      {React.createElement(Component)}
    </ComponentPreviewClient>
  )
}
