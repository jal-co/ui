import * as React from "react"
import { CodeBlockCopyButton } from "@/components/docs/code-block-copy-button"
import { CodeBlockWrapper } from "@/components/docs/code-block-wrapper"
import { highlightCode } from "@/lib/highlight-code"
import { LanguageIcon } from "@/components/icons/language-icon"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  overflow?: "default" | "scrollable" | "collapsible"
  maxHeight?: number
  muted?: boolean
  /** Hide the header bar. Copy button floats inside the code area. */
  compact?: boolean
  className?: string
}

export async function CodeBlock({
  code,
  language = "tsx",
  title,
  overflow = "default",
  maxHeight,
  muted = false,
  compact = false,
  className,
}: CodeBlockProps) {
  const highlighted = await highlightCode(code, language)

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border shadow-sm",
        muted
          ? "border-border/40 bg-muted/30"
          : "border-border/60 bg-card",
        className
      )}
    >
      {!compact && (
        <div
          className={cn(
            "flex items-center justify-between gap-3 border-b px-4 py-3",
            muted
              ? "border-border/40 bg-muted/20"
              : "border-border/60 bg-muted/40"
          )}
        >
          <div className="flex min-w-0 items-center gap-2">
            <LanguageIcon language={language} muted={muted} />
            {title ? (
              <p
                className={cn(
                  "truncate text-sm font-medium",
                  muted ? "text-muted-foreground" : "text-foreground"
                )}
              >
                {title}
              </p>
            ) : (
              <span
                className={cn(
                  "rounded-md border px-2 py-1 text-[11px] font-medium uppercase tracking-wide",
                  muted
                    ? "border-border/40 bg-muted/40 text-muted-foreground/70"
                    : "border-border/60 bg-background text-muted-foreground"
                )}
              >
                {language}
              </span>
            )}
          </div>
          <CodeBlockCopyButton value={code} />
        </div>
      )}
      <CodeBlockWrapper overflow={overflow} maxHeight={maxHeight} muted={muted}>
        <div
          className={cn(
            "relative overflow-x-auto",
            !muted && "bg-[var(--shiki-light-bg)] dark:bg-[var(--shiki-dark-bg)]"
          )}
        >
          {compact && (
            <div className="absolute right-2 top-2 z-10">
              <CodeBlockCopyButton value={code} />
            </div>
          )}
          <div
            className={cn(
              "code-block [&_code]:font-mono [&_code]:text-[13px] [&_pre]:m-0 [&_pre]:overflow-x-auto [&_pre]:bg-transparent [&_pre]:p-4 [&_pre]:sm:p-5",
              muted && "[&_code]:opacity-80"
            )}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </div>
      </CodeBlockWrapper>
    </div>
  )
}
