# Progress

A progress bar styled with the Windows 98 aesthetic. Supports both a solid fill and a segmented (block) style.

## Import

```tsx
import { Progress } from 'windows-98-ui';
```

## Usage

```tsx
<Win98Provider>
  <Progress value={60} />
</Win98Provider>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `value` | `number` | No | `0` | Fill percentage (clamped between `0` and `100`) |
| `variant` | `"" \| "segmented"` | No | `""` | Style variant. `"segmented"` renders a block-style progress bar |
| `ref` | `Ref<HTMLDivElement>` | No | — | Forwarded ref |

All standard HTML `<div>` attributes (e.g. `className`, `style`, `aria-*`) are also accepted.

## Examples

### Basic progress bar

```tsx
<Progress value={40} />
```

### Full progress

```tsx
<Progress value={100} />
```

### Segmented style

```tsx
<Progress value={70} variant="segmented" />
```

### Animated (controlled)

```tsx
const [progress, setProgress] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setProgress((p) => (p >= 100 ? 0 : p + 10));
  }, 500);
  return () => clearInterval(interval);
}, []);

<Progress value={progress} />
```

### With accessible label

```tsx
<Progress
  value={60}
  role="progressbar"
  aria-valuenow={60}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label="Upload progress"
/>
```

## Notes

- `value` is automatically clamped: values below `0` are treated as `0` and values above `100` are treated as `100`.
- The `segmented` variant applies the `progress-indicator segmented` class from 98.css, which renders the fill as discrete blocks.
- For accessibility, add `role="progressbar"` and the appropriate `aria-value*` attributes.
