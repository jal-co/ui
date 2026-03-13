import type { Metadata } from "next"
import { NpmBadge } from "@/registry/npm-badge/npm-badge"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { CodeLine } from "@/registry/code-line/code-line"

export const metadata: Metadata = {
  title: "npm Badge",
  description:
    "Live npm package badge showing version, weekly downloads, license, and last publish date.",
}

const sourceFiles = [
  "registry/npm-badge/npm-badge.tsx",
  "registry/npm-badge/lib/npm.ts",
]

export default async function NpmBadgePage() {
  return (
    <ComponentDocsPage
      title="npm Badge"
      description="Live npm package badge showing version, weekly downloads, license, and last publish date. Async server component — fetches data at build time with ISR."
      registryName="npm-badge"
      sourceFiles={sourceFiles}
      preview={
        <div className="flex flex-col items-center gap-6">
          <NpmBadge package="react" />
          <NpmBadge package="next" layout="row" />
          <NpmBadge package="react" layout="card" className="w-full max-w-sm" />
        </div>
      }
      usage={
        <>
          <CodeLine
            code={`import { NpmBadge } from "@/components/npm-badge"`}
          />
          <CodeLine code={`<NpmBadge package="react" />`} />
          <p className="text-sm text-muted-foreground">
            <strong>Async server component.</strong> Fetches the npm registry at
            build time and caches the result for 1 hour via Next.js ISR. No API
            key required.
          </p>
        </>
      }
    >
      {/* Layouts */}
      <section className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold tracking-tight">Layouts</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Inline</h3>
          <p className="text-sm text-muted-foreground">
            Compact pill showing the npm icon and version. The default layout.
          </p>
          <VariantGrid
            registryName="npm-badge"
            files={sourceFiles}
            columns={3}
            items={[
              {
                label: "Default",
                code: `<NpmBadge package="react" />`,
                preview: <NpmBadge package="react" />,
              },
              {
                label: "With downloads",
                code: `<NpmBadge package="react" showDownloads />`,
                preview: <NpmBadge package="react" showDownloads />,
              },
              {
                label: "npm icon",
                code: `<NpmBadge package="next" iconStyle="npm" />`,
                preview: <NpmBadge package="next" iconStyle="npm" />,
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Row</h3>
          <p className="text-sm text-muted-foreground">
            Segmented horizontal strip showing package name, version, downloads,
            and license.
          </p>
          <VariantGrid
            registryName="npm-badge"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Default",
                code: `<NpmBadge package="react" layout="row" />`,
                preview: (
                  <div className="flex justify-center">
                    <NpmBadge package="react" layout="row" />
                  </div>
                ),
              },
              {
                label: "Outline + npm icon",
                code: `<NpmBadge package="next" layout="row" variant="outline" iconStyle="npm" />`,
                preview: (
                  <div className="flex justify-center">
                    <NpmBadge
                      package="next"
                      layout="row"
                      variant="outline"
                      iconStyle="npm"
                    />
                  </div>
                ),
              },
              {
                label: "Scoped package",
                code: `<NpmBadge package="@tanstack/react-query" layout="row" />`,
                preview: (
                  <div className="flex justify-center">
                    <NpmBadge package="@tanstack/react-query" layout="row" />
                  </div>
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Card</h3>
          <p className="text-sm text-muted-foreground">
            Expanded card with description, version badge, and stats row.
          </p>
          <VariantGrid
            registryName="npm-badge"
            files={sourceFiles}
            columns={2}
            items={[
              {
                label: "Default",
                code: `<NpmBadge package="react" layout="card" />`,
                preview: (
                  <NpmBadge package="react" layout="card" className="w-full" />
                ),
              },
              {
                label: "npm icon",
                code: `<NpmBadge package="next" layout="card" iconStyle="npm" />`,
                preview: (
                  <NpmBadge
                    package="next"
                    layout="card"
                    iconStyle="npm"
                    className="w-full"
                  />
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* Variants (inline) */}
      <section className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Inline variants</h3>
          <VariantGrid
            registryName="npm-badge"
            files={sourceFiles}
            columns={2}
            items={[
              {
                label: "Default",
                code: `<NpmBadge package="react" variant="default" />`,
                preview: <NpmBadge package="react" variant="default" />,
              },
              {
                label: "Primary",
                code: `<NpmBadge package="react" variant="primary" />`,
                preview: <NpmBadge package="react" variant="primary" />,
              },
              {
                label: "Secondary",
                code: `<NpmBadge package="react" variant="secondary" />`,
                preview: <NpmBadge package="react" variant="secondary" />,
              },
              {
                label: "Outline",
                code: `<NpmBadge package="react" variant="outline" />`,
                preview: <NpmBadge package="react" variant="outline" />,
              },
              {
                label: "Ghost",
                code: `<NpmBadge package="react" variant="ghost" />`,
                preview: <NpmBadge package="react" variant="ghost" />,
              },
              {
                label: "Subtle",
                code: `<NpmBadge package="react" variant="subtle" />`,
                preview: <NpmBadge package="react" variant="subtle" />,
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Sizes</h3>
          <VariantGrid
            registryName="npm-badge"
            files={sourceFiles}
            columns={3}
            items={[
              {
                label: "Small",
                code: `<NpmBadge package="react" size="sm" />`,
                preview: <NpmBadge package="react" size="sm" />,
              },
              {
                label: "Default",
                code: `<NpmBadge package="react" size="default" />`,
                preview: <NpmBadge package="react" size="default" />,
              },
              {
                label: "Large",
                code: `<NpmBadge package="react" size="lg" />`,
                preview: <NpmBadge package="react" size="lg" />,
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Row variants</h3>
          <VariantGrid
            registryName="npm-badge"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Default",
                code: `<NpmBadge package="react" layout="row" variant="default" />`,
                preview: (
                  <div className="flex justify-center">
                    <NpmBadge package="react" layout="row" variant="default" />
                  </div>
                ),
              },
              {
                label: "Outline",
                code: `<NpmBadge package="react" layout="row" variant="outline" />`,
                preview: (
                  <div className="flex justify-center">
                    <NpmBadge package="react" layout="row" variant="outline" />
                  </div>
                ),
              },
              {
                label: "Ghost",
                code: `<NpmBadge package="react" layout="row" variant="ghost" />`,
                preview: (
                  <div className="flex justify-center">
                    <NpmBadge package="react" layout="row" variant="ghost" />
                  </div>
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
          title="NpmBadge"
          props={[
            {
              name: "package",
              type: "string",
              required: true,
              description:
                'npm package name (e.g. "react", "@tanstack/react-query").',
            },
            {
              name: "layout",
              type: '"inline" | "row" | "card"',
              description:
                'Display layout. Defaults to "inline".',
            },
            {
              name: "variant",
              type: '"default" | "primary" | "secondary" | "outline" | "ghost" | "subtle"',
              description:
                'Visual style variant (inline/row only). Defaults to "default". The card layout uses a fixed card style.',
            },
            {
              name: "size",
              type: '"sm" | "default" | "lg"',
              description:
                'Badge size (inline/row only). Defaults to "default".',
            },
            {
              name: "iconStyle",
              type: '"currentColor" | "npm"',
              description:
                'npm icon color. "currentColor" inherits from variant, "npm" uses brand red (#CB3837). Defaults to "currentColor".',
            },
            {
              name: "showDownloads",
              type: "boolean",
              description:
                "Show weekly download count. Defaults to true for row/card, false for inline.",
            },
            {
              name: "showLicense",
              type: "boolean",
              description:
                "Show license badge. Defaults to true for card/row, false for inline.",
            },

            {
              name: "showLastPublish",
              type: "boolean",
              description:
                "Show last publish date. Defaults to true for card.",
            },
            {
              name: "data",
              type: "NpmPackageData",
              description:
                "Pre-fetched package data. When provided, skips the npm API calls.",
            },
          ]}
        />
      </section>

      {/* Notes */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Notes</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">ISR caching.</strong> Registry
            and download data are cached for 1 hour via{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              next.revalidate
            </code>
            . No API key required.
          </li>
          <li>
            <strong className="text-foreground">Pre-fetched data.</strong> Pass
            the{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">data</code>{" "}
            prop to skip the API calls entirely — useful for static builds or
            when fetching data separately.
          </li>
          <li>
            <strong className="text-foreground">Scoped packages.</strong>{" "}
            Supports scoped names like{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              @tanstack/react-query
            </code>
            .
          </li>
        </ul>
      </section>
    </ComponentDocsPage>
  )
}
