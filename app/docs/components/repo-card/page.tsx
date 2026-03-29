import type { Metadata } from "next"
import { RepoCard } from "@/registry/repo-card/repo-card"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { CodeLine } from "@/registry/code-line/code-line"

export const metadata: Metadata = {
  title: "Repo Card",
  description:
    "GitHub repository preview card with description, language dot, star and fork counts, license, and topic tags.",
}

const sourceFiles = [
  "registry/repo-card/repo-card.tsx",
  "registry/repo-card/lib/github.ts",
]

export default async function RepoCardPage() {
  return (
    <ComponentDocsPage
      title="Repo Card"
      description="GitHub repository preview card with description, language dot, star and fork counts, license, and topic tags. Async server component — fetches data at build time with ISR."
      registryName="repo-card"
      sourceFiles={sourceFiles}
      preview={
        <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
          <RepoCard owner="shadcn-ui" repo="ui" />
          <RepoCard owner="vercel" repo="next.js" variant="outline" />
        </div>
      }
      usage={
        <>
          <CodeLine
            code={`import { RepoCard } from "@/components/repo-card"`}
          />
          <CodeLine code={`<RepoCard owner="shadcn-ui" repo="ui" />`} />
          <p className="text-sm text-muted-foreground">
            <strong>Async server component.</strong> Fetches the GitHub API at
            build time and caches the result for 1 hour via Next.js ISR. Optional{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">GITHUB_TOKEN</code>{" "}
            env var raises the rate limit to 5,000 requests/hour.
          </p>
        </>
      }
    >
      {/* Variants */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Variants</h2>
        <VariantGrid
          registryName="repo-card"
          files={sourceFiles}
          columns={2}
          items={[
            {
              label: "Default",
              code: `<RepoCard owner="shadcn-ui" repo="ui" />`,
              preview: <RepoCard owner="shadcn-ui" repo="ui" className="w-full" />,
            },
            {
              label: "Outline",
              code: `<RepoCard owner="shadcn-ui" repo="ui" variant="outline" />`,
              preview: <RepoCard owner="shadcn-ui" repo="ui" variant="outline" className="w-full" />,
            },
            {
              label: "Ghost",
              code: `<RepoCard owner="shadcn-ui" repo="ui" variant="ghost" />`,
              preview: <RepoCard owner="shadcn-ui" repo="ui" variant="ghost" className="w-full" />,
            },
            {
              label: "Muted",
              code: `<RepoCard owner="shadcn-ui" repo="ui" variant="muted" />`,
              preview: <RepoCard owner="shadcn-ui" repo="ui" variant="muted" className="w-full" />,
            },
          ]}
        />
      </section>

      {/* Sizes */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Sizes</h2>
        <VariantGrid
          registryName="repo-card"
          files={sourceFiles}
          columns={1}
          fullWidth
          items={[
            {
              label: "Small",
              code: `<RepoCard owner="facebook" repo="react" size="sm" />`,
              preview: (
                <div className="max-w-md mx-auto w-full">
                  <RepoCard owner="facebook" repo="react" size="sm" className="w-full" />
                </div>
              ),
            },
            {
              label: "Default",
              code: `<RepoCard owner="facebook" repo="react" />`,
              preview: (
                <div className="max-w-md mx-auto w-full">
                  <RepoCard owner="facebook" repo="react" className="w-full" />
                </div>
              ),
            },
            {
              label: "Large",
              code: `<RepoCard owner="facebook" repo="react" size="lg" />`,
              preview: (
                <div className="max-w-md mx-auto w-full">
                  <RepoCard owner="facebook" repo="react" size="lg" className="w-full" />
                </div>
              ),
            },
          ]}
        />
      </section>

      {/* Examples */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Grid layout</h3>
          <p className="text-sm text-muted-foreground">
            Use a CSS grid to display multiple repo cards side by side.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RepoCard owner="vercel" repo="next.js" className="w-full" />
            <RepoCard owner="facebook" repo="react" className="w-full" />
            <RepoCard owner="tailwindlabs" repo="tailwindcss" className="w-full" />
            <RepoCard owner="shadcn-ui" repo="ui" className="w-full" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Minimal</h3>
          <p className="text-sm text-muted-foreground">
            Hide topics, license, and updated date for a cleaner look.
          </p>
          <div className="max-w-md">
            <RepoCard
              owner="shadcn-ui"
              repo="ui"
              showTopics={false}
              showLicense={false}
              showUpdated={false}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">API Reference</h2>
        <ApiRefTable
          title="RepoCard"
          props={[
            {
              name: "owner",
              type: "string",
              required: true,
              description: "GitHub username or organization.",
            },
            {
              name: "repo",
              type: "string",
              required: true,
              description: "GitHub repository name.",
            },
            {
              name: "variant",
              type: '"default" | "outline" | "ghost" | "muted"',
              description:
                'Visual style variant. Defaults to "default".',
            },
            {
              name: "size",
              type: '"sm" | "default" | "lg"',
              description:
                'Card size. Defaults to "default".',
            },
            {
              name: "showLanguage",
              type: "boolean",
              description:
                "Show primary language with colored dot. Defaults to true.",
            },
            {
              name: "showTopics",
              type: "boolean",
              description:
                "Show topic tags. Defaults to true.",
            },
            {
              name: "showLicense",
              type: "boolean",
              description:
                "Show license identifier. Defaults to true.",
            },
            {
              name: "showUpdated",
              type: "boolean",
              description:
                "Show last updated date. Defaults to true.",
            },
            {
              name: "maxTopics",
              type: "number",
              description:
                "Maximum number of topic tags to display. Defaults to 4.",
            },
            {
              name: "data",
              type: "GitHubRepoData",
              description:
                "Pre-fetched repository data. When provided, skips the GitHub API call.",
            },
          ]}
        />
      </section>

      {/* Notes */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Notes</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">ISR caching.</strong> Repository
            data is cached for 1 hour via{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              next.revalidate
            </code>
            . No API key required, but{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              GITHUB_TOKEN
            </code>{" "}
            raises the rate limit to 5,000 requests/hour.
          </li>
          <li>
            <strong className="text-foreground">Pre-fetched data.</strong> Pass
            the{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">data</code>{" "}
            prop to skip the API call — useful for static builds.
          </li>
          <li>
            <strong className="text-foreground">Language colors.</strong> Common
            language colors are built in. Unknown languages use a neutral gray dot.
          </li>
          <li>
            <strong className="text-foreground">Status badges.</strong> Archived
            repos show an amber &quot;Archived&quot; badge. Forked repos show a &quot;Fork&quot; badge.
          </li>
        </ul>
      </section>
    </ComponentDocsPage>
  )
}
