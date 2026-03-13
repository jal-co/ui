import { NextResponse } from "next/server"
import registry from "@/registry.json"

export const dynamic = "force-static"

export function GET() {
  const items = registry.items

  const componentLines = items
    .map((item) => {
      const url = `https://ui.justinlevine.me/docs/components/${item.name}`
      return `- [${item.title}](${url}): ${item.description}`
    })
    .join("\n")

  const registryLines = items
    .map((item) => {
      return `- [${item.name}.json](https://ui.justinlevine.me/r/${item.name}.json): Registry JSON for ${item.title}`
    })
    .join("\n")

  const body = `# jal-co/ui

> jalco ui is a React component library by Justin Levine. It ships polished, composable components for React and Next.js projects, distributed via a shadcn-compatible registry. Install any component with a single command or copy the source directly.

## Install

Components are installed using the shadcn CLI. No npm package to install — each component is copied into your project as source code.

\`\`\`
npx shadcn@latest add https://ui.justinlevine.me/r/<component-name>.json
\`\`\`

Replace \`<component-name>\` with any component name listed below.

## Key details

- Built with React 19, Next.js 15, Tailwind CSS v4, and Radix UI primitives
- All components are server-component-first where possible
- No wrapper package — components are copied as source into your project
- Uses class-variance-authority for variant systems
- Designed for accessibility, composability, and copy-paste ergonomics
- Source: https://github.com/jal-co/ui

## Components

${componentLines}

## Registry JSON

${registryLines}

## Optional

- [Installation guide](https://ui.justinlevine.me/docs/installation): How to set up jalco ui in a new or existing project
- [Color Themes](https://ui.justinlevine.me/docs/themes): Available color themes and how to customize them
- [GitHub](https://github.com/jal-co/ui): Source code repository
`

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
