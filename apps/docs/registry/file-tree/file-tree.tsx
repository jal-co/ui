/**
 * jalco-ui
 * FileTree
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Collapsible file/folder tree with file-type icons, highlights, and
 * configurable expand state. Designed for docs, README project structures,
 * and dev-tool file explorers.
 *
 * Props:
 * - tree: array of FileTreeNode entries (nested via children)
 * - defaultExpanded?: boolean | string[] — expand all, none, or specific paths
 * - iconStyle?: "minimal" | "colored" — generic icons or file-type-colored icons
 * - highlight?: string[] — array of paths to highlight
 * - className?: additional CSS classes
 *
 * Notes:
 * - Client component — expand/collapse requires local state
 * - No external dependencies — icons are bundled inline
 */

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface FileTreeNode {
  name: string
  children?: FileTreeNode[]
}

interface FileTreeProps extends Omit<React.ComponentProps<"div">, "children"> {
  tree: FileTreeNode[]
  /** Expand all folders, none, or specific paths (e.g. ["src", "src/components"]). Defaults to true. */
  defaultExpanded?: boolean | string[]
  /** "minimal" shows generic file/folder icons. "colored" shows language-specific colored icons. */
  iconStyle?: "minimal" | "colored"
  /** Array of full paths to highlight (e.g. ["src/index.ts"]). */
  highlight?: string[]
}

export function FileTree({
  tree,
  defaultExpanded = true,
  iconStyle = "minimal",
  highlight,
  className,
  ...props
}: FileTreeProps) {
  const highlightSet = React.useMemo(
    () => new Set(highlight ?? []),
    [highlight],
  )

  const initialExpanded = React.useMemo(() => {
    if (defaultExpanded === true) return collectAllFolderPaths(tree, "")
    if (defaultExpanded === false) return new Set<string>()
    return new Set(defaultExpanded)
  }, [defaultExpanded, tree])

  const [expanded, setExpanded] = React.useState(initialExpanded)

  const toggle = React.useCallback((path: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(path)) next.delete(path)
      else next.add(path)
      return next
    })
  }, [])

  const treeRef = React.useRef<HTMLDivElement>(null)

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      const container = treeRef.current
      if (!container) return

      const items = Array.from(
        container.querySelectorAll<HTMLButtonElement>("[role=treeitem] > button")
      )
      const currentIndex = items.findIndex((el) => el === document.activeElement)
      if (currentIndex === -1) return

      let handled = true

      switch (e.key) {
        case "ArrowDown": {
          const next = items[currentIndex + 1]
          next?.focus()
          break
        }
        case "ArrowUp": {
          const prev = items[currentIndex - 1]
          prev?.focus()
          break
        }
        case "ArrowRight": {
          const current = items[currentIndex]
          const treeitem = current?.closest("[role=treeitem]")
          const isExpanded = treeitem?.getAttribute("aria-expanded") === "true"
          const isFolder = treeitem?.getAttribute("aria-expanded") != null
          if (isFolder && !isExpanded) {
            current?.click()
          } else if (isFolder && isExpanded) {
            const next = items[currentIndex + 1]
            next?.focus()
          }
          break
        }
        case "ArrowLeft": {
          const current = items[currentIndex]
          const treeitem = current?.closest("[role=treeitem]")
          const isExpanded = treeitem?.getAttribute("aria-expanded") === "true"
          const isFolder = treeitem?.getAttribute("aria-expanded") != null
          if (isFolder && isExpanded) {
            current?.click()
          } else {
            const prev = items[currentIndex - 1]
            prev?.focus()
          }
          break
        }
        case "Home": {
          items[0]?.focus()
          break
        }
        case "End": {
          items[items.length - 1]?.focus()
          break
        }
        default:
          handled = false
      }

      if (handled) e.preventDefault()
    },
    []
  )

  return (
    <div
      ref={treeRef}
      data-slot="file-tree"
      className={cn(
        "rounded-lg border border-border bg-card font-mono text-sm",
        className,
      )}
      role="tree"
      aria-label="File tree"
      onKeyDown={handleKeyDown}
      {...props}
    >
      <div className="p-3">
        {tree.map((node) => (
          <TreeEntry
            key={node.name}
            node={node}
            path={node.name}
            depth={0}
            expanded={expanded}
            toggle={toggle}
            highlightSet={highlightSet}
            iconStyle={iconStyle}
          />
        ))}
      </div>
    </div>
  )
}

