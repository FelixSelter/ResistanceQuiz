import {
  type CircuitNode,
  type CircuitTree,
  ParallelCircuit,
  ResistorCircuit,
  SerialCircuit,
} from './CircuitTree';

const { round, random, floor, max } = Math;

export function generateCircuit(
  tree: CircuitTree,
  circuitAmount: number,
  maxChildren: number
): CircuitNode {
  if (circuitAmount === 0) {
    return new ResistorCircuit(tree, (round(random() * 20) + 1) * 50);
  } else {
    const childAmount = floor(Math.random() * (maxChildren - 1)) + 2;
    const circuitsPerChild = floor((circuitAmount - 1) / childAmount);
    const remainingCircuits = floor((circuitAmount - 1) % childAmount);
    const children = Array.from({ length: childAmount }).map((_, index) =>
      generateCircuit(
        tree,
        circuitsPerChild + max(0, remainingCircuits - index),
        maxChildren
      )
    );
    if (random() > 0.5) return new SerialCircuit(tree, children);
    else return new ParallelCircuit(tree, children);
  }
}
