import * as React from 'react';
import { composeRefs } from '@/utils/composeRefs';
import { mergeProps } from '@/utils/mergeProps';

export type SlotProps = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

type WarningGetter = (() => unknown) & { isReactWarning?: boolean };

const warns = (target: object | undefined, key: string) => {
  if (!target) return false;
  const getter = Object.getOwnPropertyDescriptor(target, key)?.get as WarningGetter | undefined;
  return Boolean(getter && 'isReactWarning' in getter && getter.isReactWarning);
};

function getChildRef(element: React.ReactElement): React.Ref<unknown> | undefined {
  const props = element.props as { ref?: React.Ref<unknown> } | undefined;
  const legacy = element as unknown as { ref?: React.Ref<unknown> };

  if (warns(props, 'ref')) return legacy.ref;
  if (warns(element, 'ref')) return props?.ref;
  return props?.ref ?? legacy.ref;
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>(({ children, ...slotProps }, ref) => {
  if (!React.isValidElement(children)) {
    if (React.Children.count(children) > 1) {
      throw new Error('`asChild` expects exactly one React element child.');
    }
    return null;
  }

  const childRef = getChildRef(children);

  return React.cloneElement(children, {
    ...mergeProps(slotProps as Record<string, unknown>, children.props as Record<string, unknown>),
    ref: childRef ? composeRefs(ref, childRef) : ref,
  } as React.Attributes);
});

Slot.displayName = 'Slot';
