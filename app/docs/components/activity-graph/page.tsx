import type { Metadata } from "next"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { ActivityGraphPlayground } from "./playground"
import { CodeLine } from "@/registry/code-line/code-line"
import {
  ActivityGraph,
  type ActivityEntry,
} from "@/registry/activity-graph/activity-graph"
import { fetchGitHubContributions } from "@/registry/activity-graph/lib/github"

export const metadata: Metadata = {
  title: "Activity Graph",
  description:
    "GitHub-style activity heatmap that visualizes daily counts as a color-intensity grid.",
}

const sourceFiles = [
  "registry/activity-graph/activity-graph.tsx",
  "registry/activity-graph/lib/github.ts",
]

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return s / 2147483647
  }
}

function generateSampleData(
  weeks: number,
  density: number,
  seed: number
): ActivityEntry[] {
  const rand = seededRandom(seed)
  const entries: ActivityEntry[] = []
  const today = new Date("2026-03-11")
  const totalDays = weeks * 7

  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const key = d.toISOString().slice(0, 10)

    if (rand() < density) {
      const dayOfWeek = d.getDay()
      const isWeekday = dayOfWeek > 0 && dayOfWeek < 6
      const base = isWeekday ? 3 : 1
      const count = Math.floor(rand() * (base * 4)) + 1
      entries.push({ date: key, count })
    }
  }

  return entries
}

const sparseData = generateSampleData(52, 0.2, 42)
const halfYearData = generateSampleData(26, 0.65, 88)

