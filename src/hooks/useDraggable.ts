import * as React from 'react';

export type Position = { x: number; y: number };

export type UseDraggableOptions = {
  /** Starting position for the uncontrolled case. Defaults to `{ x: 0, y: 0 }`. */
  initialPosition?: Position;
  /** Supply this to drive position yourself; the hook stops owning it. */
  position?: Position;
  onPositionChange?: (position: Position) => void;
  onDragStart?: (position: Position) => void;
  onDragEnd?: (position: Position) => void;
  bounds?: 'viewport' | 'parent' | false;
  disabled?: boolean;
};

export type UseDraggableResult<E extends HTMLElement = HTMLElement> = {
  /**
   * Attach to the element that moves. A callback ref rather than an object
   * ref, because `RefObject` variance differs between @types/react 18 and 19
   * and a callback ref is assignable to `ref` on every version.
   */
  ref: React.RefCallback<E>;
  elementRef: React.MutableRefObject<E | null>;
  position: Position;
  isDragging: boolean;
  dragHandleProps: {
    onPointerDown: (event: React.PointerEvent) => void;
    onPointerMove: (event: React.PointerEvent) => void;
    onPointerUp: (event: React.PointerEvent) => void;
    onPointerCancel: (event: React.PointerEvent) => void;
    style: React.CSSProperties;
  };
  /** Spread onto the moving element alongside `ref`. */
  style: React.CSSProperties;
  setPosition: (position: Position) => void;
};

const ORIGIN: Position = { x: 0, y: 0 };

function clamp(position: Position, element: HTMLElement | null, bounds: UseDraggableOptions['bounds']): Position {
  if (!bounds || !element) return position;

  const { offsetWidth: width, offsetHeight: height } = element;

  if (bounds === 'viewport') {
    return {
      x: Math.min(Math.max(position.x, 0), Math.max(0, window.innerWidth - width)),
      y: Math.min(Math.max(position.y, 0), Math.max(0, window.innerHeight - height)),
    };
  }

  const parent = element.offsetParent as HTMLElement | null;
  if (!parent) return position;

  return {
    x: Math.min(Math.max(position.x, 0), Math.max(0, parent.clientWidth - width)),
    y: Math.min(Math.max(position.y, 0), Math.max(0, parent.clientHeight - height)),
  };
}

/**
 * Headless pointer dragging. Uses pointer capture rather than global
 * listeners, so a drag keeps tracking when the cursor leaves the element and
 * cleans itself up if the gesture is cancelled.
 *
 * @example
 * const { ref, style, dragHandleProps } = useDraggable({ bounds: 'viewport' });
 *
 * <Window ref={ref} style={style}>
 *   <TitleBar title="My Computer" {...dragHandleProps} />
 * </Window>
 */
export function useDraggable<E extends HTMLElement = HTMLElement>(
  options: UseDraggableOptions = {},
): UseDraggableResult<E> {
  const { initialPosition = ORIGIN, position: controlled, onPositionChange, onDragStart, onDragEnd, bounds = false, disabled = false } = options;

  const elementRef = React.useRef<E | null>(null);
  const ref = React.useCallback((node: E | null) => {
    elementRef.current = node;
  }, []);
  const [uncontrolled, setUncontrolled] = React.useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = React.useState(false);

  const isControlled = controlled != null;
  const position = isControlled ? controlled : uncontrolled;

  const positionRef = React.useRef(position);
  positionRef.current = position;
  const originRef = React.useRef<{ pointer: Position; start: Position } | null>(null);

  const commit = React.useCallback(
    (next: Position) => {
      if (!isControlled) setUncontrolled(next);
      onPositionChange?.(next);
    },
    [isControlled, onPositionChange],
  );

  const onPointerDown = React.useCallback(
    (event: React.PointerEvent) => {
      if (disabled || event.button !== 0) return;

      originRef.current = {
        pointer: { x: event.clientX, y: event.clientY },
        start: positionRef.current,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
      setIsDragging(true);
      onDragStart?.(positionRef.current);
    },
    [disabled, onDragStart],
  );

  const onPointerMove = React.useCallback(
    (event: React.PointerEvent) => {
      const origin = originRef.current;
      if (!origin) return;

      commit(
        clamp(
          {
            x: origin.start.x + (event.clientX - origin.pointer.x),
            y: origin.start.y + (event.clientY - origin.pointer.y),
          },
          elementRef.current,
          bounds,
        ),
      );
    },
    [bounds, commit],
  );

  const endDrag = React.useCallback(
    (event: React.PointerEvent) => {
      if (!originRef.current) return;
      originRef.current = null;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      setIsDragging(false);
      onDragEnd?.(positionRef.current);
    },
    [onDragEnd],
  );

  return {
    ref,
    elementRef,
    position,
    isDragging,
    dragHandleProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      style: { touchAction: 'none', cursor: disabled ? undefined : 'move' },
    },
    style: { position: 'absolute', left: position.x, top: position.y },
    setPosition: commit,
  };
}
