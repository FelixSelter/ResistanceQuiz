import { createContext, useReducer, useState } from 'react';
import { type CircuitTree } from '../util/CircuitTree';

export const CircuitTreeContext = createContext<{
  tree: CircuitTree;
  rerenderTree: () => void;
}>(null as any);

interface CircuitTreeProviderProps {
  children: JSX.Element | JSX.Element[];
  tree: CircuitTree;
}

export default function CircuitTreeProvider({
  children,
  tree: circuitTree,
}: CircuitTreeProviderProps): JSX.Element {
  const [tree] = useState(circuitTree);
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

  return (
    <CircuitTreeContext.Provider value={{ tree, rerenderTree: forceUpdate }}>
      {children}
    </CircuitTreeContext.Provider>
  );
}
