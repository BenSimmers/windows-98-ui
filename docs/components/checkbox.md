# CheckBox

A labelled checkbox input styled with the Windows 98 aesthetic.

## Import

```tsx
import { CheckBox } from 'windows-98-ui';
```

## Usage

```tsx
<Win98Provider>
  <CheckBox id="agree" label="I agree to the terms" />
</Win98Provider>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `id` | `string` | Yes | — | The `id` applied to the `<input>` and linked to the `<label>` |
| `label` | `string` | No | — | Text displayed next to the checkbox |
| `checked` | `boolean` | No | — | Controlled checked state |
| `disabled` | `boolean` | No | `false` | Disables the checkbox |
| `as` | `ElementType` | No | `"input"` | The HTML element or component to render as |
| `ref` | `Ref<HTMLInputElement>` | No | — | Forwarded ref |

All standard HTML `<input type="checkbox">` attributes (e.g. `onChange`, `defaultChecked`) are also accepted.

## Examples

### Uncontrolled checkbox

```tsx
<CheckBox id="newsletter" label="Subscribe to newsletter" />
```

### Controlled checkbox

```tsx
const [checked, setChecked] = useState(false);

<CheckBox
  id="agree"
  label="I agree to the terms"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>
```

### Disabled

```tsx
<CheckBox id="locked" label="This option is locked" disabled />
```

### Pre-checked and disabled

```tsx
<CheckBox id="required" label="Required setting" checked disabled />
```

## Notes

- The `id` prop is required to correctly associate the `<label>` with the `<input>` via `htmlFor`.
- The checkbox and label are wrapped in a `<div class="field-row">` which provides the correct 98.css spacing.
- For controlled usage, always provide both `checked` and `onChange` together.
