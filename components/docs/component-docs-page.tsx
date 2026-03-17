import * as React from "react"
import { AiCopyButton } from "@/registry/ai-copy-button/ai-copy-button"
import { DependencyBadges } from "@/components/docs/dependency-badges"
import { ComponentPreview } from "@/components/docs/component-preview"
import { InstallCommand } from "@/components/docs/install-command"
import { TriangleAlert } from "lucide-react"

import { getRegistryItem } from "@/lib/registry"
import { generateComponentPrompt } from "@/lib/prompts"
import { CopyPromptButton } from "@/components/docs/copy-prompt-button"

interface ComponentDocsPageProps {
  /** Component display name (e.g. "Code Line"). */
  title: string
  /** One-sentence description shown below the title. */
  description: string
  /**
   * Registry item name used for DependencyBadges and InstallCommand.
   * When omitted, badges and the default install block are skipped.
   */
  registryName?: string
  /** Registry source file paths for the ComponentPreview Code tab. */
  sourceFiles?: (string | { path: string; name?: string; language?: string })[]
  /** Live component rendered inside the Preview section. */
  preview?: React.ReactNode
  /** Custom note rendered below the InstallCommand (e.g. "Included in X package"). */
  installNote?: React.ReactNode
  /** Prerequisites, constraints, or caveats that affect adoption decisions. Rendered between Installation and Usage. */
  requirements?: React.ReactNode
  /** Usage section content. */
  usage?: React.ReactNode
  /** Everything after Usage — examples, API ref, notes, etc. */
  children?: React.ReactNode
}

/**
 * Shared skeleton for component docs pages.
 *
 * Handles: header (title, description, AiCopyButton, DependencyBadges),
 * preview, installation, and usage. Pages supply the varying parts —
 * preview children, usage snippets, and any extra sections as children.
 */
export async function ComponentDocsPage({
  title,
  description,
  registryName,
  sourceFiles,
  preview,
  installNote,
  requirements,
  usage,
  children,
}: ComponentDocsPageProps) {
  const item = registryName ? getRegistryItem(registryName) : null

  const pageSummary = `# ${title}\n\n${description}${
    registryName
      ? `\n\n## Install\n\nnpx shadcn@latest add @jalco/${registryName}`
      : ""
  }`

  const aiPrompt = registryName
    ? generateComponentPrompt(registryName)
    : null

  return (
    <div className="flex flex-col gap-12">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <div className="flex items-center gap-1.5">
            {aiPrompt && <CopyPromptButton value={aiPrompt} />}
            <AiCopyButton
              value={pageSummary}
              size="sm"
              variant="outline"
              brandColors
              label="Copy Page"
            />
          </div>
        </div>
        <p className="text-base text-muted-foreground">{description}</p>
        {item && (
          <DependencyBadges
            dependencies={item.dependencies}
            registryDependencies={item.registryDependencies}
          />
        )}
      </div>

      {/* Preview */}
      {preview && sourceFiles && (
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Preview</h2>
          <ComponentPreview files={sourceFiles}>{preview}</ComponentPreview>
        </section>
      )}

      {/* Installation */}
      {registryName && (
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Installation
          </h2>
          {installNote}

          {/* Requirements */}
          {requirements && (
            <div className="w-full overflow-hidden rounded-md border border-destructive bg-card bg-grid-pattern p-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <TriangleAlert className="size-4 text-destructive" />
                Requirements
              </div>
              <div className="mt-3">{requirements}</div>
            </div>
          )}

          <InstallCommand name={registryName} />
        </section>
      )}

      {/* Usage */}
      {usage && (
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Usage</h2>
          {usage}
        </section>
      )}

      {/* Remaining sections provided by the page */}
      {children}
    </div>
  )
}
