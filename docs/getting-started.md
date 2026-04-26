# Getting Started

## Installation

```bash
npm install windows-98-ui
```

`windows-98-ui` has React as a peer dependency. It supports React 16, 17, 18, and 19.

```bash
# If React is not already installed
npm install react react-dom
```

---

## Setup — Win98Provider

All components must be rendered inside a `Win98Provider`. The provider:

- Injects the scoped 98.css styles into `<head>` when it mounts
- Removes those styles when it unmounts
- Renders a `<div class="win98">` wrapper that all styles are scoped to

This prevents Windows 98 styles from affecting the rest of your application.

### Basic setup

Wrap your entire app (or just the section that uses Windows 98 UI):

```tsx
import { Win98Provider } from 'windows-98-ui';

function App() {
  return (
    <Win98Provider>
      {/* all your windows-98-ui components go here */}
    </Win98Provider>
  );
}
```

### Wrapping your entire app

Placing a single `Win98Provider` at the root is the recommended approach if your whole app uses the Windows 98 style. You do **not** need to wrap every component individually.

```tsx
// main.tsx
import { Win98Provider } from 'windows-98-ui';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Win98Provider>
    <App />
  </Win98Provider>
);
```

Because every 98.css selector is prefixed with `.win98`, **nothing leaks outside the provider** — third-party components, modals rendered via portals to `document.body`, and any elements outside the provider div are completely unaffected.

The provider renders a `<div class="win98">` wrapper. If your layout needs that div to fill the viewport, pass a `className`:

```tsx
<Win98Provider className="app-root">
  <App />
</Win98Provider>
```

```css
.app-root {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
```

### Scoped setup

Alternatively, use the provider around individual sections if only part of your app should use the Windows 98 style:

```tsx
import { Win98Provider, Button } from 'windows-98-ui';

function MyDialog() {
  return (
    <Win98Provider>
      <Button label="OK" />
      <Button label="Cancel" />
    </Win98Provider>
  );
}
```

### Win98Provider Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | Yes | Content to render inside the scoped container |
| `className` | `string` | No | Additional class names on the `.win98` wrapper div |

---

## Quick example

```tsx
import {
  Win98Provider,
  Desktop,
  Button,
  CheckBox,
  TextBox,
} from 'windows-98-ui';

function App() {
  return (
    <Win98Provider>
      <Desktop
        titleBarProps={{ title: 'My App', close: true }}
        windowProps={{ width: '400' }}
      >
        <TextBox id="name" label="Name" type="text" />
        <CheckBox id="agree" label="I agree to the terms" />
        <Button label="Submit" />
      </Desktop>
    </Win98Provider>
  );
}
```

---

## Next steps

- Browse the [component docs](./README.md) for full prop references and examples
- Read about the [polymorphic `as` prop](./advanced/polymorphic.md) to render components as different HTML elements
- Read about [style scoping](./advanced/style-scoping.md) for details on how CSS isolation works
