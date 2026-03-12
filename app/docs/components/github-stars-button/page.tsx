import type { Metadata } from "next"
import { GitHubStarsButton } from "@/registry/github-stars-button/github-stars-button"
import { fetchGitHubRepo } from "@/registry/github-stars-button/lib/github"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { GitHubStarsButtonPlayground } from "./playground"
import { CodeLine } from "@/registry/code-line/code-line"

export const metadata: Metadata = {
  title: "GitHub Stars Button",
  description:
    "Link button showing a GitHub repo's star count with the octocat icon.",
}

const sourceFiles = [
  "registry/github-stars-button/github-stars-button.tsx",
  "registry/github-stars-button/lib/github.ts",
]

export default async function GitHubStarsButtonPage() {
  const repo = await fetchGitHubRepo("shadcn-ui", "ui")
  const stars = repo?.stars ?? 109000

  return (
    <ComponentDocsPage
      title="GitHub Stars Button"
      description="Link button showing a GitHub repo's star count with the octocat icon. Async server component — fetches data at build time with ISR."
      registryName="github-stars-button"
      sourceFiles={sourceFiles}
      preview={<GitHubStarsButton owner="shadcn-ui" repo="ui" />}
      usage={
        <>
          <CodeLine
            code={`import { GitHubStarsButton } from "@/components/github-stars-button"`}
          />
          <CodeLine
            code={`<GitHubStarsButton owner="shadcn-ui" repo="ui" />`}
          />
          <p className="text-sm text-muted-foreground">
            <strong>Async server component.</strong> Fetches the GitHub API at
            build time and caches the result for 1 hour via Next.js ISR. No API
            key required — set{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              GITHUB_TOKEN
            </code>{" "}
            to raise the rate limit from 60 to 5,000 requests/hour.
          </p>
        </>
      }
    >
      {/* Playground */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Playground</h2>
        <GitHubStarsButtonPlayground stars={stars} />
      </section>

      {/* Examples */}
      <section className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Variants</h3>
          <VariantGrid
            registryName="github-stars-button"
            files={sourceFiles}
            columns={2}
            items={[
              {
                label: "Default",
                code: `<GitHubStarsButton owner="shadcn-ui" repo="ui" variant="default" />`,
                preview: (
                  <GitHubStarsButton
                    owner="shadcn-ui"
                    repo="ui"
                    variant="default"
                  />
                ),
              },
              {
                label: "Primary",
                code: `<GitHubStarsButton owner="shadcn-ui" repo="ui" variant="primary" />`,
                preview: (
                  <GitHubStarsButton
                    owner="shadcn-ui"
                    repo="ui"
                    variant="primary"
                  />
                ),
              },
              {
                label: "Secondary",
                code: `<GitHubStarsButton owner="shadcn-ui" repo="ui" variant="secondary" />`,
                preview: (
                  <GitHubStarsButton
                    owner="shadcn-ui"
                    repo="ui"
                    variant="secondary"
                  />
                ),
              },
              {
                label: "Outline",
                code: `<GitHubStarsButton owner="shadcn-ui" repo="ui" variant="outline" />`,
                preview: (
                  <GitHubStarsButton
                    owner="shadcn-ui"
                    repo="ui"
                    variant="outline"
                  />
                ),
              },
              {
                label: "Ghost",
                code: `<GitHubStarsButton owner="shadcn-ui" repo="ui" variant="ghost" />`,
                preview: (
                  <GitHubStarsButton
                    owner="shadcn-ui"
                    repo="ui"
                    variant="ghost"
                  />
                ),
              },
              {
                label: "Subtle",
                code: `<GitHubStarsButton owner="shadcn-ui" repo="ui" variant="subtle" />`,
                preview: (
                  <GitHubStarsButton
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
          <h3 className="text-base font-medium">Sizes</h3>
          <VariantGrid
            registryName="github-stars-button"
            files={sourceFiles}
            columns={3}
            items={[
              {
                label: "Small",
                code: `<GitHubStarsButton owner="shadcn-ui" repo="ui" size="sm" />`,
                preview: (
                  <GitHubStarsButton owner="shadcn-ui" repo="ui" size="sm" />
                ),
              },
              {
                label: "Default",
                code: `<GitHubStarsButton owner="shadcn-ui" repo="ui" size="default" />`,
                preview: (
                  <GitHubStarsButton
                    owner="shadcn-ui"
                    repo="ui"
                    size="default"
                  />
                ),
              },
              {
                label: "Large",
                code: `<GitHubStarsButton owner="shadcn-ui" repo="ui" size="lg" />`,
                preview: (
                  <GitHubStarsButton owner="shadcn-ui" repo="ui" size="lg" />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">With repo name</h3>
          <VariantGrid
            registryName="github-stars-button"
            files={sourceFiles}
            columns={2}
            items={[
              {
                label: "Default + Repo",
                code: `<GitHubStarsButton owner="shadcn-ui" repo="ui" showRepo />`,
                preview: (
                  <GitHubStarsButton owner="shadcn-ui" repo="ui" showRepo />
                ),
              },
              {
                label: "Secondary + Repo",
                code: `<GitHubStarsButton owner="shadcn-ui" repo="ui" showRepo variant="secondary" />`,
                preview: (
                  <GitHubStarsButton
                    owner="shadcn-ui"
                    repo="ui"
                    showRepo
                    variant="secondary"
                  />
                ),
              },
              {
                label: "Outline + Repo",
                code: `<GitHubStarsButton owner="vercel" repo="next.js" showRepo variant="outline" />`,
                preview: (
                  <GitHubStarsButton
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
          <h3 className="text-base font-medium">Icon styles</h3>
          <VariantGrid
            registryName="github-stars-button"
            files={sourceFiles}
            columns={2}
            items={[
              {
                label: "Current Color",
                code: `<GitHubStarsButton owner="shadcn-ui" repo="ui" iconStyle="currentColor" showRepo />`,
                preview: (
                  <GitHubStarsButton
                    owner="shadcn-ui"
                    repo="ui"
                    iconStyle="currentColor"
                    showRepo
                  />
                ),
              },
              {
                label: "GitHub Green",
                code: `<GitHubStarsButton owner="shadcn-ui" repo="ui" iconStyle="github" showRepo />`,
                preview: (
                  <GitHubStarsButton
                    owner="shadcn-ui"
                    repo="ui"
                    iconStyle="github"
                    showRepo
                  />
                ),
              },
              {
                label: "Copilot Purple",
                code: `<GitHubStarsButton owner="shadcn-ui" repo="ui" iconStyle="copilot" showRepo />`,
                preview: (
                  <GitHubStarsButton
                    owner="shadcn-ui"
                    repo="ui"
                    iconStyle="copilot"
                    showRepo
                  />
                ),
              },
              {
                label: "Muted",
                code: `<GitHubStarsButton owner="shadcn-ui" repo="ui" iconStyle="muted" showRepo />`,
                preview: (
                  <GitHubStarsButton
                    owner="shadcn-ui"
                    repo="ui"
                    iconStyle="muted"
                    showRepo
                  />
                ),
              },
              {
                label: "Secondary + GitHub Green",
                code: `<GitHubStarsButton owner="shadcn-ui" repo="ui" variant="secondary" iconStyle="github" showRepo />`,
                preview: (
                  <GitHubStarsButton
                    owner="shadcn-ui"
                    repo="ui"
                    variant="secondary"
                    iconStyle="github"
                    showRepo
                  />
                ),
              },
              {
                label: "Secondary + Copilot Purple",
                code: `<GitHubStarsButton owner="shadcn-ui" repo="ui" variant="secondary" iconStyle="copilot" showRepo />`,
                preview: (
                  <GitHubStarsButton
                    owner="shadcn-ui"
                    repo="ui"
                    variant="secondary"
                    iconStyle="copilot"
                    showRepo
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
          title="GitHubStarsButton"
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
              type: '"default" | "primary" | "secondary" | "outline" | "ghost" | "subtle"',
              description: 'Visual style variant. Defaults to "default".',
            },
            {
              name: "size",
              type: '"sm" | "default" | "lg"',
              description: 'Button size. Defaults to "default".',
            },
            {
              name: "stars",
              type: "number",
              description:
                "Pre-fetched star count. Skips the API call when provided.",
            },
            {
              name: "showRepo",
              type: "boolean",
              description:
                "Show the owner/repo label alongside the count. Defaults to false.",
            },
            {
              name: "iconStyle",
              type: '"currentColor" | "github" | "copilot" | "muted"',
              description:
                'Octocat icon color style. Defaults to "currentColor".',
            },
          ]}
        />
      </section>

      {/* Notes */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Notes</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">ISR caching.</strong> Results
            cached for 1 hour via{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              next.revalidate
            </code>
            .
          </li>
          <li>
            <strong className="text-foreground">Pre-fetched stars.</strong> Pass
            the{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">stars</code>{" "}
            prop to skip the API call entirely.
          </li>
        </ul>
      </section>
    </ComponentDocsPage>
  )
}
