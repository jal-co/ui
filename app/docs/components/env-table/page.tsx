import type { Metadata } from "next"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { CodeLine } from "@/registry/code-line/code-line"
import {
  EnvTable,
  type EnvVariable,
} from "@/registry/env-table/env-table"

export const metadata: Metadata = {
  title: "Env Table",
  description:
    "Read-only environment variable table with masked values, click-to-reveal, and copy.",
}

const sourceFiles = ["registry/env-table/env-table.tsx"]

const databaseVars: EnvVariable[] = [
  {
    key: "DATABASE_URL",
    value: "postgresql://admin:s3cret@db.example.com:5432/myapp",
    environment: "production",
    description: "Primary PostgreSQL connection string.",
  },
  {
    key: "DATABASE_POOL_SIZE",
    value: "25",
    environment: "production",
  },
  {
    key: "REDIS_URL",
    value: "redis://:p4ssw0rd@cache.example.com:6379/0",
    environment: "production",
    description: "Redis cache connection string.",
  },
  {
    key: "DATABASE_URL",
    value: "postgresql://dev:dev@localhost:5432/myapp_dev",
    environment: "development",
  },
]

const vercelVars: EnvVariable[] = [
  {
    key: "NEXT_PUBLIC_SITE_URL",
    value: "https://ui.justinlevine.me",
    environment: "production",
  },
  {
    key: "NEXT_PUBLIC_SITE_URL",
    value: "https://preview--jalco-ui.vercel.app",
    environment: "preview",
  },
  {
    key: "VERCEL_ENV",
    value: "production",
    environment: "production",
  },
  {
    key: "STRIPE_SECRET_KEY",
    value: "stripe_live_key_example_abcdefghijklmnopqrstuv",
    environment: "production",
    description: "Stripe live API key. Never expose client-side.",
  },
  {
    key: "STRIPE_SECRET_KEY",
    value: "stripe_test_key_example_abcdefghijklmnopqrstuv",
    environment: "preview",
  },
  {
    key: "GITHUB_TOKEN",
    value: "ghp_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8",
    environment: "production",
    description: "GitHub PAT for API access.",
  },
]

const simpleVars: EnvVariable[] = [
  {
    key: "API_KEY",
    value: "ak_prod_9f8e7d6c5b4a3210",
  },
  {
    key: "API_SECRET",
    value: "as_prod_xyzzy42plugh",
  },
  {
    key: "WEBHOOK_URL",
    value: "https://hooks.example.com/ingest/v1/abc123",
  },
  {
    key: "LOG_LEVEL",
    value: "info",
  },
]

const minimalVars: EnvVariable[] = [
  {
    key: "NODE_ENV",
    value: "production",
    environment: "production",
  },
  {
    key: "PORT",
    value: "3000",
    environment: "production",
  },
]

