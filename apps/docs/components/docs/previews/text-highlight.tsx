import { TextHighlight } from "@/registry/text-highlight/text-highlight"

const text = "Pretext measures text without the DOM using pure arithmetic. It handles CJK, Arabic, and emoji correctly."
const ranges = [
  { start: 0, end: 7, color: "oklch(0.75 0.15 150)" },
  { start: 41, end: 56, color: "oklch(0.8 0.15 85)" },
  { start: 74, end: 102, color: "oklch(0.75 0.12 280)" },
]

export default async function TextHighlightPreview() {
  return (
    <TextHighlight
      text={text}
      ranges={ranges}
      className="text-sm text-foreground"
    />
  )
}
