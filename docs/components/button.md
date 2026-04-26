# Button

A standard push button styled with the Windows 98 aesthetic.

## Import

```tsx
import { Button } from 'windows-98-ui';
```

## Usage

```tsx
<Win98Provider>
  <Button label="OK" />
</Win98Provider>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string` | Yes | — | Text displayed inside the button |
| `disabled` | `boolean` | No | `false` | Disables the button |
| `className` | `string` | No | — | Additional CSS classes |
| `as` | `ElementType` | No | `"button"` | The HTML element or component to render as |
| `ref` | `Ref<HTMLButtonElement>` | No | — | Forwarded ref |

All standard HTML `<button>` attributes (e.g. `onClick`, `type`, `aria-*`) are also accepted.

## Examples

### Default button

```tsx
<Button label="OK" />
```

### Disabled button

```tsx
<Button label="Submit" disabled />
```

### With click handler

```tsx
<Button label="Save" onClick={() => console.log('saved')} />
```

### Submit button

```tsx
<Button label="Submit" type="submit" />
```

### Rendered as an anchor

```tsx
<Button as="a" label="Go to docs" href="/docs" />
```

## Notes

- The button renders inside a standard `<button>` element by default and inherits the 98.css button styles automatically when placed inside a `Win98Provider`.
- Use `type="submit"` inside a `<form>` to trigger form submission.
