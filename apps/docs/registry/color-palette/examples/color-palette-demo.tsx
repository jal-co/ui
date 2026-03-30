import { ColorPalette } from "@/registry/color-palette/color-palette"

const colors = [
  { name: "Primary", value: "#6366f1" },
  { name: "Secondary", value: "#a78bfa" },
  { name: "Accent", value: "#f472b6" },
  { name: "Success", value: "#22c55e" },
  { name: "Warning", value: "#f59e0b" },
  { name: "Danger", value: "#ef4444" },
  { name: "Info", value: "#3b82f6" },
  { name: "Muted", value: "#94a3b8" },
]

export default function ColorPaletteDemo() {
  return <ColorPalette colors={colors} columns={4} />
}
