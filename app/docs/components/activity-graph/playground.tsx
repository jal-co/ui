"use client"

import {
  ActivityGraph,
  type ActivityEntry,
} from "@/registry/activity-graph/activity-graph"
import {
  ComponentPlayground,
  type PlaygroundControl,
} from "@/components/docs/component-playground"

type ColorScale = [string, string, string, string, string]

const COLOR_PRESETS: { label: string; value: ColorScale; code: string }[] = [
  {
    label: "Green",
    value: [
      "bg-muted",
      "bg-emerald-300/60 dark:bg-emerald-700/50",
      "bg-emerald-400/70 dark:bg-emerald-600/60",
      "bg-emerald-500 dark:bg-emerald-500/70",
      "bg-emerald-600 dark:bg-emerald-400",
    ],
    code: '["bg-muted", "bg-emerald-300/60 dark:bg-emerald-700/50", "bg-emerald-400/70 dark:bg-emerald-600/60", "bg-emerald-500 dark:bg-emerald-500/70", "bg-emerald-600 dark:bg-emerald-400"]',
  },
  {
    label: "Blue",
    value: [
      "bg-muted",
      "bg-blue-300/60 dark:bg-blue-700/50",
      "bg-blue-400/70 dark:bg-blue-600/60",
      "bg-blue-500 dark:bg-blue-500/70",
      "bg-blue-600 dark:bg-blue-400",
    ],
    code: '["bg-muted", "bg-blue-300/60 dark:bg-blue-700/50", "bg-blue-400/70 dark:bg-blue-600/60", "bg-blue-500 dark:bg-blue-500/70", "bg-blue-600 dark:bg-blue-400"]',
  },
  {
    label: "Amber",
    value: [
      "bg-muted",
      "bg-amber-300/60 dark:bg-amber-700/50",
      "bg-amber-400/70 dark:bg-amber-600/60",
      "bg-amber-500 dark:bg-amber-500/70",
      "bg-amber-600 dark:bg-amber-400",
    ],
    code: '["bg-muted", "bg-amber-300/60 dark:bg-amber-700/50", "bg-amber-400/70 dark:bg-amber-600/60", "bg-amber-500 dark:bg-amber-500/70", "bg-amber-600 dark:bg-amber-400"]',
  },
  {
    label: "Purple",
    value: [
      "bg-muted",
      "bg-purple-300/60 dark:bg-purple-700/50",
      "bg-purple-400/70 dark:bg-purple-600/60",
      "bg-purple-500 dark:bg-purple-500/70",
      "bg-purple-600 dark:bg-purple-400",
    ],
    code: '["bg-muted", "bg-purple-300/60 dark:bg-purple-700/50", "bg-purple-400/70 dark:bg-purple-600/60", "bg-purple-500 dark:bg-purple-500/70", "bg-purple-600 dark:bg-purple-400"]',
  },
  {
    label: "Rose",
    value: [
      "bg-muted",
      "bg-rose-300/60 dark:bg-rose-700/50",
      "bg-rose-400/70 dark:bg-rose-600/60",
      "bg-rose-500 dark:bg-rose-500/70",
      "bg-rose-600 dark:bg-rose-400",
    ],
    code: '["bg-muted", "bg-rose-300/60 dark:bg-rose-700/50", "bg-rose-400/70 dark:bg-rose-600/60", "bg-rose-500 dark:bg-rose-500/70", "bg-rose-600 dark:bg-rose-400"]',
  },
]

const controls: PlaygroundControl[] = [
  {
    name: "colorScale",
    type: "preset",
    label: "colorScale",
    presets: COLOR_PRESETS,
    default: "Green",
  },
  {
    name: "weeks",
    type: "number",
    label: "weeks",
    default: 52,
    min: 4,
    max: 52,
    step: 1,
  },
  {
    name: "blockSize",
    type: "number",
    label: "blockSize (0 = auto)",
    default: 0,
    min: 0,
    max: 20,
    step: 1,
  },
  {
    name: "blockRadius",
    type: "number",
    label: "blockRadius",
    default: 2,
    min: 0,
    max: 10,
    step: 1,
  },
]

export function ActivityGraphPlayground({ data }: { data: ActivityEntry[] }) {
  return (
    <ComponentPlayground
      componentName="ActivityGraph"
      importPath="@/components/activity-graph"
      staticProps={{ data }}
      hideFromCode={["data"]}
      controls={controls}
      render={(props) => (
        <div className="w-full">
          <ActivityGraph
            data={data}
            colorScale={props.colorScale as ColorScale | undefined}
            weeks={(props.weeks as number) || 52}
            blockSize={(props.blockSize as number) || undefined}
            blockRadius={props.blockRadius as number}
          />
        </div>
      )}
    />
  )
}
