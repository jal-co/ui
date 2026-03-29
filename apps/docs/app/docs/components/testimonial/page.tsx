import type { Metadata } from "next"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { CodeLine } from "@/registry/code-line/code-line"
import {
  TestimonialCard,
  TestimonialGrid,
  TestimonialMarquee,
  type Testimonial,
} from "@/registry/testimonial/testimonial"

export const metadata: Metadata = {
  title: "Testimonial",
  description:
    "Customer testimonial display with standalone card, responsive grid, and infinite-scroll marquee layouts.",
}

const sourceFiles = ["registry/testimonial/testimonial.tsx"]

const testimonials: Testimonial[] = [
  { quote: "This completely transformed our developer onboarding. Setup time went from days to minutes.", author: "Sarah Chen", role: "CTO", company: "Acme Corp", avatarUrl: "https://github.com/shadcn.png?", rating: 5 },
  { quote: "The best component library I've used. Clean APIs, great docs, actually accessible.", author: "Alex Rivera", role: "Lead Engineer", company: "Globex", rating: 5 },
  { quote: "We shipped our docs site in a weekend. The code blocks alone saved us weeks of work.", author: "Jordan Lee", role: "Frontend Dev", company: "Initech", avatarUrl: "https://github.com/leerob.png?", rating: 4 },
  { quote: "Copy-paste components that actually look good out of the box. No fighting with styles.", author: "Taylor Kim", role: "Designer", company: "Umbrella" },
  { quote: "Finally a registry that feels like it was built by someone who actually ships products.", author: "Morgan Blake", role: "Founder", company: "Stark Industries", avatarUrl: "https://github.com/rauchg.png?" },
  { quote: "Replaced our entire internal component library. The accessibility support is top-notch.", author: "Casey Jordan", role: "Staff Engineer", company: "Wayne Enterprises", rating: 5 },
]

