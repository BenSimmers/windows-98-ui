# Slider

A range input styled with the Windows 98 aesthetic, with optional min/max labels.

## Import

```tsx
import { Slider } from 'windows-98-ui';
```

## Usage

```tsx
<Win98Provider>
  <Slider id="volume" min={0} max={100} value={50} />
</Win98Provider>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `id` | `string` | Yes | — | The `id` applied to the `<input>` |
| `min` | `number \| string` | Yes | — | Minimum value of the range |
| `max` | `number \| string` | Yes | — | Maximum value of the range |
| `value` | `number \| string` | Yes | — | Current value (controlled) |
| `label` | `string` | No | — | Label displayed before the slider |
| `minLabel` | `string` | No | — | Label displayed to the left of the track |
| `maxLabel` | `string` | No | — | Label displayed to the right of the track |
| `type` | `string` | No | `"range"` | Input type (override if needed) |
| `as` | `ElementType` | No | `"input"` | The HTML element or component to render as |
| `ref` | `Ref<HTMLInputElement>` | No | — | Forwarded ref |

All standard HTML `<input type="range">` attributes (e.g. `onChange`, `step`, `disabled`) are also accepted.

## Examples

### Basic slider

```tsx
<Slider id="brightness" min={0} max={100} value={75} />
```

### Controlled slider

```tsx
const [volume, setVolume] = useState(50);

<Slider
  id="volume"
  min={0}
  max={100}
  value={volume}
  onChange={(e) => setVolume(Number(e.target.value))}
/>
```

### With a label

```tsx
<Slider id="zoom" label="Zoom" min={10} max={200} value={100} />
```

### With min/max labels

```tsx
<Slider
  id="balance"
  min={0}
  max={100}
  value={50}
  minLabel="Left"
  maxLabel="Right"
/>
```

### With step

```tsx
<Slider id="opacity" min={0} max={1} value={0.5} step={0.1} />
```

## Notes

- The slider is fixed at a `width: 300px` wrapper — override with `className` or a parent container if you need a different width.
- `minLabel` and `maxLabel` render as `<label>` elements pointing at the same `id` as the input, so they act as accessible labels.
