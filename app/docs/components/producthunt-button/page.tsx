import type { Metadata } from "next"
import { ProductHuntButton } from "@/registry/producthunt-button/producthunt-button"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { ProductHuntButtonPlayground } from "./playground"
import { CodeLine } from "@/registry/code-line/code-line"

export const metadata: Metadata = {
  title: "Product Hunt Button",
  description:
    "Link button showing a Product Hunt post's upvote count with the PH cat icon.",
}

const sourceFiles = [
  "registry/producthunt-button/producthunt-button.tsx",
  "registry/producthunt-button/lib/producthunt.ts",
]

const SAMPLE_UPVOTES = 12843
const SAMPLE_NAME = "Notion"
const SAMPLE_SLUG = "notion"
const SAMPLE_TAGLINE = "The all-in-one workspace for notes, tasks, and wikis"

export default async function ProductHuntButtonPage() {
  return (
    <ComponentDocsPage
      title="Product Hunt Button"
      description="Link button showing a Product Hunt post's upvote count with the PH cat icon. Async server component — fetches data at build time with ISR."
      registryName="producthunt-button"
      sourceFiles={sourceFiles}
      preview={
        <ProductHuntButton
          slug={SAMPLE_SLUG}
          upvotes={SAMPLE_UPVOTES}
          name={SAMPLE_NAME}
        />
      }
      usage={
        <>
          <CodeLine
            code={`import { ProductHuntButton } from "@/components/producthunt-button"`}
          />
          <CodeLine
            code={`<ProductHuntButton slug="my-product" />`}
          />
          <p className="text-sm text-muted-foreground">
            <strong>Async server component.</strong> Fetches the Product Hunt
            GraphQL API at build time and caches the result for 1 hour via
            Next.js ISR. Requires{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              PRODUCTHUNT_TOKEN
            </code>{" "}
            — get one at{" "}
            <a
              href="https://www.producthunt.com/v2/oauth/applications"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              producthunt.com/v2/oauth/applications
            </a>
            . Alternatively, pass pre-fetched data via{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              upvotes
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">name</code>{" "}
            props to skip the API call entirely.
          </p>
        </>
      }
    >
      {/* Playground */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Playground</h2>
        <ProductHuntButtonPlayground upvotes={SAMPLE_UPVOTES} />
      </section>

      {/* Examples */}
      <section className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Variants</h3>
          <VariantGrid
            registryName="producthunt-button"
            files={sourceFiles}
            columns={2}
            items={[
              {
                label: "Default",
                code: `<ProductHuntButton slug="notion" upvotes={12843} name="Notion" variant="default" />`,
                preview: (
                  <ProductHuntButton
                    slug={SAMPLE_SLUG}
                    upvotes={SAMPLE_UPVOTES}
                    name={SAMPLE_NAME}
                    variant="default"
                  />
                ),
              },
              {
                label: "Product Hunt",
                code: `<ProductHuntButton slug="notion" upvotes={12843} name="Notion" variant="producthunt" />`,
                preview: (
                  <ProductHuntButton
                    slug={SAMPLE_SLUG}
                    upvotes={SAMPLE_UPVOTES}
                    name={SAMPLE_NAME}
                    variant="producthunt"
                  />
                ),
              },
              {
                label: "Primary",
                code: `<ProductHuntButton slug="notion" upvotes={12843} name="Notion" variant="primary" />`,
                preview: (
                  <ProductHuntButton
                    slug={SAMPLE_SLUG}
                    upvotes={SAMPLE_UPVOTES}
                    name={SAMPLE_NAME}
                    variant="primary"
                  />
                ),
              },
              {
                label: "Secondary",
                code: `<ProductHuntButton slug="notion" upvotes={12843} name="Notion" variant="secondary" />`,
                preview: (
                  <ProductHuntButton
                    slug={SAMPLE_SLUG}
                    upvotes={SAMPLE_UPVOTES}
                    name={SAMPLE_NAME}
                    variant="secondary"
                  />
                ),
              },
              {
                label: "Outline",
                code: `<ProductHuntButton slug="notion" upvotes={12843} name="Notion" variant="outline" />`,
                preview: (
                  <ProductHuntButton
                    slug={SAMPLE_SLUG}
                    upvotes={SAMPLE_UPVOTES}
                    name={SAMPLE_NAME}
                    variant="outline"
                  />
                ),
              },
              {
                label: "Ghost",
                code: `<ProductHuntButton slug="notion" upvotes={12843} name="Notion" variant="ghost" />`,
                preview: (
                  <ProductHuntButton
                    slug={SAMPLE_SLUG}
                    upvotes={SAMPLE_UPVOTES}
                    name={SAMPLE_NAME}
                    variant="ghost"
                  />
                ),
              },
              {
                label: "Subtle",
                code: `<ProductHuntButton slug="notion" upvotes={12843} name="Notion" variant="subtle" />`,
                preview: (
                  <ProductHuntButton
                    slug={SAMPLE_SLUG}
                    upvotes={SAMPLE_UPVOTES}
                    name={SAMPLE_NAME}
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
            registryName="producthunt-button"
            files={sourceFiles}
            columns={3}
            items={[
              {
                label: "Small",
                code: `<ProductHuntButton slug="notion" upvotes={12843} name="Notion" size="sm" />`,
                preview: (
                  <ProductHuntButton
                    slug={SAMPLE_SLUG}
                    upvotes={SAMPLE_UPVOTES}
                    name={SAMPLE_NAME}
                    size="sm"
                  />
                ),
              },
              {
                label: "Default",
                code: `<ProductHuntButton slug="notion" upvotes={12843} name="Notion" size="default" />`,
                preview: (
                  <ProductHuntButton
                    slug={SAMPLE_SLUG}
                    upvotes={SAMPLE_UPVOTES}
                    name={SAMPLE_NAME}
                    size="default"
                  />
                ),
              },
              {
                label: "Large",
                code: `<ProductHuntButton slug="notion" upvotes={12843} name="Notion" size="lg" />`,
                preview: (
                  <ProductHuntButton
                    slug={SAMPLE_SLUG}
                    upvotes={SAMPLE_UPVOTES}
                    name={SAMPLE_NAME}
                    size="lg"
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">With product name</h3>
          <VariantGrid
            registryName="producthunt-button"
            files={sourceFiles}
            columns={2}
            items={[
              {
                label: "Default + Name",
                code: `<ProductHuntButton slug="notion" upvotes={12843} name="Notion" showName />`,
                preview: (
                  <ProductHuntButton
                    slug={SAMPLE_SLUG}
                    upvotes={SAMPLE_UPVOTES}
                    name={SAMPLE_NAME}
                    showName
                  />
                ),
              },
              {
                label: "Product Hunt + Name",
                code: `<ProductHuntButton slug="notion" upvotes={12843} name="Notion" showName variant="producthunt" />`,
                preview: (
                  <ProductHuntButton
                    slug={SAMPLE_SLUG}
                    upvotes={SAMPLE_UPVOTES}
                    name={SAMPLE_NAME}
                    showName
                    variant="producthunt"
                  />
                ),
              },
              {
                label: "Outline + Name + Brand",
                code: `<ProductHuntButton slug="notion" upvotes={12843} name="Notion" showName variant="outline" iconStyle="brand" />`,
                preview: (
                  <ProductHuntButton
                    slug={SAMPLE_SLUG}
                    upvotes={SAMPLE_UPVOTES}
                    name={SAMPLE_NAME}
                    showName
                    variant="outline"
                    iconStyle="brand"
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Icon styles</h3>
          <VariantGrid
            registryName="producthunt-button"
            files={sourceFiles}
            columns={3}
            items={[
              {
                label: "Current Color",
                code: `<ProductHuntButton slug="notion" upvotes={12843} name="Notion" iconStyle="currentColor" showName />`,
                preview: (
                  <ProductHuntButton
                    slug={SAMPLE_SLUG}
                    upvotes={SAMPLE_UPVOTES}
                    name={SAMPLE_NAME}
                    iconStyle="currentColor"
                    showName
                  />
                ),
              },
              {
                label: "Brand Orange",
                code: `<ProductHuntButton slug="notion" upvotes={12843} name="Notion" iconStyle="brand" showName />`,
                preview: (
                  <ProductHuntButton
                    slug={SAMPLE_SLUG}
                    upvotes={SAMPLE_UPVOTES}
                    name={SAMPLE_NAME}
                    iconStyle="brand"
                    showName
                  />
                ),
              },
              {
                label: "Muted",
                code: `<ProductHuntButton slug="notion" upvotes={12843} name="Notion" iconStyle="muted" showName />`,
                preview: (
                  <ProductHuntButton
                    slug={SAMPLE_SLUG}
                    upvotes={SAMPLE_UPVOTES}
                    name={SAMPLE_NAME}
                    iconStyle="muted"
                    showName
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Card layout</h3>
          <VariantGrid
            registryName="producthunt-button"
            files={sourceFiles}
            columns={2}
            items={[
              {
                label: "Card",
                code: `<ProductHuntButton slug="notion" upvotes={12843} name="Notion" tagline="The all-in-one workspace" layout="card" />`,
                preview: (
                  <ProductHuntButton
                    slug={SAMPLE_SLUG}
                    upvotes={SAMPLE_UPVOTES}
                    name={SAMPLE_NAME}
                    tagline={SAMPLE_TAGLINE}
                    layout="card"
                  />
                ),
              },
              {
                label: "Card (no tagline)",
                code: `<ProductHuntButton slug="notion" upvotes={12843} name="Notion" layout="card" showTagline={false} />`,
                preview: (
                  <ProductHuntButton
                    slug={SAMPLE_SLUG}
                    upvotes={SAMPLE_UPVOTES}
                    name={SAMPLE_NAME}
                    layout="card"
                    showTagline={false}
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
          title="ProductHuntButton"
          props={[
            {
              name: "slug",
              type: "string",
              required: true,
              description: "Product Hunt post slug (e.g. \"notion\").",
            },
            {
              name: "layout",
              type: '"inline" | "card"',
              description: 'Layout mode. Defaults to "inline".',
            },
            {
              name: "variant",
              type: '"default" | "producthunt" | "primary" | "secondary" | "outline" | "ghost" | "subtle"',
              description: 'Visual style variant (inline layout only). Defaults to "default".',
            },
            {
              name: "size",
              type: '"sm" | "default" | "lg"',
              description: 'Button size (inline layout only). Defaults to "default".',
            },
            {
              name: "upvotes",
              type: "number",
              description: "Pre-fetched upvote count. Skips the API call when provided with name.",
            },
            {
              name: "name",
              type: "string",
              description: "Pre-fetched product name.",
            },
            {
              name: "tagline",
              type: "string",
              description: "Pre-fetched product tagline (shown in card layout).",
            },
            {
              name: "showName",
              type: "boolean",
              description: "Show the product name alongside the upvote count. Defaults to false.",
            },
            {
              name: "showTagline",
              type: "boolean",
              description: "Show the tagline in card layout. Defaults to true.",
            },
            {
              name: "iconStyle",
              type: '"currentColor" | "brand" | "muted"',
              description: 'PH icon color style. Defaults to "currentColor".',
            },
          ]}
        />
      </section>

      {/* Notes */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Notes</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">API token required.</strong>{" "}
            Set{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              PRODUCTHUNT_TOKEN
            </code>{" "}
            to enable live data fetching. Get a developer token at{" "}
            <a
              href="https://www.producthunt.com/v2/oauth/applications"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              producthunt.com/v2/oauth/applications
            </a>
            .
          </li>
          <li>
            <strong className="text-foreground">ISR caching.</strong> Results
            cached for 1 hour via{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              next.revalidate
            </code>
            .
          </li>
          <li>
            <strong className="text-foreground">Pre-fetched data.</strong> Pass{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              upvotes
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">name</code>{" "}
            props to skip the API call entirely — useful for static sites or
            when you already have the data.
          </li>
        </ul>
      </section>
    </ComponentDocsPage>
  )
}
