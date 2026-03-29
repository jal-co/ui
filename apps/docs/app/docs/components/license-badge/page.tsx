import type { Metadata } from "next"
import { LicenseBadge } from "@/registry/license-badge/license-badge"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { CodeLine } from "@/registry/code-line/code-line"

export const metadata: Metadata = {
  title: "License Badge",
  description:
    "Software license badge with SPDX identifier, category color-coding, and OSI-approved indicator.",
}

const sourceFiles = [
  "registry/license-badge/license-badge.tsx",
  "registry/license-badge/lib/licenses.ts",
]

export default async function LicenseBadgePage() {
  return (
    <ComponentDocsPage
      title="License Badge"
      description="Software license badge with SPDX identifier, category color-coding, and OSI-approved indicator. Three layouts: inline pill, segmented row, and expanded card."
      registryName="license-badge"
      sourceFiles={sourceFiles}
      preview={
        <div className="flex flex-col items-center gap-6">
          <LicenseBadge license="MIT" />
          <LicenseBadge license="Apache-2.0" layout="row" />
          <LicenseBadge license="GPL-3.0" layout="card" className="w-full max-w-sm" />
        </div>
      }
      usage={
        <>
          <CodeLine
            code={`import { LicenseBadge } from "@/components/license-badge"`}
          />
          <CodeLine code={`<LicenseBadge license="MIT" />`} />
          <p className="text-sm text-muted-foreground">
            Pass a <code className="rounded bg-muted px-1 py-0.5 text-xs">license</code> SPDX
            identifier directly, or use <code className="rounded bg-muted px-1 py-0.5 text-xs">owner</code> /{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">repo</code> to
            fetch the license from the GitHub API. When using the API,
            this is an <strong>async server component</strong> with 1-hour ISR caching.
          </p>
        </>
      }
    >
      {/* Layouts */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Layouts</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Inline</h3>
          <p className="text-sm text-muted-foreground">
            Compact pill showing the license icon and SPDX identifier. The default layout.
          </p>
          <VariantGrid
            registryName="license-badge"
            files={sourceFiles}
            columns={3}
            items={[
              {
                label: "MIT",
                code: `<LicenseBadge license="MIT" />`,
                preview: <LicenseBadge license="MIT" />,
              },
              {
                label: "Apache-2.0",
                code: `<LicenseBadge license="Apache-2.0" />`,
                preview: <LicenseBadge license="Apache-2.0" />,
              },
              {
                label: "With category",
                code: `<LicenseBadge license="GPL-3.0" showCategory />`,
                preview: <LicenseBadge license="GPL-3.0" showCategory />,
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Row</h3>
          <p className="text-sm text-muted-foreground">
            Segmented horizontal strip showing license, category, and OSI status.
          </p>
          <VariantGrid
            registryName="license-badge"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Default",
                code: `<LicenseBadge license="MIT" layout="row" />`,
                preview: (
                  <div className="flex justify-center">
                    <LicenseBadge license="MIT" layout="row" />
                  </div>
                ),
              },
              {
                label: "Outline + copyleft",
                code: `<LicenseBadge license="GPL-3.0" layout="row" variant="outline" />`,
                preview: (
                  <div className="flex justify-center">
                    <LicenseBadge license="GPL-3.0" layout="row" variant="outline" />
                  </div>
                ),
              },
              {
                label: "Weak copyleft",
                code: `<LicenseBadge license="MPL-2.0" layout="row" />`,
                preview: (
                  <div className="flex justify-center">
                    <LicenseBadge license="MPL-2.0" layout="row" />
                  </div>
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Card</h3>
          <p className="text-sm text-muted-foreground">
            Expanded card with license name, description, SPDX identifier, and category tag.
          </p>
          <VariantGrid
            registryName="license-badge"
            files={sourceFiles}
            columns={2}
            items={[
              {
                label: "MIT",
                code: `<LicenseBadge license="MIT" layout="card" />`,
                preview: (
                  <LicenseBadge license="MIT" layout="card" className="w-full" />
                ),
              },
              {
                label: "Apache-2.0",
                code: `<LicenseBadge license="Apache-2.0" layout="card" />`,
                preview: (
                  <LicenseBadge license="Apache-2.0" layout="card" className="w-full" />
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* License categories */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">License Categories</h2>
        <p className="text-sm text-muted-foreground">
          Licenses are automatically categorized and color-coded by type.
        </p>
        <VariantGrid
          registryName="license-badge"
          files={sourceFiles}
          columns={3}
          items={[
            {
              label: "Permissive",
              code: `<LicenseBadge license="MIT" showCategory />`,
              preview: <LicenseBadge license="MIT" showCategory />,
            },
            {
              label: "Copyleft",
              code: `<LicenseBadge license="GPL-3.0" showCategory />`,
              preview: <LicenseBadge license="GPL-3.0" showCategory />,
            },
            {
              label: "Weak copyleft",
              code: `<LicenseBadge license="MPL-2.0" showCategory />`,
              preview: <LicenseBadge license="MPL-2.0" showCategory />,
            },
            {
              label: "Public domain",
              code: `<LicenseBadge license="Unlicense" showCategory />`,
              preview: <LicenseBadge license="Unlicense" showCategory />,
            },
            {
              label: "Proprietary",
              code: `<LicenseBadge license="BUSL-1.1" showCategory />`,
              preview: <LicenseBadge license="BUSL-1.1" showCategory />,
            },
            {
              label: "Network copyleft",
              code: `<LicenseBadge license="AGPL-3.0" showCategory />`,
              preview: <LicenseBadge license="AGPL-3.0" showCategory />,
            },
          ]}
        />
      </section>

      {/* Variants */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Inline variants</h3>
          <VariantGrid
            registryName="license-badge"
            files={sourceFiles}
            columns={2}
            items={[
              {
                label: "Default",
                code: `<LicenseBadge license="MIT" variant="default" />`,
                preview: <LicenseBadge license="MIT" variant="default" />,
              },
              {
                label: "Primary",
                code: `<LicenseBadge license="MIT" variant="primary" />`,
                preview: <LicenseBadge license="MIT" variant="primary" />,
              },
              {
                label: "Secondary",
                code: `<LicenseBadge license="MIT" variant="secondary" />`,
                preview: <LicenseBadge license="MIT" variant="secondary" />,
              },
              {
                label: "Outline",
                code: `<LicenseBadge license="MIT" variant="outline" />`,
                preview: <LicenseBadge license="MIT" variant="outline" />,
              },
              {
                label: "Ghost",
                code: `<LicenseBadge license="MIT" variant="ghost" />`,
                preview: <LicenseBadge license="MIT" variant="ghost" />,
              },
              {
                label: "Subtle",
                code: `<LicenseBadge license="MIT" variant="subtle" />`,
                preview: <LicenseBadge license="MIT" variant="subtle" />,
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Sizes</h3>
          <VariantGrid
            registryName="license-badge"
            files={sourceFiles}
            columns={3}
            items={[
              {
                label: "Small",
                code: `<LicenseBadge license="MIT" size="sm" />`,
                preview: <LicenseBadge license="MIT" size="sm" />,
              },
              {
                label: "Default",
                code: `<LicenseBadge license="MIT" size="default" />`,
                preview: <LicenseBadge license="MIT" size="default" />,
              },
              {
                label: "Large",
                code: `<LicenseBadge license="MIT" size="lg" />`,
                preview: <LicenseBadge license="MIT" size="lg" />,
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">From GitHub API</h3>
          <p className="text-sm text-muted-foreground">
            Pass <code className="rounded bg-muted px-1 py-0.5 text-xs">owner</code> and{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">repo</code> to
            fetch the license from GitHub automatically.
          </p>
          <VariantGrid
            registryName="license-badge"
            files={sourceFiles}
            columns={2}
            items={[
              {
                label: "Inline",
                code: `<LicenseBadge owner="facebook" repo="react" />`,
                preview: <LicenseBadge owner="facebook" repo="react" />,
              },
              {
                label: "Card",
                code: `<LicenseBadge owner="vercel" repo="next.js" layout="card" />`,
                preview: (
                  <LicenseBadge owner="vercel" repo="next.js" layout="card" className="w-full" />
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
          title="LicenseBadge"
          props={[
            {
              name: "license",
              type: "string",
              description:
                'SPDX license identifier (e.g. "MIT", "Apache-2.0"). When provided, skips the GitHub API.',
            },
            {
              name: "owner",
              type: "string",
              description:
                "GitHub username or organization. Used with repo to fetch the license from the GitHub API.",
            },
            {
              name: "repo",
              type: "string",
              description:
                "GitHub repository name. Used with owner to fetch the license from the GitHub API.",
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
                'Visual style variant (inline/row only). Defaults to "default".',
            },
            {
              name: "size",
              type: '"sm" | "default" | "lg"',
              description:
                'Badge size (inline/row only). Defaults to "default".',
            },
            {
              name: "showCategory",
              type: "boolean",
              description:
                "Show license category tag (e.g. Permissive, Copyleft). Defaults to false for inline, true for row/card.",
            },
            {
              name: "showOsi",
              type: "boolean",
              description:
                "Show OSI-approved indicator. Defaults to true.",
            },
            {
              name: "showDescription",
              type: "boolean",
              description:
                "Show license description. Defaults to true for card layout.",
            },
            {
              name: "href",
              type: "string",
              description:
                "URL to link to. Auto-detected when using owner/repo or from SPDX metadata.",
            },
          ]}
        />
      </section>

      {/* Notes */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Notes</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Dual input modes.</strong> Pass a{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">license</code> string
            for static rendering, or <code className="rounded bg-muted px-1 py-0.5 text-xs">owner</code> /{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">repo</code> to
            fetch from GitHub. When the license prop is provided, no API call is made.
          </li>
          <li>
            <strong className="text-foreground">ISR caching.</strong> GitHub API
            data is cached for 1 hour via{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              next.revalidate
            </code>
            . No API key required, but{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              GITHUB_TOKEN
            </code>{" "}
            raises the rate limit from 60 to 5,000 requests/hour.
          </li>
          <li>
            <strong className="text-foreground">SPDX resolution.</strong> Handles
            common variations like case-insensitive matching,{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">-only</code> and{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">-or-later</code> suffixes.
            Unknown identifiers get a fallback entry linking to SPDX.
          </li>
          <li>
            <strong className="text-foreground">Category colors.</strong> Licenses
            are automatically color-coded: green for permissive, amber for copyleft,
            sky for weak copyleft, violet for public domain, rose for proprietary.
          </li>
        </ul>
      </section>
    </ComponentDocsPage>
  )
}
