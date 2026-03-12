/**
 * jalco-ui
 * Sample log generators for LogViewer demos.
 */

import type { LogEntry, LogLevel } from "@/registry/log-viewer/log-viewer"

/**
 * Generates a realistic set of sample log entries for demos.
 * Uses a seeded random for deterministic output in server components.
 */
export function generateSampleLogs(
  count: number,
  seed: number = 42
): LogEntry[] {
  let s = seed

  function rand() {
    s = (s * 16807 + 0) % 2147483647
    return s / 2147483647
  }

  const levels: LogLevel[] = ["info", "info", "info", "warn", "error", "debug", "debug", "verbose"]

  const messages: Record<LogLevel, string[]> = {
    info: [
      "Server listening on port 3000",
      "Connected to database",
      "Request completed in 42ms",
      "Cache hit for key: user:1234",
      "Worker process started (pid: 5821)",
      "Health check passed",
      "Session created for user admin@example.com",
      "Static assets compiled in 1.2s",
      "Deployment ready at https://app.example.com",
      "Middleware chain resolved (3 handlers)",
      "WebSocket connection established",
      "Background job enqueued: email.send",
      "API rate limit reset for client 192.168.1.1",
      "TLS certificate valid for 89 days",
    ],
    warn: [
      "Slow query detected: SELECT * FROM orders (1200ms)",
      "Memory usage at 85% — consider scaling",
      "Deprecated API endpoint called: /api/v1/users",
      "Rate limit approaching for client 10.0.0.3",
      "Disk usage above 90% on /var/log",
      "Connection pool nearing capacity (48/50)",
      "Retry attempt 2/3 for upstream service",
      "Request timeout extended to 30s for /api/export",
    ],
    error: [
      "ECONNREFUSED: Could not connect to Redis at 127.0.0.1:6379",
      "Unhandled rejection: TypeError: Cannot read property 'id' of undefined",
      "POST /api/webhook returned 500 — payload validation failed",
      "Out of memory: heap limit reached (1.5GB)",
      "SSL handshake failed for upstream api.provider.com",
      "Database migration 0042_add_index failed: relation already exists",
    ],
    debug: [
      "Parsing request body (content-length: 4096)",
      "Route matched: GET /api/users/:id → UserController.show",
      "Cache miss for key: session:abc123",
      "Query plan: Index Scan on users_pkey",
      "Outgoing request: GET https://api.github.com/repos",
      "JWT token expires in 3540s",
      "Response serialized in 0.3ms",
    ],
    verbose: [
      "Entering middleware: cors",
      "Exiting middleware: cors (0.1ms)",
      "Socket keepalive ping",
      "GC pause: 2.1ms",
      "Event loop lag: 0.4ms",
    ],
  }

  const baseDate = new Date("2026-03-11T14:30:00.000Z")
  const entries: LogEntry[] = []

  for (let i = 0; i < count; i++) {
    const level = levels[Math.floor(rand() * levels.length)]
    const pool = messages[level]
    const message = pool[Math.floor(rand() * pool.length)]
    const offsetMs = i * Math.floor(rand() * 2000 + 100)
    const ts = new Date(baseDate.getTime() + offsetMs)

    entries.push({
      level,
      message,
      timestamp: ts.toISOString(),
    })
  }

  return entries
}

/**
 * Realistic deploy log — a fixed sequence showing a typical CI/CD pipeline.
 */
export const DEPLOY_LOG: LogEntry[] = [
  { level: "info", message: "Build triggered by push to main (abc1234)", timestamp: "2026-03-11T14:00:00.000Z" },
  { level: "debug", message: "Cloning repository…", timestamp: "2026-03-11T14:00:00.500Z" },
  { level: "debug", message: "Installing dependencies (pnpm install)…", timestamp: "2026-03-11T14:00:02.100Z" },
  { level: "info", message: "Dependencies installed in 8.3s", timestamp: "2026-03-11T14:00:10.400Z" },
  { level: "debug", message: "Running linter…", timestamp: "2026-03-11T14:00:10.500Z" },
  { level: "info", message: "Lint passed (0 warnings, 0 errors)", timestamp: "2026-03-11T14:00:14.200Z" },
  { level: "debug", message: "Running type checker…", timestamp: "2026-03-11T14:00:14.300Z" },
  { level: "warn", message: "Type warning: unused variable 'tempData' in utils.ts:42", timestamp: "2026-03-11T14:00:18.100Z" },
  { level: "info", message: "Type check completed with 1 warning", timestamp: "2026-03-11T14:00:18.200Z" },
  { level: "debug", message: "Building application (next build)…", timestamp: "2026-03-11T14:00:18.300Z" },
  { level: "info", message: "Compiled 142 modules in 12.4s", timestamp: "2026-03-11T14:00:30.700Z" },
  { level: "info", message: "Generated 23 static pages", timestamp: "2026-03-11T14:00:31.200Z" },
  { level: "info", message: "Bundle size: 245 KB (gzipped)", timestamp: "2026-03-11T14:00:31.500Z" },
  { level: "debug", message: "Uploading build artifacts…", timestamp: "2026-03-11T14:00:31.600Z" },
  { level: "info", message: "Artifacts uploaded (3.2 MB)", timestamp: "2026-03-11T14:00:35.100Z" },
  { level: "debug", message: "Provisioning edge functions…", timestamp: "2026-03-11T14:00:35.200Z" },
  { level: "info", message: "3 edge functions deployed to 12 regions", timestamp: "2026-03-11T14:00:38.800Z" },
  { level: "debug", message: "Running health checks…", timestamp: "2026-03-11T14:00:39.000Z" },
  { level: "info", message: "Health check passed (all regions responding)", timestamp: "2026-03-11T14:00:41.500Z" },
  { level: "info", message: "DNS propagation complete", timestamp: "2026-03-11T14:00:43.000Z" },
  { level: "info", message: "✓ Deployment successful — https://app.example.com", timestamp: "2026-03-11T14:00:43.200Z" },
]
