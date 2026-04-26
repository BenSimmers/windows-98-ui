# Dropdown

A `<select>` element styled with the Windows 98 aesthetic.

## Import

```tsx
import { Dropdown } from 'windows-98-ui';
```

## Usage

```tsx
<Win98Provider>
  <Dropdown
    options={[
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' },
    ]}
  />
</Win98Provider>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `options` | `{ value: string; label: string }[]` | Yes | — | Array of options to render |
| `className` | `string` | No | — | Additional CSS classes |
| `as` | `ElementType` | No | `"select"` | The HTML element or component to render as |
| `ref` | `Ref<HTMLSelectElement>` | No | — | Forwarded ref |

All standard HTML `<select>` attributes (e.g. `onChange`, `value`, `defaultValue`, `disabled`) are also accepted.

## Examples

### Uncontrolled

```tsx
<Dropdown
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ]}
  defaultValue="1"
/>
```

### Controlled

```tsx
const [value, setValue] = useState('1');

<Dropdown
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]}
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### Disabled

```tsx
<Dropdown options={[{ value: 'a', label: 'A' }]} disabled />
```

## Notes

- Each option must have a unique `value`.
- Pair with a `<label>` by wrapping in a `field-row` `<div>` if you need an accompanying label, or use `TextBox` which handles this natively.
