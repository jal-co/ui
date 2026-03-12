declare global {
  interface Window {
    umami?: {
      track: (event: string, properties?: Record<string, unknown>) => void
    }
  }
}

export function track(event: string, properties?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.umami) {
    window.umami.track(event, properties)
  }
}
