import { after, NextResponse } from "next/server"
import { createGeoProxy } from "@usenotra/geo/next"

const geo = process.env.NOTRA_GEO_TOKEN
  ? createGeoProxy({
      token: process.env.NOTRA_GEO_TOKEN,
      endpoint: "https://ingest.usenotra.com",
    })
  : null

export function proxy(request: Request) {
  if (geo) {
    after(() => geo(request).catch(() => {}))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
