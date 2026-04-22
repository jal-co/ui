import { readFileSync } from "node:fs"
import { join } from "node:path"
import registryData from "@/registry.json"
import { Index } from "@/registry/__index__"

interface RegistryFile {
  path: string
  type: string
  target?: string
}

interface RegistryItem {
  name: string
  type: string
  title: string
  description: string
  dependencies?: string[]
  registryDependencies?: string[]
  categories?: string[]
  files: RegistryFile[]
}

/**
 * Get a registry component for rendering in ComponentPreview.
 */
export function getRegistryComponent(name: string) {
  return Index[name]?.component ?? null
}

/**
 * Look up a registry item by name.
 * Returns the item from `registry.json` or `null` if not found.
 */
export function getRegistryItem(name: string): RegistryItem | null {
  return (
    (registryData.items as RegistryItem[]).find(
      (item) => item.name === name
    ) ?? null
  )
}

/**
 * Read a source file from disk relative to the project root.
 * Intended for server-side use at build time (doc pages, RSC).
 */
export function readRegistryFileSource(filePath: string): string {
  return readFileSync(join(process.cwd(), filePath), "utf-8")
}

/**
 * Get the source files for a registry item, read from disk.
 * Returns an array of `{ name, path, content }` for each file.
 */
export function getRegistryItemSources(
  name: string
): { name: string; path: string; content: string }[] {
  const item = getRegistryItem(name)
  if (!item) return []

  return item.files.map((file) => ({
    name: file.path.split("/").pop() ?? file.path,
    path: file.path,
    content: readRegistryFileSource(file.path),
  }))
}

/**
 * Get all registry item names for static route generation.
 */
export function getAllItemNames(): string[] {
  return (registryData.items as RegistryItem[]).map((item) => item.name)
}

/**
 * Build a full registry item JSON response with inlined file contents.
 * Used by the /r/[name] route handler.
 */
export function buildRegistryItemResponse(name: string): object | null {
  const item = getRegistryItem(name)
  if (!item) return null

  const filesWithContent = item.files.map((file) => {
    const filePath = join(process.cwd(), file.path)
    const content = readFileSync(filePath, "utf-8")
    return {
      ...file,
      content,
    }
  })

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    ...item,
    files: filesWithContent,
  }
}
