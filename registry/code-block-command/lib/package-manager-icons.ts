/**
 * jalco-ui
 * lib/package-manager-icons
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Pre-fetches all package manager SVG icons from the SVGL API for use
 * in CodeBlockCommand.
 */

import { fetchSvgByTitle, getPackageManagerSvglTitle } from "@/registry/code-block-command/lib/svgl"

type PackageManager = "pnpm" | "yarn" | "npm" | "bun" | "shadcn"

const managers: PackageManager[] = ["pnpm", "yarn", "npm", "bun", "shadcn"]

/**
 * Pre-fetch all package manager SVG icons from the SVGL API.
 * Call this in a server component and pass the result to CodeBlockCommand's `icons` prop.
 *
 * @example
 * const icons = await fetchPackageManagerIcons()
 * <CodeBlockCommand icons={icons} pnpm="pnpm add foo" ... />
 */
export async function fetchPackageManagerIcons(): Promise<
  Partial<Record<PackageManager, string>>
> {
  const entries = await Promise.all(
    managers.map(async (manager) => {
      const title = getPackageManagerSvglTitle(manager)
      if (!title) return [manager, null] as const
      const svg = await fetchSvgByTitle(title)
      return [manager, svg] as const
    })
  )

  const result: Partial<Record<PackageManager, string>> = {}
  for (const [manager, svg] of entries) {
    if (svg) result[manager] = svg
  }
  return result
}
