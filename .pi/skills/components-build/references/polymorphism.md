# Polymorphism — The `as` Prop

The `as` prop allows changing the rendered HTML element while preserving component functionality.

## Basic Pattern

```tsx
<Button as="a" href="/home">Go Home</Button>
<Button as="button" type="submit">Submit</Button>
<Text as="h1" variant="heading">Title</Text>
<Text as="p" variant="body">Paragraph</Text>
<Container as="nav">Navigation</Container>
<Container as="main">Content</Container>
```

## Implementation

```tsx
type PolymorphicProps<E extends React.ElementType, Props = {}> = Props &
  Omit<React.ComponentPropsWithoutRef<E>, keyof Props> & {
    as?: E;
  };

function Component<E extends React.ElementType = "div">({
  as,
  ...props
}: PolymorphicProps<E>) {
  const Element = as || "div";
  return <Element {...props} />;
}
```

Props are inferred from the element type:

```tsx
<Component as="a" href="/home">Home</Component>   // ✅ href valid on <a>
<Component as="div" href="/home">Home</Component>  // ❌ TS error: href not valid on div
```

## When to Use `as` vs `asChild`

| Scenario | Use |
|----------|-----|
| Switching between HTML elements (div → section) | `as` |
| Simple typography/layout components | `as` |
| Want to avoid @radix-ui/react-slot dependency | `as` |
| Composing with another React component | `asChild` |
| Need automatic prop merging + ref forwarding | `asChild` |
| Interactive triggers in Radix/shadcn ecosystem | `asChild` |

See `references/as-child.md` for the asChild pattern.

## Best Practices

### Default to semantic elements

```tsx
// ✅ Meaningful defaults
function Article({ as: Element = "article", ...props }) {}
function Navigation({ as: Element = "nav", ...props }) {}

// ❌ Too generic
function Component({ as: Element = "div", ...props }) {}
```

### Constrain valid elements

```tsx
interface BoxProps {
  /** @default 'div' */
  as?: "div" | "section" | "article" | "aside" | "main" | "header" | "footer";
}
```

### Handle keyboard for non-button elements

```tsx
function Interactive({ as: Element = "button", onClick, ...props }) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (Element !== "button" && (e.key === "Enter" || e.key === " ")) {
      onClick?.(e as any);
    }
  };

  return (
    <Element
      role={Element !== "button" && Element !== "a" ? "button" : undefined}
      tabIndex={Element !== "button" && Element !== "a" ? 0 : undefined}
      onClick={onClick}
      onKeyDown={Element !== "button" ? handleKeyDown : undefined}
      {...props}
    />
  );
}
```

## Common Pitfalls

- **Invalid HTML nesting:** `<button>` inside `<button>`, `<div>` inside `<p>`
- **Missing ARIA:** `<Box as="nav">` without `aria-label`
- **Type safety loss:** Using `any` instead of generics
- **Performance:** Creating inline components causes re-renders — keep component references stable

## Rules

- You SHOULD default to the most semantically meaningful element
- You MUST constrain valid element types when the component has semantic meaning
- You MUST add `role`, `tabIndex`, and keyboard handlers when rendering non-interactive elements as interactive
- You MUST NOT use overly permissive types (`any`) — use generics for full type safety
- You SHOULD prefer `asChild` over `as` for interactive components in the Radix/shadcn ecosystem