export default function TestimonialPage() {
  return (
    <ComponentDocsPage
      title="Testimonial"
      description="Customer testimonial display with standalone card, responsive grid, and infinite-scroll marquee layouts."
      registryName="testimonial"
      sourceFiles={sourceFiles}
      preview={<TestimonialMarquee testimonials={testimonials.slice(0, 4)} duration={25} />}
      usage={
        <>
          <CodeLine
            code={`import { TestimonialCard, TestimonialGrid, TestimonialMarquee } from "@/components/testimonial"`}
          />
          <CodeLine
            code={`const testimonials = [
  { quote: "Amazing product.", author: "Jane Doe", role: "CEO", company: "Acme" },
  { quote: "Saved us weeks.", author: "John Smith", avatarUrl: "/avatars/john.jpg", rating: 5 },
]`}
            language="tsx"
          />
          <CodeLine code={`<TestimonialMarquee testimonials={testimonials} />`} />
          <p className="text-sm text-muted-foreground">
            Client component. Define testimonials as an array — only{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">quote</code> and{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">author</code>{" "}
            are required. Add{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">role</code>,{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">company</code>,{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">avatarUrl</code>, or{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">rating</code>{" "}
            as needed.
          </p>
        </>
      }
    >
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Single card</h3>
          <VariantGrid
            registryName="testimonial"
            files={sourceFiles}
            columns={2}
            items={[
              {
                label: "With rating",
                code: `<TestimonialCard testimonial={{ quote: "...", author: "Sarah Chen", role: "CTO", company: "Acme", rating: 5 }} />`,
                preview: <TestimonialCard testimonial={testimonials[0]} />,
              },
              {
                label: "Minimal (no avatar, no rating)",
                code: `<TestimonialCard testimonial={{ quote: "...", author: "Taylor Kim", role: "Designer", company: "Umbrella" }} />`,
                preview: <TestimonialCard testimonial={testimonials[3]} />,
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Grid layout</h3>
          <VariantGrid
            registryName="testimonial"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "2 columns (default)",
                code: `<TestimonialGrid testimonials={testimonials} />`,
                preview: <TestimonialGrid testimonials={testimonials.slice(0, 4)} />,
              },
              {
                label: "3 columns with title",
                code: `<TestimonialGrid testimonials={testimonials} columns={3} title="What people are saying" />`,
                preview: <TestimonialGrid testimonials={testimonials.slice(0, 3)} columns={3} title="What people are saying" />,
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Marquee</h3>
          <VariantGrid
            registryName="testimonial"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "With title",
                code: `<TestimonialMarquee testimonials={testimonials} title="Loved by developers" />`,
                preview: <TestimonialMarquee testimonials={testimonials} duration={25} title="Loved by developers" />,
              },
              {
                label: "Reverse direction",
                code: `<TestimonialMarquee testimonials={testimonials} direction="right" />`,
                preview: <TestimonialMarquee testimonials={testimonials} duration={25} direction="right" />,
              },
              {
                label: "Fast (speed={2})",
                code: `<TestimonialMarquee testimonials={testimonials} speed={2} />`,
                preview: <TestimonialMarquee testimonials={testimonials} speed={2} />,
              },
              {
                label: "No pause on hover",
                code: `<TestimonialMarquee testimonials={testimonials} pauseOnHover={false} />`,
                preview: <TestimonialMarquee testimonials={testimonials} duration={25} pauseOnHover={false} />,
              },
            ]}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">API Reference</h2>

        <ApiRefTable
          title="TestimonialCard"
          props={[
            { name: "testimonial", type: "Testimonial", required: true, description: "Testimonial data object." },
            { name: "className", type: "string", description: "Additional CSS classes." },
          ]}
        />

        <ApiRefTable
          title="TestimonialGrid"
          props={[
            { name: "testimonials", type: "Testimonial[]", required: true, description: "Array of testimonials." },
            { name: "columns", type: "1 | 2 | 3", description: "Grid columns. Defaults to 2." },
            { name: "title", type: "string", description: "Title text above the grid." },
            { name: "className", type: "string", description: "Additional CSS classes." },
          ]}
        />

        <ApiRefTable
          title="TestimonialMarquee"
          props={[
            { name: "testimonials", type: "Testimonial[]", required: true, description: "Array of testimonials." },
            { name: "title", type: "string", description: "Title text above the marquee." },
            { name: "duration", type: "number", description: "Animation duration in seconds. Lower = faster. Defaults to 40." },
            { name: "speed", type: "number", description: "Speed multiplier. 2 = twice as fast. Overrides duration." },
            { name: "pauseOnHover", type: "boolean", description: "Pause on hover. Defaults to true." },
            { name: "direction", type: '"left" | "right"', description: 'Scroll direction. Defaults to "left".' },
            { name: "className", type: "string", description: "Additional CSS classes." },
          ]}
        />

        <ApiRefTable
          title="Testimonial"
          props={[
            { name: "quote", type: "string", required: true, description: "The testimonial text." },
            { name: "author", type: "string", required: true, description: "Author display name." },
            { name: "role", type: "string", description: "Author's role or title." },
            { name: "company", type: "string", description: "Company or organization." },
            { name: "avatarUrl", type: "string", description: "Avatar image URL. Shows initials when omitted." },
            { name: "rating", type: "number", description: "Star rating (1–5)." },
          ]}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Notes</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Client component.</strong>{" "}
            The marquee uses CSS animation with pause-on-hover via CSS variables.
          </li>
          <li>
            <strong className="text-foreground">No dependencies.</strong>{" "}
            Pure CSS animation — no motion libraries.
          </li>
          <li>
            <strong className="text-foreground">Flexible data.</strong>{" "}
            Only <code className="rounded bg-muted px-1 py-0.5 text-xs">quote</code> and{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">author</code> are required.
            Add role, company, avatar, or rating as your content needs.
          </li>
          <li>
            <strong className="text-foreground">Semantic HTML.</strong>{" "}
            Cards use{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">&lt;blockquote&gt;</code>{" "}
            with a{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">&lt;footer&gt;</code>{" "}
            for proper citation markup.
          </li>
        </ul>
      </section>
    </ComponentDocsPage>
  )
}
