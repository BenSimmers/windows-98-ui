# TitleBar

The title bar of a Windows 98-style window, including the title text and optional minimize, maximize, and close buttons.

## Import

```tsx
import { TitleBar } from 'windows-98-ui';
```

## Usage

```tsx
<Win98Provider>
  <TitleBar title="My Window" close />
</Win98Provider>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | No | — | Text displayed in the title bar |
| `inactive` | `boolean` | No | `false` | Renders the title bar in the "inactive" (grey) state |
| `minimize` | `boolean` | No | `false` | Shows the minimize button |
| `maximize` | `boolean` | No | `false` | Shows the maximize button |
| `close` | `boolean` | No | `false` | Shows the close button |
| `onMinimize` | `() => void` | No | — | Callback fired when the minimize button is clicked |
| `onMaximize` | `() => void` | No | — | Callback fired when the maximize button is clicked |
| `onClose` | `() => void` | No | — | Callback fired when the close button is clicked |
| `className` | `string` | No | — | Additional CSS classes |
| `as` | `ElementType` | No | `"div"` | The HTML element or component to render as |
| `ref` | `Ref<HTMLDivElement>` | No | — | Forwarded ref |

## Examples

### Title only

```tsx
<TitleBar title="Notepad" />
```

### With all controls

```tsx
<TitleBar
  title="My Document - Notepad"
  minimize
  maximize
  close
  onMinimize={() => console.log('minimized')}
  onMaximize={() => console.log('maximized')}
  onClose={() => console.log('closed')}
/>
```

### Inactive (unfocused) window

```tsx
<TitleBar title="Background Window" inactive />
```

### Close button only

```tsx
const [open, setOpen] = useState(true);

{open && (
  <TitleBar title="Dialog" close onClose={() => setOpen(false)} />
)}
```

### Inside a full Window

```tsx
<Window width="300">
  <TitleBar title="My App" minimize maximize close />
  <WindowBody>
    <p>Hello, world!</p>
  </WindowBody>
</Window>
```

## Notes

- The three control buttons (`minimize`, `maximize`, `close`) only appear when their corresponding boolean prop is `true`.
- Button labels use `aria-label` attributes (`"Minimize"`, `"Maximize"`, `"Close"`) which 98.css uses to render the correct icons.
- The `inactive` prop adds the `inactive` class, rendering the title bar in a greyed-out style matching Windows 98's unfocused window appearance.
- `TitleBar` is most commonly used as a child of `Window` or `Desktop`.
