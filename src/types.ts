import React from 'react';

export type PropsOf<C extends React.ElementType> = React.ComponentPropsWithoutRef<C>;
type AsProp<C extends React.ElementType> = {
  as?: C;
};
export type ExtendableProps<ExtendedProps, OverrideProps> = OverrideProps & Omit<ExtendedProps, keyof OverrideProps>;
export type InheritableElementProps<C extends React.ElementType, Props = object> = ExtendableProps<PropsOf<C>, Props>;
export type PolymorphicComponentProps<C extends React.ElementType, Props = object> = InheritableElementProps<
  C,
  Props & AsProp<C>
>;
export type PolymorphicRef<C extends React.ElementType> = React.Ref<React.ElementRef<C>>;
export type PolymorphicComponentPropsWithRef<C extends React.ElementType, Props = object> = PolymorphicComponentProps<
  C,
  Props
> & {
  ref?: PolymorphicRef<C>;
};