export default async function ActivityGraphPage() {
  const contributions = await fetchGitHubContributions("jal-co")
  const liveData = contributions?.entries ?? []
  const totalLabel = contributions
    ? `${contributions.total.toLocaleString()} contributions in the last year`
    : null

  return (
    <ComponentDocsPage
      title="Activity Graph"
      description="GitHub-style activity heatmap that visualizes daily counts as a color-intensity grid with month labels, day labels, and a Less/More legend. Includes a helper to fetch real GitHub contribution data."
      registryName="activity-graph"
      sourceFiles={sourceFiles}
      preview={
        <div className="flex w-full flex-col gap-2">
          {totalLabel && (
            <p className="text-sm font-medium text-muted-foreground">
              {totalLabel}
            </p>
          )}
          <ActivityGraph data={liveData} />
        </div>
      }
      usage={
        <>
          <CodeLine
            code={`import { ActivityGraph } from "@/components/activity-graph"`}
          />
          <CodeLine
            code={`<ActivityGraph data={[{ date: "2026-03-11", count: 5 }, ...]} />`}
          />
          <p className="text-sm text-muted-foreground">
            Pass an array of{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              {"{ date: string; count: number }"}
            </code>{" "}
            entries. The component builds the trailing-week grid automatically.
            Dates not present in the array render as zero-count cells.
          </p>
        </>
      }
    >
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Playground</h2>
        <ActivityGraphPlayground data={liveData} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">
          GitHub helper
        </h2>
        <p className="text-sm text-muted-foreground">
          The included{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            fetchGitHubContributions
          </code>{" "}
          function scrapes the public GitHub contributions page for any
          username — no API key required. It returns per-day counts and the
          yearly total.
        </p>
        <CodeLine
          code={`import { fetchGitHubContributions } from "@/lib/github"`}
        />
        <CodeLine
          code={`const contributions = await fetchGitHubContributions("octocat")`}
        />
        <CodeLine
          code={`<ActivityGraph data={contributions.entries} />`}
        />
        <p className="text-sm text-muted-foreground">
          The response is cached for 1 hour via Next.js ISR. Works as a
          server-side call in a server component or route handler.
        </p>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Activity patterns</h3>
          <VariantGrid
            registryName="activity-graph"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Sparse activity",
                code: `<ActivityGraph data={sparseData} />`,
                preview: <ActivityGraph data={sparseData} />,
              },
              {
                label: "Half year (26 weeks)",
                code: `<ActivityGraph data={data} weeks={26} />`,
                preview: <ActivityGraph data={halfYearData} weeks={26} />,
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Custom color scales</h3>
          <VariantGrid
            registryName="activity-graph"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Blue",
                code: `<ActivityGraph data={data} colorScale={["bg-muted", "bg-blue-300/60 dark:bg-blue-700/50", "bg-blue-400/70 dark:bg-blue-600/60", "bg-blue-500 dark:bg-blue-500/70", "bg-blue-600 dark:bg-blue-400"]} />`,
                preview: (
                  <ActivityGraph
                    data={liveData}
                    colorScale={[
                      "bg-muted",
                      "bg-blue-300/60 dark:bg-blue-700/50",
                      "bg-blue-400/70 dark:bg-blue-600/60",
                      "bg-blue-500 dark:bg-blue-500/70",
                      "bg-blue-600 dark:bg-blue-400",
                    ]}
                  />
                ),
              },
              {
                label: "Amber",
                code: `<ActivityGraph data={data} colorScale={["bg-muted", "bg-amber-300/60 dark:bg-amber-700/50", "bg-amber-400/70 dark:bg-amber-600/60", "bg-amber-500 dark:bg-amber-500/70", "bg-amber-600 dark:bg-amber-400"]} />`,
                preview: (
                  <ActivityGraph
                    data={liveData}
                    colorScale={[
                      "bg-muted",
                      "bg-amber-300/60 dark:bg-amber-700/50",
                      "bg-amber-400/70 dark:bg-amber-600/60",
                      "bg-amber-500 dark:bg-amber-500/70",
                      "bg-amber-600 dark:bg-amber-400",
                    ]}
                  />
                ),
              },
              {
                label: "Purple",
                code: `<ActivityGraph data={data} colorScale={["bg-muted", "bg-purple-300/60 dark:bg-purple-700/50", "bg-purple-400/70 dark:bg-purple-600/60", "bg-purple-500 dark:bg-purple-500/70", "bg-purple-600 dark:bg-purple-400"]} />`,
                preview: (
                  <ActivityGraph
                    data={liveData}
                    colorScale={[
                      "bg-muted",
                      "bg-purple-300/60 dark:bg-purple-700/50",
                      "bg-purple-400/70 dark:bg-purple-600/60",
                      "bg-purple-500 dark:bg-purple-500/70",
                      "bg-purple-600 dark:bg-purple-400",
                    ]}
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Fixed block size</h3>
          <VariantGrid
            registryName="activity-graph"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Fixed 14px (scrollable if wider than container)",
                code: `<ActivityGraph data={data} blockSize={14} />`,
                preview: (
                  <ActivityGraph data={liveData} blockSize={14} />
                ),
              },
            ]}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">API Reference</h2>

        <ApiRefTable
          title="ActivityGraph"
          props={[
            {
              name: "data",
              type: "ActivityEntry[]",
              required: true,
              description: "Array of date/count entries to visualize.",
              fullType: "Array<{ date: string; count: number }>",
            },
            {
              name: "colorScale",
              type: "[string, string, string, string, string]",
              description:
                "Five CSS classes for intensity levels 0 through 4. Defaults to a GitHub-style green scale.",
            },
            {
              name: "blockSize",
              type: "number",
              description:
                "Fixed cell size in pixels. When omitted, blocks auto-size to fill the container width.",
            },
            {
              name: "blockRadius",
              type: "number",
              description: "Cell border radius in pixels. Defaults to 2.",
            },
            {
              name: "weeks",
              type: "number",
              description:
                "Number of trailing weeks to display. Defaults to 52.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes on the root element.",
            },
          ]}
        />

        <ApiRefTable
          title="ActivityEntry"
          props={[
            {
              name: "date",
              type: "string",
              required: true,
              description: "ISO date string (YYYY-MM-DD).",
            },
            {
              name: "count",
              type: "number",
              required: true,
              description: "Activity count for this date.",
            },
          ]}
        />

        <ApiRefTable
          title="fetchGitHubContributions"
          props={[
            {
              name: "username",
              type: "string",
              required: true,
              description: "GitHub username to fetch contributions for.",
            },
            {
              name: "returns",
              type: "GitHubContributions | null",
              description:
                "Object with total count and entries array, or null on failure.",
              fullType:
                "{ total: number; entries: ActivityEntry[] } | null",
            },
          ]}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Notes</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Client component.</strong> Uses{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              &quot;use client&quot;
            </code>{" "}
            for a ResizeObserver that auto-sizes blocks to fit the container.
            Hover tooltips use native{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              title
            </code>{" "}
            attributes.
          </li>
          <li>
            <strong className="text-foreground">Auto-fit.</strong> By default
            the block size is computed from the container width so the graph
            always fits without scrolling. Pass a fixed{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              blockSize
            </code>{" "}
            to opt into horizontal scrolling instead.
          </li>
          <li>
            <strong className="text-foreground">GitHub scraping.</strong> The
            fetch helper scrapes GitHub&apos;s public contributions HTML page.
            No API key needed. Cached for 1 hour via ISR. If GitHub changes
            their markup, the parser may need updating.
          </li>
          <li>
            <strong className="text-foreground">Intensity mapping.</strong>{" "}
            Counts are mapped to four non-zero levels relative to the maximum
            count in the data. The thresholds are 25%, 50%, 75%, and 100% of the
            max.
          </li>
          <li>
            <strong className="text-foreground">No dependencies.</strong> This
            component uses only React, Tailwind, and the{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">cn</code>{" "}
            utility. No charting libraries or external packages.
          </li>
        </ul>
      </section>
    </ComponentDocsPage>
  )
}
