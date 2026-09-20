type AnyProps = Record<string, unknown>;

const isEventHandlerName = (name: string) => /^on[A-Z]/.test(name);

export function mergeProps(slotProps: AnyProps, childProps: AnyProps): AnyProps {
  const merged: AnyProps = { ...slotProps };

  for (const name of Object.keys(childProps)) {
    const slotValue = slotProps[name];
    const childValue = childProps[name];

    if (isEventHandlerName(name)) {
      // Both run, child first, so a child's `preventDefault` is visible to us.
      if (typeof slotValue === 'function' && typeof childValue === 'function') {
        merged[name] = (...args: unknown[]) => {
          (childValue as (...a: unknown[]) => unknown)(...args);
          (slotValue as (...a: unknown[]) => unknown)(...args);
        };
      } else {
        merged[name] = childValue ?? slotValue;
      }
    } else if (name === 'style') {
      merged[name] = { ...(slotValue as object), ...(childValue as object) };
    } else if (name === 'className') {
      merged[name] = [slotValue, childValue].filter(Boolean).join(' ');
    } else {
      merged[name] = childValue;
    }
  }

  return merged;
}
