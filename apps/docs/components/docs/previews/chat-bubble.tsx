"use client"

import * as React from "react"
import { ChatThread, type ChatMessage } from "@/registry/chat-bubble/chat-bubble"

const messages: ChatMessage[] = [
  { text: "Hey, did you see the new Pretext library?", sent: false },
  { text: "Yeah! Pure arithmetic text measurement.", sent: true },
  { text: "That shrinkwrap is wild — pixel-tight bubbles.", sent: false },
  { text: "CJK and emoji too 🎉", sent: true },
]

export default function ChatBubblePreview() {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div className="rounded-xl bg-background p-3 border border-border">
      <ChatThread messages={messages} maxWidth={240} />
    </div>
  )
}
