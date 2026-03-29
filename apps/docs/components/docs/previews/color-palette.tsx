import { ColorPalette } from "@/registry/color-palette/color-palette"

const brandColors = [
  { name: "Primary", value: "#6366f1" },
  { name: "Secondary", value: "#a78bfa" },
  { name: "Accent", value: "#f472b6" },
  { name: "Success", value: "#22c55e" },
  { name: "Warning", value: "#f59e0b" },
  { name: "Danger", value: "#ef4444" },
  { name: "Info", value: "#3b82f6" },
  { name: "Muted", value: "#94a3b8" },
]

const blueScale = [
  { name: "50", value: "#eff6ff" },
  { name: "100", value: "#dbeafe" },
  { name: "200", value: "#bfdbfe" },
  { name: "300", value: "#93c5fd" },
  { name: "400", value: "#60a5fa" },
  { name: "500", value: "#3b82f6" },
  { name: "600", value: "#2563eb" },
  { name: "700", value: "#1d4ed8" },
  { name: "800", value: "#1e40af" },
  { name: "900", value: "#1e3a8a" },
  { name: "950", value: "#172554" },
]

export default function Preview() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <ColorPalette colors={brandColors} columns={4} />
      <ColorPalette colors={blueScale} layout="scale" />
    </div>
  )
}
