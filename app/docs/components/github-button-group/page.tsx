import type { Metadata } from "next"
import { GitHubButtonGroup } from "@/registry/github-button-group/github-button-group"
import { fetchGitHubRepo } from "@/registry/github-button-group/lib/github"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { CodeLine } from "@/registry/code-line/code-line"
import { GitHubButtonGroupPlayground } from "./playground"

export const metadata: Metadata = {
  title: "GitHub Button Group",
  description:
    "Segmented button group displaying multiple GitHub repo metrics with per-segment links.",
}

const sourceFiles = [
  "registry/github-button-group/github-button-group.tsx",
  "registry/github-button-group/lib/github.ts",
]

export default async function GitHubButtonGroupPage() {
  const repoData = await fetchGitHubRepo("shadcn-ui", "ui")

  return (
    <ComponentDocsPage
      title="GitHub Button Group"
      description="Segmented button group displaying multiple GitHub repo metrics (stars, forks, watchers, issues) with per-segment links."
      registryName="github-button-group"
      sourceFiles={sourceFiles}
      requirements={
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Graceful null return.</strong>{" "}
            Returns{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">null</code>{" "}
            if the GitHub API call fails — wrap in a Suspense boundary or
            provide a fallback.
          </li>
        </ul>
      }
      preview={<GitHubButtonGroup owner="shadcn-ui" repo="ui" />}
      usage={
        <>
          <CodeLine
            code={`import { GitHubButtonGroup } from "@/components/github-button-group"`}
          />
          <CodeLine
            code={`<GitHubButtonGroup owner="shadcn-ui" repo="ui" />`}
          />
          <p className="text-sm text-muted-foreground">
            <strong>Async server component.</strong> Fetches all repo metrics in
            a single GitHub API call at build time, cached for 1 hour.
          </p>
        </>
      }
    >
      {/* Playground */}
      {repoData && (
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Playground</h2>
          <GitHubButtonGroupPlayground data={repoData} />
        </section>
      )}

      {/* Examples */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Variants</h3>
          <VariantGrid
            registryName="github-button-group"
            files={sourceFiles}
            columns={1}
            items={[
              {
                label: "Default",
                code: `<GitHubButtonGroup owner="shadcn-ui" repo="ui" variant="default" />`,
                preview: (
                  <GitHubButtonGroup
                    owner="shadcn-ui"
                    repo="ui"
                    variant="default"
                  />
                ),
              },
              {
                label: "Secondary",
                code: `<GitHubButtonGroup owner="shadcn-ui" repo="ui" variant="secondary" />`,
                preview: (
                  <GitHubButtonGroup
                    owner="shadcn-ui"
                    repo="ui"
                    variant="secondary"
                  />
                ),
              },
              {
                label: "Outline",
                code: `<GitHubButtonGroup owner="shadcn-ui" repo="ui" variant="outline" />`,
                preview: (
                  <GitHubButtonGroup
                    owner="shadcn-ui"
                    repo="ui"
                    variant="outline"
                  />
                ),
              },
              {
                label: "Ghost",
                code: `<GitHubButtonGroup owner="shadcn-ui" repo="ui" variant="ghost" />`,
                preview: (
                  <GitHubButtonGroup
                    owner="shadcn-ui"
                    repo="ui"
                    variant="ghost"
                  />
                ),
              },
              {
                label: "Subtle",
                code: `<GitHubButtonGroup owner="shadcn-ui" repo="ui" variant="subtle" />`,
                preview: (
                  <GitHubButtonGroup
                    owner="shadcn-ui"
                    repo="ui"
                    variant="subtle"
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">With repo name</h3>
          <VariantGrid
            registryName="github-button-group"
            files={sourceFiles}
            columns={1}
            items={[
              {
                label: "Default + Repo",
                code: `<GitHubButtonGroup owner="shadcn-ui" repo="ui" showRepo />`,
                preview: (
                  <GitHubButtonGroup owner="shadcn-ui" repo="ui" showRepo />
                ),
              },
              {
                label: "Secondary + Repo",
                code: `<GitHubButtonGroup owner="shadcn-ui" repo="ui" showRepo variant="secondary" />`,
                preview: (
                  <GitHubButtonGroup
                    owner="shadcn-ui"
                    repo="ui"
                    showRepo
                    variant="secondary"
                  />
                ),
              },
              {
                label: "Outline + Repo",
                code: `<GitHubButtonGroup owner="vercel" repo="next.js" showRepo variant="outline" />`,
                preview: (
                  <GitHubButtonGroup
                    owner="vercel"
                    repo="next.js"
                    showRepo
                    variant="outline"
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Custom metrics</h3>
          <VariantGrid
            registryName="github-button-group"
            files={sourceFiles}
            columns={1}
            items={[
              {
                label: "Stars + Forks",
                code: `<GitHubButtonGroup owner="shadcn-ui" repo="ui" metrics={["stars", "forks"]} />`,
                preview: (
                  <GitHubButtonGroup
                    owner="shadcn-ui"
                    repo="ui"
                    metrics={["stars", "forks"]}
                  />
                ),
              },
              {
                label: "Secondary — Stars + Forks",
                code: `<GitHubButtonGroup owner="shadcn-ui" repo="ui" variant="secondary" metrics={["stars", "forks"]} />`,
                preview: (
                  <GitHubButtonGroup
                    owner="shadcn-ui"
                    repo="ui"
                    variant="secondary"
                    metrics={["stars", "forks"]}
                  />
                ),
              },
              {
                label: "All Metrics",
                code: `<GitHubButtonGroup owner="shadcn-ui" repo="ui" metrics={["stars", "forks", "watchers", "issues"]} />`,
                preview: (
                  <GitHubButtonGroup
                    owner="shadcn-ui"
                    repo="ui"
                    metrics={["stars", "forks", "watchers", "issues"]}
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Icon styles</h3>
          <VariantGrid
            registryName="github-button-group"
            files={sourceFiles}
            columns={1}
            items={[
              {
                label: "GitHub Green",
                code: `<GitHubButtonGroup owner="shadcn-ui" repo="ui" showRepo iconStyle="github" metrics={["stars"]} />`,
                preview: (
                  <GitHubButtonGroup
                    owner="shadcn-ui"
                    repo="ui"
                    showRepo
                    iconStyle="github"
                    metrics={["stars"]}
                  />
                ),
              },
              {
                label: "Copilot Purple",
                code: `<GitHubButtonGroup owner="shadcn-ui" repo="ui" showRepo iconStyle="copilot" metrics={["stars"]} />`,
                preview: (
                  <GitHubButtonGroup
                    owner="shadcn-ui"
                    repo="ui"
                    showRepo
                    iconStyle="copilot"
                    metrics={["stars"]}
                  />
                ),
              },
              {
                label: "Secondary + GitHub Green",
                code: `<GitHubButtonGroup owner="shadcn-ui" repo="ui" variant="secondary" showRepo iconStyle="github" metrics={["stars"]} />`,
                preview: (
                  <GitHubButtonGroup
                    owner="shadcn-ui"
                    repo="ui"
                    variant="secondary"
                    showRepo
                    iconStyle="github"
                    metrics={["stars"]}
                  />
                ),
              },
              {
                label: "Secondary + Copilot Purple",
                code: `<GitHubButtonGroup owner="shadcn-ui" repo="ui" variant="secondary" showRepo iconStyle="copilot" metrics={["stars"]} />`,
                preview: (
                  <GitHubButtonGroup
                    owner="shadcn-ui"
                    repo="ui"
                    variant="secondary"
                    showRepo
                    iconStyle="copilot"
                    metrics={["stars"]}
                  />
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">API Reference</h2>
        <ApiRefTable
          title="GitHubButtonGroup"
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
              name: "metrics",
              type: '("stars" | "forks" | "watchers" | "issues")[]',
              description:
                'Which metrics to display, in order. Defaults to ["stars", "forks", "watchers"].',
            },
            {
              name: "variant",
              type: '"default" | "secondary" | "outline" | "ghost" | "subtle"',
              description: 'Visual style variant. Defaults to "default".',
            },
            {
              name: "size",
              type: '"sm" | "default" | "lg"',
              description: 'Button group size. Defaults to "default".',
            },
            {
              name: "showRepo",
              type: "boolean",
              description:
                "Show the owner/repo label as a leading segment. Defaults to false.",
            },
            {
              name: "iconStyle",
              type: '"currentColor" | "github" | "copilot" | "muted"',
              description:
                'Octocat icon color (visible when showRepo is true). Defaults to "currentColor".',
            },
          ]}
        />
      </section>

      {/* Notes */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Notes</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>
            Each metric segment links to the corresponding GitHub page
            (stargazers, forks, watchers, or issues).
          </li>
        </ul>
      </section>
    </ComponentDocsPage>
  )
}
