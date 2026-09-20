---
"windows-98-ui": minor
---

Add headless window-management hooks, menus, dialogs and a taskbar; fix several rendering and accessibility bugs; ship zero runtime dependencies.

**New components**

- `Dialog` — built on the native `<dialog>` element, so focus trapping, the top layer, `::backdrop` and Escape-to-close come from the platform. `onClose` receives the dialog's `returnValue`, so `<form method="dialog">` works as expected.
- `Menu`, `MenuBar`, `MenuBarItem`, `MenuItem`, `MenuSeparator` — uses the Popover API for top-layer rendering and light dismiss where supported, with a positioned fallback elsewhere. Full `menubar`/`menu`/`menuitem` roles.
- `Taskbar` — Start button, Start menu, a button per open window, and a tray. Window buttons read from the nearest `WindowManagerProvider`, so clicking one focuses or restores that window.
- `Slot` — powers `asChild` (see below).

**New headless hooks**

- `useDraggable` — pointer-capture based dragging with controlled/uncontrolled positioning, viewport or parent bounds, and drag lifecycle callbacks.
- `WindowManagerProvider`, `useWindowManager`, `useWindow` — shared stacking order, focus, minimise, maximise and close across windows, backed by `useSyncExternalStore`. Z-indexes derive from stack position, so they compact on unmount instead of growing without bound.

**API additions**

- `asChild` on `Button`, `Window` and `WindowBody`. `className` concatenates, `style` merges with the child winning, and event handlers chain child-first.
- Compound parts: `<Window.TitleBar>` and `<Window.Body>`.
- `Dropdown` accepts a `label` and associates it correctly; it previously had no labelling path at all.
- `id` is now optional on `CheckBox`, `TextBox`, `Dropdown` and `Slider` — one is generated via `useId` when omitted.
- `TextBox.type` defaults to `"text"`; `TextBox.label` and `Slider.value` are no longer required.
- `Button` renders `children ?? label`, so either works.
- Prop types are now exported for every component (previously only three). `WindowBodyProps` is the correctly spelled name; `WidnowBodyProps` remains as a deprecated alias.
- New `windows-98-ui/style.css` entry point. Importing it in a root layout ships the styles with the document for flash-free SSR, instead of injecting them during hydration. The stylesheet is also exported as the `win98ScopedCSS` string for custom injection.

**Fixes**

- `Window` silently discarded any caller-supplied `style`, and emitted `width: undefinedpx; height: undefinedpx` whenever dimensions were omitted. Caller styles now merge and win, and dimensions are only emitted when supplied.
- `Slider` rendered three `<label for>` elements pointing at the same input, so its accessible name resolved to the max caption rather than the actual label. Endpoint captions are now decorative and hidden from assistive tech.
- `Progress` had no ARIA and was invisible to assistive tech. It now exposes `role="progressbar"` with `aria-valuenow`/`min`/`max`.
- The provider injected styles from `useEffect`, which runs after paint. It now uses `useInsertionEffect`, eliminating the flash on client render and navigation.
- The package now carries a `'use client'` directive, so it can be imported from a React Server Component — previously this threw in the Next.js App Router.
- `TitleBar` no longer emits stray whitespace in its `class` attribute.

**Packaging**

- `prettier`, `tsup`, `typescript`, `@changesets/cli` and `98.css` moved from `dependencies` to `devDependencies`. The package now has **no runtime dependencies**; installing it no longer pulls in a build toolchain.
- Added a dual-package `exports` map with per-condition types, so types resolve correctly under `moduleResolution: "node16"` and `"bundler"`.
- Added `sideEffects: false` to unblock tree-shaking, and `files: ["dist"]` in place of `.npmignore`.
- Filled in the npm `description`, `repository`, `homepage` and `bugs` fields, and expanded keywords.
- `license` corrected to `MIT`, matching the README and LICENSE file (it previously read `ISC`).
- `postcss` is now declared explicitly; the CSS build was relying on a transitive hoist.

**Behaviour changes to be aware of**

- `Window`'s `width` and `height` now accept `number | string`. A number is treated as pixels; a string is used verbatim. Previously any value was suffixed with `px`, so `width="200"` produced `200px` and now produces the invalid `200`. Pass `width={200}` or `width="200px"`.
- Adding an `exports` map means deep imports such as `windows-98-ui/dist/index.js` are no longer resolvable. Use the package root or `windows-98-ui/style.css`.
- `98.css` is no longer installed transitively. If you import it directly, add it to your own dependencies.
