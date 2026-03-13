"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { toPng } from "html-to-image"

const WIDTH = 1280
const HEIGHT = 640

const COMPONENT_SCALE_OPTIONS = [
  { value: 0.4, label: "40%" },
  { value: 0.5, label: "50%" },
  { value: 0.6, label: "60%" },
  { value: 0.75, label: "75%" },
  { value: 0.85, label: "85%" },
  { value: 1, label: "100%" },
  { value: 1.25, label: "125%" },
  { value: 1.5, label: "150%" },
]

type SaveMode = "current" | "both"

interface ScreenshotClientProps {
  slugs: string[]
  children: React.ReactNode
}

export function ScreenshotClient({ slugs, children }: ScreenshotClientProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [selected, setSelected] = React.useState<string>("all")
  const [capturing, setCapturing] = React.useState<string | null>(null)
  const [pixelRatio, setPixelRatio] = React.useState(2)
  const [saveMode, setSaveMode] = React.useState<SaveMode>("both")
  const [componentScales, setComponentScales] = React.useState<
    Record<string, number>
  >({})
  const [status, setStatus] = React.useState<string | null>(null)

  const originalThemeRef = React.useRef<string | undefined>(undefined)

  function getComponentScale(slug: string) {
    return componentScales[slug] ?? 1
  }

  function setComponentScale(slug: string, value: number) {
    setComponentScales((prev) => ({ ...prev, [slug]: value }))
  }

  function waitForThemeApplied(targetTheme: string): Promise<void> {
    return new Promise((resolve) => {
      const check = () => {
        const isDark = document.documentElement.classList.contains("dark")
        if (
          (targetTheme === "dark" && isDark) ||
          (targetTheme === "light" && !isDark)
        ) {
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
        } else {
          requestAnimationFrame(check)
        }
      }
      check()
    })
  }

  async function getDataUrl(slug: string): Promise<string | null> {
    const el = document.getElementById(`preview-${slug}`)
    if (!el) return null

    return toPng(el, {
      width: WIDTH,
      height: HEIGHT,
      pixelRatio,
      style: {
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
      },
    })
  }

  async function downloadOne(slug: string, mode: string, dataUrl: string) {
    const link = document.createElement("a")
    link.download = `${slug}-${mode}.png`
    link.href = dataUrl
    link.click()
  }

  async function saveToPublic(filename: string, dataUrl: string) {
    const res = await fetch("/dev/screenshots/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename, dataUrl }),
    })
    if (!res.ok) throw new Error(`Save failed: ${res.status}`)
  }

  async function captureOne(slug: string) {
    setCapturing(slug)
    originalThemeRef.current = theme

    try {
      if (saveMode === "both") {
        setTheme("dark")
        await waitForThemeApplied("dark")
        const darkUrl = await getDataUrl(slug)
        if (darkUrl) downloadOne(slug, "dark", darkUrl)

        await new Promise((r) => setTimeout(r, 200))

        setTheme("light")
        await waitForThemeApplied("light")
        const lightUrl = await getDataUrl(slug)
        if (lightUrl) downloadOne(slug, "light", lightUrl)

        setTheme(originalThemeRef.current ?? "system")
      } else {
        const url = await getDataUrl(slug)
        if (url) downloadOne(slug, resolvedTheme ?? "dark", url)
      }
    } catch (err) {
      console.error(`Failed to capture ${slug}:`, err)
    }

    setCapturing(null)
  }

  async function captureAll() {
    originalThemeRef.current = theme

    if (saveMode === "both") {
      setCapturing("all (dark)")
      setTheme("dark")
      await waitForThemeApplied("dark")

      for (const slug of slugs) {
        setCapturing(`${slug} (dark)`)
        try {
          const url = await getDataUrl(slug)
          if (url) downloadOne(slug, "dark", url)
        } catch (err) {
          console.error(`Failed: ${slug} dark`, err)
        }
        await new Promise((r) => setTimeout(r, 200))
      }

      setCapturing("all (light)")
      setTheme("light")
      await waitForThemeApplied("light")

      for (const slug of slugs) {
        setCapturing(`${slug} (light)`)
        try {
          const url = await getDataUrl(slug)
          if (url) downloadOne(slug, "light", url)
        } catch (err) {
          console.error(`Failed: ${slug} light`, err)
        }
        await new Promise((r) => setTimeout(r, 200))
      }

      setTheme(originalThemeRef.current ?? "system")
    } else {
      for (const slug of slugs) {
        setCapturing(slug)
        try {
          const url = await getDataUrl(slug)
          if (url) downloadOne(slug, resolvedTheme ?? "dark", url)
        } catch (err) {
          console.error(`Failed: ${slug}`, err)
        }
        await new Promise((r) => setTimeout(r, 200))
      }
    }

    setCapturing(null)
  }

  async function saveAllToPublic() {
    originalThemeRef.current = theme
    let saved = 0

    setCapturing("saving (dark)")
    setTheme("dark")
    await waitForThemeApplied("dark")

    for (const slug of slugs) {
      setCapturing(`saving ${slug} (dark)`)
      try {
        const url = await getDataUrl(slug)
        if (url) {
          await saveToPublic(`${slug}-dark.png`, url)
          saved++
        }
      } catch (err) {
        console.error(`Failed: ${slug} dark`, err)
      }
      await new Promise((r) => setTimeout(r, 100))
    }

    setCapturing("saving (light)")
    setTheme("light")
    await waitForThemeApplied("light")

    for (const slug of slugs) {
      setCapturing(`saving ${slug} (light)`)
      try {
        const url = await getDataUrl(slug)
        if (url) {
          await saveToPublic(`${slug}-light.png`, url)
          saved++
        }
      } catch (err) {
        console.error(`Failed: ${slug} light`, err)
      }
      await new Promise((r) => setTimeout(r, 100))
    }

    setTheme(originalThemeRef.current ?? "system")
    setCapturing(null)
    setStatus(`Saved ${saved} images to public/previews/`)
    setTimeout(() => setStatus(null), 4000)
  }

  const visibleSlugs = selected === "all" ? slugs : [selected]

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-background p-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-xl font-bold tracking-tight">
          Screenshot Previews
        </h1>

        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="rounded-md border border-border bg-card px-3 py-1.5 text-sm"
        >
          <option value="all">All components</option>
          {slugs.map((slug) => (
            <option key={slug} value={slug}>
              {slug}
            </option>
          ))}
        </select>

        <select
          value={pixelRatio}
          onChange={(e) => setPixelRatio(Number(e.target.value))}
          className="rounded-md border border-border bg-card px-3 py-1.5 text-sm"
        >
          <option value={1}>1x export</option>
          <option value={2}>2x export</option>
          <option value={3}>3x export</option>
        </select>

        <select
          value={saveMode}
          onChange={(e) => setSaveMode(e.target.value as SaveMode)}
          className="rounded-md border border-border bg-card px-3 py-1.5 text-sm"
        >
          <option value="both">Light + Dark</option>
          <option value="current">Current theme only</option>
        </select>

        {selected === "all" ? (
          <button
            onClick={captureAll}
            disabled={capturing !== null}
            className="rounded-md bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {capturing ? `Capturing ${capturing}...` : "Download All"}
          </button>
        ) : (
          <button
            onClick={() => captureOne(selected)}
            disabled={capturing !== null}
            className="rounded-md bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {capturing ? "Capturing..." : "Download PNG"}
          </button>
        )}

        <button
          onClick={saveAllToPublic}
          disabled={capturing !== null}
          className="rounded-md border border-dashed border-border px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground disabled:opacity-50"
        >
          {capturing?.startsWith("saving")
            ? capturing
            : "Save All → public/previews/"}
        </button>
      </div>

      {status && (
        <p className="text-xs font-medium text-green-500">{status}</p>
      )}

      <p className="text-xs text-muted-foreground">
        {WIDTH}×{HEIGHT} @ {pixelRatio}x ·{" "}
        {saveMode === "both"
          ? "Saves as {name}-light.png and {name}-dark.png"
          : `Saves as {name}-${resolvedTheme ?? "dark"}.png`}
      </p>

      <div className="flex flex-col gap-8">
        {React.Children.map(children, (child, i) => {
          const slug = slugs[i]
          if (!slug) return null
          const visible = visibleSlugs.includes(slug)
          const compScale = getComponentScale(slug)

          return (
            <div
              key={slug}
              className={visible ? "flex flex-col gap-2" : "hidden"}
            >
              <div className="flex items-center gap-3">
                <p className="text-sm font-medium">{slug}</p>

                <select
                  value={compScale}
                  onChange={(e) =>
                    setComponentScale(slug, Number(e.target.value))
                  }
                  className="rounded border border-border bg-card px-2 py-0.5 text-xs"
                >
                  {COMPONENT_SCALE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => captureOne(slug)}
                  disabled={capturing !== null}
                  className="rounded border border-border px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-50"
                >
                  {capturing === slug ? "..." : "↓ PNG"}
                </button>
              </div>

              <div
                id={`preview-${slug}`}
                style={{ width: WIDTH, height: HEIGHT }}
                className="flex items-start justify-center overflow-hidden rounded-lg border border-border bg-card"
              >
                <div
                  className="flex items-start justify-center"
                  style={{
                    transform: `scale(${compScale})`,
                    transformOrigin: "top center",
                    width: WIDTH / compScale,
                    paddingTop: 40 / compScale,
                    paddingLeft: 40 / compScale,
                    paddingRight: 40 / compScale,
                    boxSizing: "border-box",
                  }}
                >
                  {child}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
