import * as React from 'react';
import { createWindowManagerStore, DEFAULT_BASE_Z_INDEX } from './windowManagerStore';
import { WindowManagerContext } from './windowManagerContext';

export type WindowManagerProviderProps = {
  children: React.ReactNode;
  /** Stacking starts here and increments by one per window. */
  baseZIndex?: number;
};

export function WindowManagerProvider({ children, baseZIndex = DEFAULT_BASE_Z_INDEX }: WindowManagerProviderProps) {
  const store = React.useMemo(() => createWindowManagerStore(baseZIndex), [baseZIndex]);
  return <WindowManagerContext.Provider value={store}>{children}</WindowManagerContext.Provider>;
}
