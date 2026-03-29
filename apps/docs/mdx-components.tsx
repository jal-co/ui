import defaultMdxComponents from "fumadocs-ui/mdx"
import type { MDXComponents } from "mdx/types"
import { ComponentPreview } from "@/components/docs/mdx/component-preview"
import { InstallBlock } from "@/components/docs/mdx/install-block"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    ComponentPreview,
    InstallBlock,
    ApiRefTable,
  }
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return getMDXComponents(components)
}
