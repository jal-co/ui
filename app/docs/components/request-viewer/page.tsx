import type { Metadata } from "next"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { CodeLine } from "@/registry/code-line/code-line"
import {
  RequestViewer,
  type NetworkRequest,
} from "@/registry/request-viewer/request-viewer"

export const metadata: Metadata = {
  title: "Request Viewer",
  description:
    "Network request inspector showing headers, response body, and timing waterfall.",
}

const sourceFiles = ["registry/request-viewer/request-viewer.tsx"]

const apiRequest: NetworkRequest = {
  method: "GET",
  url: "https://api.github.com/repos/vercel/next.js",
  status: 200,
  statusText: "OK",
  duration: 247,
  contentType: "application/json; charset=utf-8",
  requestHeaders: [
    { name: "Accept", value: "application/vnd.github.v3+json" },
    { name: "Authorization", value: "Bearer ghp_****••••••••" },
    { name: "User-Agent", value: "jalco-dashboard/1.0" },
    { name: "Cache-Control", value: "no-cache" },
  ],
  responseHeaders: [
    { name: "Content-Type", value: "application/json; charset=utf-8" },
    { name: "X-RateLimit-Limit", value: "5000" },
    { name: "X-RateLimit-Remaining", value: "4987" },
    {
      name: "X-GitHub-Request-Id",
      value: "C4F2:3A1E:1B4F2A8:2D5E1C0:65A1B2C3",
    },
    { name: "ETag", value: '"abc123def456"' },
    { name: "Cache-Control", value: "private, max-age=60, s-maxage=60" },
  ],
  responseBody: JSON.stringify(
    {
      id: 70107786,
      name: "next.js",
      full_name: "vercel/next.js",
      stargazers_count: 128450,
      language: "JavaScript",
      default_branch: "canary",
      topics: ["nextjs", "react", "framework", "ssr", "web"],
    },
    null,
    2
  ),
  timing: [
    { label: "DNS Lookup", duration: 12 },
    { label: "TCP Connect", duration: 24 },
    { label: "TLS Handshake", duration: 38 },
    { label: "Request Sent", duration: 1.2 },
    { label: "Waiting (TTFB)", duration: 142 },
    { label: "Content Download", duration: 29.8 },
  ],
}

const postRequest: NetworkRequest = {
  method: "POST",
  url: "https://api.example.com/v1/users",
  status: 201,
  statusText: "Created",
  duration: 312,
  contentType: "application/json",
  requestHeaders: [
    { name: "Content-Type", value: "application/json" },
    { name: "Authorization", value: "Bearer eyJhbGci••••" },
    { name: "X-Request-ID", value: "req_8f3a2b1c" },
  ],
  responseHeaders: [
    { name: "Content-Type", value: "application/json" },
    { name: "Location", value: "/v1/users/usr_7k2m9p" },
    { name: "X-Request-ID", value: "req_8f3a2b1c" },
  ],
  responseBody: JSON.stringify(
    {
      id: "usr_7k2m9p",
      email: "jamie@example.com",
      name: "Jamie Chen",
      created_at: "2026-03-10T23:42:00Z",
    },
    null,
    2
  ),
  timing: [
    { label: "DNS Lookup", duration: 4 },
    { label: "TCP Connect", duration: 18 },
    { label: "TLS Handshake", duration: 32 },
    { label: "Request Sent", duration: 2.4 },
    { label: "Waiting (TTFB)", duration: 218 },
    { label: "Content Download", duration: 37.6 },
  ],
}

const errorRequest: NetworkRequest = {
  method: "DELETE",
  url: "https://api.example.com/v1/users/usr_expired",
  status: 404,
  statusText: "Not Found",
  duration: 89,
  contentType: "application/json",
  requestHeaders: [
    { name: "Authorization", value: "Bearer eyJhbGci••••" },
    { name: "Accept", value: "application/json" },
  ],
  responseHeaders: [
    { name: "Content-Type", value: "application/json" },
    { name: "X-Error-Code", value: "USER_NOT_FOUND" },
  ],
  responseBody: JSON.stringify(
    {
      error: "not_found",
      message: "User usr_expired does not exist or has been deleted.",
    },
    null,
    2
  ),
  timing: [
    { label: "DNS Lookup", duration: 3 },
    { label: "TCP Connect", duration: 15 },
    { label: "TLS Handshake", duration: 28 },
    { label: "Request Sent", duration: 0.8 },
    { label: "Waiting (TTFB)", duration: 38 },
    { label: "Content Download", duration: 4.2 },
  ],
}

const timingOnlyRequest: NetworkRequest = {
  method: "GET",
  url: "https://cdn.example.com/assets/bundle.js",
  status: 200,
  statusText: "OK",
  duration: 1240,
  timing: [
    { label: "DNS Lookup", duration: 45 },
    { label: "TCP Connect", duration: 62 },
    { label: "TLS Handshake", duration: 85 },
    { label: "Request Sent", duration: 0.5 },
    { label: "Waiting (TTFB)", duration: 320 },
    { label: "Content Download", duration: 727.5 },
  ],
}

