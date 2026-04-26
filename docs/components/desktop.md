# Desktop

A prefab (pre-composed) component that combines `TitleBar`, `Window`, and `WindowBody` into a single component. Useful for quickly scaffolding a Windows 98-style desktop application layout.

## Import

```tsx
import { Desktop } from 'windows-98-ui';
```

## Usage

```tsx
<Win98Provider>
  <Desktop titleBarProps={{ title: 'My App', close: true }}>
    <p>Content goes here.</p>
  </Desktop>
</Win98Provider>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `titleBarProps` | [`TitleBarProps`](./title-bar.md) | No | — | Props forwarded to the internal `TitleBar` component |
| `windowProps` | [`WindowProps`](./window.md) | No | — | Props forwarded to the internal `Window` component |
| `windowBodyProps` | `WindowBodyProps` | No | — | Props forwarded to the internal `WindowBody` component |
| `className` | `string` | No | — | Additional CSS classes on the outer `desktop` div |
| `children` | `ReactNode` | No | — | Content rendered inside the `WindowBody` |
| `as` | `ElementType` | No | `"div"` | The HTML element or component to render as |
| `ref` | `Ref<HTMLDivElement>` | No | — | Forwarded ref |

## Examples

### Basic desktop

```tsx
<Desktop titleBarProps={{ title: 'Untitled - Notepad' }}>
  <p>Start typing...</p>
</Desktop>
```

### With window size and all title bar controls

```tsx
<Desktop
  titleBarProps={{
    title: 'My Application',
    minimize: true,
    maximize: true,
    close: true,
    onClose: () => setOpen(false),
  }}
  windowProps={{ width: '480', height: '320' }}
>
  <TextBox id="input" label="Enter value:" type="text" stacked />
  <Button label="OK" />
</Desktop>
```

### Inactive window

```tsx
<Desktop
  titleBarProps={{ title: 'Background App', inactive: true }}
  windowProps={{ width: '300' }}
>
  <p>This window is not focused.</p>
</Desktop>
```

## Composition

`Desktop` is a convenience wrapper. If you need finer control over the layout (e.g. multiple windows, custom nesting), compose `TitleBar`, `Window`, and `WindowBody` directly:

```tsx
<Window width="400">
  <TitleBar title="Window One" close />
  <WindowBody>
    <Button label="Action" />
  </WindowBody>
</Window>
```

## Notes

- The outer element renders with both `desktop` and any `className` you pass.
- `titleBarProps`, `windowProps`, and `windowBodyProps` are spread directly onto their respective components, so all props those components accept are supported here too.
