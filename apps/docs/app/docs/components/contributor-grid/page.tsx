import type { Metadata } from "next"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { CodeLine } from "@/registry/code-line/code-line"
import {
  ContributorGrid,
  ContributorList,
  type GitHubContributor,
} from "@/registry/contributor-grid/contributor-grid"

export const metadata: Metadata = {
  title: "Contributor Grid",
  description:
    "GitHub contributor display with avatar grid and detailed list layouts. Async server component with ISR caching.",
}

const sourceFiles = [
  "registry/contributor-grid/contributor-grid.tsx",
  { path: "registry/contributor-grid/lib/github.ts", name: "lib/github.ts" },
]

const sampleContributors: GitHubContributor[] = [
  { login: "shadcn", avatarUrl: "https://github.com/shadcn.png?", profileUrl: "https://github.com/shadcn", contributions: 1243 },
  { login: "haydenbleasel", avatarUrl: "https://github.com/haydenbleasel.png?", profileUrl: "https://github.com/haydenbleasel", contributions: 847 },
  { login: "leerob", avatarUrl: "https://github.com/leerob.png?", profileUrl: "https://github.com/leerob", contributions: 512 },
  { login: "shuding", avatarUrl: "https://github.com/shuding.png?", profileUrl: "https://github.com/shuding", contributions: 398 },
  { login: "timneutkens", avatarUrl: "https://github.com/timneutkens.png?", profileUrl: "https://github.com/timneutkens", contributions: 276 },
  { login: "rauchg", avatarUrl: "https://github.com/rauchg.png?", profileUrl: "https://github.com/rauchg", contributions: 189 },
  { login: "ijjk", avatarUrl: "https://github.com/ijjk.png?", profileUrl: "https://github.com/ijjk", contributions: 156 },
  { login: "wyattjoh", avatarUrl: "https://github.com/wyattjoh.png?", profileUrl: "https://github.com/wyattjoh", contributions: 134 },
]

export default function ContributorGridPage() {
  return (
    <ComponentDocsPage
      title="Contributor Grid"
      description="GitHub contributor display with avatar grid and detailed list layouts. Async server component with ISR caching."
      registryName="contributor-grid"
      sourceFiles={sourceFiles}
      preview={
        <ContributorGrid
          owner="vercel"
          repo="next.js"
          contributors={sampleContributors}
          max={8}
        />
      }
      usage={
        <>
          <CodeLine
            code={`import { ContributorGrid, ContributorList } from "@/components/contributor-grid"`}
          />
          <CodeLine
            code={`<ContributorGrid owner="vercel" repo="next.js" />`}
          />
          <p className="text-sm text-muted-foreground">
            Async server component — fetches the GitHub Contributors API at
            build time with 1-hour ISR caching. Pass{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              contributors
            </code>{" "}
            to skip the API call with pre-fetched data.
          </p>
        </>
      }
    >
      {/* Examples */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Avatar sizes</h3>
          <VariantGrid
            registryName="contributor-grid"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Small",
                code: `<ContributorGrid owner="vercel" repo="next.js" size="sm" />`,
                preview: (
                  <ContributorGrid
                    owner="vercel"
                    repo="next.js"
                    contributors={sampleContributors}
                    size="sm"
                  />
                ),
              },
              {
                label: "Medium (default)",
                code: `<ContributorGrid owner="vercel" repo="next.js" />`,
                preview: (
                  <ContributorGrid
                    owner="vercel"
                    repo="next.js"
                    contributors={sampleContributors}
                  />
                ),
              },
              {
                label: "Large",
                code: `<ContributorGrid owner="vercel" repo="next.js" size="lg" />`,
                preview: (
                  <ContributorGrid
                    owner="vercel"
                    repo="next.js"
                    contributors={sampleContributors}
                    size="lg"
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Contributor list</h3>
          <p className="text-sm text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              ContributorList
            </code>{" "}
            for a detailed view with names, contribution counts, and ranks.
          </p>
          <VariantGrid
            registryName="contributor-grid"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "With title",
                code: `<ContributorList
  owner="vercel"
  repo="next.js"
  title="Top Contributors"
  max={5}
/>`,
                preview: (
                  <ContributorList
                    owner="vercel"
                    repo="next.js"
                    contributors={sampleContributors}
                    title="Top Contributors"
                    max={5}
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Limited count with overflow</h3>
          <p className="text-sm text-muted-foreground">
            Set{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">max</code>{" "}
            lower than the total to show a &quot;+N&quot; overflow indicator.
          </p>
          <VariantGrid
            registryName="contributor-grid"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Max 4 of 8",
                code: `<ContributorGrid owner="vercel" repo="next.js" max={4} />`,
                preview: (
                  <ContributorGrid
                    owner="vercel"
                    repo="next.js"
                    contributors={sampleContributors}
                    max={4}
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
          title="ContributorGrid"
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
              name: "contributors",
              type: "GitHubContributor[]",
              description:
                "Pre-fetched contributor data. Skips the GitHub API call when provided.",
            },
            {
              name: "max",
              type: "number",
              description: "Maximum number of contributors to display. Defaults to 30.",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              description: 'Avatar size. Defaults to "md".',
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes on the root element.",
            },
          ]}
        />

        <ApiRefTable
          title="ContributorList"
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
              name: "contributors",
              type: "GitHubContributor[]",
              description:
                "Pre-fetched contributor data. Skips the GitHub API call when provided.",
            },
            {
              name: "max",
              type: "number",
              description: "Maximum number of contributors to display. Defaults to 30.",
            },
            {
              name: "title",
              type: "string",
              description: "Optional heading above the list.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes on the root element.",
            },
          ]}
        />
      </section>

      {/* Notes */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Notes</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Async server component.</strong>{" "}
            Fetches from the GitHub Contributors API at build time. Results are
            cached for 1 hour via Next.js ISR.
          </li>
          <li>
            <strong className="text-foreground">No API key required.</strong>{" "}
            Works with the public GitHub API. Set{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              GITHUB_TOKEN
            </code>{" "}
            to raise the rate limit from 60 to 5,000 requests/hour.
          </li>
          <li>
            <strong className="text-foreground">No dependencies.</strong> Uses
            only React and Tailwind CSS. Avatars are loaded from GitHub CDN.
          </li>
          <li>
            <strong className="text-foreground">Overflow indicator.</strong>{" "}
            When more contributors exist than{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">max</code>,
            a &quot;+N&quot; circle or &quot;View all →&quot; link is shown.
          </li>
        </ul>
      </section>
    </ComponentDocsPage>
  )
}
