# Polymorphic Components

All components in `windows-98-ui` support the `as` prop, which lets you change the underlying HTML element (or React component) that gets rendered — while keeping all the Windows 98 styling and the component's own props.

## The `as` prop

By default each component renders a sensible HTML element:

| Component | Default element |
|-----------|----------------|
| `Button` | `<button>` |
| `CheckBox` | `<input>` |
| `Dropdown` | `<select>` |
| `TextBox` | `<input>` |
| `Slider` | `<input>` |
| `TitleBar` | `<div>` |
| `Window` | `<div>` |
| `WindowBody` | `<div>` |
| `Desktop` | `<div>` |
| `TreeView` | `<ul>` |

Pass `as` to replace the element:

```tsx
// Renders an <a> tag styled as a Win98 button
<Button as="a" label="Open link" href="https://example.com" />
```

## How it works

When you change the `as` prop, the component automatically accepts the HTML attributes of the new element. TypeScript will enforce this — you get autocomplete and type errors for the element you chose.

```tsx
// ✅ Valid — <a> accepts href
<Button as="a" label="Visit" href="/about" />

// ✅ Valid — <button> accepts type
<Button label="Submit" type="submit" />

// ❌ Type error — <a> does not have a `disabled` boolean attribute
<Button as="a" label="Visit" disabled />
```

## Using with React Router

A common use case is rendering a `Button` as a React Router `Link`:

```tsx
import { Link } from 'react-router-dom';
import { Button } from 'windows-98-ui';

<Button as={Link} label="Go to settings" to="/settings" />
```

## Using with Next.js Link

```tsx
import Link from 'next/link';
import { Button } from 'windows-98-ui';

<Button as={Link} label="Home" href="/" />
```

## Forwarded refs

All components forward their `ref` to the underlying element. When you change `as`, the ref type changes accordingly:

```tsx
const ref = useRef<HTMLAnchorElement>(null);

<Button as="a" ref={ref} label="Link button" href="/page" />
```

## TypeScript type

The polymorphic prop types are defined in `src/types.ts`:

```ts
type PolymorphicComponentPropsWithRef<C extends React.ElementType, Props = object>
```

This merges the component's own props with the HTML attributes of the chosen element, with the component's props taking precedence on conflicts.
