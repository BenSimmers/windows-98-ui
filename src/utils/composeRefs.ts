import type * as React from 'react';

function assignRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref != null && typeof ref === 'object') {
    (ref as React.MutableRefObject<T | null>).current = value;
  }
}

export function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> {
  return (node: T | null) => {
    refs.forEach((ref) => assignRef(ref, node));
  };
}
