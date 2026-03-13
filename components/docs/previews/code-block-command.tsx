import { CodeBlockCommand } from "@/registry/code-block-command/code-block-command"
import { convertNpmCommand } from "@/registry/code-block-command/lib/convert-npm-command"
import { pmIcons } from "@/lib/pm-icons"

export default async function Preview() {
  return (
    <div className="flex w-full flex-col gap-5">
      <CodeBlockCommand
        {...convertNpmCommand("npx shadcn@latest add button")}
        icons={pmIcons}
        show={["shadcn", "pnpm", "npm", "yarn", "bun"]}
      />
      <CodeBlockCommand
        {...convertNpmCommand("npx shadcn@latest add button")}
        icons={pmIcons}
        show={["pnpm", "npm", "yarn", "bun"]}
        iconStyle="muted"
      />
      <CodeBlockCommand
        {...convertNpmCommand("npx shadcn@latest add button")}
        show={["pnpm", "npm"]}
        iconStyle="none"
      />
    </div>
  )
}
