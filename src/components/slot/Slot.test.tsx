import { describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../button';
import { Window } from '../window';

describe('asChild', () => {
  it('renders the child element instead of the default one', () => {
    render(
      <Button asChild>
        <a href="/start">Start</a>
      </Button>,
    );

    const link = screen.getByRole('link', { name: 'Start' });
    expect(link.tagName).toBe('A');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('concatenates className rather than clobbering it', () => {
    render(
      <Window asChild className="from-window">
        <section className="from-child">body</section>
      </Window>,
    );

    const section = document.querySelector('section')!;
    expect(section).toHaveClass('window', 'from-window', 'from-child');
  });

  it('merges styles with the child winning on conflicts', () => {
    render(
      <Window asChild width={200} style={{ color: 'red' }}>
        <section data-testid="s" style={{ color: 'blue' }}>
          body
        </section>
      </Window>,
    );

    expect(screen.getByTestId('s')).toHaveStyle({ width: '200px', color: 'rgb(0, 0, 255)' });
  });

  it('runs both handlers, child first', async () => {
    const calls: string[] = [];
    const user = userEvent.setup();

    render(
      <Button asChild onClick={() => calls.push('slot')}>
        <button type="button" onClick={() => calls.push('child')}>
          Go
        </button>
      </Button>,
    );

    await user.click(screen.getByRole('button', { name: 'Go' }));
    expect(calls).toEqual(['child', 'slot']);
  });

  it('lets the child override plain props', () => {
    render(
      <Button asChild id="from-slot">
        <button type="button" id="from-child">
          Go
        </button>
      </Button>,
    );

    expect(screen.getByRole('button')).toHaveAttribute('id', 'from-child');
  });

  it('composes the outer ref with the child ref', () => {
    const outer = createRef<HTMLElement>();
    const inner = createRef<HTMLButtonElement>();

    render(
      <Button asChild ref={outer as never}>
        <button type="button" ref={inner}>
          Go
        </button>
      </Button>,
    );

    expect(outer.current).toBeInstanceOf(HTMLButtonElement);
    expect(outer.current).toBe(inner.current);
  });

  it('rejects more than one child', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    try {
      expect(() =>
        render(
          <Button asChild>
            <span>one</span>
            <span>two</span>
          </Button>,
        ),
      ).toThrow(/exactly one React element child/);
    } finally {
      consoleError.mockRestore();
    }
  });

  it('still renders normally when asChild is absent', () => {
    render(<Button label="OK" />);
    expect(screen.getByRole('button', { name: 'OK' }).tagName).toBe('BUTTON');
  });

  it('prefers children over the label shorthand', () => {
    render(<Button label="ignored">used</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('used');
  });
});

describe('compound Window', () => {
  it('exposes TitleBar and Body as parts', () => {
    render(
      <Window width={320} data-testid="w">
        <Window.TitleBar title="My Computer" close />
        <Window.Body>Contents</Window.Body>
      </Window>,
    );

    const win = screen.getByTestId('w');
    expect(win).toHaveClass('window');
    expect(win.querySelector('.title-bar-text')).toHaveTextContent('My Computer');
    expect(win.querySelector('.window-body')).toHaveTextContent('Contents');
  });

  it('is the same component as the standalone parts', async () => {
    const { TitleBar } = await import('../titleBar');
    const { WindowBody } = await import('../window/windowBody');
    expect(Window.TitleBar).toBe(TitleBar);
    expect(Window.Body).toBe(WindowBody);
  });
});
