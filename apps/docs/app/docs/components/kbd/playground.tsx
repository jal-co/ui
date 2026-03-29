"use client"

import { KbdCombo, type BuiltInColorScheme } from "@/registry/kbd/kbd"
import {
  ComponentPlayground,
  type PlaygroundControl,
} from "@/components/docs/component-playground"

const colorSchemeOptions = [
  "none",
  "dolch",
  "olivia",
  "botanical",
  "oblivion",
  "8008",
  "laser",
  "mizu",
  "dracula",
  "hammerhead",
  "wob",
  "bow",
  "cream",
]

const controls: PlaygroundControl[] = [
  {
    name: "variant",
    type: "select",
    options: ["flat", "raised", "sculpted"],
    default: "raised",
  },
  {
    name: "size",
    type: "select",
    options: ["sm", "md", "lg"],
    default: "md",
  },
  {
    name: "colorScheme",
    type: "select",
    label: "colorScheme",
    options: colorSchemeOptions,
    default: "none",
  },
  {
    name: "keys",
    type: "preset",
    label: "Keys",
    presets: [
      { label: "⌘ K", value: ["⌘", "K"], code: '["⌘", "K"]' },
      { label: "Ctrl Shift P", value: ["Ctrl", "Shift", "P"], code: '["Ctrl", "Shift", "P"]' },
      { label: "⌥ ↑", value: ["⌥", "↑"], code: '["⌥", "↑"]' },
      { label: "← ↑ ↓ →", value: ["←", "↑", "↓", "→"], code: '["←", "↑", "↓", "→"]' },
      { label: "Esc", value: ["Esc"], code: '["Esc"]' },
    ],
    default: "⌘ K",
  },
]

export function KbdPlayground() {
  return (
    <ComponentPlayground
      componentName="KbdCombo"
      importPath="@/components/kbd"
      controls={controls}
      render={(props) => {
        const variant = (props.variant as string) ?? "raised"
        const size = (props.size as string) ?? "md"
        const colorScheme = props.colorScheme === "none" ? undefined : (props.colorScheme as BuiltInColorScheme)
        const keys = (props.keys as string[]) ?? ["⌘", "K"]

        return (
          <KbdCombo
            keys={keys}
            variant={variant as "flat" | "raised" | "sculpted"}
            size={size as "sm" | "md" | "lg"}
            colorScheme={colorScheme}
          />
        )
      }}
    />
  )
}
