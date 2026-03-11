import type { ReactNode } from "react"
import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { source } from "@/lib/source"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      nav={{
        title: "Jalco UI",
      }}
      githubUrl="https://github.com/justinlevine-me/jalco-ui"
    >
      {children}
    </DocsLayout>
  )
}
