import type { Metadata } from "next"
import { ColorPalette } from "@/registry/color-palette/color-palette"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { CodeLine } from "@/registry/code-line/code-line"

export const metadata: Metadata = {
  title: "Color Palette",
  description:
    "Color swatch display with name, hex/hsl/rgb values, and click-to-copy for design system documentation.",
}

const sourceFiles = ["registry/color-palette/color-palette.tsx"]

const brandColors = [
  { name: "Primary", value: "#6366f1" },
  { name: "Secondary", value: "#a78bfa" },
  { name: "Accent", value: "#f472b6" },
  { name: "Success", value: "#22c55e" },
  { name: "Warning", value: "#f59e0b" },
  { name: "Danger", value: "#ef4444" },
  { name: "Info", value: "#3b82f6" },
  { name: "Muted", value: "#94a3b8" },
]

const blueScale = [
  { name: "50", value: "#eff6ff" },
  { name: "100", value: "#dbeafe" },
  { name: "200", value: "#bfdbfe" },
  { name: "300", value: "#93c5fd" },
  { name: "400", value: "#60a5fa" },
  { name: "500", value: "#3b82f6" },
  { name: "600", value: "#2563eb" },
  { name: "700", value: "#1d4ed8" },
  { name: "800", value: "#1e40af" },
  { name: "900", value: "#1e3a8a" },
  { name: "950", value: "#172554" },
]

const neutralScale = [
  { name: "50", value: "#fafafa" },
  { name: "100", value: "#f5f5f5" },
  { name: "200", value: "#e5e5e5" },
  { name: "300", value: "#d4d4d4" },
  { name: "400", value: "#a3a3a3" },
  { name: "500", value: "#737373" },
  { name: "600", value: "#525252" },
  { name: "700", value: "#404040" },
  { name: "800", value: "#262626" },
  { name: "900", value: "#171717" },
  { name: "950", value: "#0a0a0a" },
]

const semanticColors = [
  { name: "Background", value: "#ffffff", description: "Page background" },
  { name: "Foreground", value: "#0a0a0a", description: "Primary text" },
  { name: "Card", value: "#ffffff", description: "Card surfaces" },
  { name: "Muted", value: "#f5f5f5", description: "Subtle backgrounds" },
  { name: "Border", value: "#e5e5e5", description: "Borders and dividers" },
  { name: "Ring", value: "#6366f1", description: "Focus rings" },
]

export default function ColorPalettePage() {
  return (
    <ComponentDocsPage
      title="Color Palette"
      description="Color swatch display with name, hex/hsl/rgb values, and click-to-copy for design system documentation."
      registryName="color-palette"
      sourceFiles={sourceFiles}
      preview={
        <div className="w-full max-w-lg mx-auto">
          <ColorPalette colors={brandColors} columns={4} />
        </div>
      }
      usage={
        <>
          <CodeLine
            code={`import { ColorPalette } from "@/components/color-palette"`}
          />
          <CodeLine
            code={`<ColorPalette colors={[{ name: "Primary", value: "#6366f1" }]} />`}
          />
          <p className="text-sm text-muted-foreground">
            <strong>Client component.</strong> Click any swatch to copy its color
            value to the clipboard. Supports hex, rgb(), hsl(), oklch(), and named
            CSS colors.
          </p>
        </>
      }
    >
      {/* Layouts */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Layouts</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Grid</h3>
          <p className="text-sm text-muted-foreground">
            Responsive grid of swatches with name and value labels. The default layout.
          </p>
          <ColorPalette colors={brandColors} columns={4} />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Scale strip</h3>
          <p className="text-sm text-muted-foreground">
            Horizontal strip showing a single hue across its full range. Ideal for
            documenting Tailwind-style color scales.
          </p>
          <ColorPalette colors={blueScale} layout="scale" />
        </div>
      </section>

      {/* Examples */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Semantic tokens</h3>
          <ColorPalette colors={semanticColors} columns={3} />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Neutral scale</h3>
          <ColorPalette colors={neutralScale} layout="scale" />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Values only</h3>
          <p className="text-sm text-muted-foreground">
            Hide names to show a compact swatch grid.
          </p>
          <ColorPalette colors={brandColors} columns={8} showName={false} />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Swatches only</h3>
          <p className="text-sm text-muted-foreground">
            Hide both name and value for a pure visual display.
          </p>
          <ColorPalette colors={brandColors} columns={8} showName={false} showValue={false} />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Column variations</h3>
          <VariantGrid
            registryName="color-palette"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "3 columns",
                code: `<ColorPalette colors={colors} columns={3} />`,
                preview: <ColorPalette colors={brandColors.slice(0, 6)} columns={3} />,
              },
              {
                label: "6 columns",
                code: `<ColorPalette colors={colors} columns={6} />`,
                preview: <ColorPalette colors={brandColors} columns={6} />,
              },
            ]}
          />
        </div>
      </section>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">API Reference</h2>
        <ApiRefTable
          title="ColorPalette"
          props={[
            {
              name: "colors",
              type: "ColorEntry[]",
              required: true,
              description:
                "Array of color entries with name, value, and optional description.",
              fullType:
                "{ name: string; value: string; description?: string }[]",
            },
            {
              name: "layout",
              type: '"grid" | "scale"',
              description:
                'Display layout. "grid" shows a responsive grid, "scale" shows a horizontal strip. Defaults to "grid".',
            },
            {
              name: "columns",
              type: "number",
              description:
                "Number of grid columns (grid layout only). Defaults to 4.",
            },
            {
              name: "format",
              type: '"hex" | "hsl" | "rgb" | "oklch"',
              description:
                'Color value display format. Defaults to "hex".',
            },
            {
              name: "showName",
              type: "boolean",
              description: "Show color name label. Defaults to true.",
            },
            {
              name: "showValue",
              type: "boolean",
              description: "Show color value string. Defaults to true.",
            },
          ]}
        />
      </section>

      {/* Notes */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Notes</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Click to copy.</strong> Click any
            swatch to copy its color value to the clipboard. A brief check icon
            confirms the copy.
          </li>
          <li>
            <strong className="text-foreground">Adaptive contrast.</strong> Copy
            icons automatically switch between light and dark based on the swatch
            background color for readability.
          </li>
          <li>
            <strong className="text-foreground">Any CSS color.</strong> Supports
            hex, rgb(), hsl(), oklch(), and named CSS colors. The value you provide
            is what gets copied.
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
