"use client"

import { OpenPanelComponent } from "@openpanel/nextjs"

export function Analytics() {
  return (
    <OpenPanelComponent
      clientId={process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID ?? ""}
      trackScreenViews
      trackOutgoingLinks
      trackAttributes
    />
  )
}
