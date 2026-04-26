# Style Scoping

## The problem

98.css styles global HTML elements like `button`, `input`, `select`, `body`, and many others. Importing it normally with `import '98.css'` applies these styles to your entire application, which can break other components and third-party UI libraries.

## The solution — Win98Provider

`windows-98-ui` ships a pre-processed, scoped version of 98.css where every selector is prefixed with `.win98`. Styles are injected into the document only when a `Win98Provider` mounts, and only apply to content inside it.

For example, the global 98.css rule:

```css
button {
  box-sizing: border-box;
  border: none;
  ...
}
```

becomes:

```css
.win98 button {
  box-sizing: border-box;
  border: none;
  ...
}
```

`Win98Provider` renders a `<div class="win98">` wrapper, so styles only apply to its descendants.

## How the scoped CSS is generated

The scoped CSS is generated at build time by `scripts/generate-scoped-css.mjs` using PostCSS. To regenerate it (e.g. after updating the `98.css` version):

```bash
npm run build:css
```

The output is written to `src/styles/win98-scoped.ts` as an exported string constant, which `Win98Provider` injects as a `<style>` tag.

## Style injection and cleanup

`Win98Provider` manages the `<style>` tag lifecycle:

- **Mount**: a `<style id="win98-scoped-styles">` tag is appended to `<head>`. If multiple providers are mounted simultaneously, the tag is shared with a ref-count so it is not duplicated.
- **Unmount**: the ref-count is decremented. When the last provider unmounts, the `<style>` tag is removed from `<head>`.

This means styles are only present in the DOM when at least one `Win98Provider` is mounted.

## Server-side rendering (SSR)

Because the styles are injected via `useEffect` (client-side only), there will be a brief flash on first render in SSR environments. To avoid this, inline the `win98ScopedCSS` string into a `<style>` tag in your server-rendered HTML:

```tsx
import { win98ScopedCSS } from 'windows-98-ui/styles'; // if re-exported
// or import directly:
// import { win98ScopedCSS } from './node_modules/windows-98-ui/dist/...'
```

> Note: SSR support via a dedicated server export is planned for a future release.

## Exceptions

Two selectors are intentionally left unscoped:

- `:root` — preserves CSS custom property definitions globally
- `html` — preserves any html-level resets

The `body` selector is remapped to `.win98` itself (the provider wrapper), so body-level styles apply to the provider container rather than the page body.
