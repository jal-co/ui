"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import html2canvas from "html2canvas-pro"

const WIDTH = 1280
const HEIGHT = 640
const PADDING = 40

type CaptureStatus = { slug: string; mode: string } | null
type FilterMode = "all" | "missing" | "exists" | "animated"

interface ScreenshotClientProps {
  slugs: string[]
  animatedSlugs: string[]
  existingFiles: string[]
  children: React.ReactNode
}

function computeAutoScale(el: HTMLElement): number {
  const content = el.querySelector("[data-preview-content]") as HTMLElement
  if (!content) return 1

  content.style.transform = "none"
  const rect = content.getBoundingClientRect()
  content.style.transform = ""

  if (rect.width === 0 || rect.height === 0) return 1

  const availW = WIDTH - PADDING * 2
  const availH = HEIGHT - PADDING * 2

  const scaleX = availW / rect.width
  const scaleY = availH / rect.height
  const fit = Math.min(scaleX, scaleY)

  const clamped = Math.min(Math.max(fit, 0.3), 3)
  return Math.round(clamped * 100) / 100
}

function autoScaleAll(
  slugs: string[],
  setScales: React.Dispatch<React.SetStateAction<Record<string, number>>>
) {
  const newScales: Record<string, number> = {}
  for (const slug of slugs) {
    const el = document.getElementById(`preview-${slug}`)
    if (el) newScales[slug] = computeAutoScale(el)
  }
  setScales((prev) => ({ ...prev, ...newScales }))
}

