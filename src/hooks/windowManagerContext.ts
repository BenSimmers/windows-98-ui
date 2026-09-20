import * as React from 'react';
import type { WindowManagerStore } from './windowManagerStore';

export const WindowManagerContext = React.createContext<WindowManagerStore | null>(null);

export function useWindowManagerStore(hook: string): WindowManagerStore {
  const store = React.useContext(WindowManagerContext);
  if (!store) {
    throw new Error(`${hook} must be used inside a <WindowManagerProvider>.`);
  }
  return store;
}
