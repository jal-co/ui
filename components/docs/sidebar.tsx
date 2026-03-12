"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { docsNav } from "@/lib/docs"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-6">
      {docsNav.map((group) => (
        <div key={group.title} className="flex flex-col gap-1">
          <p className="px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {group.title}
          </p>
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                item.bundledIn && "ml-3 text-[13px]",
                pathname === item.href
                  ? "bg-accent font-medium text-accent-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  )
}