export default function EnvTablePage() {
  return (
    <ComponentDocsPage
      title="Env Table"
      description="Read-only environment variable table with masked values, click-to-reveal, per-row copy, and bulk copy as .env format. Designed for settings pages, deploy previews, and documentation."
      registryName="env-table"
      sourceFiles={sourceFiles}
      requirements={
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Display-only.</strong> This
            component does not read from{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              process.env
            </code>{" "}
            or any external source. You supply the data — it renders it.
          </li>
          <li>
            <strong className="text-foreground">Visual masking only.</strong>{" "}
            Values show the first 4 characters plus dots. Values shorter than 5
            characters show only dots. This is visual masking — values are still
            in the DOM. Do not use this for true secret concealment.
          </li>
        </ul>
      }
      preview={<EnvTable variables={vercelVars} title="Environment Variables" />}
      usage={
        <>
          <CodeLine
            code={`import { EnvTable } from "@/components/env-table"`}
          />
          <CodeLine
            code={`<EnvTable variables={variables} title="Environment Variables" />`}
          />
          <p className="text-sm text-muted-foreground">
            Pass an array of{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              {"{ key, value, environment?, description? }"}
            </code>{" "}
            objects. Values are masked by default — users click the eye icon to
            reveal individual values, or use the toolbar to reveal/hide all.
          </p>
        </>
      }
    >
      {/* Examples */}
      <section className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">With environment badges</h3>
          <p className="text-sm text-muted-foreground">
            When variables include an{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              environment
            </code>{" "}
            field, color-coded badges show the target environment. Built-in
            colors for production (green), preview (blue), and development
            (amber).
          </p>
          <VariantGrid
            registryName="env-table"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Deploy settings",
                code: `<EnvTable variables={vercelVars} title="Environment Variables" />`,
                preview: (
                  <EnvTable
                    variables={vercelVars}
                    title="Environment Variables"
                  />
                ),
              },
              {
                label: "Database config",
                code: `<EnvTable variables={databaseVars} title="Database" />`,
                preview: (
                  <EnvTable variables={databaseVars} title="Database" />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Without environments</h3>
          <p className="text-sm text-muted-foreground">
            Omit the environment field for a simpler key-value layout. Works
            well for API keys, webhook URLs, and general config.
          </p>
          <VariantGrid
            registryName="env-table"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "API credentials",
                code: `<EnvTable variables={apiVars} title="API Keys" />`,
                preview: (
                  <EnvTable variables={simpleVars} title="API Keys" />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Default revealed</h3>
          <p className="text-sm text-muted-foreground">
            Set{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              defaultRevealed
            </code>{" "}
            to start with all values visible. Useful for non-sensitive config or
            documentation contexts.
          </p>
          <VariantGrid
            registryName="env-table"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Revealed by default",
                code: `<EnvTable variables={vars} defaultRevealed />`,
                preview: (
                  <EnvTable
                    variables={minimalVars}
                    title="Runtime Config"
                    defaultRevealed
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
          title="EnvTable"
          props={[
            {
              name: "variables",
              type: "EnvVariable[]",
              required: true,
              description: "Environment variables to display.",
            },
            {
              name: "title",
              type: "string",
              description:
                "Heading text shown in the table toolbar.",
            },
            {
              name: "defaultRevealed",
              type: "boolean",
              description:
                "Start with all values visible. Defaults to false.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes on the root element.",
            },
          ]}
        />

        <ApiRefTable
          title="EnvVariable"
          props={[
            {
              name: "key",
              type: "string",
              required: true,
              description: "Variable name (e.g. DATABASE_URL).",
            },
            {
              name: "value",
              type: "string",
              required: true,
              description: "Variable value. Masked by default.",
            },
            {
              name: "environment",
              type: "Environment",
              description:
                'Target environment. Renders as a color-coded badge. Built-in colors for "production", "preview", and "development". Custom strings use a neutral badge.',
              fullType:
                '"production" | "preview" | "development" | (string & {})',
            },
            {
              name: "description",
              type: "string",
              description:
                "Optional description shown below the key name.",
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
            for reveal toggle state and clipboard access.
          </li>
          <li>
            <strong className="text-foreground">Copy .env.</strong> The toolbar
            &quot;Copy .env&quot; button copies all variables in{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              KEY=value
            </code>{" "}
            format, ready to paste into a{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              .env
            </code>{" "}
            file.
          </li>
          <li>
            <strong className="text-foreground">Duplicate keys.</strong> The
            component handles duplicate keys gracefully — common when showing
            the same variable across multiple environments.
          </li>
          <li>
            <strong className="text-foreground">Icon library.</strong>{" "}
            Uses{" "}
            <a
              href="https://lucide.dev"
              className="underline hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lucide
            </a>{" "}
            icons by default. Since this is copy-paste code, you can swap the
            imports if your project uses a different icon library.
          </li>
        </ul>
      </section>
    </ComponentDocsPage>
  )
}
