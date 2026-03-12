import type { Metadata } from "next"
import Link from "next/link"
import { CodeBlock } from "@/registry/code-block/code-block"
import { CodeLine } from "@/registry/code-line/code-line"
import { ThemeGrid } from "./theme-grid"

export const metadata: Metadata = {
  title: "Color Themes — Jalco UI",
  description:
    "65 editor color themes available across Code Block, Code Line, Code Block Command, and JSON Viewer.",
}

const usageExample = `// Code Block — pass theme name directly
<CodeBlock code={myCode} language="ts" theme="dracula" />

// Code Line — same prop
<CodeLine code="npm install zod" language="bash" theme="nord" />

// JSON Viewer — use colorTheme
<JsonViewer data={myData} colorTheme="tokyo-night" />

// Code Block Command — pass { bg, fg } from the theme map
import { jsonThemes } from "@/components/json-viewer/lib/themes"

const { bg, fg } = jsonThemes["catppuccin-mocha"]
<CodeBlockCommand {...commands} colorTheme={{ bg, fg }} />`

export default async function ThemesPage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Color Themes</h1>
        <p className="text-base text-muted-foreground">
          65 editor color themes from{" "}
          <a
            href="https://shiki.style"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            shiki
          </a>
          , available across Jalco UI&apos;s code and data components. Click
          any swatch to copy the theme name.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Supported components
        </h2>
        <div className="overflow-hidden rounded-lg border border-border/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-muted/30">
                <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">
                  Component
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">
                  Prop
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">
                  Accepts
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              <tr>
                <td className="px-3 py-2">
                  <Link
                    href="/docs/components/code-block"
                    className="font-medium text-foreground underline hover:text-foreground/80"
                  >
                    Code Block
                  </Link>
                </td>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                  theme
                </td>
                <td className="px-3 py-2 text-xs text-muted-foreground">
                  Shiki theme name string
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2">
                  <Link
                    href="/docs/components/code-line"
                    className="font-medium text-foreground underline hover:text-foreground/80"
                  >
                    Code Line
                  </Link>
                </td>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                  theme
                </td>
                <td className="px-3 py-2 text-xs text-muted-foreground">
                  Shiki theme name string
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2">
                  <Link
                    href="/docs/components/code-block-command"
                    className="font-medium text-foreground underline hover:text-foreground/80"
                  >
                    Code Block Command
                  </Link>
                </td>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                  colorTheme
                </td>
                <td className="px-3 py-2 text-xs text-muted-foreground">
                  {"{ bg, fg }"} object
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2">
                  <Link
                    href="/docs/components/json-viewer"
                    className="font-medium text-foreground underline hover:text-foreground/80"
                  >
                    JSON Viewer
                  </Link>
                </td>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                  colorTheme
                </td>
                <td className="px-3 py-2 text-xs text-muted-foreground">
                  Theme name string or custom palette object
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageExample} language="tsx" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">
          All 65 themes
        </h2>
        <p className="text-sm text-muted-foreground">
          Each swatch shows a mini JSON preview in the theme&apos;s actual
          colors. Click to copy the theme name.
        </p>
        <ThemeGrid />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Custom themes
        </h2>
        <p className="text-sm text-muted-foreground">
          JSON Viewer also accepts a custom{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            JsonColorTheme
          </code>{" "}
          object if none of the 65 built-in themes fit. Provide hex colors for
          each token type.
        </p>
        <CodeLine
          code={`<JsonViewer data={data} colorTheme={{ bg: "#1a1a2e", fg: "#eee", key: "#e94560", string: "#0f3460", number: "#16213e", boolean: "#533483", null: "#533483", punctuation: "#999" }} />`}
        />
      </section>
    </div>
  )
}
