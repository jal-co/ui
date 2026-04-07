import { TextHighlight, type HighlightRange } from "@/registry/text-highlight/text-highlight"

const passage =
  "Pretext uses pure arithmetic to compute text height and line breaks without touching the DOM. It handles CJK, Arabic, mixed bidi, grapheme clusters, and emoji correctly. The prepare step runs once per text block, then layout is pure math — around 0.0002ms per call. This makes it perfect for virtualized lists, masonry layouts, and any UI where you need accurate text dimensions without triggering layout reflow."

const ranges: HighlightRange[] = [
  { start: 0, end: 7, color: "oklch(0.75 0.15 150)", label: "Library" },
  { start: 14, end: 29, color: "oklch(0.8 0.15 85)" },
  { start: 84, end: 130, color: "oklch(0.75 0.12 280)", label: "i18n" },
  { start: 218, end: 227, color: "oklch(0.8 0.15 85)" },
  { start: 293, end: 310, color: "oklch(0.75 0.15 20)", label: "Use case" },
  { start: 312, end: 328, color: "oklch(0.75 0.15 20)" },
]

export default function TextHighlightDemo() {
  return (
    <TextHighlight
      text={passage}
      ranges={ranges}
      className="text-base text-foreground"
    />
  )
}
