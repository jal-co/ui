"use client"

import * as React from "react"
import { ChatThread, type ChatMessage } from "@/registry/chat-bubble/chat-bubble"

const messages: ChatMessage[] = [
  { text: "The best part: zero layout reflow. You could shrinkwrap 10,000 bubbles and the browser wouldn't blink.", sent: true },
  { text: "That shrinkwrap demo is really impressive — finds the exact minimum width for multiline text.", sent: false },
  { text: "كل شيء! Mixed bidi, grapheme clusters, whatever you want.", sent: true },
  { text: "How does it handle long messages with lots of wrapping?", sent: false },
]

export default function ChatBubbleComparison() {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])
  if (!mounted) return <div className="h-[400px]" />

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          CSS fit-content (dead space)
        </p>
        <div className="rounded-xl bg-background p-4 border border-border">
          <ChatThread messages={messages} shrinkwrap={false} maxWidth={260} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Pretext shrinkwrap (pixel-tight)
        </p>
        <div className="rounded-xl bg-background p-4 border border-border">
          <ChatThread messages={messages} shrinkwrap={true} maxWidth={260} />
        </div>
      </div>
    </div>
  )
}
