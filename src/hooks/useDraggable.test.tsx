import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { useDraggable, type UseDraggableOptions } from './useDraggable';

function Draggable(options: UseDraggableOptions = {}) {
  const drag = useDraggable<HTMLDivElement>(options);
  return (
    <div ref={drag.ref} data-testid="box" style={drag.style}>
      <div data-testid="handle" {...drag.dragHandleProps} />
      <span data-testid="dragging">{String(drag.isDragging)}</span>
      <span data-testid="position">{`${drag.position.x},${drag.position.y}`}</span>
    </div>
  );
}

/** Drives a full pointer gesture over the handle. */
function drag(from: { x: number; y: number }, to: { x: number; y: number }) {
  const handle = screen.getByTestId('handle');
  fireEvent.pointerDown(handle, { clientX: from.x, clientY: from.y, button: 0, pointerId: 1 });
  fireEvent.pointerMove(handle, { clientX: to.x, clientY: to.y, pointerId: 1 });
  fireEvent.pointerUp(handle, { clientX: to.x, clientY: to.y, pointerId: 1 });
}

describe('useDraggable', () => {
  it('starts at the origin by default and is absolutely positioned', () => {
    render(<Draggable />);
    expect(screen.getByTestId('box')).toHaveStyle({ position: 'absolute', left: '0px', top: '0px' });
  });

  it('honours an initial position', () => {
    render(<Draggable initialPosition={{ x: 30, y: 40 }} />);
    expect(screen.getByTestId('box')).toHaveStyle({ left: '30px', top: '40px' });
  });

  it('moves by the pointer delta rather than snapping to the cursor', () => {
    render(<Draggable initialPosition={{ x: 100, y: 100 }} />);

    drag({ x: 500, y: 500 }, { x: 530, y: 480 });

    // +30 / -20 applied to the start position, not the raw cursor coordinates.
    expect(screen.getByTestId('position')).toHaveTextContent('130,80');
  });

  it('tracks dragging state across the gesture', () => {
    render(<Draggable />);
    const handle = screen.getByTestId('handle');

    expect(screen.getByTestId('dragging')).toHaveTextContent('false');
    fireEvent.pointerDown(handle, { clientX: 0, clientY: 0, button: 0, pointerId: 1 });
    expect(screen.getByTestId('dragging')).toHaveTextContent('true');
    fireEvent.pointerUp(handle, { clientX: 0, clientY: 0, pointerId: 1 });
    expect(screen.getByTestId('dragging')).toHaveTextContent('false');
  });

  it('reports drag start and end', () => {
    const onDragStart = vi.fn();
    const onDragEnd = vi.fn();
    render(<Draggable initialPosition={{ x: 10, y: 10 }} onDragStart={onDragStart} onDragEnd={onDragEnd} />);

    drag({ x: 0, y: 0 }, { x: 5, y: 5 });

    expect(onDragStart).toHaveBeenCalledWith({ x: 10, y: 10 });
    expect(onDragEnd).toHaveBeenCalledWith({ x: 15, y: 15 });
  });

  it('ignores non-primary buttons', () => {
    render(<Draggable />);
    const handle = screen.getByTestId('handle');

    fireEvent.pointerDown(handle, { clientX: 0, clientY: 0, button: 2, pointerId: 1 });
    fireEvent.pointerMove(handle, { clientX: 50, clientY: 50, pointerId: 1 });

    expect(screen.getByTestId('position')).toHaveTextContent('0,0');
  });

  it('does nothing when disabled', () => {
    render(<Draggable disabled />);

    drag({ x: 0, y: 0 }, { x: 50, y: 50 });

    expect(screen.getByTestId('position')).toHaveTextContent('0,0');
  });

  it('ignores pointer movement that did not start with a pointer down', () => {
    render(<Draggable />);

    fireEvent.pointerMove(screen.getByTestId('handle'), { clientX: 99, clientY: 99, pointerId: 1 });

    expect(screen.getByTestId('position')).toHaveTextContent('0,0');
  });

  it('reports position to the caller without owning it when controlled', () => {
    const onPositionChange = vi.fn();
    render(<Draggable position={{ x: 7, y: 7 }} onPositionChange={onPositionChange} />);

    drag({ x: 0, y: 0 }, { x: 10, y: 0 });

    expect(onPositionChange).toHaveBeenCalledWith({ x: 17, y: 7 });
    // Still where the caller put it — the hook did not take ownership.
    expect(screen.getByTestId('position')).toHaveTextContent('7,7');
  });

  it('cancels cleanly when the gesture is interrupted', () => {
    render(<Draggable />);
    const handle = screen.getByTestId('handle');

    fireEvent.pointerDown(handle, { clientX: 0, clientY: 0, button: 0, pointerId: 1 });
    fireEvent.pointerCancel(handle, { clientX: 0, clientY: 0, pointerId: 1 });

    expect(screen.getByTestId('dragging')).toHaveTextContent('false');

    // A stray move after cancellation must not resume the drag.
    fireEvent.pointerMove(handle, { clientX: 80, clientY: 80, pointerId: 1 });
    expect(screen.getByTestId('position')).toHaveTextContent('0,0');
  });

  it('sets touch-action so touch dragging does not scroll the page', () => {
    render(<Draggable />);
    expect(screen.getByTestId('handle')).toHaveStyle({ touchAction: 'none' });
  });

  it('clamps to the viewport when asked', () => {
    render(<Draggable bounds="viewport" />);
    // jsdom reports 0 for offset dimensions, so give the box a real size.
    Object.defineProperty(screen.getByTestId('box'), 'offsetWidth', { value: 200, configurable: true });
    Object.defineProperty(screen.getByTestId('box'), 'offsetHeight', { value: 100, configurable: true });
    window.innerWidth = 800;
    window.innerHeight = 600;

    drag({ x: 0, y: 0 }, { x: 5000, y: 5000 });

    expect(screen.getByTestId('position')).toHaveTextContent('600,500');
  });

  it('clamps to zero rather than going negative', () => {
    render(<Draggable bounds="viewport" initialPosition={{ x: 10, y: 10 }} />);
    Object.defineProperty(screen.getByTestId('box'), 'offsetWidth', { value: 50, configurable: true });
    Object.defineProperty(screen.getByTestId('box'), 'offsetHeight', { value: 50, configurable: true });

    drag({ x: 0, y: 0 }, { x: -500, y: -500 });

    expect(screen.getByTestId('position')).toHaveTextContent('0,0');
  });
});
