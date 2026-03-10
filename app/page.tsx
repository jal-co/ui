import * as React from "react"
import { OpenInV0Button } from "@/components/open-in-v0-button"
import { HelloWorld } from "@/registry/new-york/blocks/hello-world/hello-world"
import { ExampleForm } from "@/registry/new-york/blocks/example-form/example-form"
import PokemonPage from "@/registry/new-york/blocks/complex-component/page"
import { ExampleCard } from "@/registry/new-york/blocks/example-with-css/example-card"

const registryItems = [
  {
    name: "hello-world",
    title: "Hello World",
    description: "A simple hello world component.",
    preview: <HelloWorld />,
    minHeight: "min-h-[400px]",
  },
  {
    name: "example-form",
    title: "Example Form",
    description: "A contact form with Zod validation.",
    preview: <ExampleForm />,
    minHeight: "min-h-[500px]",
  },
  {
    name: "complex-component",
    title: "Complex Component",
    description: "A complex component showing hooks, libs, and components.",
    preview: <PokemonPage />,
    minHeight: "min-h-[400px]",
  },
  {
    name: "example-with-css",
    title: "Example with CSS",
    description: "A login form with a CSS file.",
    preview: <ExampleCard />,
    minHeight: "min-h-[400px]",
  },
]

export default function Home() {
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-5xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4 border-b pb-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Jalco UI
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            A curated shadcn-style registry for polished components and blocks.
          </h1>
        </div>
        <p className="max-w-3xl text-base text-muted-foreground sm:text-lg">
          Jalco UI is Justin Levine&apos;s custom registry for production-quality UI
          patterns, components, and installable blocks. This template app will evolve
          into a documentation-first registry experience with strong preview, code,
          and installation workflows.
        </p>
      </header>

      <section className="grid gap-4 rounded-xl border p-6 sm:grid-cols-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-medium">Registry-first</h2>
          <p className="text-sm text-muted-foreground">
            Built to distribute installable components, blocks, hooks, and more.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-medium">Documentation-driven</h2>
          <p className="text-sm text-muted-foreground">
            Designed for previews, code visibility, and clear multi-step setup.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-medium">Production quality</h2>
          <p className="text-sm text-muted-foreground">
            Focused on composability, accessibility, and real-world polish.
          </p>
        </div>
      </section>

      <main className="flex flex-col gap-8">
        {registryItems.map((item) => (
          <section
            key={item.name}
            className="flex flex-col gap-4 rounded-xl border p-4 sm:p-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold tracking-tight">{item.title}</h2>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <OpenInV0Button name={item.name} className="w-fit" />
            </div>
            <div className={`relative flex items-center justify-center ${item.minHeight}`}>
              {item.preview}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}
