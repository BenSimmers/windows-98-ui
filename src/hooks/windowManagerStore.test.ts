import { describe, expect, it, vi } from 'vitest';
import { createWindowManagerStore } from './windowManagerStore';

describe('windowManagerStore', () => {
  it('stacks windows in registration order and focuses the newest', () => {
    const store = createWindowManagerStore(1000);
    store.register('a');
    store.register('b');
    store.register('c');

    const { order, windows, focusedId } = store.getSnapshot();
    expect([...order]).toEqual(['a', 'b', 'c']);
    expect(focusedId).toBe('c');
    expect([windows.a.zIndex, windows.b.zIndex, windows.c.zIndex]).toEqual([1000, 1001, 1002]);
    expect(windows.c.isFocused).toBe(true);
    expect(windows.a.isFocused).toBe(false);
  });

  it('raises a window to the top on focus', () => {
    const store = createWindowManagerStore(1000);
    ['a', 'b', 'c'].forEach(store.register);

    store.focus('a');

    const { order, windows, focusedId } = store.getSnapshot();
    expect([...order]).toEqual(['b', 'c', 'a']);
    expect(focusedId).toBe('a');
    expect(windows.a.zIndex).toBe(1002);
  });

  it('preserves record identity for windows whose state did not change', () => {
    const store = createWindowManagerStore(1000);
    ['a', 'b', 'c'].forEach(store.register);

    const cBefore = store.getSnapshot().windows.c;
    store.minimize('b');

    // `c` is untouched, so its record must be the same object — that identity
    // is what stops every other useWindow subscriber re-rendering.
    expect(store.getSnapshot().windows.c).toBe(cBefore);
    expect(store.getSnapshot().windows.b.isMinimized).toBe(true);
  });

  it('does not notify when focusing the already-topmost window', () => {
    const store = createWindowManagerStore(1000);
    ['a', 'b'].forEach(store.register);

    const listener = vi.fn();
    store.subscribe(listener);
    store.focus('b');

    expect(listener).not.toHaveBeenCalled();
  });

  it('returns a referentially stable snapshot while nothing changes', () => {
    const store = createWindowManagerStore(1000);
    store.register('a');
    expect(store.getSnapshot()).toBe(store.getSnapshot());
  });

  it('restores a minimised window and focuses it', () => {
    const store = createWindowManagerStore(1000);
    ['a', 'b'].forEach(store.register);
    store.minimize('a');
    store.focus('b');

    store.restore('a');

    const { windows, focusedId } = store.getSnapshot();
    expect(windows.a.isMinimized).toBe(false);
    expect(focusedId).toBe('a');
  });

  it('marks a closed window closed without dropping its record', () => {
    const store = createWindowManagerStore(1000);
    store.register('a');
    store.close('a');

    expect(store.getSnapshot().windows.a.isOpen).toBe(false);
  });

  it('round-trips maximise', () => {
    const store = createWindowManagerStore(1000);
    store.register('a');

    store.toggleMaximize('a');
    expect(store.getSnapshot().windows.a.isMaximized).toBe(true);
    store.toggleMaximize('a');
    expect(store.getSnapshot().windows.a.isMaximized).toBe(false);
  });

  it('compacts z-indexes when a window unregisters', () => {
    const store = createWindowManagerStore(1000);
    ['a', 'b', 'c'].forEach(store.register);

    store.unregister('a');

    const { order, windows } = store.getSnapshot();
    expect(windows.a).toBeUndefined();
    expect(order.map((id) => windows[id].zIndex)).toEqual([1000, 1001]);
  });

  it('ignores operations on unknown ids', () => {
    const store = createWindowManagerStore(1000);
    expect(() => {
      store.focus('nope');
      store.close('nope');
      store.minimize('nope');
      store.toggleMaximize('nope');
      store.unregister('nope');
    }).not.toThrow();
  });

  it('honours a custom base z-index', () => {
    const store = createWindowManagerStore(50);
    store.register('a');
    expect(store.getSnapshot().windows.a.zIndex).toBe(50);
  });
});
