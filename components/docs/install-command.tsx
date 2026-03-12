import { CodeBlockCommand } from "@/components/docs/code-block-command"
import { convertNpmCommand } from "@/lib/convert-npm-command"
import { fetchPackageManagerIcons } from "@/lib/package-manager-icons"

interface InstallCommandProps {
  /** Registry item name (e.g. "code-line", "code-block"). */
  name: string
  className?: string
}

/**
 * Self-contained install command block for a registry item.
 *
 * Server component — fetches package manager icons and renders
 * a tabbed install command for all supported package managers.
 */
export async function InstallCommand({ name, className }: InstallCommandProps) {
  const pmIcons = await fetchPackageManagerIcons()
  const npmCommand = `npx shadcn@latest add https://ui.justinlevine.me/r/${name}.json`

  return (
    <CodeBlockCommand
      {...convertNpmCommand(npmCommand)}
      icons={pmIcons}
      show={["shadcn", "pnpm", "npm", "yarn", "bun"]}
      className={className}
    />
  )
}
