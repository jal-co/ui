import type { Metadata } from "next"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { CodeLine } from "@/registry/code-line/code-line"
import { CronSchedule } from "@/registry/cron-schedule/cron-schedule"

export const metadata: Metadata = {
  title: "Cron Schedule",
  description:
    "Visual cron expression display with field breakdown, human-readable summary, and next-run preview.",
}

const sourceFiles = ["registry/cron-schedule/cron-schedule.tsx"]

const referenceDate = new Date("2026-03-11T10:00:00")

export default function CronSchedulePage() {
  return (
    <ComponentDocsPage
      title="Cron Schedule"
      description="Visual cron expression display with field breakdown, human-readable summary, and optional next-run preview. Designed for dashboards, serverless function docs, and scheduling UIs."
      registryName="cron-schedule"
      sourceFiles={sourceFiles}
      preview={
        <CronSchedule
          expression="0 9 * * 1-5"
          title="Daily Standup Reminder"
          showNextRuns={3}
          referenceDate={referenceDate}
        />
      }
      usage={
        <>
          <CodeLine
            code={`import { CronSchedule } from "@/components/cron-schedule"`}
          />
          <CodeLine
            code={`<CronSchedule expression="0 9 * * 1-5" title="Daily Standup" />`}
          />
          <p className="text-sm text-muted-foreground">
            Pass a standard 5-field cron expression. The component parses it
            into a human-readable summary and a visual field breakdown.
            Optionally show upcoming run times with{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              showNextRuns
            </code>
            .
          </p>
        </>
      }
    >
      {/* Examples */}
      <section className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Common schedules</h3>
          <VariantGrid
            registryName="cron-schedule"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Every 15 minutes",
                code: `<CronSchedule expression="*/15 * * * *" title="Health Check" />`,
                preview: (
                  <CronSchedule
                    expression="*/15 * * * *"
                    title="Health Check"
                  />
                ),
              },
              {
                label: "Weekdays at 9 AM",
                code: `<CronSchedule expression="0 9 * * 1-5" title="Daily Standup Reminder" />`,
                preview: (
                  <CronSchedule
                    expression="0 9 * * 1-5"
                    title="Daily Standup Reminder"
                  />
                ),
              },
              {
                label: "Midnight on the 1st",
                code: `<CronSchedule expression="0 0 1 * *" title="Monthly Cleanup" />`,
                preview: (
                  <CronSchedule
                    expression="0 0 1 * *"
                    title="Monthly Cleanup"
                  />
                ),
              },
              {
                label: "Every hour",
                code: `<CronSchedule expression="0 * * * *" title="Cache Refresh" />`,
                preview: (
                  <CronSchedule
                    expression="0 * * * *"
                    title="Cache Refresh"
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">With next runs</h3>
          <p className="text-sm text-muted-foreground">
            Set{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              showNextRuns
            </code>{" "}
            to display upcoming execution times. Pass{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              referenceDate
            </code>{" "}
            to control the starting point (defaults to now).
          </p>
          <VariantGrid
            registryName="cron-schedule"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Next 5 runs",
                code: `<CronSchedule expression="30 8,12,17 * * 1-5" title="Notification Digest" showNextRuns={5} />`,
                preview: (
                  <CronSchedule
                    expression="30 8,12,17 * * 1-5"
                    title="Notification Digest"
                    showNextRuns={5}
                    referenceDate={referenceDate}
                  />
                ),
              },
              {
                label: "Next 3 runs — every 6 hours",
                code: `<CronSchedule expression="0 */6 * * *" title="Data Sync" showNextRuns={3} />`,
                preview: (
                  <CronSchedule
                    expression="0 */6 * * *"
                    title="Data Sync"
                    showNextRuns={3}
                    referenceDate={referenceDate}
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Complex expressions</h3>
          <VariantGrid
            registryName="cron-schedule"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Quarterly report — 1st of Jan, Apr, Jul, Oct at 6 AM",
                code: `<CronSchedule expression="0 6 1 1,4,7,10 *" title="Quarterly Report" showNextRuns={4} />`,
                preview: (
                  <CronSchedule
                    expression="0 6 1 1,4,7,10 *"
                    title="Quarterly Report"
                    showNextRuns={4}
                    referenceDate={referenceDate}
                  />
                ),
              },
              {
                label: "Weekends only — Sat and Sun at noon",
                code: `<CronSchedule expression="0 12 * * 0,6" title="Weekend Batch" />`,
                preview: (
                  <CronSchedule
                    expression="0 12 * * 0,6"
                    title="Weekend Batch"
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Without title</h3>
          <p className="text-sm text-muted-foreground">
            Omit the title for a compact display that shows only the summary
            and field breakdown.
          </p>
          <VariantGrid
            registryName="cron-schedule"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Minimal",
                code: `<CronSchedule expression="*/5 * * * *" />`,
                preview: (
                  <CronSchedule expression="*/5 * * * *" />
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
          title="CronSchedule"
          props={[
            {
              name: "expression",
              type: "string",
              required: true,
              description:
                'Standard 5-field cron expression (e.g. "0 9 * * 1-5").',
            },
            {
              name: "title",
              type: "string",
              description: "Heading label shown in the header.",
            },
            {
              name: "showNextRuns",
              type: "number",
              description:
                "Number of upcoming run times to display. Defaults to 0 (hidden).",
            },
            {
              name: "referenceDate",
              type: "Date",
              description:
                "Base date for computing next runs. Defaults to the current date.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes on the root element.",
            },
          ]}
        />
      </section>

      {/* Cron syntax reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Cron syntax reference
        </h2>
        <div className="overflow-hidden rounded-lg border border-border/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-muted/30">
                <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">
                  Field
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">
                  Values
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">
                  Specials
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              <tr>
                <td className="px-3 py-2 font-mono text-xs text-foreground">
                  Minute
                </td>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                  0–59
                </td>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                  * , - /
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs text-foreground">
                  Hour
                </td>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                  0–23
                </td>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                  * , - /
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs text-foreground">
                  Day (Month)
                </td>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                  1–31
                </td>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                  * , - /
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs text-foreground">
                  Month
                </td>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                  1–12
                </td>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                  * , - /
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs text-foreground">
                  Day (Week)
                </td>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                  0–6 (Sun–Sat)
                </td>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                  * , - /
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Notes */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Notes</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Server component.</strong> No{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              &quot;use client&quot;
            </code>{" "}
            — renders entirely on the server with zero client JS.
          </li>
          <li>
            <strong className="text-foreground">Standard 5-field only.</strong>{" "}
            Supports minute, hour, day-of-month, month, and day-of-week.
            Does not support seconds, years, or non-standard extensions like{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">L</code>,{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">W</code>,
            or{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">#</code>.
          </li>
          <li>
            <strong className="text-foreground">No dependencies.</strong> Cron
            parsing and next-run computation are built-in. No external
            scheduling library required.
          </li>
          <li>
            <strong className="text-foreground">Next-run accuracy.</strong> Runs
            are computed by iterating minute-by-minute from the reference date,
            capped at ~1 year of lookahead. This is suitable for display
            purposes — not a production scheduler.
          </li>
          <li>
            <strong className="text-foreground">Timezone.</strong> Next-run
            times use the server&apos;s local timezone (or the timezone of the
            provided{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              referenceDate
            </code>
            ). No timezone conversion is applied.
          </li>
        </ul>
      </section>
    </ComponentDocsPage>
  )
}
