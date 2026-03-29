import type { Metadata } from "next"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { CodeLine } from "@/registry/code-line/code-line"
import { CommitGraph, type Commit } from "@/registry/commit-graph/commit-graph"

export const metadata: Metadata = {
  title: "Commit Graph",
  description:
    "Topological git graph with rail lines showing branch forks, merges, and commit ancestry.",
}

const sourceFiles = ["registry/commit-graph/commit-graph.tsx"]

const sampleCommits: Commit[] = [
  { hash: "a1b2c3d", message: "feat(auth): add OAuth2 support", author: { name: "Sarah Chen", avatarUrl: "https://github.com/shadcn.png?" }, date: new Date(Date.now() - 2 * 3600_000).toISOString(), parents: ["m1e2r3g"], refs: ["main", "HEAD"], tag: "v2.1.0" },
  { hash: "m1e2r3g", message: "Merge branch 'feat/dashboard' into main", author: { name: "Sarah Chen", avatarUrl: "https://github.com/shadcn.png?" }, date: new Date(Date.now() - 6 * 3600_000).toISOString(), parents: ["f6e5d4c", "d4a5s6h"] },
  { hash: "d4a5s6h", message: "feat: add analytics chart component", author: { name: "Jordan Lee", avatarUrl: "https://github.com/leerob.png?" }, date: new Date(Date.now() - 8 * 3600_000).toISOString(), parents: ["w1i2p3"], refs: ["feat/dashboard"] },
  { hash: "f6e5d4c", message: "fix(api): handle rate limit headers", author: { name: "Alex Rivera" }, date: new Date(Date.now() - 18 * 3600_000).toISOString(), parents: ["4d5e6f1"] },
  { hash: "w1i2p3", message: "wip: dashboard layout skeleton", author: { name: "Jordan Lee", avatarUrl: "https://github.com/leerob.png?" }, date: new Date(Date.now() - 2 * 86400_000).toISOString(), parents: ["4d5e6f1"] },
  { hash: "4d5e6f1", message: "chore(deps): upgrade next to 15.5", author: { name: "Sarah Chen", avatarUrl: "https://github.com/shadcn.png?" }, date: new Date(Date.now() - 5 * 86400_000).toISOString(), parents: ["r7e8f9x"], tag: "v2.0.0" },
  { hash: "r7e8f9x", message: "refactor: migrate to app router", author: { name: "Taylor Kim" }, date: new Date(Date.now() - 8 * 86400_000).toISOString(), parents: ["0a1b2c3"] },
  { hash: "0a1b2c3", message: "Initial commit", author: { name: "Sarah Chen", avatarUrl: "https://github.com/shadcn.png?" }, date: new Date(Date.now() - 14 * 86400_000).toISOString(), parents: [] },
]

const linearCommits: Commit[] = [
  { hash: "abc1234", message: "fix: resolve login redirect loop", author: { name: "Alex Rivera" }, date: new Date(Date.now() - 3 * 3600_000).toISOString(), parents: ["def5678"], refs: ["main"] },
  { hash: "def5678", message: "docs: update API reference", author: { name: "Taylor Kim" }, date: new Date(Date.now() - 12 * 3600_000).toISOString(), parents: ["ghi9012"] },
  { hash: "ghi9012", message: "feat: add dark mode toggle", author: { name: "Sarah Chen", avatarUrl: "https://github.com/shadcn.png?" }, date: new Date(Date.now() - 2 * 86400_000).toISOString(), parents: ["jkl3456"], tag: "v1.2.0" },
  { hash: "jkl3456", message: "Initial commit", author: { name: "Sarah Chen", avatarUrl: "https://github.com/shadcn.png?" }, date: new Date(Date.now() - 7 * 86400_000).toISOString(), parents: [] },
]

export default function CommitGraphPage() {
  return (
    <ComponentDocsPage
      title="Commit Graph"
      description="Topological git graph with rail lines showing branch forks, merges, and commit ancestry."
      registryName="commit-graph"
      sourceFiles={sourceFiles}
      preview={<CommitGraph commits={sampleCommits} />}
      usage={
        <>
          <CodeLine
            code={`import { CommitGraph } from "@/components/commit-graph"`}
          />
          <CodeLine
            code={`<CommitGraph commits={commits} />`}
          />
          <p className="text-sm text-muted-foreground">
            Client component. Pass commits in topological order (newest first)
            with{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">parents</code>{" "}
            hashes — the graph computes fork and merge topology automatically.
            Click any commit row for a detail popover.
          </p>
        </>
      }
    >
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Linear history</h3>
          <p className="text-sm text-muted-foreground">
            A simple linear history with no branches or merges — single rail.
          </p>
          <VariantGrid
            registryName="commit-graph"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Linear",
                code: `<CommitGraph commits={linearCommits} />`,
                preview: <CommitGraph commits={linearCommits} />,
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Branching and merging</h3>
          <p className="text-sm text-muted-foreground">
            Commits with multiple parents create merge points. Commits with
            refs on different branches create fork points. The graph draws
            curved rail lines between them.
          </p>
          <VariantGrid
            registryName="commit-graph"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "With branches",
                code: `<CommitGraph commits={commitsWithBranches} />`,
                preview: <CommitGraph commits={sampleCommits} />,
              },
            ]}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">API Reference</h2>

        <ApiRefTable
          title="CommitGraph"
          props={[
            { name: "commits", type: "Commit[]", required: true, description: "Commits in topological order (newest first), each with parent hashes." },
            { name: "truncateHash", type: "number", description: "Number of hash characters to display. Defaults to 7." },
            { name: "railWidth", type: "number", description: "Pixel width per rail column. Defaults to 24." },
            { name: "className", type: "string", description: "Additional CSS classes on the root element." },
          ]}
        />

        <ApiRefTable
          title="Commit"
          props={[
            { name: "hash", type: "string", required: true, description: "Commit hash (full or abbreviated)." },
            { name: "message", type: "string", required: true, description: "Commit message (first line)." },
            { name: "author", type: "{ name: string; avatarUrl?: string }", required: true, description: "Commit author." },
            { name: "date", type: "string | Date", required: true, description: "Commit timestamp." },
            { name: "parents", type: "string[]", required: true, description: "Parent commit hashes. Empty for root. Two parents = merge commit." },
            { name: "refs", type: "string[]", description: "Branch or ref labels (e.g. 'main', 'feat/auth')." },
            { name: "tag", type: "string", description: "Tag label (e.g. 'v1.0.0')." },
          ]}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Notes</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Client component.</strong>{" "}
            Uses Radix Popover for commit detail views.
          </li>
          <li>
            <strong className="text-foreground">Topological layout.</strong>{" "}
            The graph computes rail positions from parent hashes — branches
            fork when a commit has children on different rails, and merge
            when a commit has multiple parents.
          </li>
          <li>
            <strong className="text-foreground">8-color palette.</strong>{" "}
            Rails cycle through 8 colors. The palette is consistent
            across renders for the same topology.
          </li>
          <li>
            <strong className="text-foreground">Composable.</strong>{" "}
            Fetch from GitHub, GitLab, or any git API and map to the
            Commit interface. The only required topology field is{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">parents</code>.
          </li>
        </ul>
      </section>
    </ComponentDocsPage>
  )
}
