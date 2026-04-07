"use client"

import * as React from "react"
import { ChatThread, type ChatMessage } from "@/registry/chat-bubble/chat-bubble"

const messages: ChatMessage[] = [
  { text: "Hey, did you see the new Pretext library?", sent: false },
  { text: "Yeah! It measures text without the DOM. Pure arithmetic.", sent: true },
  {
    text: "That shrinkwrap demo is wild — it finds the exact minimum width for multiline text. CSS can't do that.",
    sent: false,
  },
  { text: "성능 최적화가 정말 많이 되었더라고요 🎉", sent: true },
  { text: "Oh wow it handles CJK and emoji too??", sent: false },
  {
    text: "Everything. Mixed bidi, grapheme clusters, whatever you throw at it.",
    sent: true,
    timestamp: "2:34 PM",
  },
]

export default function ChatBubbleDemo() {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])
  if (!mounted) return <div className="rounded-xl bg-background p-4 border border-border h-[320px]" />

  return (
    <div className="rounded-xl bg-background p-4 border border-border">
      <ChatThread messages={messages} maxWidth={300} />
    </div>
  )
}
