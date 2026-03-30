import * as React from "react"
import { highlightCode } from "@/lib/highlight-code"
import { readRegistryFileSource } from "@/lib/registry"
import { CodeBlockCopyButton } from "@/components/docs/code-block-copy-button"
import { ComponentPreviewTabs } from "@/components/docs/component-preview-tabs"
import { cn } from "@/lib/utils"

interface SourceFile {
  name: string
  code: string
  language?: string
}

interface ComponentPreviewBaseProps {
  /** The live rendered component. */
  children: React.ReactNode
  /** Additional class names on the preview container. */
  className?: string
}

interface WithCode extends ComponentPreviewBaseProps {
  /** Inline code string for the "Code" tab. */
  code: string
  /** Language for syntax highlighting (used with `code`). */
  language?: string
  files?: never
}

interface WithFiles extends ComponentPreviewBaseProps {
  /**
   * Registry file paths to read from disk and display as tabbed source.
   * Each entry is either a path string or `{ path, name?, language? }`.
   */
  files: (string | { path: string; name?: string; language?: string })[]
  code?: never
  language?: never
}

type ComponentPreviewProps = WithCode | WithFiles

/**
 * Tabbed preview/code container for component docs.
 *
 * Two modes:
 * - `code` — pass a code string directly (good for usage examples)
 * - `files` — pass registry file paths to read source from disk (good for the main component preview)
 *
 * Server component — highlights code at build time, then hands the
 * pre-rendered panels to the client-side tab switcher.
 */
export async function ComponentPreview(props: ComponentPreviewProps) {
  const { children, className } = props

  // Resolve source files
  let sources: SourceFile[]

  if ("files" in props && props.files) {
    sources = props.files.map((entry) => {
      const path = typeof entry === "string" ? entry : entry.path
      const name =
        (typeof entry === "object" ? entry.name : undefined) ??
        path.split("/").pop() ??
        path
      const ext = name.split(".").pop() ?? "tsx"
      const language =
        (typeof entry === "object" ? entry.language : undefined) ??
        (ext === "ts" ? "ts" : ext === "css" ? "css" : "tsx")
      const code = readRegistryFileSource(path)
      return { name, code, language }
    })
  } else {
    sources = [
      {
        name: "Code",
        code: props.code,
        language: props.language ?? "tsx",
      },
    ]
  }

  // Highlight all sources in parallel
  const highlighted = await Promise.all(
    sources.map(async (src) => ({
      ...src,
      html: await highlightCode(src.code.trim(), src.language ?? "tsx"),
    }))
  )

  const previewPanel = (
    <div className={cn("flex items-center justify-center p-6", className)}>
      {children}
    </div>
  )

  const codePanels = highlighted.map((src) => ({
    name: src.name,
    code: src.code.trim(),
    panel: (
      <div key={src.name} className="relative">
        <div className="absolute right-2 top-2 z-10">
          <CodeBlockCopyButton value={src.code.trim()} />
        </div>
        <div className="overflow-x-auto bg-[var(--shiki-light-bg)] dark:bg-[var(--shiki-dark-bg)]">
          <div
            className="code-block [&_code]:font-mono [&_code]:text-[13px] [&_pre]:m-0 [&_pre]:overflow-x-auto [&_pre]:bg-transparent [&_pre]:p-4 [&_pre]:sm:p-5"
            dangerouslySetInnerHTML={{ __html: src.html }}
          />
        </div>
      </div>
    ),
  }))

  return (
    <ComponentPreviewTabs
      previewPanel={previewPanel}
      codePanels={codePanels}
    />
  )
}
