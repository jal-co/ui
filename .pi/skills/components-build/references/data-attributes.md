# Data Attributes

Data attributes expose component state and structure to consumers, enabling flexible styling without prop explosion.

## data-state — Styling State

### The Problem

```tsx
// ❌ Prop explosion for state-based styling
<Dialog
  openClassName="bg-black"
  closedClassName="bg-white"
  classes={{ open: "opacity-100", closed: "opacity-0" }}
/>
```

This couples internal state to the styling API, creates prop explosion, and prevents styling state combinations.

### The Solution

Expose state via `data-*` attributes. Let consumers style with CSS selectors.

```tsx
const Dialog = ({ className, ...props }: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      data-state={isOpen ? "open" : "closed"}
      className={cn("transition-all", className)}
      {...props}
    />
  );
};

// Consumer styles from outside
<Dialog className="data-[state=open]:opacity-100 data-[state=closed]:opacity-0" />
```

### Common State Patterns

```tsx
<Accordion data-state={isOpen ? "open" : "closed"} />
<Tab data-state={isSelected ? "active" : "inactive"} />
<Button data-disabled={isDisabled} disabled={isDisabled} />
<Button data-loading={isLoading} />
<Slider data-orientation="horizontal" />
<Tooltip data-side="top" />
```

### Tailwind Styling

```tsx
<Dialog className={cn(
  "rounded-lg border p-4",
  "data-[state=open]:animate-in data-[state=open]:fade-in",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out",
  "data-[state=open][data-side=top]:slide-in-from-top-2",
)} />
```

### Radix UI Data Attributes

Radix automatically applies these:

| Attribute | Values |
|-----------|--------|
| `data-state` | open/closed, active/inactive, on/off |
| `data-side` | top/right/bottom/left |
| `data-align` | start/center/end |
| `data-orientation` | horizontal/vertical |
| `data-disabled` | present when disabled |
| `data-placeholder` | present when showing placeholder |

## data-slot — Component Identification

Identifies component types within a composition. Allows parent components to target and style specific children without relying on fragile class names or element selectors.

### The Problem

```tsx
// ❌ Fragile — breaks if implementation changes
<form className="[&_input]:rounded-lg [&_button]:mt-4" />

// ❌ Fragile — breaks if classes change
<form className="[&_.text-input]:rounded-lg" />
```

### The Solution

```tsx
function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-6",
        "has-[>[data-slot=checkbox-group]]:gap-3",
        "has-[>[data-slot=radio-group]]:gap-3",
        className,
      )}
      {...props}
    />
  );
}
```

### Parent-Aware Styling with `has-[]`

```tsx
<form
  data-slot="form"
  className={cn(
    "space-y-4",
    "has-[>[data-slot=form-section]]:space-y-6",
    "has-[[data-slot=submit-button][data-loading=true]]:opacity-50",
  )}
/>
```

### Descendant Targeting with `[&_]`

```tsx
<div
  data-slot="card"
  className={cn(
    "rounded-lg border p-4",
    "[&_[data-slot=card-header]]:mb-4",
    "[&_[data-slot=card-title]]:text-lg [&_[data-slot=card-title]]:font-semibold",
    "[&_[data-slot=card-footer]]:mt-4 [&_[data-slot=card-footer]]:border-t",
  )}
/>
```

### Global CSS with data-slot

```css
[data-slot="form"] [data-slot="button"] { @apply w-full sm:w-auto; }
[data-slot="dialog"][data-state="open"] [data-slot="dialog-content"] { @apply animate-in fade-in; }
```

### Naming Conventions

- You MUST use kebab-case: `data-slot="form-field"`
- You MUST be specific: `data-slot="submit-button"` not `data-slot="button"`
- You MUST name by purpose, not appearance: `data-slot="user-avatar"` not `data-slot="rounded-image"`
- You MUST NOT use camelCase: not `data-slot="formField"`

## When to Use Which

| Need | Mechanism |
|------|-----------|
| Visual states (open/closed, loading) | `data-state` |
| Layout states (orientation, side) | `data-*` attributes |
| Component identity for targeting | `data-slot` |
| Variant selection (primary, sm/md/lg) | Props + CVA |
| Behavioral config | Props |
| Event handlers | Props |

## Combined Example

```tsx
const Button = ({ variant = "primary", size = "md", loading, disabled, className, ...props }: ButtonProps) => (
  <button
    data-slot="button"
    data-loading={loading}
    data-disabled={disabled}
    className={cn(buttonVariants({ variant, size }), className)}
    disabled={disabled}
    {...props}
  />
);
```

## Rules

- You MUST use `data-state` for visual states, not className props
- You MUST use `data-slot` on every exported sub-component for stable identification
- You MUST use kebab-case for data-slot values
- You MUST NOT create `openClassName` / `closedClassName` style prop APIs
- You SHOULD use Tailwind's `data-[state=open]:` syntax for state-based styling
- You SHOULD use `has-[]` for parent-aware styling based on child data-slots
