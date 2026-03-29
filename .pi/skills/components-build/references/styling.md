# Styling

Modern components use Tailwind CSS with intelligent class merging and declarative variant APIs.

## The `cn` Utility

You MUST combine `clsx` (conditional logic) and `tailwind-merge` (conflict resolution).

```tsx
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Without `tailwind-merge`, passing `className="bg-blue-500"` to a component with `bg-red-500` produces unpredictable results. With it, the last class wins.

```tsx
twMerge("px-4 py-2", "px-8");           // → "py-2 px-8"
twMerge("text-sm", "text-lg");           // → "text-lg"
twMerge("hover:bg-red-500", "hover:bg-blue-500"); // → "hover:bg-blue-500"
```

## Class Ordering

You MUST apply classes in this order:

1. **Base styles** — always applied
2. **Variant styles** — based on props
3. **Conditional styles** — based on state
4. **User overrides** — className prop (always last)

```tsx
className={cn(
  "rounded-lg border bg-white",     // 1. Base
  variant && variantStyles,          // 2. Variants
  isActive && "ring-2 ring-blue-500", // 3. Conditionals
  className                          // 4. User overrides
)}
```

## Class Variance Authority (CVA)

You MUST define CVA variants outside the component to avoid recreation on every render.

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border bg-background hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 rounded-md",
        lg: "h-10 px-6 rounded-md",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

Usage in a component:

```tsx
function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

## Conditional Classes with clsx

```tsx
// Basic conditional
clsx("base", isActive && "active");

// Object syntax
clsx("base", { active: isActive, disabled: isDisabled });

// Mixed
clsx("base", ["array-item"], { "object-conditional": true }, isActive && "conditional");
```

## Design Tokens (Semantic CSS Variables)

You SHOULD separate theme from usage. Use semantic variable names that describe purpose, not appearance.

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
}

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
}
```

## Performance

1. Define CVA variants outside components — avoids re-creation per render
2. Memoize expensive class computations with `useMemo`
3. Use CSS variables for dynamic values instead of generating Tailwind classes dynamically

```tsx
// ✅ CSS variable for dynamic color
<div className="bg-[var(--color)]" style={{ '--color': dynamicColor } as React.CSSProperties} />

// ❌ Dynamic class generation (not JIT-safe)
<div className={`bg-[${dynamicColor}]`} />
```

## Extracted Patterns

If a class combination repeats across components, extract it:

```tsx
export const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
export const disabled = "disabled:pointer-events-none disabled:opacity-50";
```

## Rules

- You MUST use the `cn` utility for all className merging
- You MUST place base → variant → conditional → user override in that order
- You MUST define CVA variants outside component bodies
- You MUST NOT hardcode styles that can't be overridden via className
- You SHOULD use CSS variables for theming and dynamic values
- You SHOULD extract repeated class patterns into shared constants
