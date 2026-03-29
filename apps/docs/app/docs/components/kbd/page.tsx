import type { Metadata } from "next"
import { Kbd, KbdCombo, builtInSchemes, type BuiltInColorScheme } from "@/registry/kbd/kbd"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { CodeLine } from "@/registry/code-line/code-line"
import { KbdPlayground } from "./playground"

export const metadata: Metadata = {
  title: "Kbd",
  description:
    "Keyboard shortcut key rendered as a styled keycap. Three visual profiles: flat, raised, and sculpted.",
}

const sourceFiles = ["registry/kbd/kbd.tsx"]

export default function KbdPage() {
  return (
    <ComponentDocsPage
      title="Kbd"
      description="Keyboard shortcut key rendered as a styled keycap. Three visual profiles: flat, raised, and sculpted."
      registryName="kbd"
      sourceFiles={sourceFiles}
      preview={
        <div className="flex items-center gap-4">
          <KbdCombo keys={["⌘", "K"]} variant="raised" />
          <KbdCombo keys={["Ctrl", "Shift", "P"]} variant="sculpted" />
          <KbdCombo keys={["⌥", "↑"]} variant="flat" />
        </div>
      }
      usage={
        <>
          <CodeLine
            code={`import { Kbd, KbdCombo } from "@/components/kbd"`}
          />
          <CodeLine code={`<Kbd>⌘</Kbd>`} />
          <CodeLine
            code={`<KbdCombo keys={["⌘", "Shift", "K"]} />`}
          />
        </>
      }
    >
      {/* Playground */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Playground</h2>
        <KbdPlayground />
      </section>

      {/* Variants */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Variants</h2>
        <VariantGrid
          items={[
            {
              label: "Flat",
              preview: (
                <div className="flex items-center gap-3">
                  <Kbd variant="flat">Esc</Kbd>
                  <KbdCombo keys={["⌘", "C"]} variant="flat" />
                  <KbdCombo keys={["Ctrl", "Shift", "P"]} variant="flat" />
                </div>
              ),
              code: `<Kbd variant="flat">Esc</Kbd>`,
            },
            {
              label: "Raised",
              preview: (
                <div className="flex items-center gap-3">
                  <Kbd variant="raised">Esc</Kbd>
                  <KbdCombo keys={["⌘", "C"]} variant="raised" />
                  <KbdCombo keys={["Ctrl", "Shift", "P"]} variant="raised" />
                </div>
              ),
              code: `<Kbd variant="raised">Esc</Kbd>`,
            },
            {
              label: "Sculpted",
              preview: (
                <div className="flex items-center gap-3">
                  <Kbd variant="sculpted">Esc</Kbd>
                  <KbdCombo keys={["⌘", "C"]} variant="sculpted" />
                  <KbdCombo keys={["Ctrl", "Shift", "P"]} variant="sculpted" />
                </div>
              ),
              code: `<Kbd variant="sculpted">Esc</Kbd>`,
            },
          ]}
          files={sourceFiles}
          columns={1}
          registryName="kbd"
        />
      </section>

      {/* Sizes */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Sizes</h2>
        <VariantGrid
          items={[
            {
              label: "Small",
              preview: (
                <div className="flex items-center gap-2">
                  <KbdCombo keys={["⌘", "K"]} size="sm" />
                  <span className="text-xs text-muted-foreground">
                    Open command palette
                  </span>
                </div>
              ),
              code: `<Kbd size="sm">⌘</Kbd>`,
            },
            {
              label: "Medium",
              preview: (
                <div className="flex items-center gap-2">
                  <KbdCombo keys={["⌘", "K"]} size="md" />
                  <span className="text-sm text-muted-foreground">
                    Open command palette
                  </span>
                </div>
              ),
              code: `<Kbd size="md">⌘</Kbd>`,
            },
            {
              label: "Large",
              preview: (
                <div className="flex items-center gap-2">
                  <KbdCombo keys={["⌘", "K"]} size="lg" />
                  <span className="text-sm text-muted-foreground">
                    Open command palette
                  </span>
                </div>
              ),
              code: `<Kbd size="lg">⌘</Kbd>`,
            },
          ]}
          files={sourceFiles}
          columns={3}
          registryName="kbd"
        />
      </section>

      {/* Examples */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>
        <VariantGrid
          items={[
            {
              label: "With separator",
              preview: (
                <KbdCombo
                  keys={["Ctrl", "Alt", "Del"]}
                  separator="+"
                  variant="raised"
                />
              ),
              code: `<KbdCombo keys={["Ctrl", "Alt", "Del"]} separator="+" />`,
            },
            {
              label: "Arrow keys",
              preview: (
                <div className="flex items-center gap-1">
                  <Kbd variant="sculpted">←</Kbd>
                  <Kbd variant="sculpted">↑</Kbd>
                  <Kbd variant="sculpted">↓</Kbd>
                  <Kbd variant="sculpted">→</Kbd>
                </div>
              ),
              code: `<Kbd variant="sculpted">←</Kbd>`,
            },
            {
              label: "Inline with text",
              preview: (
                <p className="text-sm text-muted-foreground">
                  Press{" "}
                  <KbdCombo keys={["⌘", "K"]} size="sm" variant="raised" />{" "}
                  to open the command palette
                </p>
              ),
              code: `<p>Press <KbdCombo keys={["⌘", "K"]} size="sm" /> to open the command palette</p>`,
            },
          ]}
          files={sourceFiles}
          columns={3}
          registryName="kbd"
        />
      </section>

      {/* Color Schemes */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Color Schemes</h2>
        <p className="text-sm text-muted-foreground">
          Built-in color palettes inspired by popular keycap sets. Pass a name
          string or a custom{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            {"{ bg, text, border }"}
          </code>{" "}
          object.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {(Object.keys(builtInSchemes) as BuiltInColorScheme[]).map((name) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-card p-4"
            >
              <div className="flex items-center gap-1">
                <Kbd variant="sculpted" colorScheme={name}>⌘</Kbd>
                <Kbd variant="sculpted" colorScheme={name}>K</Kbd>
              </div>
              <span className="text-[11px] font-medium text-muted-foreground">
                {name}
              </span>
            </div>
          ))}
        </div>
        <VariantGrid
          items={[
            {
              label: "Dolch",
              preview: (
                <KbdCombo
                  keys={["Ctrl", "Shift", "P"]}
                  variant="sculpted"
                  colorScheme="dolch"
                />
              ),
              code: `<KbdCombo keys={["Ctrl", "Shift", "P"]} variant="sculpted" colorScheme="dolch" />`,
            },
            {
              label: "Olivia",
              preview: (
                <KbdCombo
                  keys={["⌘", "K"]}
                  variant="sculpted"
                  colorScheme="olivia"
                />
              ),
              code: `<KbdCombo keys={["⌘", "K"]} variant="sculpted" colorScheme="olivia" />`,
            },
            {
              label: "Botanical",
              preview: (
                <KbdCombo
                  keys={["⌥", "↑"]}
                  variant="sculpted"
                  colorScheme="botanical"
                />
              ),
              code: `<KbdCombo keys={["⌥", "↑"]} variant="sculpted" colorScheme="botanical" />`,
            },
            {
              label: "Laser",
              preview: (
                <KbdCombo
                  keys={["Fn", "F12"]}
                  variant="sculpted"
                  colorScheme="laser"
                />
              ),
              code: `<KbdCombo keys={["Fn", "F12"]} variant="sculpted" colorScheme="laser" />`,
            },
            {
              label: "Custom colors",
              preview: (
                <KbdCombo
                  keys={["⌘", "S"]}
                  variant="sculpted"
                  colorScheme={{ bg: "#1E3A5F", text: "#7FDBCA", border: "#152E4A" }}
                />
              ),
              code: `<KbdCombo keys={["⌘", "S"]} colorScheme={{ bg: "#1E3A5F", text: "#7FDBCA", border: "#152E4A" }} />`,
            },
          ]}
          files={sourceFiles}
          columns={3}
          registryName="kbd"
        />
      </section>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">API Reference</h2>
        <ApiRefTable
          title="Kbd"
          props={[
            {
              name: "children",
              type: "ReactNode",
              required: true,
              description: "Key label (e.g. \"⌘\", \"K\", \"Shift\").",
            },
            {
              name: "variant",
              type: '"flat" | "raised" | "sculpted"',
              description:
                "Visual profile. Flat is minimal, raised has subtle depth, sculpted is a pronounced 3D keycap.",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              description: "Keycap size.",
            },
            {
              name: "colorScheme",
              type: "string | { bg, text, border }",
              description:
                "Named palette (dolch, olivia, botanical, etc.) or custom color object.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes.",
            },
          ]}
        />
        <ApiRefTable
          title="KbdCombo"
          props={[
            {
              name: "keys",
              type: "string[]",
              required: true,
              description:
                "Array of key labels rendered as a combo (e.g. [\"⌘\", \"Shift\", \"K\"]).",
            },
            {
              name: "separator",
              type: "ReactNode",
              description:
                "Separator between keys (e.g. \"+\"). No separator when omitted.",
            },
            {
              name: "variant",
              type: '"flat" | "raised" | "sculpted"',
              description: "Visual profile applied to all keys in the combo.",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              description: "Size applied to all keys in the combo.",
            },
            {
              name: "colorScheme",
              type: "string | { bg, text, border }",
              description:
                "Named palette or custom color object applied to all keys in the combo.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes on the combo wrapper.",
            },
          ]}
        />
      </section>
    </ComponentDocsPage>
  )
}
