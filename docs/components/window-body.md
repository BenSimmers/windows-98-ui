# WindowBody

The content area of a Windows 98-style window. Renders a `<div class="window-body">` which provides the correct internal padding defined by 98.css.

## Import

```tsx
import { WindowBody } from 'windows-98-ui';
```

## Usage

```tsx
<Win98Provider>
  <Window width="300">
    <TitleBar title="My Window" />
    <WindowBody>
      <p>Content goes here.</p>
    </WindowBody>
  </Window>
</Win98Provider>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | — | Additional CSS classes |
| `children` | `ReactNode` | No | — | Content rendered inside the window body |
| `as` | `ElementType` | No | `"div"` | The HTML element or component to render as |
| `ref` | `Ref<HTMLDivElement>` | No | — | Forwarded ref |

All standard HTML `<div>` attributes are also accepted.

## Examples

### Basic usage

```tsx
<WindowBody>
  <p>Hello from the window body.</p>
</WindowBody>
```

### With form controls

```tsx
<WindowBody>
  <TextBox id="name" label="Name:" type="text" stacked />
  <TextBox id="email" label="Email:" type="email" stacked />
  <Button label="OK" />
</WindowBody>
```

### Inside a full Window

```tsx
<Window width="320">
  <TitleBar title="Settings" close onClose={() => setOpen(false)} />
  <WindowBody>
    <CheckBox id="startup" label="Run at startup" />
    <CheckBox id="sounds" label="Enable sounds" checked />
    <Button label="Apply" />
  </WindowBody>
</Window>
```

## Notes

- Always place `WindowBody` directly inside a `Window` component, after `TitleBar`.
- The `window-body` class provides padding consistent with the 98.css specification. Avoid removing it.
