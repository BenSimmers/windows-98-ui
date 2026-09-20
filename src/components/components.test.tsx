import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './button';
import { CheckBox } from './checkbox';
import { TextBox } from './textbox';
import { Dropdown } from './dropdown';
import { Slider } from './slider';
import { Progress } from './progress';
import { TitleBar } from './titleBar';
import { Window } from './window/windowContainer';
import { WindowBody } from './window/windowBody';
import { Win98Provider } from './provider';

describe('label association', () => {
  it('associates CheckBox with its label without a caller-supplied id', () => {
    render(<CheckBox label="Enable sound" />);
    expect(screen.getByLabelText('Enable sound')).toBeInstanceOf(HTMLInputElement);
  });

  it('associates TextBox with its label and defaults to type=text', () => {
    render(<TextBox label="Name" />);
    const input = screen.getByLabelText('Name');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('associates Dropdown with its label', () => {
    render(<Dropdown label="Theme" options={[{ value: 'a', label: 'A' }]} />);
    expect(screen.getByLabelText('Theme').tagName).toBe('SELECT');
  });

  it('gives each instance a distinct generated id', () => {
    render(
      <>
        <CheckBox label="One" />
        <CheckBox label="Two" />
      </>,
    );
    const [one, two] = screen.getAllByRole('checkbox');
    expect(one.id).not.toBe(two.id);
    expect(one.id).toBeTruthy();
  });

  it('respects an explicit id when given', () => {
    render(<CheckBox id="sound" label="Enable sound" />);
    expect(screen.getByLabelText('Enable sound')).toHaveAttribute('id', 'sound');
  });
});

describe('Slider', () => {
  it('takes its accessible name from the label, not the endpoint captions', () => {
    render(<Slider label="Volume" minLabel="Low" maxLabel="High" min={0} max={10} defaultValue={5} />);
    expect(screen.getByRole('slider')).toHaveAccessibleName('Volume');
  });

  it('hides the endpoint captions from assistive tech', () => {
    render(<Slider label="Volume" minLabel="Low" maxLabel="High" min={0} max={10} defaultValue={5} />);
    expect(screen.queryByText('Low')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByText('High')).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('Progress', () => {
  it('exposes its value to assistive tech', () => {
    render(<Progress value={42} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '42');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('clamps out-of-range values', () => {
    const { rerender } = render(<Progress value={150} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
    rerender(<Progress value={-20} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });
});

describe('Window', () => {
  it('merges caller styles instead of discarding them', () => {
    render(
      <Window data-testid="w" width={260} style={{ position: 'absolute', left: 40, zIndex: 5 }}>
        body
      </Window>,
    );
    expect(screen.getByTestId('w')).toHaveStyle({
      width: '260px',
      position: 'absolute',
      left: '40px',
      zIndex: '5',
    });
  });

  it('emits no dimensions when none are given', () => {
    render(<Window data-testid="w">body</Window>);
    const style = screen.getByTestId('w').getAttribute('style') ?? '';
    expect(style).not.toContain('undefined');
  });

  it('accepts string lengths verbatim', () => {
    render(
      <Window data-testid="w" width="20rem">
        body
      </Window>,
    );
    expect(screen.getByTestId('w').getAttribute('style')).toContain('width: 20rem');
  });
});

describe('class names', () => {
  it('composes TitleBar classes without stray whitespace', () => {
    const { rerender } = render(<TitleBar data-testid="tb" title="x" />);
    expect(screen.getByTestId('tb')).toHaveAttribute('class', 'title-bar');

    rerender(<TitleBar data-testid="tb" title="x" inactive className="mine" />);
    expect(screen.getByTestId('tb')).toHaveAttribute('class', 'title-bar inactive mine');
  });

  it('composes WindowBody and Button classes', () => {
    render(
      <>
        <WindowBody data-testid="wb">body</WindowBody>
        <Button label="OK" className="primary" />
      </>,
    );
    expect(screen.getByTestId('wb')).toHaveAttribute('class', 'window-body');
    expect(screen.getByRole('button', { name: 'OK' })).toHaveClass('primary');
  });
});

describe('Win98Provider', () => {
  it('scopes its children and injects the stylesheet once', () => {
    const { unmount } = render(
      <>
        <Win98Provider>
          <Button label="A" />
        </Win98Provider>
        <Win98Provider>
          <Button label="B" />
        </Win98Provider>
      </>,
    );

    expect(document.querySelectorAll('#win98-scoped-styles')).toHaveLength(1);
    expect(document.querySelectorAll('.win98')).toHaveLength(2);

    unmount();
    expect(document.querySelectorAll('#win98-scoped-styles')).toHaveLength(0);
  });

  it('appends a caller className to the scope container', () => {
    render(
      <Win98Provider className="desktop">
        <span>x</span>
      </Win98Provider>,
    );
    expect(document.querySelector('.win98')).toHaveClass('desktop');
  });
});
