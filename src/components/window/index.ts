import { Window as WindowRoot } from './windowContainer';
import { WindowBody } from './windowBody';
import { TitleBar } from '@/components/titleBar';

/**
 * `Window` with its parts attached, so a window can be composed directly
 * instead of threading `titleBarProps` / `windowBodyProps` through a prefab.
 *
 * @example
 * <Window width={320}>
 *   <Window.TitleBar title="My Computer" close />
 *   <Window.Body>Contents</Window.Body>
 * </Window>
 */
export const Window = Object.assign(WindowRoot, {
  TitleBar,
  Body: WindowBody,
});

export { WindowBody, type WindowBodyProps, type WidnowBodyProps } from './windowBody';
export type { WindowProps } from './windowContainer';
