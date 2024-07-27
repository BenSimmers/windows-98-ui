import React from 'react';

export type PropsOf<C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<unknown>> =
  JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>;

type AsProp<C extends React.ElementType> = {
  /**
   * An override of the default HTML tag.
   * Can also be another React component.
   */
  as?: C;
};

/**
 * Allows for extending a set of props (`ExtendedProps`) by an overriding set of props
 * (`OverrideProps`), ensuring that any duplicates are overridden by the overriding
 * set of props.
 */
export type ExtendableProps<ExtendedProps = object, OverrideProps = object> = OverrideProps &
  Omit<ExtendedProps, keyof OverrideProps>;

/**
 * Allows for inheriting the props from the specified element type so that
 * props like children, className & style work, as well as element-specific
 * attributes like aria roles. The component (`C`) must be passed in.
 */
export type InheritableElementProps<C extends React.ElementType, Props = object> = ExtendableProps<PropsOf<C>, Props>;

/**
 * A more sophisticated version of `InheritableElementProps` where
 * the passed in `as` prop will determine which props can be included
 */
export type PolymorphicComponentProps<C extends React.ElementType, Props = object> = InheritableElementProps<
  C,
  Props & AsProp<C>
>;

/**
 * A type that represents a ref that can be passed to a component.
 * This is useful for components that need to forward refs.
 */
export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

/**
 * A combination of `PolymorphicComponentProps` and `PolymorphicRef`
 */
export type PolymorphicComponentPropsWithRef<C extends React.ElementType, Props = object> = PolymorphicComponentProps<
  C,
  Props
> & { ref?: PolymorphicRef<C> };