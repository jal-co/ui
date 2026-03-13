import { CodeBlockCommand } from "@/components/docs/code-block-command"
import { convertNpmCommand } from "@/lib/convert-npm-command"
import { pmIcons } from "@/lib/pm-icons"

interface InstallCommandProps {
  /** Registry item name (e.g. "code-line", "code-block"). */
  name: string
  className?: string
}

/**
 * Self-contained install command block for a registry item.
 *
 * Uses statically bundled SVG icons — no build-time API calls.
 */
export function InstallCommand({ name, className }: InstallCommandProps) {
  const npmCommand = `npx shadcn@latest add jalco/${name}`

  return (
    <CodeBlockCommand
      {...convertNpmCommand(npmCommand)}
      icons={pmIcons}
      show={["shadcn", "pnpm", "npm", "yarn", "bun"]}
      className={className}
    />
  )
}
