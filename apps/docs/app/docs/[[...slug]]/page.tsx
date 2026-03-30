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
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const slug = params.slug ?? []
  const page = source.getPage(slug)
  if (!page) notFound()

  const MDX = page.data.body
  const toc = page.data.toc

  // Detect component pages to show AI buttons and badges
  const isComponentPage =
    slug.length >= 2 && slug[0] === "components"
  const componentSlug = isComponentPage ? slug[slug.length - 1] : null
  const registryItem = componentSlug ? getRegistryItem(componentSlug) : null
  const aiPrompt = componentSlug ? generateComponentPrompt(componentSlug) : null

  const pageSummary = `# ${page.data.title}\n\n${page.data.description ?? ""}${
    componentSlug
      ? `\n\n## Install\n\nnpx shadcn@latest add @jalco/${componentSlug}`
      : ""
  }`

  return (
    <div className="mx-auto flex w-full items-start gap-14 py-10 px-6 md:px-10">
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-12 w-full">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
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
              <p className="text-xl text-muted-foreground leading-relaxed">
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

          <div className="flex flex-col gap-10 w-full">
            <MDX components={getMDXComponents()} />
          </div>
        </div>
      </div>

      {toc && toc.length > 0 && (
        <aside className="sticky top-24 hidden w-64 shrink-0 xl:block">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              On This Page
            </p>
            <div className="flex flex-col gap-2 border-l border-border/40 pl-4">
              {toc.map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground line-clamp-2"
                  style={{
                    paddingLeft: (item.depth - 2) * 12,
                  }}
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>
        </aside>
      )}
    </div>
  )
}

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  const params = await props.params
  const slug = params.slug ?? []
  const page = source.getPage(slug)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
  }
}
