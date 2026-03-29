import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { source } from "@/lib/source"
import { getMDXComponents } from "@/mdx-components"
import { AiCopyButton } from "@/registry/ai-copy-button/ai-copy-button"
import { CopyPromptButton } from "@/components/docs/copy-prompt-button"
import { DependencyBadges } from "@/components/docs/dependency-badges"
import { generateComponentPrompt } from "@/lib/prompts"
import { getRegistryItem } from "@/lib/registry"

export default async function Page(props: {
  params: Promise<{ slug: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  const MDX = page.data.body

  // Detect component pages to show AI buttons and badges
  const isComponentPage =
    params.slug.length >= 2 && params.slug[0] === "components"
  const componentSlug = isComponentPage ? params.slug[params.slug.length - 1] : null
  const registryItem = componentSlug ? getRegistryItem(componentSlug) : null
  const aiPrompt = componentSlug ? generateComponentPrompt(componentSlug) : null

  const pageSummary = `# ${page.data.title}\n\n${page.data.description ?? ""}${
    componentSlug
      ? `\n\n## Install\n\nnpx shadcn@latest add @jalco/${componentSlug}`
      : ""
  }`

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">
            {page.data.title}
          </h1>
          {isComponentPage && (
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
          )}
        </div>
        {page.data.description && (
          <p className="text-base text-muted-foreground">
            {page.data.description}
          </p>
        )}
        {registryItem && (
          <DependencyBadges
            dependencies={registryItem.dependencies}
            registryDependencies={registryItem.registryDependencies}
          />
        )}
      </div>

      <div className="flex flex-col gap-8">
        <MDX components={getMDXComponents()} />
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
  }
}
