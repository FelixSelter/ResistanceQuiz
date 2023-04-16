import { useContext } from 'react';
import { CircuitTreeContext } from '../context/CircuitTreeProvider';
import { type CircuitNode, type CircuitNodeId } from '../util/CircuitTree';

export default function useCircuitNode(nodeId: CircuitNodeId): {
  node: CircuitNode;
  rerenderTree: () => void;
} {
  const { tree, rerenderTree } = useContext(CircuitTreeContext);

  return {
    node: tree.getNode(nodeId),
    rerenderTree,
  };
}
