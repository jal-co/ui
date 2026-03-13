import { chromium } from "playwright"
import { spawn } from "node:child_process"

const components = [
  "activity-graph",
  "ai-copy-button",
  "api-ref-table",
  "code-block",
  "code-block-command",
  "code-line",
  "cron-schedule",
  "env-table",
  "github-button-group",
  "github-stars-button",
  "json-viewer",
  "log-viewer",
  "request-viewer",
  "stepper",
  "tip-jar",
]

const PORT = 3099
const BASE = `http://localhost:${PORT}/docs/components`
const OUT = "public/screenshots"

function startServer() {
  return new Promise((resolve, reject) => {
    const proc = spawn("npx", ["next", "start", "-p", String(PORT)], {
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env },
    })

    let started = false
    proc.stdout.on("data", (chunk) => {
      const text = chunk.toString()
      if (!started && text.includes("Ready")) {
        started = true
        resolve(proc)
      }
    })
    proc.stderr.on("data", (chunk) => {
      const text = chunk.toString()
      if (!started && text.includes("Ready")) {
        started = true
        resolve(proc)
      }
    })
    proc.on("error", reject)
    setTimeout(() => {
      if (!started) reject(new Error("Server start timeout"))
    }, 15000)
  })
}

async function run() {
  console.log("Starting production server...")
  const server = await startServer()
  console.log(`Server ready on port ${PORT}`)

  try {
    const browser = await chromium.launch({ channel: "chrome" })
    const context = await browser.newContext({
      viewport: { width: 1200, height: 900 },
      colorScheme: "dark",
    })

    for (const name of components) {
      const page = await context.newPage()
      const url = `${BASE}/${name}`
      console.log(`→ ${name}`)

      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 30000 })

        const previewEl = page.locator('[role="tabpanel"]').first()

        if (await previewEl.isVisible()) {
          await previewEl.screenshot({ path: `${OUT}/${name}.png`, type: "png" })
          console.log(`  ✓ ${OUT}/${name}.png`)
        } else {
          const section = page.locator("section").first()
          await section.screenshot({ path: `${OUT}/${name}.png`, type: "png" })
          console.log(`  ✓ ${OUT}/${name}.png (section fallback)`)
        }
      } catch (err) {
        console.log(`  ✗ ${name}: ${err.message.split("\n")[0]}`)
      }

      await page.close()
    }

    await browser.close()
  } finally {
    server.kill()
  }

  console.log(`\nDone — ${components.length} screenshots in ${OUT}/`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