export default async function RequestViewerPage() {
  return (
    <ComponentDocsPage
      title="Request Viewer"
      description="Network request inspector showing headers, response body, and timing waterfall. Designed for dev dashboards, API documentation, and debugging tools."
      registryName="request-viewer"
      sourceFiles={sourceFiles}
      requirements={
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">
              No network activity.
            </strong>{" "}
            This component does not call{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              fetch
            </code>
            , open sockets, or execute any API calls. It renders the data you
            pass in — nothing more.
          </li>
        </ul>
      }
      preview={<RequestViewer request={apiRequest} />}
      usage={
        <>
          <CodeLine
            code={`import { RequestViewer } from "@/components/request-viewer"`}
          />
          <CodeLine code={`<RequestViewer request={networkRequest} />`} />
          <p className="text-sm text-muted-foreground">
            <strong>Display-only.</strong> This component never makes network
            requests or executes API calls. You supply a static{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              NetworkRequest
            </code>{" "}
            object and it renders the data — nothing is fetched, resolved, or
            executed at runtime.
          </p>
        </>
      }
    >
      {/* How to populate */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">
          How to populate
        </h2>
        <p className="text-sm text-muted-foreground">
          Since RequestViewer is display-only, you need to supply the data
          yourself. Here are three common approaches:
        </p>
        <ul className="list-disc space-y-3 pl-6 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">
              Hardcode a static object.
            </strong>{" "}
            Define a{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              NetworkRequest
            </code>{" "}
            inline or in a separate file. Good for API docs, example pages, and
            design system demos where the data doesn&apos;t change.
          </li>
          <li>
            <strong className="text-foreground">
              Load from a JSON file.
            </strong>{" "}
            Save request data as{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              .json
            </code>{" "}
            and import it. You can export requests from browser DevTools
            (Network tab → right-click → Copy as HAR) and transform the HAR
            entry into a{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              NetworkRequest
            </code>{" "}
            shape, or just save the object directly.
          </li>
          <li>
            <strong className="text-foreground">
              Capture from your own fetch calls.
            </strong>{" "}
            Wrap your{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              fetch
            </code>{" "}
            calls to record timing and headers into a{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              NetworkRequest
            </code>{" "}
            object, then pass it to the viewer. The component never triggers the
            request — your code does, separately, and hands the result over.
          </li>
        </ul>
        <CodeLine
          code={`import requestData from "./fixtures/github-api.json"`}
        />
        <CodeLine code={`<RequestViewer request={requestData} />`} />
      </section>

      {/* Examples */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">HTTP methods</h3>
          <VariantGrid
            registryName="request-viewer"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "GET — Success",
                code: `<RequestViewer request={getRequest} />`,
                preview: <RequestViewer request={apiRequest} />,
              },
              {
                label: "POST — Created",
                code: `<RequestViewer request={postRequest} />`,
                preview: <RequestViewer request={postRequest} />,
              },
              {
                label: "DELETE — Not Found",
                code: `<RequestViewer request={deleteRequest} />`,
                preview: <RequestViewer request={errorRequest} />,
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Default tab</h3>
          <VariantGrid
            registryName="request-viewer"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Start on Response",
                code: `<RequestViewer request={request} defaultTab="response" />`,
                preview: (
                  <RequestViewer request={apiRequest} defaultTab="response" />
                ),
              },
              {
                label: "Start on Timing",
                code: `<RequestViewer request={request} defaultTab="timing" />`,
                preview: (
                  <RequestViewer
                    request={timingOnlyRequest}
                    defaultTab="timing"
                  />
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">API Reference</h2>

        <ApiRefTable
          title="RequestViewer"
          props={[
            {
              name: "request",
              type: "NetworkRequest",
              required: true,
              description: "The network request data to display.",
              fullType:
                "{ method: string; url: string; status: number; statusText?: string; requestHeaders?: HeaderEntry[]; responseHeaders?: HeaderEntry[]; responseBody?: string; contentType?: string; timing?: TimingEntry[]; duration?: number }",
            },
            {
              name: "defaultTab",
              type: '"headers" | "response" | "timing"',
              description: 'Initial active tab. Defaults to "headers".',
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes on the root element.",
            },
          ]}
        />

        <ApiRefTable
          title="HeaderEntry"
          props={[
            {
              name: "name",
              type: "string",
              required: true,
              description: "Header name (e.g. Content-Type).",
            },
            {
              name: "value",
              type: "string",
              required: true,
              description: "Header value.",
            },
          ]}
        />

        <ApiRefTable
          title="TimingEntry"
          props={[
            {
              name: "label",
              type: "string",
              required: true,
              description:
                'Phase label (e.g. "DNS Lookup", "TLS Handshake").',
            },
            {
              name: "duration",
              type: "number",
              required: true,
              description: "Duration in milliseconds.",
            },
            {
              name: "colorClass",
              type: "string",
              description:
                "Custom Tailwind background color class for the bar. Falls back to the built-in palette.",
            },
          ]}
        />
      </section>

      {/* Notes */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Notes</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Client component.</strong> Uses{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              &quot;use client&quot;
            </code>{" "}
            for tab switching state only.
          </li>
          <li>
            <strong className="text-foreground">JSON formatting.</strong>{" "}
            Response bodies that look like JSON are automatically
            pretty-printed.
          </li>
          <li>
            <strong className="text-foreground">Status colors.</strong> Status
            badges are color-coded: 2xx green, 3xx blue, 4xx amber, 5xx red.
          </li>
          <li>
            <strong className="text-foreground">Icon library.</strong>{" "}
            Uses{" "}
            <a
              href="https://lucide.dev"
              className="underline hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lucide
            </a>{" "}
            icons by default. Since this is copy-paste code, you can swap the
            imports if your project uses a different icon library.
          </li>
        </ul>
      </section>
    </ComponentDocsPage>
  )
}
