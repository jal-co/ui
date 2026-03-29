# State

Professional components support both controlled and uncontrolled usage.

## Uncontrolled

Component manages its own state internally. This is the default, simplest usage.

```tsx
export const Stepper = () => {
  const [value, setValue] = useState(0);
  return (
    <div>
      <p>{value}</p>
      <button onClick={() => setValue(value + 1)}>Increment</button>
    </div>
  );
};
```

## Controlled

Parent component owns the state. Component receives value and setter as props.

```tsx
type StepperProps = {
  value: number;
  setValue: (value: number) => void;
};

export const Stepper = ({ value, setValue }: StepperProps) => (
  <div>
    <p>{value}</p>
    <button onClick={() => setValue(value + 1)}>Increment</button>
  </div>
);
```

## Merging Both with useControllableState

The best components support both modes seamlessly. Use `useControllableState` from Radix UI.

```bash
pnpm add @radix-ui/react-use-controllable-state
```

The hook accepts three parameters and returns `[value, setValue]`:

```tsx
import { useControllableState } from "@radix-ui/react-use-controllable-state";

type StepperProps = {
  value?: number;              // Controlled value
  defaultValue?: number;       // Default for uncontrolled mode
  onValueChange?: (value: number) => void;  // Change callback
};

export const Stepper = ({ value: controlledValue, defaultValue, onValueChange }: StepperProps) => {
  const [value, setValue] = useControllableState({
    prop: controlledValue,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  return (
    <div>
      <p>{value}</p>
      <button onClick={() => setValue((value ?? 0) + 1)}>Increment</button>
    </div>
  );
};
```

### Consumer usage

```tsx
// Uncontrolled — component manages its own state
<Stepper defaultValue={0} />

// Controlled — parent owns state
const [count, setCount] = useState(0);
<Stepper value={count} onValueChange={setCount} />

// Uncontrolled with change listener
<Stepper defaultValue={0} onValueChange={(v) => console.log(v)} />
```

## Standard Prop Naming

Follow Radix conventions:

| Prop | Purpose |
|------|---------|
| `value` | Controlled value |
| `defaultValue` | Initial value for uncontrolled mode |
| `onValueChange` | Callback when value changes |
| `open` | Controlled open state |
| `defaultOpen` | Initial open state for uncontrolled mode |
| `onOpenChange` | Callback when open state changes |

## Rules

- You SHOULD support both controlled and uncontrolled modes for stateful components
- You MUST use `useControllableState` (or equivalent) to merge both paths
- You MUST follow the `value` / `defaultValue` / `onValueChange` naming convention
- You MUST NOT break uncontrolled usage when adding controlled support
