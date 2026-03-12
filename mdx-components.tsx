import type { MDXComponents } from "mdx/types"
import { cn } from "@/lib/utils"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }: React.ComponentProps<"h1">) => (
      <h1
        className={cn(
          "mt-2 scroll-m-20 text-3xl font-bold tracking-tight",
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }: React.ComponentProps<"h2">) => (
      <h2
        className={cn(
          "mt-10 scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0",
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }: React.ComponentProps<"h3">) => (
      <h3
        className={cn(
          "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
          className
        )}
        {...props}
      />
    ),
    p: ({ className, ...props }: React.ComponentProps<"p">) => (
      <p
        className={cn("leading-7 [&:not(:first-child)]:mt-4", className)}
        {...props}
      />
    ),
    a: ({ className, ...props }: React.ComponentProps<"a">) => (
      <a
        className={cn(
          "font-medium underline underline-offset-4",
          className
        )}
        {...props}
      />
    ),
    ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
      <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
    ),
    ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
      <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
    ),
    li: ({ className, ...props }: React.ComponentProps<"li">) => (
      <li className={cn("mt-2", className)} {...props} />
    ),
    blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
      <blockquote
        className={cn("mt-6 border-l-2 pl-6 italic", className)}
        {...props}
      />
    ),
    hr: ({ ...props }: React.ComponentProps<"hr">) => (
      <hr className="my-4 md:my-8" {...props} />
    ),
    code: ({ className, ...props }: React.ComponentProps<"code">) => (
      <code
        className={cn(
          "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
          className
        )}
        {...props}
      />
    ),
    pre: ({ className, ...props }: React.ComponentProps<"pre">) => (
      <pre
        className={cn(
          "mt-4 overflow-x-auto rounded-lg border bg-muted/50 p-4",
          className
        )}
        {...props}
      />
    ),
    table: ({ className, ...props }: React.ComponentProps<"table">) => (
      <div className="my-6 w-full overflow-y-auto rounded-lg border">
        <table className={cn("w-full text-sm", className)} {...props} />
      </div>
    ),
    tr: ({ className, ...props }: React.ComponentProps<"tr">) => (
      <tr className={cn("border-b", className)} {...props} />
    ),
    th: ({ className, ...props }: React.ComponentProps<"th">) => (
      <th
        className={cn(
          "px-4 py-2 text-left font-medium [&[align=center]]:text-center [&[align=right]]:text-right",
          className
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }: React.ComponentProps<"td">) => (
      <td
        className={cn(
          "px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
          className
        )}
        {...props}
      />
    ),
    Steps: ({ ...props }) => (
      <div
        className="steps mb-12 ml-4 border-l pl-8 [counter-reset:step]"
        {...props}
      />
    ),
    Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
      <h3
        className={cn(
          "step mt-8 scroll-m-20 text-base font-medium tracking-tight",
          className
        )}
        {...props}
      />
    ),
    ...components,
  }
}
