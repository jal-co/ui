import { ColorPalette } from "@/registry/color-palette/color-palette"

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

export default function ColorPaletteScale() {
  return <ColorPalette colors={blueScale} layout="scale" />
}
