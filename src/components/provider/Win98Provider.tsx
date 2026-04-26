import { useEffect, type ReactNode } from 'react';
import { win98ScopedCSS } from '../../styles/win98-scoped';

const STYLE_ID = 'win98-scoped-styles';

export type Win98ProviderProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Wraps its children in a `.win98` container and injects the scoped 98.css
 * styles into the document head. Styles are removed when the last provider
 * unmounts. Use this to prevent 98.css from leaking into the rest of your app.
 *
 * @example
 * <Win98Provider>
 *   <Button label="OK" />
 * </Win98Provider>
 */
export function Win98Provider({ children, className }: Win98ProviderProps) {
  useEffect(() => {
    const existing = document.getElementById(STYLE_ID);
    if (existing) {
      const count = Number(existing.dataset.count ?? 0);
      existing.dataset.count = String(count + 1);
    } else {
      const style = document.createElement('style');
      style.id = STYLE_ID;
      style.dataset.count = '1';
      style.textContent = win98ScopedCSS;
      document.head.appendChild(style);
    }

    return () => {
      const el = document.getElementById(STYLE_ID);
      if (!el) return;
      const count = Number(el.dataset.count ?? 1) - 1;
      if (count <= 0) {
        el.remove();
      } else {
        el.dataset.count = String(count);
      }
    };
  }, []);

  return (
    <div className={`win98${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  );
}
