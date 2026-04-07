/**
 * jalco-ui
 * ChatBubble, ChatThread
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Message bubble with optional Pretext shrinkwrap — finds the tightest
 * width that keeps the same line count, eliminating dead space CSS
 * `fit-content` leaves behind. Zero DOM reflow in the resize path.
 *
 * Exports:
 * - ChatBubble — single message with sent/received variants
 * - ChatThread — vertical message list with optional timestamp groups
 *
 * Dependencies: @chenglou/pretext (via pretext registry item)
 *
 * Powered by Pretext by Cheng Lou — github.com/chenglou/pretext
 */

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  usePretextWithSegments,
  useShrinkwrap,
} from "@/registry/pretext/use-pretext"

interface ChatMessage {
  /** Message text content. */
  text: string
  /** Whether the message was sent by the current user. */
  sent?: boolean
  /** Timestamp string (e.g. "2:34 PM"). */
  timestamp?: string
}

interface ChatBubbleProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Message text. */
  text: string
  /** Sent by current user. @default false */
  sent?: boolean
  /** Timestamp label. */
  timestamp?: string
  /** Enable Pretext shrinkwrap to eliminate dead space. @default true */
  shrinkwrap?: boolean
  /** Maximum bubble width in pixels. @default 280 */
  maxWidth?: number
  /** CSS font shorthand for Pretext measurement. Must match the rendered font.
   * @default '15px/20px ui-sans-serif, system-ui, sans-serif' */
  font?: string
}

const BUBBLE_PADDING_X = 24
const DEFAULT_MAX_WIDTH = 280
const DEFAULT_FONT = "15px ui-sans-serif, system-ui, sans-serif"

function ChatBubble({
  text,
  sent = false,
  timestamp,
  shrinkwrap = true,
  maxWidth = DEFAULT_MAX_WIDTH,
  font = DEFAULT_FONT,
  className,
  ...props
}: ChatBubbleProps) {
  const textMaxWidth = Math.max(1, maxWidth - BUBBLE_PADDING_X)

  const prepared = usePretextWithSegments(text, font)
  const shrinkwrappedWidth = useShrinkwrap(prepared, textMaxWidth)

  const bubbleWidth = shrinkwrap && shrinkwrappedWidth > 0
    ? Math.min(maxWidth, shrinkwrappedWidth + BUBBLE_PADDING_X)
    : undefined

  return (
    <div
      data-slot="chat-bubble"
      data-sent={sent ? "" : undefined}
      data-received={!sent ? "" : undefined}
      className={cn(
        "flex flex-col gap-1",
        sent ? "items-end" : "items-start",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "rounded-2xl px-3 py-2 text-[15px] leading-5 break-words",
          sent
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted text-foreground rounded-bl-sm",
        )}
        style={{
          maxWidth,
          ...(bubbleWidth ? { width: bubbleWidth } : {}),
        }}
      >
        {text}
      </div>
      {timestamp && (
        <span className="px-1 text-[11px] text-muted-foreground">
          {timestamp}
        </span>
      )}
    </div>
  )
}

interface ChatThreadProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Array of messages to display. */
  messages: ChatMessage[]
  /** Enable Pretext shrinkwrap on all bubbles. @default true */
  shrinkwrap?: boolean
  /** Maximum bubble width in pixels. @default 280 */
  maxWidth?: number
  /** CSS font shorthand for Pretext measurement. @default '15px ui-sans-serif, system-ui, sans-serif' */
  font?: string
}

function ChatThread({
  messages,
  shrinkwrap = true,
  maxWidth = DEFAULT_MAX_WIDTH,
  font = DEFAULT_FONT,
  className,
  ...props
}: ChatThreadProps) {
  return (
    <div
      data-slot="chat-thread"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      {messages.map((msg, i) => (
        <ChatBubble
          key={i}
          text={msg.text}
          sent={msg.sent}
          timestamp={msg.timestamp}
          shrinkwrap={shrinkwrap}
          maxWidth={maxWidth}
          font={font}
        />
      ))}
    </div>
  )
}

export {
  ChatBubble,
  ChatThread,
  type ChatBubbleProps,
  type ChatThreadProps,
  type ChatMessage,
}
