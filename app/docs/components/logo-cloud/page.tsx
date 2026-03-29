import type { Metadata } from "next"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { CodeLine } from "@/registry/code-line/code-line"
import { LogoCloud, LogoCloudMarquee } from "@/registry/logo-cloud/logo-cloud"

export const metadata: Metadata = {
  title: "Logo Cloud",
  description:
    "\"Trusted by\" logo display with static grid and infinite-scroll marquee layouts. Grayscale by default, color on hover.",
}

const sourceFiles = ["registry/logo-cloud/logo-cloud.tsx"]

const logos = [
  { src: "https://svgl.app/library/nextjs_icon_dark.svg", alt: "Next.js", href: "https://nextjs.org" },
  { src: "https://svgl.app/library/react_dark.svg", alt: "React", href: "https://react.dev" },
  { src: "https://svgl.app/library/tailwindcss.svg", alt: "Tailwind CSS", href: "https://tailwindcss.com" },
  { src: "https://svgl.app/library/typescript.svg", alt: "TypeScript", href: "https://typescriptlang.org" },
  { src: "https://svgl.app/library/vercel_dark.svg", alt: "Vercel", href: "https://vercel.com" },
  { src: "https://svgl.app/library/github_dark.svg", alt: "GitHub", href: "https://github.com" },
  { src: "https://svgl.app/library/linear.svg", alt: "Linear", href: "https://linear.app" },
  { src: "https://svgl.app/library/stripe.svg", alt: "Stripe", href: "https://stripe.com" },
]

export default function LogoCloudPage() {
  return (
    <ComponentDocsPage
      title="Logo Cloud"
      description={`"Trusted by" logo display with static grid and infinite-scroll marquee layouts. Grayscale by default, color on hover.`}
      registryName="logo-cloud"
      sourceFiles={sourceFiles}
      preview={<LogoCloudMarquee logos={logos} duration={20} />}
      usage={
        <>
          <CodeLine
            code={`import { LogoCloud, LogoCloudMarquee } from "@/components/logo-cloud"`}
          />
          <CodeLine
            code={`const logos = [
  { src: "/logos/acme.svg", alt: "Acme", href: "https://acme.com" },
  { src: "/logos/globex.svg", alt: "Globex" },
  { src: "/logos/initech.svg", alt: "Initech" },
]`}
            language="tsx"
          />
          <CodeLine code={`<LogoCloudMarquee logos={logos} title="Trusted by" />`} />
          <p className="text-sm text-muted-foreground">
            Client component. Define your logos as an array of{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              {"{ src, alt, href? }"}
            </code>{" "}
            objects — use local images from{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">public/</code>,
            CDN URLs, or SVG URLs. Add{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">href</code>{" "}
            to make a logo clickable. Or pass children for full control:
          </p>
          <CodeLine
            code={`<LogoCloud>
  <img src="/logos/acme.svg" alt="Acme" className="h-8" />
  <MyCustomLogo />
</LogoCloud>`}
            language="tsx"
          />
        </>
      }
    >
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Static grid</h3>
          <p className="text-sm text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">LogoCloud</code>{" "}
            for a simple wrapped grid with no animation.
          </p>
          <VariantGrid
            registryName="logo-cloud"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Static with title",
                code: `<LogoCloud logos={logos} title="Trusted by developers at" />`,
                preview: (
                  <LogoCloud
                    logos={logos}
                    title="Trusted by developers at"
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Marquee directions</h3>
          <VariantGrid
            registryName="logo-cloud"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Left (default)",
                code: `<LogoCloudMarquee logos={logos} />`,
                preview: <LogoCloudMarquee logos={logos} duration={20} />,
              },
              {
                label: "Right",
                code: `<LogoCloudMarquee logos={logos} direction="right" />`,
                preview: <LogoCloudMarquee logos={logos} duration={20} direction="right" />,
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Full color (no grayscale)</h3>
          <VariantGrid
            registryName="logo-cloud"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "grayscale={false}",
                code: `<LogoCloudMarquee logos={logos} grayscale={false} />`,
                preview: <LogoCloudMarquee logos={logos} duration={20} grayscale={false} />,
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">With title</h3>
          <VariantGrid
            registryName="logo-cloud"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Marquee with title",
                code: `<LogoCloudMarquee logos={logos} title="Built with" />`,
                preview: <LogoCloudMarquee logos={logos} duration={20} title="Built with" />,
              },
            ]}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">API Reference</h2>

        <ApiRefTable
          title="LogoCloud"
          props={[
            { name: "logos", type: "Logo[]", description: "Logo data array. Ignored when children are provided." },
            { name: "children", type: "ReactNode", description: "Custom logo elements. Overrides logos prop." },
            { name: "grayscale", type: "boolean", description: "Grayscale filter with color on hover. Defaults to true." },
            { name: "title", type: "string", description: "Title text displayed above the logos." },
            { name: "className", type: "string", description: "Additional CSS classes on the root element." },
          ]}
        />

        <ApiRefTable
          title="LogoCloudMarquee"
          props={[
            { name: "logos", type: "Logo[]", description: "Logo data array. Ignored when children are provided." },
            { name: "children", type: "ReactNode", description: "Custom logo elements. Overrides logos prop." },
            { name: "grayscale", type: "boolean", description: "Grayscale filter with color on hover. Defaults to true." },
            { name: "title", type: "string", description: "Title text displayed above the marquee." },
            { name: "duration", type: "number", description: "Animation duration in seconds. Lower = faster. Defaults to 30." },
            { name: "speed", type: "number", description: "Speed multiplier. 2 = twice as fast, 0.5 = half speed. Overrides duration." },
            { name: "pauseOnHover", type: "boolean", description: "Pause animation on hover. Defaults to true." },
            { name: "direction", type: '"left" | "right"', description: 'Scroll direction. Defaults to "left".' },
            { name: "className", type: "string", description: "Additional CSS classes on the root element." },
          ]}
        />

        <ApiRefTable
          title="Logo"
          props={[
            { name: "src", type: "string", required: true, description: "Image source URL." },
            { name: "alt", type: "string", required: true, description: "Alt text for accessibility." },
            { name: "href", type: "string", description: "Link URL. Wraps the logo in an anchor." },
          ]}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Notes</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Client component.</strong>{" "}
            The marquee variant uses CSS animation with{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              animation-play-state
            </code>{" "}
            for pause-on-hover.
          </li>
          <li>
            <strong className="text-foreground">No dependencies.</strong>{" "}
            Pure CSS animation — no motion libraries required.
          </li>
          <li>
            <strong className="text-foreground">Edge fade.</strong>{" "}
            The marquee uses a CSS mask-image gradient to fade logos at both edges.
          </li>
          <li>
            <strong className="text-foreground">Composable.</strong>{" "}
            Pass children instead of logos for full control over logo rendering.
            Each child is treated as one logo item in the sequence.
          </li>
        </ul>
      </section>
    </ComponentDocsPage>
  )
}
