import { CodeBlockCommand } from "@/components/docs/code-block-command"
import { convertNpmCommand } from "@/lib/convert-npm-command"

interface InstallCommandProps {
  /** Registry item name (e.g. "code-line", "code-block"). */
  name: string
  className?: string
}

/**
 * Self-contained install command block for a registry item.
 * Icons are bundled in CodeBlockCommand — no setup required.
 */
export function InstallCommand({ name, className }: InstallCommandProps) {
  const npmCommand = `npx shadcn@latest add jalco/${name}`

  return (
    <CodeBlockCommand
      {...convertNpmCommand(npmCommand)}
      show={["shadcn", "pnpm", "npm", "yarn", "bun"]}
      className={className}
    />
  )
}
