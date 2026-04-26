# TextBox

A labelled text input styled with the Windows 98 aesthetic. Renders a `<label>` and `<input>` together in either an inline or stacked layout.

## Import

```tsx
import { TextBox } from 'windows-98-ui';
```

## Usage

```tsx
<Win98Provider>
  <TextBox id="username" label="Username" type="text" />
</Win98Provider>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `id` | `string` | Yes | — | The `id` applied to the `<input>` and linked to the `<label>` |
| `label` | `string` | Yes | — | Text displayed in the associated `<label>` |
| `type` | `string` | Yes | — | The `type` attribute of the `<input>` (e.g. `"text"`, `"password"`, `"email"`) |
| `stacked` | `boolean` | No | `false` | When `true`, renders label above the input (`field-row-stacked`) instead of inline |
| `className` | `string` | No | — | Additional CSS classes on the `<input>` |
| `as` | `ElementType` | No | `"input"` | The HTML element or component to render as |
| `ref` | `Ref<HTMLInputElement>` | No | — | Forwarded ref |

All standard HTML `<input>` attributes (e.g. `value`, `onChange`, `placeholder`, `disabled`, `readOnly`, `maxLength`) are also accepted.

## Examples

### Inline layout (default)

```tsx
<TextBox id="name" label="Name:" type="text" />
```

### Stacked layout

```tsx
<TextBox id="name" label="Name" type="text" stacked />
```

### Password input

```tsx
<TextBox id="password" label="Password:" type="password" />
```

### Controlled input

```tsx
const [value, setValue] = useState('');

<TextBox
  id="search"
  label="Search:"
  type="text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### With placeholder

```tsx
<TextBox id="email" label="Email:" type="email" placeholder="user@example.com" />
```

### Disabled

```tsx
<TextBox id="readonly" label="System path:" type="text" value="C:\Windows" disabled />
```

### Stacked form group

```tsx
<Win98Provider>
  <TextBox id="first" label="First name" type="text" stacked />
  <TextBox id="last" label="Last name" type="text" stacked />
  <TextBox id="email" label="Email address" type="email" stacked />
</Win98Provider>
```

## Notes

- The `stacked` prop switches the wrapping class from `field-row` to `field-row-stacked`, causing the label to appear above the input.
- The `id` prop is required to correctly link the `<label>` to the `<input>`.
