import type { Metadata } from "next"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { CodeLine } from "@/registry/code-line/code-line"
import {
  LogViewerTerminal,
  LogViewerMinimal,
  LogViewerFilterable,
} from "@/registry/log-viewer/log-viewer"
import {
  generateSampleLogs,
  DEPLOY_LOG,
} from "@/registry/log-viewer/lib/sample-logs"
import { LogViewerPlayground } from "./playground"

export const metadata: Metadata = {
  title: "Log Viewer",
  description:
    "Scrollable log output component for displaying streaming logs or CLI-style output in web apps.",
}

const sourceFiles = [
  "registry/log-viewer/log-viewer.tsx",
  "registry/log-viewer/lib/sample-logs.ts",
]

const sampleData = generateSampleLogs(40, 42)
const smallSample = generateSampleLogs(12, 99)

export default function LogViewerPage() {
  return (
    <ComponentDocsPage
      title="Log Viewer"
      description="Scrollable log output component for displaying streaming logs or CLI-style output in web apps. Three variants — terminal, minimal, and filterable — cover most log display needs."
      registryName="log-viewer"
      sourceFiles={sourceFiles}
      preview={
        <div className="w-full">
          <LogViewerTerminal
            entries={sampleData}
            title="Application Logs"
            maxHeight={360}
          />
        </div>
      }
      usage={
        <>
          <CodeLine
            code={`import { LogViewerTerminal, LogViewerMinimal, LogViewerFilterable } from "@/components/log-viewer"`}
          />
          <CodeLine
            code={`<LogViewerTerminal entries={logs} title="Server Logs" />`}
          />
          <p className="text-sm text-muted-foreground">
            Pass an array of{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              {"{ level, message, timestamp? }"}
            </code>{" "}
            entries. All three variants support auto-scrolling and accept the
            same <code className="rounded bg-muted px-1 py-0.5 text-xs">LogEntry</code> format.
          </p>
        </>
      }
    >
      {/* Playground */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Playground</h2>
        <p className="text-sm text-muted-foreground">
          Switch between variants and click <strong>Start streaming</strong> to
          see auto-scroll in action.
        </p>
        <LogViewerPlayground sampleData={smallSample} />
      </section>

      {/* Variants */}
      <section className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold tracking-tight">Variants</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Terminal</h3>
          <p className="text-sm text-muted-foreground">
            Full CLI-style interface with toolbar, line numbers, timestamps,
            search, copy, export, and pause/resume.
          </p>
          <VariantGrid
            registryName="log-viewer"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Default terminal",
                code: `<LogViewerTerminal entries={logs} title="Server Logs" />`,
                preview: (
                  <LogViewerTerminal
                    entries={sampleData}
                    title="Server Logs"
                    maxHeight={300}
                  />
                ),
              },
              {
                label: "No line numbers, no timestamps",
                code: `<LogViewerTerminal entries={logs} lineNumbers={false} timestamps={false} />`,
                preview: (
                  <LogViewerTerminal
                    entries={sampleData}
                    title="Compact"
                    lineNumbers={false}
                    timestamps={false}
                    maxHeight={240}
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Minimal</h3>
          <p className="text-sm text-muted-foreground">
            Simple scrolling log lines with colored dots. Ideal for compact
            panels, sidebars, or embedded contexts.
          </p>
          <VariantGrid
            registryName="log-viewer"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Minimal with timestamps",
                code: `<LogViewerMinimal entries={logs} timestamps />`,
                preview: (
                  <LogViewerMinimal
                    entries={smallSample}
                    timestamps
                    maxHeight={240}
                  />
                ),
              },
              {
                label: "Minimal without timestamps",
                code: `<LogViewerMinimal entries={logs} />`,
                preview: (
                  <LogViewerMinimal
                    entries={smallSample}
                    maxHeight={200}
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Filterable</h3>
          <p className="text-sm text-muted-foreground">
            Adds level filter toggles with live counts and inline search.
            Toggle levels on/off to focus on errors or warnings.
          </p>
          <VariantGrid
            registryName="log-viewer"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Filterable with all levels",
                code: `<LogViewerFilterable entries={logs} levels={["error", "warn", "info", "debug", "verbose"]} />`,
                preview: (
                  <LogViewerFilterable
                    entries={sampleData}
                    title="All Levels"
                    maxHeight={340}
                    levels={["error", "warn", "info", "debug", "verbose"]}
                  />
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* Deploy log example */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Real-world example
        </h2>
        <p className="text-sm text-muted-foreground">
          A realistic CI/CD deploy log using the terminal variant.
        </p>
        <VariantGrid
          registryName="log-viewer"
          files={sourceFiles}
          columns={1}
          fullWidth
          items={[
            {
              label: "Deploy pipeline",
              code: `<LogViewerTerminal entries={deployLog} title="Deploy — main (abc1234)" />`,
              preview: (
                <LogViewerTerminal
                  entries={DEPLOY_LOG}
                  title="Deploy — main (abc1234)"
                  maxHeight={400}
                />
              ),
            },
          ]}
        />
      </section>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">API Reference</h2>

        <ApiRefTable
          title="LogEntry"
          props={[
            {
              name: "level",
              type: "LogLevel",
              required: true,
              description: "Log severity level.",
              fullType: '"info" | "warn" | "error" | "debug" | "verbose"',
            },
            {
              name: "message",
              type: "string",
              required: true,
              description: "Log message text.",
            },
            {
              name: "timestamp",
              type: "string",
              description:
                "ISO timestamp string. When omitted, the current time is used for display.",
            },
          ]}
        />

        <ApiRefTable
          title="LogViewerTerminal"
          props={[
            {
              name: "entries",
              type: "LogEntry[]",
              required: true,
              description: "Log entries to display.",
            },
            {
              name: "title",
              type: "string",
              description: 'Title shown in the toolbar. Defaults to "Logs".',
            },
            {
              name: "maxHeight",
              type: "number",
              description:
                "Maximum visible height in pixels. Defaults to 400.",
            },
            {
              name: "lineNumbers",
              type: "boolean",
              description: "Show line numbers. Defaults to true.",
            },
            {
              name: "timestamps",
              type: "boolean",
              description: "Show timestamps. Defaults to true.",
            },
            {
              name: "autoScroll",
              type: "boolean",
              description:
                "Enable auto-scroll to bottom on new entries. Defaults to true.",
            },
            {
              name: "onClear",
              type: "() => void",
              description:
                "Called when the user clicks Clear. When provided, a clear button appears in the toolbar.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes on the root element.",
            },
          ]}
        />

        <ApiRefTable
          title="LogViewerMinimal"
          props={[
            {
              name: "entries",
              type: "LogEntry[]",
              required: true,
              description: "Log entries to display.",
            },
            {
              name: "maxHeight",
              type: "number",
              description:
                "Maximum visible height in pixels. Defaults to 300.",
            },
            {
              name: "timestamps",
              type: "boolean",
              description: "Show timestamps. Defaults to false.",
            },
            {
              name: "autoScroll",
              type: "boolean",
              description:
                "Enable auto-scroll to bottom on new entries. Defaults to true.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes on the root element.",
            },
          ]}
        />

        <ApiRefTable
          title="LogViewerFilterable"
          props={[
            {
              name: "entries",
              type: "LogEntry[]",
              required: true,
              description: "Log entries to display.",
            },
            {
              name: "title",
              type: "string",
              description: 'Title shown in the header. Defaults to "Logs".',
            },
            {
              name: "maxHeight",
              type: "number",
              description:
                "Maximum visible height in pixels. Defaults to 400.",
            },
            {
              name: "timestamps",
              type: "boolean",
              description: "Show timestamps. Defaults to true.",
            },
            {
              name: "autoScroll",
              type: "boolean",
              description:
                "Enable auto-scroll to bottom on new entries. Defaults to true.",
            },
            {
              name: "levels",
              type: "LogLevel[]",
              description:
                'Levels shown in the filter bar. Defaults to ["error", "warn", "info", "debug"].',
              fullType: 'Array<"info" | "warn" | "error" | "debug" | "verbose">',
            },
            {
              name: "onClear",
              type: "() => void",
              description:
                "Called when the user clicks Clear. When provided, a clear button appears.",
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
            <strong className="text-foreground">Client component.</strong> Uses{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              &quot;use client&quot;
            </code>{" "}
            for scroll tracking, search state, and clipboard access.
          </li>
          <li>
            <strong className="text-foreground">Auto-scroll.</strong> New
            entries scroll into view when the user is at the bottom. Scrolling
            up pauses auto-scroll and shows a &quot;New logs below&quot; button.
            The terminal variant also has an explicit pause/resume toggle.
          </li>
          <li>
            <strong className="text-foreground">Five log levels.</strong> Each
            level (error, warn, info, debug, verbose) has distinct colors that
            work in both light and dark modes.
          </li>
          <li>
            <strong className="text-foreground">Export.</strong> The terminal
            and filterable variants include a download button that exports logs
            as a plain text file with timestamps and level labels.
          </li>
          <li>
            <strong className="text-foreground">Search highlighting.</strong>{" "}
            Search matches are highlighted inline. In the filterable variant,
            search and level filters compose — only entries matching both are
            shown.
          </li>
          <li>
            <strong className="text-foreground">Accessibility.</strong> The log
            container uses{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              role=&quot;log&quot;
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              aria-live=&quot;polite&quot;
            </code>{" "}
            so screen readers announce new entries. Filter toggles use{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              role=&quot;checkbox&quot;
            </code>{" "}
            with{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              aria-checked
            </code>.
          </li>
          <li>
            <strong className="text-foreground">No dependencies.</strong> Only
            requires React, Tailwind, lucide-react, and the{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">cn</code>{" "}
            utility. No virtual-scrolling library — suitable for log sets up
            to a few thousand entries.
          </li>
        </ul>
      </section>
    </ComponentDocsPage>
  )
}
