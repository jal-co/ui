import { InstallCommand } from "@/components/docs/install-command"

interface InstallBlockProps {
  name: string
}

export function InstallBlock({ name }: InstallBlockProps) {
  return (
    <div className="not-prose">
      <InstallCommand name={name} />
    </div>
  )
}
