export { Button, type ButtonProps } from './components/button';
export { CheckBox, type CheckBoxProps } from './components/checkbox';
export { Dropdown, type DropdownProps } from './components/dropdown';
export { TextBox, type TextBoxProps } from './components/textbox';
export { Slider, type SliderProps } from './components/slider';
export { TitleBar, type TitleBarProps } from './components/titleBar';
export { Window, type WindowProps } from './components/window';
export {
  WindowBody,
  type WindowBodyProps,
  /** @deprecated Misspelled; use `WindowBodyProps`. */
  type WidnowBodyProps,
} from './components/window';
export { Slot, type SlotProps } from './components/slot';
export { Desktop, type DesktopProps } from './components/prefabs';
export { TreeView, type TreeViewProps, type TreeItem } from './components/treeView';
export { Progress, type ProgressProps } from './components/progress';
export { Dialog, type DialogProps } from './components/dialog';
export {
  Menu,
  MenuItem,
  MenuSeparator,
  MenuBar,
  MenuBarItem,
  type MenuProps,
  type MenuItemProps,
  type MenuBarProps,
  type MenuBarItemProps,
} from './components/menu';
export { Taskbar, type TaskbarProps } from './components/taskbar';
export { Win98Provider, type Win98ProviderProps } from './components/provider';

// Headless hooks — behaviour without markup, for building your own windows.
export { useDraggable, WindowManagerProvider, useWindowManager, useWindow } from './hooks';
export type {
  Position,
  UseDraggableOptions,
  UseDraggableResult,
  WindowManagerProviderProps,
  UseWindowOptions,
  UseWindowResult,
  WindowRecord,
  WindowManagerSnapshot,
} from './hooks';

/** The scoped 98.css stylesheet as a string, for custom injection setups. */
export { win98ScopedCSS } from './styles/win98-scoped';
