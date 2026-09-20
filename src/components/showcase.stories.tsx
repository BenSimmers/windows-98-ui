import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from './button';
import { CheckBox } from './checkbox';
import { Dropdown } from './dropdown';
import { TextBox } from './textbox';
import { Slider } from './slider';
import { Progress } from './progress';
import { TreeView } from './treeView';
import { Window } from './window/windowContainer';
import { WindowBody } from './window/windowBody';
import { TitleBar } from './titleBar';

/**
 * Every form control at once. All of these now label themselves — none of the
 * fields below passes an `id`.
 */
function DisplayProperties() {
  const [scheme, setScheme] = useState('standard');
  const [size, setSize] = useState(8);

  return (
    <Window width={380}>
      <TitleBar title="Display Properties" minimize maximize close />
      <WindowBody>
        <TextBox label="Name" defaultValue="Administrator" />
        <Dropdown
          label="Scheme"
          options={[
            { value: 'standard', label: 'Windows Standard' },
            { value: 'rose', label: 'Rose' },
            { value: 'eggplant', label: 'Eggplant' },
          ]}
          value={scheme}
          onChange={(event) => setScheme(event.target.value)}
        />
        <Slider
          label="Font size"
          minLabel="Small"
          maxLabel="Large"
          min={8}
          max={24}
          value={size}
          onChange={(event) => setSize(Number(event.target.value))}
        />
        <CheckBox label="Show window contents while dragging" defaultChecked />
        <CheckBox label="Smooth edges of screen fonts" />
        <div style={{ marginTop: 12 }}>
          <Progress value={((size - 8) / 16) * 100} />
        </div>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', marginTop: 12 }}>
          <Button label="OK" />
          <Button label="Cancel" />
          <Button label="Apply" />
        </div>
      </WindowBody>
    </Window>
  );
}

const meta: Meta<typeof DisplayProperties> = {
  title: 'Example/Showcase',
  component: DisplayProperties,
};

export default meta;

export const Everything: StoryObj<typeof DisplayProperties> = {};

export const Explorer: StoryObj = {
  render: () => (
    <Window width={300}>
      <TitleBar title="Exploring - C:\\" minimize maximize close />
      <WindowBody>
        <TreeView
          items={[
            {
              label: 'C:\\',
              items: [
                { label: 'Program Files', items: [{ label: 'Accessories' }] },
                { label: 'Windows', items: [{ label: 'System32' }] },
                { label: 'autoexec.bat' },
              ],
            },
          ]}
        />
      </WindowBody>
    </Window>
  ),
};

export const DisabledAndStates: StoryObj = {
  render: () => (
    <Window width={280}>
      <TitleBar title="States" inactive />
      <WindowBody>
        <Button label="Enabled" />{' '}
        <Button label="Disabled" disabled />
        <CheckBox label="Checked" defaultChecked />
        <CheckBox label="Disabled" disabled />
        <TextBox label="Stacked" stacked defaultValue="value" />
        <Progress value={0} />
        <Progress value={66} variant="segmented" />
        <Progress value={100} />
      </WindowBody>
    </Window>
  ),
};
