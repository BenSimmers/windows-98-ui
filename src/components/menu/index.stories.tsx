import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menu, MenuBar, MenuBarItem, MenuItem, MenuSeparator } from '.';
import { Window } from '../window';

const meta: Meta<typeof MenuBar> = {
  title: 'Example/Menu',
  component: MenuBar,
};

export default meta;

/** Uses the Popover API where available, with a positioned fallback elsewhere. */
export const WindowMenuBar: StoryObj = {
  render: () => (
    <Window width={360}>
      <Window.TitleBar title="Untitled - Notepad" minimize maximize close />
      <MenuBar>
        <MenuBarItem label="File">
          <MenuItem label="New" shortcut="Ctrl+N" />
          <MenuItem label="Open..." shortcut="Ctrl+O" />
          <MenuItem label="Save" shortcut="Ctrl+S" />
          <MenuSeparator />
          <MenuItem label="Exit" />
        </MenuBarItem>
        <MenuBarItem label="Edit">
          <MenuItem label="Undo" shortcut="Ctrl+Z" />
          <MenuSeparator />
          <MenuItem label="Cut" shortcut="Ctrl+X" />
          <MenuItem label="Copy" shortcut="Ctrl+C" />
          <MenuItem label="Paste" shortcut="Ctrl+V" disabled />
        </MenuBarItem>
        <MenuBarItem label="Help">
          <MenuItem label="About Notepad" />
        </MenuBarItem>
      </MenuBar>
      <Window.Body>
        <div style={{ minHeight: 120 }}>Click a menu title above.</div>
      </Window.Body>
    </Window>
  ),
};

export const StandaloneMenu: StoryObj = {
  render: () => (
    <div style={{ padding: 24, position: 'relative', height: 200 }}>
      <Menu open aria-label="Context">
        <MenuItem label="Open" />
        <MenuItem label="Explore" />
        <MenuSeparator />
        <MenuItem label="Properties" shortcut="Alt+Enter" />
      </Menu>
    </div>
  ),
};
