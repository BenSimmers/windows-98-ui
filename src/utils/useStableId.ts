import * as React from 'react';

let fallbackCounter = 0;

const useGeneratedId: () => string =
  React.useId ?? (() => React.useMemo(() => `win98-${++fallbackCounter}`, []));

  
export function useStableId(providedId?: string): string {
  const generated = useGeneratedId();
  return providedId ?? generated;
}
