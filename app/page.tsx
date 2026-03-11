import * as React from "react"
import { OpenInV0Button } from "@/components/open-in-v0-button"
import { CodeBlock } from "@/components/docs/code-block"
import { CodeBlockCommand } from "@/components/docs/code-block-command"
import { ApiRefTable } from "@/components/docs/api-ref-table"
import { GitHubStarsButton } from "@/registry/new-york/blocks/github-stars-button/github-stars-button"
import { GitHubButtonGroup } from "@/registry/new-york/blocks/github-stars-button/github-button-group"
import { convertNpmCommand } from "@/lib/convert-npm-command"
import { fetchPackageManagerIcons } from "@/lib/package-manager-icons"

const codeBlockDemoSource = `import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="flex flex-col items-center gap-4 py-20">
      <h1 className="text-4xl font-bold tracking-tight">
        Build something great.
      </h1>
      <p className="text-muted-foreground">
        A curated registry of polished UI components.
      </p>
      <Button size="lg">Get Started</Button>
    </section>
  )
}`

export default async function Home() {
  const pmIcons = await fetchPackageManagerIcons()

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-5xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4 border-b pb-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Jalco UI
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            A curated shadcn-style registry for polished components and blocks.
          </h1>
        </div>
        <p className="max-w-3xl text-base text-muted-foreground sm:text-lg">
          Jalco UI is Justin Levine&apos;s custom registry for production-quality UI
          patterns, components, and installable blocks. This template app will evolve
          into a documentation-first registry experience with strong preview, code,
          and installation workflows.
        </p>
      </header>

      <section className="grid gap-4 rounded-xl border p-6 sm:grid-cols-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-medium">Registry-first</h2>
          <p className="text-sm text-muted-foreground">
            Built to distribute installable components, blocks, hooks, and more.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-medium">Documentation-driven</h2>
          <p className="text-sm text-muted-foreground">
            Designed for previews, code visibility, and clear multi-step setup.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-medium">Production quality</h2>
          <p className="text-sm text-muted-foreground">
            Focused on composability, accessibility, and real-world polish.
          </p>
        </div>
      </section>

      <main className="flex flex-col gap-8">
        {/* GitHub Stars Button — registry block */}
        <section className="flex flex-col gap-4 rounded-xl border p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold tracking-tight">GitHub Stars Button</h2>
              <p className="text-sm text-muted-foreground">
                A link button showing a repo&apos;s star count with the GitHub
                octocat logo. Supports variant, size, and repo name display.
              </p>
            </div>
            <OpenInV0Button name="github-stars-button" className="w-fit" />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Default</p>
              <div className="flex flex-wrap items-center gap-3">
                <GitHubStarsButton owner="shadcn-ui" repo="ui" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">With Repo Name</p>
              <div className="flex flex-wrap items-center gap-3">
                <GitHubStarsButton owner="shadcn-ui" repo="ui" showRepo />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Outline</p>
              <div className="flex flex-wrap items-center gap-3">
                <GitHubStarsButton owner="vercel" repo="next.js" variant="outline" />
                <GitHubStarsButton owner="vercel" repo="next.js" variant="outline" showRepo />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Ghost</p>
              <div className="flex flex-wrap items-center gap-3">
                <GitHubStarsButton owner="tailwindlabs" repo="tailwindcss" variant="ghost" />
                <GitHubStarsButton owner="tailwindlabs" repo="tailwindcss" variant="ghost" showRepo />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Subtle</p>
              <div className="flex flex-wrap items-center gap-3">
                <GitHubStarsButton owner="facebook" repo="react" variant="subtle" />
                <GitHubStarsButton owner="facebook" repo="react" variant="subtle" showRepo />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">GitHub Green Icon</p>
              <div className="flex flex-wrap items-center gap-3">
                <GitHubStarsButton owner="shadcn-ui" repo="ui" iconStyle="github" />
                <GitHubStarsButton owner="shadcn-ui" repo="ui" iconStyle="github" showRepo />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Copilot Purple Icon</p>
              <div className="flex flex-wrap items-center gap-3">
                <GitHubStarsButton owner="shadcn-ui" repo="ui" iconStyle="copilot" />
                <GitHubStarsButton owner="shadcn-ui" repo="ui" iconStyle="copilot" showRepo />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Muted Icon</p>
              <div className="flex flex-wrap items-center gap-3">
                <GitHubStarsButton owner="shadcn-ui" repo="ui" iconStyle="muted" />
                <GitHubStarsButton owner="shadcn-ui" repo="ui" iconStyle="muted" showRepo />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Size</p>
              <div className="flex flex-wrap items-center gap-3">
                <GitHubStarsButton owner="shadcn-ui" repo="ui" size="sm" />
                <GitHubStarsButton owner="shadcn-ui" repo="ui" size="default" />
                <GitHubStarsButton owner="shadcn-ui" repo="ui" size="lg" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Size + Repo Name</p>
              <div className="flex flex-wrap items-center gap-3">
                <GitHubStarsButton owner="shadcn-ui" repo="ui" size="sm" showRepo />
                <GitHubStarsButton owner="shadcn-ui" repo="ui" size="default" showRepo />
                <GitHubStarsButton owner="shadcn-ui" repo="ui" size="lg" showRepo />
              </div>
            </div>
          </div>
        </section>

        {/* GitHub Button Group — registry block */}
        <section className="flex flex-col gap-4 rounded-xl border p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold tracking-tight">GitHub Button Group</h2>
              <p className="text-sm text-muted-foreground">
                A segmented button group showing repo metrics — stars, forks,
                watchers, and issues. Each segment links to the relevant GitHub page.
              </p>
            </div>
            <OpenInV0Button name="github-stars-button" className="w-fit" />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Default</p>
              <div className="flex flex-wrap items-center gap-3">
                <GitHubButtonGroup owner="shadcn-ui" repo="ui" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">All Metrics</p>
              <div className="flex flex-wrap items-center gap-3">
                <GitHubButtonGroup owner="shadcn-ui" repo="ui" metrics={["stars", "forks", "watchers", "issues"]} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Stars Only</p>
              <div className="flex flex-wrap items-center gap-3">
                <GitHubButtonGroup owner="vercel" repo="next.js" metrics={["stars"]} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Outline</p>
              <div className="flex flex-wrap items-center gap-3">
                <GitHubButtonGroup owner="shadcn-ui" repo="ui" variant="outline" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Ghost</p>
              <div className="flex flex-wrap items-center gap-3">
                <GitHubButtonGroup owner="tailwindlabs" repo="tailwindcss" variant="ghost" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Subtle</p>
              <div className="flex flex-wrap items-center gap-3">
                <GitHubButtonGroup owner="facebook" repo="react" variant="subtle" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">With Repo Name</p>
              <div className="flex flex-wrap items-center gap-3">
                <GitHubButtonGroup owner="shadcn-ui" repo="ui" showRepo />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Repo + GitHub Green Icon</p>
              <div className="flex flex-wrap items-center gap-3">
                <GitHubButtonGroup owner="vercel" repo="next.js" showRepo iconStyle="github" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Repo + Copilot Purple Icon</p>
              <div className="flex flex-wrap items-center gap-3">
                <GitHubButtonGroup owner="facebook" repo="react" showRepo iconStyle="copilot" variant="outline" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Size</p>
              <div className="flex flex-wrap items-center gap-3">
                <GitHubButtonGroup owner="shadcn-ui" repo="ui" size="sm" metrics={["stars", "forks"]} />
                <GitHubButtonGroup owner="shadcn-ui" repo="ui" size="default" metrics={["stars", "forks"]} />
                <GitHubButtonGroup owner="shadcn-ui" repo="ui" size="lg" metrics={["stars", "forks"]} />
              </div>
            </div>
          </div>
        </section>

        {/* Code Block — docs component */}
        <section className="flex flex-col gap-4 rounded-xl border p-4 sm:p-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold tracking-tight">Code Block</h2>
            <p className="text-sm text-muted-foreground">
              Syntax-highlighted code block with copy button, language badge, and
              light/dark theme support. Built with Shiki.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Default</p>
              <CodeBlock
                title="hero.tsx"
                language="tsx"
                code={codeBlockDemoSource}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Scrollable</p>
              <CodeBlock
                title="hero.tsx"
                language="tsx"
                code={codeBlockDemoSource}
                overflow="scrollable"
                maxHeight={160}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Collapsible</p>
              <CodeBlock
                title="hero.tsx"
                language="tsx"
                code={codeBlockDemoSource}
                overflow="collapsible"
                maxHeight={160}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Muted</p>
              <CodeBlock
                title="hero.tsx"
                language="tsx"
                code={codeBlockDemoSource}
                muted
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Muted + Scrollable</p>
              <CodeBlock
                title="hero.tsx"
                language="tsx"
                code={codeBlockDemoSource}
                muted
                overflow="scrollable"
                maxHeight={160}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Muted + Collapsible</p>
              <CodeBlock
                title="hero.tsx"
                language="tsx"
                code={codeBlockDemoSource}
                muted
                overflow="collapsible"
                maxHeight={160}
              />
            </div>
          </div>
        </section>

        {/* Command Block — docs component */}
        <section className="flex flex-col gap-4 rounded-xl border p-4 sm:p-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold tracking-tight">Command Block</h2>
            <p className="text-sm text-muted-foreground">
              Package manager switcher with copy button. Remembers the user&apos;s
              preferred manager across visits. Includes a convertNpmCommand utility.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">No Icons</p>
              <CodeBlockCommand
                {...convertNpmCommand("npx shadcn@latest add @jalco/github-stars-button")}
                iconStyle="none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Colored Icons</p>
              <CodeBlockCommand
                {...convertNpmCommand("npx shadcn@latest add @jalco/github-stars-button")}
                icons={pmIcons}
                iconStyle="colored"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Muted Icons</p>
              <CodeBlockCommand
                {...convertNpmCommand("npx shadcn@latest add @jalco/github-stars-button")}
                icons={pmIcons}
                iconStyle="muted"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">With Flags</p>
              <CodeBlockCommand
                {...convertNpmCommand("npx shadcn@latest add @jalco/github-stars-button -y --overwrite")}
                icons={pmIcons}
                iconStyle="colored"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Filtered Tabs (shadcn + pnpm + bun)</p>
              <CodeBlockCommand
                {...convertNpmCommand("npx shadcn@latest add @jalco/github-stars-button")}
                icons={pmIcons}
                iconStyle="colored"
                show={["shadcn", "pnpm", "bun"]}
              />
            </div>
          </div>
        </section>

        {/* API Reference Table — docs component */}
        <section className="flex flex-col gap-4 rounded-xl border p-4 sm:p-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold tracking-tight">API Reference Table</h2>
            <p className="text-sm text-muted-foreground">
              Collapsible prop reference table with color-coded types, expand/collapse
              details, and accessible keyboard support.
            </p>
          </div>
          <ApiRefTable
            title="CodeBlock"
            props={[
              {
                name: "code",
                type: "string",
                required: true,
                description: "The source code string to highlight and display.",
                fullType: "string",
              },
              {
                name: "language",
                type: "string",
                description: "The language for syntax highlighting. Defaults to tsx.",
                fullType: "string | undefined",
              },
              {
                name: "title",
                type: "string",
                description: "Optional filename or label shown in the header bar.",
                fullType: "string | undefined",
              },
              {
                name: "className",
                type: "string",
                description: "Additional class names for the outer container.",
                fullType: "string | undefined",
              },
            ]}
          />
          <ApiRefTable
            title="ApiRefTable"
            props={[
              {
                name: "title",
                type: "string",
                required: true,
                description: "The component or interface name displayed as a heading.",
                fullType: "string",
              },
              {
                name: "props",
                type: "ApiProp[]",
                required: true,
                description: "Array of prop definitions to display in the table.",
                fullType: "ApiProp[]",
              },
              {
                name: "className",
                type: "string",
                description: "Additional class names for the outer container.",
                fullType: "string | undefined",
              },
            ]}
          />
        </section>
      </main>
    </div>
  )
}
