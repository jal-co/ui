# Types

Proper typing is essential for flexible, customizable, type-safe component interfaces.

## Single Element Wrapping

Each exported component SHOULD wrap a single HTML or JSX element.

```tsx
// ❌ Multi-element — can't customize parts, prop drilling required
const Card = ({ title, description, footer, ...props }) => (
  <div {...props}>
    <div className="card-header"><h2>{title}</h2><p>{description}</p></div>
    <div className="card-footer">{footer}</div>
  </div>
);

// ✅ Each layer is its own component
export const CardRoot = (props: React.ComponentProps<"div">) => <div {...props} />;
export const CardHeader = (props: React.ComponentProps<"div">) => <div {...props} />;
export const CardTitle = (props: React.ComponentProps<"h2">) => <h2 {...props} />;
export const CardFooter = (props: React.ComponentProps<"div">) => <div {...props} />;
```

Benefits: maximum customization, no prop drilling, semantic HTML, better a11y, simpler mental model.

## Extending HTML Attributes

Every component MUST extend the native HTML attributes of the element it wraps.

```tsx
export type CardRootProps = React.ComponentProps<"div"> & {
  variant?: "default" | "outlined";
};

export const CardRoot = ({ variant = "default", ...props }: CardRootProps) => (
  <div {...props} />
);
```

### Common HTML Attribute Types

```tsx
React.ComponentProps<"div">      // div elements
React.ComponentProps<"button">   // button elements
React.ComponentProps<"input">    // input elements
React.ComponentProps<"a">        // anchor elements
React.ComponentProps<"form">     // form elements
```

## Exporting Types

You MUST always export prop types. Name them `<ComponentName>Props`.

```tsx
// Enables: extracting prop types, extending components, type-safe forwarding
import type { CardRootProps } from "@/components/ui/card";
type variant = CardRootProps["variant"];
```

## Best Practices

### 1. Always Spread Props Last

```tsx
// ✅ User props override defaults
<div className="default-class" {...props} />

// ❌ Defaults override user props
<div {...props} className="default-class" />
```

### 2. Avoid Prop Name Conflicts

```tsx
// ❌ Conflicts with HTML title attribute
type CardProps = React.ComponentProps<"div"> & { title: string };

// ✅ Use a different name
type CardProps = React.ComponentProps<"div"> & { heading: string };
```

### 3. Document Custom Props with JSDoc

```tsx
export type DialogProps = React.ComponentProps<"div"> & {
  /** Whether the dialog is currently open */
  open: boolean;
  /** Callback when the dialog requests to be closed */
  onOpenChange: (open: boolean) => void;
  /** Whether to render the dialog in a portal */
  modal?: boolean;
};
```
