# TreeView

A hierarchical tree structure styled with the Windows 98 aesthetic. Supports arbitrarily nested items with collapsible groups.

## Import

```tsx
import { TreeView } from 'windows-98-ui';
```

## Usage

```tsx
<Win98Provider>
  <TreeView
    items={[
      { label: 'Desktop' },
      {
        label: 'My Computer',
        items: [
          { label: 'C:\\' },
          { label: 'D:\\' },
        ],
      },
    ]}
  />
</Win98Provider>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `items` | `TreeItem[]` | Yes | — | Array of items to render |
| `as` | `ElementType` | No | `"ul"` | The HTML element or component to render as |
| `ref` | `Ref<HTMLUListElement>` | No | — | Forwarded ref |

All standard HTML `<ul>` attributes (e.g. `className`, `style`) are also accepted.

### TreeItem type

```ts
type TreeItem = {
  label: string;       // Display text for the item
  items?: TreeItem[];  // Optional nested children (makes item a collapsible group)
};
```

## Examples

### Flat list

```tsx
<TreeView
  items={[
    { label: 'item1.txt' },
    { label: 'item2.txt' },
    { label: 'item3.txt' },
  ]}
/>
```

### Nested tree

```tsx
<TreeView
  items={[
    {
      label: 'src',
      items: [
        { label: 'index.ts' },
        {
          label: 'components',
          items: [
            { label: 'Button.tsx' },
            { label: 'CheckBox.tsx' },
          ],
        },
      ],
    },
    { label: 'package.json' },
    { label: 'tsconfig.json' },
  ]}
/>
```

### Deep nesting

```tsx
<TreeView
  items={[
    {
      label: 'My Computer',
      items: [
        {
          label: 'C:\\',
          items: [
            {
              label: 'Program Files',
              items: [
                { label: 'Internet Explorer' },
                { label: 'Windows Media Player' },
              ],
            },
            { label: 'Windows' },
          ],
        },
      ],
    },
  ]}
/>
```

## Notes

- Groups (items with `items`) render as `<details open>` / `<summary>` elements, meaning they are expanded by default and can be collapsed by clicking.
- Leaf nodes (items without `items`) render as plain `<li>` elements.
- The tree is recursive — nesting depth is unlimited.
