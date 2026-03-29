import { writeFileSync, mkdirSync } from "node:fs"
import { join } from "node:path"
import { NextResponse } from "next/server"

const PREVIEWS_DIR = join(process.cwd(), "public/previews")

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Dev only" }, { status: 403 })
  }

  const { filename, dataUrl } = await request.json()

  if (!filename || !dataUrl) {
    return NextResponse.json(
      { error: "Missing filename or dataUrl" },
      { status: 400 }
    )
  }

  const base64 = dataUrl.replace(
    /^data:image\/(png|gif);base64,/,
    ""
  )
  const buffer = Buffer.from(base64, "base64")

  mkdirSync(PREVIEWS_DIR, { recursive: true })
  writeFileSync(join(PREVIEWS_DIR, filename), buffer)

  return NextResponse.json({ ok: true, path: `/previews/${filename}` })
}