export function ScreenshotClient({
  slugs,
  animatedSlugs,
  existingFiles,
  children,
}: ScreenshotClientProps) {
  const { theme, setTheme } = useTheme()
  const [selected, setSelected] = React.useState<string>("all")
  const [filter, setFilter] = React.useState<FilterMode>("all")
  const [capturing, setCapturing] = React.useState<CaptureStatus>(null)
  const [pixelRatio, setPixelRatio] = React.useState(2)
  const [componentScales, setComponentScales] = React.useState<
    Record<string, number>
  >({})
  const [status, setStatus] = React.useState<string | null>(null)
  const [progress, setProgress] = React.useState<{
    current: number
    total: number
  } | null>(null)
  const [autoScaled, setAutoScaled] = React.useState(false)
  const [savedFiles, setSavedFiles] = React.useState<Set<string>>(
    () => new Set(existingFiles)
  )

  const animatedSet = React.useMemo(
    () => new Set(animatedSlugs),
    [animatedSlugs]
  )
  const originalThemeRef = React.useRef<string | undefined>(undefined)

  const slugHasScreenshot = React.useCallback(
    (slug: string) =>
      savedFiles.has(`${slug}-dark.png`) &&
      savedFiles.has(`${slug}-light.png`),
    [savedFiles]
  )

  const slugHasVideo = React.useCallback(
    (slug: string) =>
      savedFiles.has(`${slug}-dark.webm`) &&
      savedFiles.has(`${slug}-light.webm`),
    [savedFiles]
  )

  const missingSlugs = React.useMemo(
    () => slugs.filter((s) => !slugHasScreenshot(s)),
    [slugs, slugHasScreenshot]
  )

  React.useEffect(() => {
    if (autoScaled) return
    const timer = setTimeout(() => {
      autoScaleAll(slugs, setComponentScales)
      setAutoScaled(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [slugs, autoScaled])

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

  async function captureFrame(slug: string): Promise<string | null> {
    const el = document.getElementById(`preview-${slug}`)
    if (!el) return null

    const canvas = await html2canvas(el, {
      width: WIDTH,
      height: HEIGHT,
      scale: pixelRatio,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
    })

    return canvas.toDataURL("image/png")
  }

  async function saveToPublic(filename: string, dataUrl: string) {
    const res = await fetch("/dev/screenshots/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename, dataUrl }),
    })
    if (!res.ok) throw new Error(`Save failed: ${res.status}`)
    setSavedFiles((prev) => new Set([...prev, filename]))
  }

  async function switchThemeAndScale(mode: string) {
    setTheme(mode)
    await waitForThemeApplied(mode)
    await new Promise((r) => setTimeout(r, 300))
    autoScaleAll(slugs, setComponentScales)
    await new Promise((r) => setTimeout(r, 300))
  }

  async function savePngsForTheme(
    targetSlugs: string[],
    mode: string
  ): Promise<number> {
    let saved = 0
    for (const slug of targetSlugs) {
      setCapturing({ slug, mode })
      try {
        const url = await captureFrame(slug)
        if (url) {
          await saveToPublic(`${slug}-${mode}.png`, url)
          saved++
        }
      } catch (err) {
        console.error(
          `Failed: ${slug} ${mode} png`,
          err instanceof Error ? err.message : err
        )
      }
      setProgress((p) => p && { ...p, current: p.current + 1 })
      await new Promise((r) => setTimeout(r, 100))
    }
    return saved
  }

  async function saveAllToPublic() {
    originalThemeRef.current = theme
    setProgress({ current: 0, total: slugs.length * 2 })

    await switchThemeAndScale("dark")
    let saved = await savePngsForTheme(slugs, "dark")

    await switchThemeAndScale("light")
    saved += await savePngsForTheme(slugs, "light")

    setTheme(originalThemeRef.current ?? "system")
    setCapturing(null)
    setProgress(null)
    setStatus(`Saved ${saved} files to public/previews/`)
    setTimeout(() => setStatus(null), 6000)
  }

  async function saveMissing() {
    if (missingSlugs.length === 0) {
      setStatus("All screenshots up to date")
      setTimeout(() => setStatus(null), 3000)
      return
    }

    originalThemeRef.current = theme
    setProgress({ current: 0, total: missingSlugs.length * 2 })

    await switchThemeAndScale("dark")
    let saved = await savePngsForTheme(missingSlugs, "dark")

    await switchThemeAndScale("light")
    saved += await savePngsForTheme(missingSlugs, "light")

    setTheme(originalThemeRef.current ?? "system")
    setCapturing(null)
    setProgress(null)
    setStatus(`Saved ${saved} missing files to public/previews/`)
    setTimeout(() => setStatus(null), 6000)
  }

  async function saveOne(slug: string) {
    originalThemeRef.current = theme

    await switchThemeAndScale("dark")
    let saved = await savePngsForTheme([slug], "dark")

    await switchThemeAndScale("light")
    saved += await savePngsForTheme([slug], "light")

    setTheme(originalThemeRef.current ?? "system")
    setCapturing(null)
    setStatus(`Saved ${saved} files for ${slug}`)
    setTimeout(() => setStatus(null), 4000)
  }

  const filteredSlugs = React.useMemo(() => {
    switch (filter) {
      case "missing":
        return missingSlugs
      case "exists":
        return slugs.filter((s) => slugHasScreenshot(s))
      case "animated":
        return animatedSlugs
      default:
        return slugs
    }
  }, [filter, slugs, animatedSlugs, missingSlugs, slugHasScreenshot])

  const visibleSlugs = selected === "all" ? filteredSlugs : [selected]

  const captureLabel = capturing
    ? `${capturing.slug} (${capturing.mode})`
    : null

  const SCALE_OPTIONS = [
    { value: 0.3, label: "30%" },
    { value: 0.4, label: "40%" },
    { value: 0.5, label: "50%" },
    { value: 0.6, label: "60%" },
    { value: 0.75, label: "75%" },
    { value: 0.85, label: "85%" },
    { value: 1, label: "100%" },
    { value: 1.25, label: "125%" },
    { value: 1.5, label: "150%" },
    { value: 1.75, label: "175%" },
    { value: 2, label: "200%" },
    { value: 2.5, label: "250%" },
    { value: 3, label: "300%" },
  ]

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-background p-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight">
            Screenshot Previews
          </h1>

          {missingSlugs.length > 0 ? (
            <span className="inline-flex items-center rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
              {missingSlugs.length} missing
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
              All captured
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="rounded-md border border-border bg-card px-3 py-1.5 text-sm"
          >
            <option value="all">
              {filter === "all"
                ? `All components (${slugs.length})`
                : filter === "missing"
                  ? `Missing (${missingSlugs.length})`
                  : filter === "animated"
                    ? `Animated (${animatedSlugs.length})`
                    : `With screenshots (${slugs.length - missingSlugs.length})`}
            </option>
            {filteredSlugs.map((slug) => (
              <option key={slug} value={slug}>
                {slug}
                {animatedSet.has(slug) ? " 🎞️" : ""}
                {!slugHasScreenshot(slug) ? " ⚠" : ""}
              </option>
            ))}
          </select>

          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value as FilterMode)
              setSelected("all")
            }}
            className="rounded-md border border-border bg-card px-3 py-1.5 text-sm"
          >
            <option value="all">Show: All ({slugs.length})</option>
            <option value="missing">Show: Missing ({missingSlugs.length})</option>
            <option value="exists">
              Show: Has screenshots ({slugs.length - missingSlugs.length})
            </option>
            <option value="animated">Show: Animated ({animatedSlugs.length})</option>
          </select>

          <select
            value={pixelRatio}
            onChange={(e) => setPixelRatio(Number(e.target.value))}
            className="rounded-md border border-border bg-card px-3 py-1.5 text-sm"
          >
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={3}>3x</option>
          </select>

          <button
            onClick={() => autoScaleAll(slugs, setComponentScales)}
            className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            Auto-scale all
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {missingSlugs.length > 0 && selected === "all" && (
            <button
              onClick={saveMissing}
              disabled={capturing !== null}
              className="rounded-md bg-amber-600 px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {captureLabel
                ? `Saving ${captureLabel}...`
                : `Save ${missingSlugs.length} missing → public/previews/`}
            </button>
          )}

          {selected === "all" ? (
            <button
              onClick={saveAllToPublic}
              disabled={capturing !== null}
              className="rounded-md bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {captureLabel && missingSlugs.length === 0
                ? `Saving ${captureLabel}...`
                : "Save All → public/previews/"}
            </button>
          ) : (
            <button
              onClick={() => saveOne(selected)}
              disabled={capturing !== null}
              className="rounded-md bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {captureLabel
                ? `Saving ${captureLabel}...`
                : `Save → public/previews/${selected}-*.png`}
            </button>
          )}

          {status && (
            <span className="text-xs font-medium text-green-500">
              ✓ {status}
            </span>
          )}
        </div>

        {progress && (
          <div className="flex items-center gap-3">
            <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-foreground transition-all"
                style={{
                  width: `${(progress.current / progress.total) * 100}%`,
                }}
              />
            </div>
            <span className="text-xs tabular-nums text-muted-foreground">
              {progress.current}/{progress.total}
            </span>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          {WIDTH}×{HEIGHT} @ {pixelRatio}x · Auto-scales to fit ·{" "}
          {animatedSlugs.length > 0 &&
            `${animatedSlugs.length} animated (video coming soon) · `}
          Saves both light &amp; dark modes
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {React.Children.map(children, (child, i) => {
          const slug = slugs[i]
          if (!slug) return null
          const visible = visibleSlugs.includes(slug)
          const compScale = getComponentScale(slug)
          const isAnim = animatedSet.has(slug)

          return (
            <div
              key={slug}
              className={visible ? "flex flex-col gap-2" : "hidden"}
            >
              <div className="flex items-center gap-3">
                <p className="text-sm font-medium flex items-center gap-2">
                  {slugHasScreenshot(slug) ? (
                    <span className="size-2 rounded-full bg-emerald-500 shrink-0" title="Screenshots exist" />
                  ) : (
                    <span className="size-2 rounded-full bg-amber-500 shrink-0" title="Missing screenshots" />
                  )}
                  {slug}
                  {isAnim && (
                    <span className="text-xs text-muted-foreground">
                      🎞️ animated
                      {!slugHasVideo(slug) && (
                        <span className="ml-1 text-amber-500">no video</span>
                      )}
                    </span>
                  )}
                </p>

                <select
                  value={compScale}
                  onChange={(e) =>
                    setComponentScale(slug, Number(e.target.value))
                  }
                  className="rounded border border-border bg-card px-2 py-0.5 text-xs"
                >
                  {SCALE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => {
                    const el = document.getElementById(`preview-${slug}`)
                    if (el) setComponentScale(slug, computeAutoScale(el))
                  }}
                  className="rounded border border-border px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  Auto
                </button>

                <button
                  onClick={() => saveOne(slug)}
                  disabled={capturing !== null}
                  className="rounded border border-border px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-50"
                >
                  {capturing?.slug === slug
                    ? `${capturing.mode}...`
                    : "Save"}
                </button>
              </div>

              <div
                id={`preview-${slug}`}
                style={{ width: WIDTH, height: HEIGHT }}
                className="flex items-center justify-center overflow-hidden rounded-lg border border-border bg-card"
              >
                <div
                  data-preview-content
                  className="flex items-center justify-center"
                  style={{
                    transform: `scale(${compScale})`,
                    transformOrigin: "center",
                    width: WIDTH / compScale,
                    paddingLeft: PADDING / compScale,
                    paddingRight: PADDING / compScale,
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
