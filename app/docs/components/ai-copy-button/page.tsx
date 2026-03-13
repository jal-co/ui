import type { Metadata } from "next"
import { AiCopyButton } from "@/registry/ai-copy-button/ai-copy-button"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { CodeLine } from "@/registry/code-line/code-line"

export const metadata: Metadata = {
  title: "AI Copy Button",
  description:
    "Split button with a primary copy action and a dropdown of AI destinations.",
}

const sourceFiles = ["registry/ai-copy-button/ai-copy-button.tsx"]

const sampleContent = `# Getting Started with jalco ui

Install the registry component you need:

\`\`\`bash
npx shadcn@latest add https://ui.justinlevine.me/r/ai-copy-button.json
\`\`\`

Then import and use it in your project.`

export default async function AiCopyButtonPage() {
  return (
    <ComponentDocsPage
      title="AI Copy Button"
      description="Split button with a primary copy action and a dropdown of AI destinations. Copy content, view as markdown, or open in v0, ChatGPT, Claude, or Gemini."
      registryName="ai-copy-button"
      sourceFiles={sourceFiles}
      preview={<AiCopyButton value={sampleContent} label="Copy Page" />}
      usage={
        <>
          <CodeLine
            code={`import { AiCopyButton } from "@/components/ai-copy-button"`}
          />
          <CodeLine
            code={`<AiCopyButton value={pageContent} label="Copy Page" />`}
          />
        </>
      }
    >
      {/* Examples */}
      <section className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Variants</h3>
          <VariantGrid
            registryName="ai-copy-button"
            files={sourceFiles}
            columns={2}
            items={[
              {
                label: "Default",
                code: `<AiCopyButton value={content} variant="default" />`,
                preview: <AiCopyButton value={sampleContent} variant="default" />,
              },
              {
                label: "Secondary",
                code: `<AiCopyButton value={content} variant="secondary" />`,
                preview: <AiCopyButton value={sampleContent} variant="secondary" />,
              },
              {
                label: "Outline",
                code: `<AiCopyButton value={content} variant="outline" />`,
                preview: <AiCopyButton value={sampleContent} variant="outline" />,
              },
              {
                label: "Ghost",
                code: `<AiCopyButton value={content} variant="ghost" />`,
                preview: <AiCopyButton value={sampleContent} variant="ghost" />,
              },
              {
                label: "Primary",
                code: `<AiCopyButton value={content} variant="primary" />`,
                preview: <AiCopyButton value={sampleContent} variant="primary" />,
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Sizes</h3>
          <VariantGrid
            registryName="ai-copy-button"
            files={sourceFiles}
            columns={3}
            items={[
              {
                label: "Small",
                code: `<AiCopyButton value={content} size="sm" />`,
                preview: <AiCopyButton value={sampleContent} size="sm" />,
              },
              {
                label: "Default",
                code: `<AiCopyButton value={content} size="default" />`,
                preview: <AiCopyButton value={sampleContent} size="default" />,
              },
              {
                label: "Large",
                code: `<AiCopyButton value={content} size="lg" />`,
                preview: <AiCopyButton value={sampleContent} size="lg" />,
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Custom labels</h3>
          <VariantGrid
            registryName="ai-copy-button"
            files={sourceFiles}
            columns={2}
            items={[
              {
                label: "Copy Page",
                code: `<AiCopyButton value={content} label="Copy Page" />`,
                preview: <AiCopyButton value={sampleContent} label="Copy Page" />,
              },
              {
                label: "Copy Code",
                code: `<AiCopyButton value={content} label="Copy Code" variant="outline" />`,
                preview: (
                  <AiCopyButton
                    value={sampleContent}
                    label="Copy Code"
                    variant="outline"
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Brand colors</h3>
          <VariantGrid
            registryName="ai-copy-button"
            files={sourceFiles}
            columns={2}
            items={[
              {
                label: "Brand Colors",
                code: `<AiCopyButton value={content} brandColors />`,
                preview: <AiCopyButton value={sampleContent} brandColors />,
              },
              {
                label: "Brand Colors + Outline",
                code: `<AiCopyButton value={content} brandColors variant="outline" />`,
                preview: (
                  <AiCopyButton
                    value={sampleContent}
                    brandColors
                    variant="outline"
                  />
                ),
              },
              {
                label: "Brand Colors + Copy Page",
                code: `<AiCopyButton value={content} brandColors label="Copy Page" />`,
                preview: (
                  <AiCopyButton
                    value={sampleContent}
                    brandColors
                    label="Copy Page"
                  />
                ),
              },
              {
                label: "Brand Colors + Primary",
                code: `<AiCopyButton value={content} brandColors variant="primary" />`,
                preview: (
                  <AiCopyButton
                    value={sampleContent}
                    brandColors
                    variant="primary"
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Selective targets</h3>
          <VariantGrid
            registryName="ai-copy-button"
            files={sourceFiles}
            columns={2}
            items={[
              {
                label: "v0 + Claude only",
                code: `<AiCopyButton value={content} targets={["v0", "claude"]} />`,
                preview: (
                  <AiCopyButton
                    value={sampleContent}
                    targets={["v0", "claude"]}
                  />
                ),
              },
              {
                label: "All AI targets",
                code: `<AiCopyButton value={content} targets={["markdown", "v0", "chatgpt", "claude", "gemini"]} />`,
                preview: (
                  <AiCopyButton
                    value={sampleContent}
                    targets={["markdown", "v0", "chatgpt", "claude", "gemini"]}
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
          title="AiCopyButton"
          props={[
            {
              name: "value",
              type: "string",
              required: true,
              description: "The content to copy or send to AI targets.",
            },
            {
              name: "label",
              type: "string",
              description: 'Primary button label. Defaults to "Copy".',
            },
            {
              name: "targets",
              type: "(BuiltInTarget | AiTarget)[]",
              description:
                'AI targets to show in the dropdown. Accepts built-in keys ("markdown", "v0", "chatgpt", "claude", "gemini") or custom target objects. Defaults to all built-in targets.',
            },
            {
              name: "brandColors",
              type: "boolean",
              description:
                "Render dropdown icons in their official brand colors instead of the default muted style. Defaults to false.",
            },
            {
              name: "variant",
              type: '"default" | "secondary" | "outline" | "ghost" | "primary"',
              description: 'Visual style variant. Defaults to "default".',
            },
            {
              name: "size",
              type: '"sm" | "default" | "lg"',
              description: 'Button size. Defaults to "default".',
            },
            {
              name: "onCopy",
              type: "() => void",
              description:
                "Optional callback fired after the primary copy action completes.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes on the root element.",
            },
          ]}
        />

        <ApiRefTable
          title="AiTarget (custom target)"
          props={[
            {
              name: "id",
              type: "string",
              required: true,
              description: "Unique key for the target.",
            },
            {
              name: "label",
              type: "string",
              required: true,
              description: "Display label in the dropdown.",
            },
            {
              name: "icon",
              type: "React.ReactNode",
              required: true,
              description: "Icon element rendered before the label.",
            },
            {
              name: "brandColorClass",
              type: "string",
              description:
                "Tailwind color class applied to this target's icon when brandColors is enabled.",
            },
            {
              name: "action",
              type: '"copy" | "url" | ((value: string) => void)',
              description:
                'How to handle selection. "copy" copies the value, "url" opens getUrl in a new tab, or pass a custom function. Defaults to "copy".',
            },
            {
              name: "getUrl",
              type: "(value: string) => string",
              description:
                'URL builder for action: "url". Receives the value string.',
            },
          ]}
        />
      </section>

      {/* Notes */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Notes</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Client component.</strong> Uses
            the Clipboard API and Radix DropdownMenu for keyboard navigation,
            focus management, and screen reader support.
          </li>
          <li>
            <strong className="text-foreground">Built-in targets.</strong> Five
            built-in targets are included: Markdown, v0, ChatGPT, Claude, and
            Gemini. Pass a subset to show only what you need.
          </li>
          <li>
            <strong className="text-foreground">Custom targets.</strong> Add
            your own targets with a custom{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              AiTarget
            </code>{" "}
            object — bring your own icon and action.
          </li>
        </ul>
      </section>
    </ComponentDocsPage>
  )
}
