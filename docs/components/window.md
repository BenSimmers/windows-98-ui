# Window

The outer container of a Windows 98-style window. Renders a `<div class="window">` with optional fixed dimensions.

## Import

```tsx
import { Window } from 'windows-98-ui';
```

## Usage

```tsx
<Win98Provider>
  <Window width="320">
    <p>Window content</p>
  </Window>
</Win98Provider>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `width` | `string` | No | — | Fixed width in pixels (e.g. `"320"` renders `width: 320px`) |
| `height` | `string` | No | — | Fixed height in pixels |
| `className` | `string` | No | — | Additional CSS classes |
| `children` | `ReactNode` | No | — | Content rendered inside the window |
| `as` | `ElementType` | No | `"div"` | The HTML element or component to render as |
| `ref` | `Ref<HTMLDivElement>` | No | — | Forwarded ref |

All standard HTML `<div>` attributes are also accepted.

## Examples

### Basic window

```tsx
<Window>
  <p>Hello, world!</p>
</Window>
```

### Fixed dimensions

```tsx
<Window width="400" height="300">
  <p>Fixed size window</p>
</Window>
```

### Full window with TitleBar and WindowBody

```tsx
<Window width="350">
  <TitleBar title="Notepad" minimize maximize close />
  <WindowBody>
    <p>This is the window content.</p>
  </WindowBody>
</Window>
```

## Notes

- `Window` only provides the outer chrome. Content should be placed inside a `WindowBody` to get correct padding and styling.
- `width` and `height` are passed as strings without the `px` unit — the component appends `px` automatically.
- If neither `width` nor `height` is provided, the window will size to its content.
