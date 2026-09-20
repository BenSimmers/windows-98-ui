import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TreeView, type TreeItem } from '.';

const items: TreeItem[] = [
  {
    label: 'C:\\',
    items: [
      { label: 'Program Files', items: [{ label: 'Accessories' }] },
      { label: 'autoexec.bat' },
    ],
  },
];

describe('TreeView', () => {
  it('renders every node, nested ones included', () => {
    render(<TreeView items={items} />);

    expect(screen.getByText('C:\\')).toBeInTheDocument();
    expect(screen.getByText('Program Files')).toBeInTheDocument();
    expect(screen.getByText('Accessories')).toBeInTheDocument();
    expect(screen.getByText('autoexec.bat')).toBeInTheDocument();
  });

  it('uses a disclosure for branches and a plain item for leaves', () => {
    render(<TreeView items={items} />);

    // Branches are <details><summary>, so they expose a group role.
    expect(screen.getByText('C:\\').tagName).toBe('SUMMARY');
    expect(screen.getByText('autoexec.bat').tagName).not.toBe('SUMMARY');
  });

  it('opens branches by default', () => {
    const { container } = render(<TreeView items={items} />);
    container.querySelectorAll('details').forEach((node) => expect(node).toHaveAttribute('open'));
  });

  it('renders nothing for an empty tree', () => {
    const { container } = render(<TreeView items={[]} />);
    expect(container.querySelectorAll('li')).toHaveLength(0);
  });
});
