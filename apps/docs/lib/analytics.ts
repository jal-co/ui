/**
 * Client-side analytics helper for OpenPanel.
 *
 * Provides a simple track function that can be called from anywhere.
 * Uses the global OpenPanel instance injected by OpenPanelComponent.
 */

export function track(event: string, properties?: Record<string, unknown>) {
  if (typeof window !== "undefined" && "op" in window) {
    const op = window.op as { track: (event: string, properties?: Record<string, unknown>) => void }
    op.track(event, properties)
  }
}
