# Accessibility

Accessibility is not optional — it is a baseline requirement. Every component MUST be usable by everyone.

## 1. Semantic HTML First

Always start with the most appropriate HTML element. Semantic elements provide built-in role announcements, keyboard interaction, focus management, and form participation.

```tsx
// ❌ Reinventing the wheel
<div onClick={handleClick} className="button">Click me</div>

// ✅ Semantic element
<button onClick={handleClick}>Click me</button>
```

## 2. Keyboard Navigation

Every interactive element MUST be keyboard accessible.

```tsx
const handleKeyDown = (e: React.KeyboardEvent) => {
  switch (e.key) {
    case "ArrowDown": focusNextItem(); break;
    case "ArrowUp": focusPreviousItem(); break;
    case "Home": focusFirstItem(); break;
    case "End": focusLastItem(); break;
    case "Escape": closeMenu(); break;
    case "Enter": case " ": selectItem(); break;
  }
};
```

### Common Keyboard Maps

| Component | Keys |
|-----------|------|
| Menu/Dropdown | Arrow keys navigate, Enter/Space select, Escape closes |
| Tabs | Arrow Left/Right switch, Home/End jump |
| Modal/Dialog | Escape closes, Tab trapped inside |
| Accordion | Enter/Space toggle, Arrow keys navigate items |
| Combobox | Arrow keys navigate options, Enter selects, Escape clears |

## 3. ARIA Patterns

Use ARIA to enhance, not replace, semantic HTML.

**Five rules of ARIA:**
1. Don't use ARIA if semantic HTML works
2. Don't change native semantics unless necessary
3. All interactive elements MUST be keyboard accessible
4. Don't hide focusable elements from assistive technologies
5. All interactive elements MUST have accessible names

### Roles, States, Properties

| Type | Purpose | Examples |
|------|---------|---------|
| Role | Define what element is | `role="menu"`, `role="dialog"`, `role="alert"` |
| State | Dynamic status | `aria-expanded`, `aria-checked`, `aria-selected`, `aria-invalid` |
| Property | Relationships and info | `aria-controls`, `aria-labelledby`, `aria-describedby`, `aria-required` |
| Live Region | Dynamic announcements | `aria-live="polite"` (waits), `aria-live="assertive"` (interrupts) |

## 4. Focus Management

### Focus Trapping

You MUST trap focus inside modals/dialogs while open. On Tab at last element, cycle to first. On Shift+Tab at first, cycle to last.

### Focus Restoration

You MUST return focus to the trigger element when a component closes.

```tsx
function useRestoreFocus() {
  const previousFocus = useRef<HTMLElement | null>(null);
  const saveFocus = () => { previousFocus.current = document.activeElement as HTMLElement; };
  const restoreFocus = () => { previousFocus.current?.focus(); };
  return { saveFocus, restoreFocus };
}
```

### Focus Visible

Show focus indicators only for keyboard navigation:

```css
*:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

## 5. Color and Contrast

- Normal text (< 18pt): 4.5:1 ratio minimum
- Large text (≥ 18pt or ≥ 14pt bold): 3:1 ratio minimum
- Non-text elements (icons, borders): 3:1 ratio minimum
- You MUST NOT convey information through color alone — always pair with text or icons

```tsx
// ❌ Color only
<span className="text-red-500">Error</span>

// ✅ Color + icon + text
<span className="text-red-500">
  <ErrorIcon aria-hidden="true" />
  <span>Error: Invalid input</span>
</span>
```

## 6. Mobile Accessibility

- Touch targets: minimum 44×44px (iOS) / 48×48dp (Android)
- You MUST NOT disable zooming with `user-scalable=no` or `maximum-scale=1`

## 7. Common Pitfalls

- You MUST NOT use placeholder text as the only label
- Icon buttons MUST have `aria-label` or visually hidden text
- You SHOULD prefer `aria-disabled` over `disabled` so users can still discover and understand the element
- Form inputs MUST have associated `<label>` elements or `aria-label`
- SVGs MUST have `aria-hidden="true"` or a `<title>` element
