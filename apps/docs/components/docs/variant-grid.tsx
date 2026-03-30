import * as React from "react"
import { highlightCode } from "@/lib/highlight-code"
import { readRegistryFileSource } from "@/lib/registry"
import { CodeBlockCopyButton } from "@/components/docs/code-block-copy-button"
import { CodeLine } from "@/registry/code-line/code-line"
import { InstallCommand } from "@/components/docs/install-command"
import { VariantGridClient } from "@/components/docs/variant-grid-client"

interface VariantItem {
  /** Label shown above the preview (e.g. "Outline", "Small"). */
  label: string
  /** The live rendered component for this variant. */
  preview: React.ReactNode
  /** Usage code snippet showing the props for this variant. */
  code: string
}

interface VariantGridProps {
  /** Variant items to display. */
  items: VariantItem[]
  /**
   * Registry source file paths to show in the dialog Code tab.
   * Same format as `ComponentPreview`'s `files` prop.
   */
  files: (string | { path: string; name?: string; language?: string })[]
  /**
   * Grid column hint.
   * - `"auto"` — responsive auto-fill (default)
   * - `1` — single column, full width (good for large block components)
   * - `2 | 3 | 4` — fixed column count at sm+
   */
  columns?: "auto" | 1 | 2 | 3 | 4
  /** Stretch preview children to fill the cell width. Good for block-level components like code blocks. */
  fullWidth?: boolean
  /** Registry item name, used to build the install command URL. */
  registryName?: string
  className?: string
}

/**
 * Bento-style grid for showcasing component variants.
 *
 * Server component — reads source files, pre-renders highlighted code
 * panels and InstallCommand at build time, then hands everything to the
 * client shell for dialog interaction.
 */
export async function VariantGrid({
  items,
  files,
  columns = "auto",
  fullWidth = false,
  registryName,
  className,
}: VariantGridProps) {
  // Read and highlight source files (shared across all variants)
  const codePanels = await Promise.all(
    files.map(async (entry) => {
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
      const html = await highlightCode(code.trim(), language)

      return {
        name,
        code: code.trim(),
        panel: (
          <div key={name} className="relative">
            <div className="absolute right-2 top-2 z-10">
              <CodeBlockCopyButton value={code.trim()} />
            </div>
            <div className="bg-[var(--shiki-light-bg)] dark:bg-[var(--shiki-dark-bg)]">
              <div
                className="code-block [&_code]:font-mono [&_code]:text-[11px] [&_code]:break-words [&_code]:whitespace-pre-wrap [&_pre]:m-0 [&_pre]:bg-transparent [&_pre]:p-4 [&_pre]:sm:p-5"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>
        ),
      }
    })
  )

  // Pre-render a CodeLine usage snippet for each variant
  const variants = await Promise.all(
    items.map(async (item) => ({
      label: item.label,
      preview: item.preview,
      usage: <CodeLine code={item.code} /> as React.ReactNode,
    }))
  )

  // Pre-render the install command block
  const installBlock = registryName ? (
    <InstallCommand name={registryName} />
  ) : null

  return (
    <VariantGridClient
      variants={variants}
      codePanels={codePanels}
      installBlock={installBlock}
      columns={columns}
      fullWidth={fullWidth}
      className={className}
    />
  )
}
