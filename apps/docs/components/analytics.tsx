"use client"

import { useEffect } from "react"
import { op } from "@/lib/openpanel"

export function Analytics() {
  useEffect(() => {
    // OpenPanel auto-tracks screen views, outgoing links, and data-track attributes
    // Accessing op ensures the client is initialized on mount
    void op
  }, [])

  return null
}
