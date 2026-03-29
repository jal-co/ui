import type { Metadata } from "next"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { CodeLine } from "@/registry/code-line/code-line"
import { Stepper, StepperItem } from "@/registry/stepper/stepper"
import { CodeBlock } from "@/registry/code-block/code-block"
import { User, CreditCard, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Stepper",
  description:
    "Numbered step-by-step layout with vertical connector lines for installation guides, tutorials, and onboarding flows.",
}

const sourceFiles = ["registry/stepper/stepper.tsx"]

export default function StepperPage() {
  return (
    <ComponentDocsPage
      title="Stepper"
      description="Numbered step-by-step layout with vertical connector lines, auto-incrementing step numbers, and status indicators. Designed for installation guides, tutorials, onboarding flows, and multi-step documentation."
      registryName="stepper"
      sourceFiles={sourceFiles}
      preview={
        <Stepper>
          <StepperItem
            title="Install the package"
            description="Add the SDK to your project."
            status="completed"
          />
          <StepperItem
            title="Configure your environment"
            description="Add required environment variables."
            status="active"
          />
          <StepperItem
            title="Start building"
            description="Import and use components in your pages."
          />
        </Stepper>
      }
      usage={
        <>
          <CodeLine
            code={`import { Stepper, StepperItem } from "@/components/stepper"`}
          />
          <CodeLine
            code={`<Stepper>
  <StepperItem title="Step one" description="Do this first." />
  <StepperItem title="Step two" description="Then do this." />
</Stepper>`}
          />
          <p className="text-sm text-muted-foreground">
            Wrap{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              StepperItem
            </code>{" "}
            elements inside a{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              Stepper
            </code>{" "}
            container. Steps are auto-numbered. Nest any content — code blocks,
            images, forms — inside each step.
          </p>
        </>
      }
    >
      {/* Examples */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Status indicators</h3>
          <p className="text-sm text-muted-foreground">
            Use the{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              status
            </code>{" "}
            prop to indicate progress. Completed steps show a checkmark,
            active steps are highlighted, and default steps are muted.
          </p>
          <VariantGrid
            registryName="stepper"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "All statuses",
                code: `<Stepper>
  <StepperItem title="Account created" status="completed" />
  <StepperItem title="Configure workspace" status="active" />
  <StepperItem title="Invite your team" />
</Stepper>`,
                preview: (
                  <Stepper>
                    <StepperItem
                      title="Account created"
                      description="Your account has been set up successfully."
                      status="completed"
                    />
                    <StepperItem
                      title="Configure workspace"
                      description="Set up your workspace preferences and integrations."
                      status="active"
                    />
                    <StepperItem
                      title="Invite your team"
                      description="Add team members and assign roles."
                    />
                  </Stepper>
                ),
              },
              {
                label: "All completed",
                code: `<Stepper>
  <StepperItem title="Order placed" status="completed" />
  <StepperItem title="Payment confirmed" status="completed" />
  <StepperItem title="Shipped" status="completed" />
</Stepper>`,
                preview: (
                  <Stepper>
                    <StepperItem
                      title="Order placed"
                      description="Your order #4821 has been received."
                      status="completed"
                    />
                    <StepperItem
                      title="Payment confirmed"
                      description="We've charged your card ending in 4242."
                      status="completed"
                    />
                    <StepperItem
                      title="Shipped"
                      description="Tracking number: 1Z999AA10123456784"
                      status="completed"
                    />
                  </Stepper>
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">With rich content</h3>
          <p className="text-sm text-muted-foreground">
            Nest any content inside{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              StepperItem
            </code>
            . Code blocks, lists, images, and interactive elements all work.
          </p>
          <VariantGrid
            registryName="stepper"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Installation guide",
                code: `<Stepper>
  <StepperItem title="Install the package" status="completed">
    <CodeBlock code="npm install @acme/sdk" language="bash" compact />
  </StepperItem>
  <StepperItem title="Add your API key" status="active">
    <CodeBlock code='ACME_API_KEY=sk_live_...' language="bash" compact />
  </StepperItem>
  <StepperItem title="Make your first request">
    <CodeBlock code={code} language="ts" compact />
  </StepperItem>
</Stepper>`,
                preview: (
                  <Stepper>
                    <StepperItem
                      title="Install the package"
                      description="Add the SDK to your project."
                      status="completed"
                    >
                      <CodeLine
                        code="npm install @acme/sdk"
                        language="bash"
                      />
                    </StepperItem>
                    <StepperItem
                      title="Add your API key"
                      description="Create a .env.local file and add your key."
                      status="active"
                    >
                      <CodeLine
                        code="ACME_API_KEY=sk_live_abc123def456"
                        language="bash"
                      />
                    </StepperItem>
                    <StepperItem
                      title="Make your first request"
                      description="Import the client and fetch data."
                    >
                      <CodeBlock
                        code={`import { Acme } from "@acme/sdk"

const client = new Acme()
const users = await client.users.list()
console.log(users)`}
                        language="ts"
                      />
                    </StepperItem>
                  </Stepper>
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Horizontal orientation</h3>
          <p className="text-sm text-muted-foreground">
            Set{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              orientation=&quot;horizontal&quot;
            </code>{" "}
            for a compact progress bar layout. Only the active step&apos;s
            content is shown.
          </p>
          <VariantGrid
            registryName="stepper"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Horizontal stepper",
                code: `<Stepper orientation="horizontal">
  <StepperItem title="Details" status="completed" />
  <StepperItem title="Payment" status="active" description="Enter payment info." />
  <StepperItem title="Review" />
  <StepperItem title="Confirm" />
</Stepper>`,
                preview: (
                  <Stepper orientation="horizontal">
                    <StepperItem title="Details" status="completed" />
                    <StepperItem
                      title="Payment"
                      status="active"
                      description="Enter your payment information to continue."
                    />
                    <StepperItem title="Review" />
                    <StepperItem title="Confirm" />
                  </Stepper>
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Minimal (no descriptions)</h3>
          <p className="text-sm text-muted-foreground">
            Omit descriptions for a compact checklist-style layout.
          </p>
          <VariantGrid
            registryName="stepper"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Title only",
                code: `<Stepper>
  <StepperItem title="Clone the repository" status="completed" />
  <StepperItem title="Install dependencies" status="completed" />
  <StepperItem title="Set environment variables" status="active" />
  <StepperItem title="Run the dev server" />
  <StepperItem title="Open in browser" />
</Stepper>`,
                preview: (
                  <Stepper>
                    <StepperItem
                      title="Clone the repository"
                      status="completed"
                    />
                    <StepperItem
                      title="Install dependencies"
                      status="completed"
                    />
                    <StepperItem
                      title="Set environment variables"
                      status="active"
                    />
                    <StepperItem title="Run the dev server" />
                    <StepperItem title="Open in browser" />
                  </Stepper>
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Custom icons</h3>
          <p className="text-sm text-muted-foreground">
            Pass any{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              React.ReactNode
            </code>{" "}
            to the{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">icon</code>{" "}
            prop to replace the default step number or checkmark.
          </p>
          <VariantGrid
            registryName="stepper"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Lucide icons",
                code: `<Stepper>
  <StepperItem title="Create account" icon={<User className="size-4" />} status="completed" />
  <StepperItem title="Add payment method" icon={<CreditCard className="size-4" />} status="active" />
  <StepperItem title="Verify identity" icon={<ShieldCheck className="size-4" />} />
</Stepper>`,
                preview: (
                  <Stepper>
                    <StepperItem
                      title="Create account"
                      description="Sign up with your email and set a password."
                      icon={<User className="size-4" />}
                      status="completed"
                    />
                    <StepperItem
                      title="Add payment method"
                      description="Enter a credit card or connect a bank account."
                      icon={<CreditCard className="size-4" />}
                      status="active"
                    />
                    <StepperItem
                      title="Verify identity"
                      description="Upload a photo ID to complete verification."
                      icon={<ShieldCheck className="size-4" />}
                    />
                  </Stepper>
                ),
              },
              {
                label: "Emoji icons",
                code: `<Stepper>
  <StepperItem title="Install dependencies" icon="📦" status="completed" />
  <StepperItem title="Configure API keys" icon="🔑" status="active" />
  <StepperItem title="Deploy to production" icon="🚀" />
</Stepper>`,
                preview: (
                  <Stepper>
                    <StepperItem
                      title="Install dependencies"
                      description="Add the required packages to your project."
                      icon={<span className="text-sm">📦</span>}
                      status="completed"
                    />
                    <StepperItem
                      title="Configure API keys"
                      description="Set up authentication credentials."
                      icon={<span className="text-sm">🔑</span>}
                      status="active"
                    />
                    <StepperItem
                      title="Deploy to production"
                      description="Ship it to your users."
                      icon={<span className="text-sm">🚀</span>}
                    />
                  </Stepper>
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
          title="Stepper"
          props={[
            {
              name: "children",
              type: "React.ReactNode",
              required: true,
              description: "StepperItem elements.",
            },
            {
              name: "orientation",
              type: '"vertical" | "horizontal"',
              description:
                'Layout direction. Defaults to "vertical".',
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes on the root element.",
            },
          ]}
        />

        <ApiRefTable
          title="StepperItem"
          props={[
            {
              name: "title",
              type: "string",
              required: true,
              description: "Step heading text.",
            },
            {
              name: "description",
              type: "string",
              description: "Optional subtext below the title.",
            },
            {
              name: "step",
              type: "number",
              description:
                "Override the auto-incremented step number.",
            },
            {
              name: "status",
              type: '"default" | "active" | "completed"',
              description:
                'Visual status of this step. Defaults to "default".',
            },
            {
              name: "icon",
              type: "React.ReactNode",
              description:
                "Custom icon to replace the step number or checkmark.",
            },
            {
              name: "children",
              type: "React.ReactNode",
              description:
                "Content rendered below the step header (code blocks, text, etc.).",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes on the step container.",
            },
          ]}
        />
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
            <strong className="text-foreground">Auto-numbering.</strong> Steps
            are numbered automatically based on their order. Use the{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">step</code>{" "}
            prop to override.
          </li>
          <li>
            <strong className="text-foreground">No dependencies.</strong> Uses
            only React and Tailwind CSS — no external packages required.
          </li>
          <li>
            <strong className="text-foreground">Composable.</strong> Nest any
            content inside StepperItem — code blocks, images, forms, lists,
            or other components.
          </li>
          <li>
            <strong className="text-foreground">Horizontal mode.</strong> The
            horizontal orientation shows step circles with connector lines
            and only renders content for the active step. Ideal for checkout
            flows and wizards.
          </li>
        </ul>
      </section>
    </ComponentDocsPage>
  )
}
