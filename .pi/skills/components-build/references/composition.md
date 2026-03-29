# Composition

Composition is the foundation of modern UI. Distribute responsibility across cooperating components instead of monolithic god-components with dozens of props.

## The Problem

```tsx
// ❌ Monolithic — hard to customize, tightly coupled
<Accordion data={data} headerClassName="..." contentClassName="..." />
```

Problems: can't customize parts independently, forced DOM structure, global CSS overrides required, prop explosion.

## The Solution: Compound Components

Break into focused sub-components sharing state via Context.

### 1. Root — Container with context provider

```tsx
const AccordionContext = createContext<AccordionProps>({ open: false, setOpen: () => {} });

export type AccordionRootProps = React.ComponentProps<"div"> & {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const Root = ({ children, open, setOpen, ...props }: AccordionRootProps) => (
  <AccordionContext.Provider value={{ open, setOpen }}>
    <div {...props}>{children}</div>
  </AccordionContext.Provider>
);
```

### 2. Item — Wrapper for each item

```tsx
export type AccordionItemProps = React.ComponentProps<"div">;
export const Item = (props: AccordionItemProps) => <div {...props} />;
```

### 3. Trigger — Interactive activator

```tsx
export type AccordionTriggerProps = React.ComponentProps<"button"> & { asChild?: boolean };
export const Trigger = ({ asChild, ...props }: AccordionTriggerProps) => (
  <AccordionContext.Consumer>
    {({ open, setOpen }) => <button onClick={() => setOpen(!open)} {...props} />}
  </AccordionContext.Consumer>
);
```

### 4. Content — Displayed content

```tsx
export type AccordionContentProps = React.ComponentProps<"div"> & { asChild?: boolean };
export const Content = ({ asChild, ...props }: AccordionContentProps) => (
  <AccordionContext.Consumer>
    {({ open }) => <div {...props} />}
  </AccordionContext.Consumer>
);
```

### 5. Consumer usage

```tsx
import * as Accordion from "@/components/ui/accordion";

<Accordion.Root open={false} setOpen={() => {}}>
  {data.map((item) => (
    <Accordion.Item key={item.title}>
      <Accordion.Trigger>{item.title}</Accordion.Trigger>
      <Accordion.Content>{item.content}</Accordion.Content>
    </Accordion.Item>
  ))}
</Accordion.Root>
```

## Naming Conventions

These are the de facto standard names used by shadcn/ui and Radix UI.

| Name | Purpose |
|------|---------|
| `Root` | Main container, manages shared state/context |
| `Trigger` | Element that initiates an action (open, close, toggle) |
| `Content` | Main content being shown/hidden |
| `Header` | Top section with titles or controls |
| `Body` | Main content area |
| `Footer` | Bottom section for actions or metadata |
| `Title` | Primary heading or label |
| `Description` | Supporting text or explanatory content |
| `Item` | Individual item in a list or group |
| `Overlay` | Background layer for modals/dialogs |
| `Portal` | Container for rendering outside DOM hierarchy |

## Rules

- You MUST break monolithic components into focused sub-components
- Each sub-component SHOULD wrap a single HTML element
- You MUST share state between sub-components via Context
- You MUST use established naming conventions (Root, Trigger, Content, etc.)
- You MUST NOT create prop-explosion APIs (`headerClassName`, `contentClassName`, etc.)
