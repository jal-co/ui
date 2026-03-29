# asChild — The Slot Pattern

The `asChild` prop replaces default markup with a custom element while preserving the component's functionality, behaviors, and event handlers. Popularized by Radix UI and adopted by shadcn/ui.

## The Problem

Without `asChild`, wrapping creates nested elements:

```tsx
<Dialog.Trigger>
  <button>Open</button>
</Dialog.Trigger>
// Renders: <button data-state="closed"><button>Open</button></button>
```

## The Solution

```tsx
<Dialog.Trigger asChild>
  <button>Open</button>
</Dialog.Trigger>
// Renders: <button data-state="closed">Open</button>
```

The component's functionality (data attributes, event handlers, ARIA) is composed onto your child element.

## Implementation

Uses Radix UI's Slot component:

```bash
pnpm add @radix-ui/react-slot
```

```tsx
import { Slot } from "@radix-ui/react-slot";

function Button({ asChild, className, variant, size, ...props }: ButtonProps & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

The Slot component:
1. Clones the child element
2. Merges props from parent and child
3. Composes event handlers (both fire)
4. Forwards refs correctly

## Key Benefits

### Clean DOM — no wrapper hell

```tsx
// Without asChild: nested wrappers
<TooltipTrigger><button><span>Hover me</span></button></TooltipTrigger>

// With asChild: clean structure
<TooltipTrigger asChild><button>Hover me</button></TooltipTrigger>
```

### Design system integration

```tsx
<DropdownMenu.Trigger asChild>
  <Button variant="outline" size="icon">
    <MoreVertical className="h-4 w-4" />
  </Button>
</DropdownMenu.Trigger>
```

### Behavior composition

```tsx
<Dialog.Trigger asChild>
  <Tooltip.Trigger asChild>
    <button>Open dialog (with tooltip)</button>
  </Tooltip.Trigger>
</Dialog.Trigger>
```

### Semantic navigation

```tsx
<NavigationMenu.Link asChild>
  <Link href="/products">Products</Link>
</NavigationMenu.Link>
```

## `as` vs `asChild` Comparison

| Feature | `as` prop | `asChild` + Slot |
|---------|-----------|-----------------|
| API | `<Button as="a">` | `<Button asChild><a /></Button>` |
| Element type | Specified in prop | Inferred from child |
| Component composition | Limited | Full support |
| Prop merging | Basic spread | Intelligent merging |
| Ref forwarding | Manual | Built-in |
| Event handlers | May conflict | Composed correctly |
| Dependency | None | `@radix-ui/react-slot` |

## Common Pitfalls

### Child must spread props

```tsx
// ❌ Won't receive trigger behavior — props are dropped
const BadButton = ({ children }) => <button>{children}</button>;

// ✅ Properly receives all merged props
const GoodButton = ({ children, ...props }) => <button {...props}>{children}</button>;
```

### Single child only

```tsx
// ❌ Error — asChild expects exactly one child
<Trigger asChild>
  <button>One</button>
  <button>Two</button>
</Trigger>
```

### No fragments

```tsx
// ❌ Fragment is not a valid element
<Trigger asChild><>Button</></Trigger>

// ✅ Actual element
<Trigger asChild><button>Button</button></Trigger>
```

## Rules

- You MUST use `asChild` + Slot for interactive triggers that need to compose with consumer elements
- You MUST ensure child components spread `...props` to their root element
- You MUST pass exactly one child element when using `asChild`
- You MUST NOT pass fragments as children to `asChild` components
- You MUST maintain accessibility when changing element types (keep proper roles and ARIA)
- You SHOULD document `asChild` support in component prop types with JSDoc
