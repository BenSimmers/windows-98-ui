import React from 'react';
import { PolymorphicComponentPropsWithRef } from '@/types';

export type TreeItem = {
  label: string;
  items?: TreeItem[];
};

export type TreeViewProps = PolymorphicComponentPropsWithRef<
  'ul',
  {
    items: TreeItem[];
  }
>;

export const TreeView = React.forwardRef<HTMLUListElement, TreeViewProps>(
  ({ as: Component = 'ul', items, ...props }, ref) => {
    const renderTree = (treeItems: TreeItem[]) => {
      return treeItems.map((item, index) => (
        <li key={index}>
          {item.items ? (
            <details open>
              <summary>{item.label}</summary>
              <Component className="tree-view">{renderTree(item.items)}</Component>
            </details>
          ) : (
            item.label
          )}
        </li>
      ));
    };

    return (
      <Component ref={ref} {...props} className="tree-view">
        {renderTree(items)}
      </Component>
    );
  },
);

TreeView.displayName = 'TreeView';
