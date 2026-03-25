import { KbdCombo, type BuiltInColorScheme } from "@/registry/kbd/kbd"

const showcase: { name: BuiltInColorScheme; keys: string[] }[] = [
  { name: "dolch", keys: ["⌘", "C"] },
  { name: "olivia", keys: ["⌘", "K"] },
  { name: "botanical", keys: ["⌥", "↑"] },
  { name: "laser", keys: ["Fn", "F1"] },
  { name: "8008", keys: ["⇧", "P"] },
  { name: "mizu", keys: ["⌘", "S"] },
  { name: "dracula", keys: ["⌘", "D"] },
  { name: "cream", keys: ["⌘", "V"] },
]

export default async function KbdPreview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {showcase.map(({ name, keys }) => (
        <div key={name} className="flex flex-col items-center gap-1.5">
          <KbdCombo keys={keys} variant="sculpted" colorScheme={name} size="sm" />
          <span className="text-[9px] text-muted-foreground">{name}</span>
        </div>
      ))}
    </div>
  )
}
