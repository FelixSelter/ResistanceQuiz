/* eslint-disable @typescript-eslint/prefer-readonly */
export interface CircuitNode {
  isSimplified: () => boolean;
  setSimplified: (simplified: boolean) => void;
  getId: () => CircuitNodeId;
  getResistance: () => number;
}

export class ResistorCircuit implements CircuitNode {
  private resistance: number;
  private id: CircuitNodeId;

  constructor(tree: CircuitTree, resistance: number) {
    this.resistance = resistance;
    this.id = tree.addNode(this);
  }

  setSimplified(simplified: boolean): void {
    if (!simplified) throw new Error('A Resistor is always simplified');
  }

  getId(): CircuitNodeId {
    return this.id;
  }

  isSimplified(): boolean {
    return true;
  }

  getResistance(): number {
    return this.resistance;
  }
}

export class SerialCircuit implements CircuitNode {
  private children: CircuitNode[];
  private id: CircuitNodeId;
  private simplified: boolean = false;

  constructor(tree: CircuitTree, children: CircuitNode[]) {
    this.children = children;
    this.id = tree.addNode(this);
  }

  getResistance(): number {
    return this.children.reduce((sum, child) => sum + child.getResistance(), 0);
  }

  getId(): CircuitNodeId {
    return this.id;
  }

  isSimplified(): boolean {
    return this.simplified;
  }

  setSimplified(simplified: boolean): void {
    this.simplified = simplified;
  }

  getChildren(): CircuitNode[] {
    return this.children;
  }
}

export class ParallelCircuit implements CircuitNode {
  private children: CircuitNode[];
  private id: CircuitNodeId;
  private simplified: boolean = false;

  constructor(tree: CircuitTree, children: CircuitNode[]) {
    this.children = children;
    this.id = tree.addNode(this);
  }

  getResistance(): number {
    return (
      1 /
      this.children.reduce((sum, child) => sum + 1 / child.getResistance(), 0)
    );
  }

  getId(): CircuitNodeId {
    return this.id;
  }

  isSimplified(): boolean {
    return this.simplified;
  }

  setSimplified(simplified: boolean): void {
    this.simplified = simplified;
  }

  getChildren(): CircuitNode[] {
    return this.children;
  }
}

export class CircuitTree {
  private nodes: CircuitNode[] = [];

  addNode(node: CircuitNode): CircuitNodeId {
    if (this.nodes.includes(node)) return this.nodes.indexOf(node);
    return this.nodes.push(node) - 1;
  }

  addNodes(nodes: CircuitNode[]): CircuitNodeId[] {
    return nodes.map((node) => this.addNode(node));
  }

  getNode(nodeId: CircuitNodeId): CircuitNode {
    return this.nodes[nodeId];
  }

  getRoot(): CircuitNode {
    const hasParent = this.nodes.map((node) => false);

    this.nodes.forEach((node, index) => {
      if (node instanceof SerialCircuit || node instanceof ParallelCircuit) {
        node.getChildren().forEach((child) => {
          hasParent[child.getId()] = true;
        });
      } else {
        hasParent[index] = true;
      }
    });

    return this.nodes[hasParent.indexOf(false)];
  }
}

export type CircuitNodeId = number;
