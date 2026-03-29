/**
 * jalco-ui
 * Stepper
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Numbered step-by-step layout with vertical connector lines. Designed for
 * installation guides, tutorials, onboarding flows, and multi-step
 * documentation. Server component — no client JS required.
 *
 * Exports:
 * - Stepper — root container for a sequence of steps
 * - StepperItem — individual step with number, title, description, and content
 *
 * Props (Stepper):
 * - children: StepperItem elements
 * - orientation?: "vertical" | "horizontal" (default "vertical")
 * - className?: additional CSS classes
 *
 * Props (StepperItem):
 * - title: step heading
 * - description?: optional subtext below the title
 * - step?: override step number (auto-increments by default)
 * - status?: "default" | "active" | "completed" (default "default")
 * - icon?: custom React node to replace the step number
 * - children?: content rendered below the step header
 * - className?: additional CSS classes
 *
 * Notes:
 * - Server component — no "use client" required
 * - Composable: nest any content (code blocks, images, forms) inside StepperItem
 * - No external dependencies
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Types

type StepStatus = "default" | "active" | "completed"

interface StepperProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** StepperItem elements. */
  children: React.ReactNode
  /** Layout direction. Defaults to "vertical". */
  orientation?: "vertical" | "horizontal"
}

interface StepperItemProps extends Omit<React.ComponentProps<"div">, "title" | "children"> {
  /** Step heading text. */
  title: string
  /** Optional description below the title. */
  description?: string
  /** Override the auto-incremented step number. */
  step?: number
  /** Visual status of this step. Defaults to "default". */
  status?: StepStatus
  /** Custom icon to replace the step number circle. */
  icon?: React.ReactNode
  /** Content rendered below the step header (code blocks, text, etc.). */
  children?: React.ReactNode
}

// Check icon (inline SVG to avoid external dependencies)

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-3.5", className)}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

// StepperItem

function StepperItem({
  title,
  description,
  step,
  status = "default",
  icon,
  children,
  className,
  ...props
}: StepperItemProps) {
  const stepNumber = step ?? 1

  return (
    <div
      data-slot="stepper-item"
      data-status={status}
      className={cn("group/step relative", className)}
      {...props}
    >
      {/* ---- Vertical layout ---- */}
      <div className="flex gap-3">
        {/* Number circle + connector line */}
        <div className="flex shrink-0 flex-col items-center self-stretch">
          {/* Circle */}
          <div
            className={cn(
              "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
              status === "completed" &&
                "border-primary bg-primary text-primary-foreground",
              status === "active" &&
                "border-primary bg-primary/10 text-primary",
              status === "default" &&
                "border-border bg-background text-muted-foreground"
            )}
          >
            {icon ? (
              icon
            ) : status === "completed" ? (
              <CheckIcon />
            ) : (
              <span className="text-xs">{stepNumber}</span>
            )}
          </div>

          {/* Connector line — hidden on the last item via CSS */}
          <div
            className={cn(
              "w-px min-h-4 grow",
              status === "completed"
                ? "bg-primary"
                : "bg-border dark:bg-muted-foreground/25",
              "group-last/step:hidden"
            )}
          />
        </div>

        {/* Content */}
        <div
          className="flex min-w-0 flex-col gap-1 pb-6 pt-1 group-last/step:pb-0"
        >
          <div className="flex flex-col gap-0.5">
            <h3
              className="text-sm font-semibold leading-tight text-foreground"
            >
              {title}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {children && <div className="mt-2">{children}</div>}
        </div>
      </div>
    </div>
  )
}

// Stepper (vertical)

function VerticalStepper({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  // Auto-number steps by injecting `step` prop
  const items = React.Children.toArray(children).filter(React.isValidElement)

  return (
    <div
      data-slot="stepper"
      data-orientation="vertical"
      className={cn("flex flex-col", className)}
    >
      {items.map((child, index) => {
        if (!React.isValidElement<StepperItemProps>(child)) return child
        return React.cloneElement(child, {
          step: child.props.step ?? index + 1,
          key: child.key ?? index,
        })
      })}
    </div>
  )
}

// Stepper (horizontal)

function HorizontalStepper({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const items = React.Children.toArray(children).filter(React.isValidElement)

  return (
    <div
      data-slot="stepper"
      data-orientation="horizontal"
      className={cn("flex flex-col gap-4", className)}
    >
      {/* Step indicators row */}
      <div className="flex items-center">
        {items.map((child, index) => {
          if (!React.isValidElement<StepperItemProps>(child)) return null
          const { status = "default", icon, step: stepProp } = child.props
          const stepNumber = stepProp ?? index + 1
          const isLast = index === items.length - 1

          return (
            <React.Fragment key={child.key ?? index}>
              <div className="flex flex-col items-center gap-1.5">
                {/* Circle */}
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                    status === "completed" &&
                      "border-primary bg-primary text-primary-foreground",
                    status === "active" &&
                      "border-primary bg-primary/10 text-primary",
                    status === "default" &&
                      "border-border bg-background text-muted-foreground"
                  )}
                >
                  {icon ? (
                    icon
                  ) : status === "completed" ? (
                    <CheckIcon />
                  ) : (
                    <span className="text-xs">{stepNumber}</span>
                  )}
                </div>
                {/* Title below circle */}
                <span
                  className={cn(
                    "max-w-[8rem] text-center text-xs font-medium",
                    status === "default"
                      ? "text-muted-foreground"
                      : "text-foreground"
                  )}
                >
                  {child.props.title}
                </span>
              </div>
              {/* Connector line */}
              {!isLast && (
                <div
                  className={cn(
                    "mb-5 h-px flex-1",
                    status === "completed" ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>

      {/* Active/visible step content */}
      {items.map((child, index) => {
        if (!React.isValidElement<StepperItemProps>(child)) return null
        const { status = "default", description, children: stepChildren } =
          child.props
        if (status !== "active") return null

        return (
          <div key={child.key ?? index} className="flex flex-col gap-1.5">
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
            {stepChildren && <div>{stepChildren}</div>}
          </div>
        )
      })}
    </div>
  )
}

// Stepper (root)

function Stepper({
  children,
  orientation = "vertical",
  className,
}: StepperProps) {
  if (orientation === "horizontal") {
    return (
      <HorizontalStepper className={className}>{children}</HorizontalStepper>
    )
  }
  return (
    <VerticalStepper className={className}>{children}</VerticalStepper>
  )
}

// Exports

export {
  Stepper,
  StepperItem,
  type StepperProps,
  type StepperItemProps,
  type StepStatus,
}