interface TreeEntryProps {
  node: FileTreeNode
  path: string
  depth: number
  expanded: Set<string>
  toggle: (path: string) => void
  highlightSet: Set<string>
  iconStyle: "minimal" | "colored"
}

function TreeEntry({
  node,
  path,
  depth,
  expanded,
  toggle,
  highlightSet,
  iconStyle,
}: TreeEntryProps) {
  const isFolder = !!node.children
  const isOpen = isFolder && expanded.has(path)
  const isHighlighted = highlightSet.has(path)

  return (
    <div
      role="treeitem"
      aria-expanded={isFolder ? isOpen : undefined}
      aria-selected={isHighlighted}
    >
      <button
        type="button"
        className={cn(
          "group flex w-full items-center gap-2 rounded-md px-1.5 py-1 text-left text-[13px] leading-tight transition-colors",
          isHighlighted
            ? "bg-primary/10 text-primary font-medium"
            : "text-foreground/80 hover:bg-accent/60 hover:text-foreground",
          !isFolder && "cursor-default",
        )}
        style={{ paddingLeft: `${depth * 20 + 6}px` }}
        onClick={isFolder ? () => toggle(path) : undefined}
        tabIndex={0}
        aria-label={isFolder ? `${isOpen ? "Collapse" : "Expand"} ${node.name}` : node.name}
      >
        {isFolder ? (
          <>
            <ChevronIcon open={isOpen} />
            <FolderIcon open={isOpen} iconStyle={iconStyle} />
          </>
        ) : (
          <>
            <span className="w-3.5" aria-hidden="true" />
            <FileIcon name={node.name} iconStyle={iconStyle} />
          </>
        )}
        <span className="truncate">{node.name}</span>
      </button>

      {isFolder && isOpen && node.children && (
        <div role="group">
          {node.children.map((child) => (
            <TreeEntry
              key={child.name}
              node={child}
              path={`${path}/${child.name}`}
              depth={depth + 1}
              expanded={expanded}
              toggle={toggle}
              highlightSet={highlightSet}
              iconStyle={iconStyle}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function collectAllFolderPaths(
  nodes: FileTreeNode[],
  prefix: string,
): Set<string> {
  const paths = new Set<string>()
  for (const node of nodes) {
    if (node.children) {
      const p = prefix ? `${prefix}/${node.name}` : node.name
      paths.add(p)
      for (const sub of collectAllFolderPaths(node.children, p)) {
        paths.add(sub)
      }
    }
  }
  return paths
}

// Icons

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={cn(
        "shrink-0 text-muted-foreground/60 transition-transform duration-150",
        open && "rotate-90",
      )}
      aria-hidden="true"
    >
      <path
        d="M5.25 3.5L8.75 7L5.25 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FolderIcon({
  open,
  iconStyle,
}: {
  open: boolean
  iconStyle: "minimal" | "colored"
}) {
  const color = iconStyle === "colored" ? "#54aeff" : "currentColor"

  if (open) {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="shrink-0"
        style={{ color }}
        aria-hidden="true"
      >
        <path
          d="M1.5 3.5C1.5 2.95 1.95 2.5 2.5 2.5H5.79L7.29 4H13.5C14.05 4 14.5 4.45 14.5 5V5.5H3.5L1.5 12.5V3.5Z"
          fill="currentColor"
          opacity="0.15"
        />
        <path
          d="M1.5 3.5C1.5 2.95 1.95 2.5 2.5 2.5H5.79L7.29 4H13.5C14.05 4 14.5 4.45 14.5 5V12C14.5 12.55 14.05 13 13.5 13H2.5C1.95 13 1.5 12.55 1.5 12V3.5Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M1.5 5.5H14.5"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    )
  }

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0"
      style={{ color }}
      aria-hidden="true"
    >
      <path
        d="M1.5 3.5C1.5 2.95 1.95 2.5 2.5 2.5H5.79L7.29 4H13.5C14.05 4 14.5 4.45 14.5 5V12C14.5 12.55 14.05 13 13.5 13H2.5C1.95 13 1.5 12.55 1.5 12V3.5Z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M1.5 3.5C1.5 2.95 1.95 2.5 2.5 2.5H5.79L7.29 4H13.5C14.05 4 14.5 4.45 14.5 5V12C14.5 12.55 14.05 13 13.5 13H2.5C1.95 13 1.5 12.55 1.5 12V3.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const FILE_ICON_MAP: Record<string, { color: string; label: string }> = {
  ts: { color: "#3178c6", label: "TS" },
  tsx: { color: "#3178c6", label: "TX" },
  js: { color: "#f7df1e", label: "JS" },
  jsx: { color: "#f7df1e", label: "JX" },
  json: { color: "#a8a8a8", label: "{}" },
  md: { color: "#519aba", label: "M" },
  mdx: { color: "#519aba", label: "MX" },
  css: { color: "#563d7c", label: "#" },
  html: { color: "#e34c26", label: "<>" },
  svg: { color: "#ffb13b", label: "◇" },
  png: { color: "#a074c4", label: "▪" },
  jpg: { color: "#a074c4", label: "▪" },
  gif: { color: "#a074c4", label: "▪" },
  yaml: { color: "#cb171e", label: "Y" },
  yml: { color: "#cb171e", label: "Y" },
  toml: { color: "#9c4121", label: "T" },
  env: { color: "#ecd53f", label: "·" },
  gitignore: { color: "#f05032", label: "G" },
  lock: { color: "#a8a8a8", label: "🔒" },
  sh: { color: "#89e051", label: "$" },
  bash: { color: "#89e051", label: "$" },
  py: { color: "#3572a5", label: "Py" },
  rs: { color: "#dea584", label: "Rs" },
  go: { color: "#00add8", label: "Go" },
}

function getFileExtension(name: string): string {
  if (name.startsWith(".")) {
    const withoutDot = name.slice(1)
    if (!withoutDot.includes(".")) return withoutDot
  }
  const parts = name.split(".")
  return parts.length > 1 ? parts[parts.length - 1] : ""
}

function FileIcon({
  name,
  iconStyle,
}: {
  name: string
  iconStyle: "minimal" | "colored"
}) {
  if (iconStyle === "colored") {
    const ext = getFileExtension(name)
    const info = FILE_ICON_MAP[ext]

    if (info) {
      return (
        <span
          className="flex size-4 shrink-0 items-center justify-center rounded-[3px] text-[8px] font-bold leading-none"
          style={{ backgroundColor: `${info.color}20`, color: info.color }}
          aria-hidden="true"
        >
          {info.label}
        </span>
      )
    }
  }

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0 text-muted-foreground/60"
      aria-hidden="true"
    >
      <path
        d="M4 1.5H9.5L12.5 4.5V14.5H4C3.45 14.5 3 14.05 3 13.5V2.5C3 1.95 3.45 1.5 4 1.5Z"
        fill="currentColor"
        opacity="0.08"
      />
      <path
        d="M4 1.5H9.5L12.5 4.5V13.5C12.5 14.05 12.05 14.5 11.5 14.5H4C3.45 14.5 3 14.05 3 13.5V2.5C3 1.95 3.45 1.5 4 1.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 1.5V4.5H12.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}
