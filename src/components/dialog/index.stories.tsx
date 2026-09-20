import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Dialog } from '.';
import { Button } from '../button';

function ConfirmDemo({ modal }: { modal: boolean }) {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<string>();

  return (
    <div style={{ padding: 24 }}>
      <Button label={`Open ${modal ? 'modal' : 'non-modal'} dialog`} onClick={() => setOpen(true)} />
      {result && <p style={{ marginTop: 12 }}>Closed with: {result || '(none)'}</p>}

      <Dialog
        open={open}
        modal={modal}
        title="Delete File"
        width={320}
        onClose={(returnValue) => {
          setOpen(false);
          setResult(returnValue);
        }}
      >
        <p style={{ marginBottom: 16 }}>
          Are you sure you want to send &lsquo;Untitled.txt&rsquo; to the Recycle Bin?
        </p>
        <form method="dialog" style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
          <Button label="Yes" value="yes" />
          <Button label="No" value="no" />
        </form>
      </Dialog>
    </div>
  );
}

const meta: Meta<typeof Dialog> = {
  title: 'Example/Dialog',
  component: Dialog,
};

export default meta;

/** Focus trapping, the backdrop and Escape all come from `<dialog>` itself. */
export const Modal: StoryObj = { render: () => <ConfirmDemo modal /> };

export const NonModal: StoryObj = { render: () => <ConfirmDemo modal={false} /> };
