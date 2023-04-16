import styles from './App.module.css';
import CircuitTreeProvider from './context/CircuitTreeProvider';
import Circuit from './components/Circuit/Circuit';
import { generateCircuit } from './util/CircuitGenerator';
import { CircuitTree } from './util/CircuitTree';
import { useState } from 'react';

function App(): JSX.Element {
  const [tree, setTree] = useState<null | CircuitTree>(null);
  const [circuitAmount, setCircuitAmount] = useState(10);
  const [maxChildren, setMaxChildren] = useState(3);
  const [highlight, setHighlight] = useState(true);

  function submitHandler(): void {
    const tree = new CircuitTree();
    generateCircuit(tree, circuitAmount, maxChildren);
    setTree(tree);
    if (highlight) (window as any).highlight = true;
  }

  if (tree != null) {
    return (
      <CircuitTreeProvider tree={tree}>
        <div className={styles.circuit}>
          <div className={styles.positiveCharge} />
          <Circuit nodeId={tree.getRoot().getId()} />
          <div className={styles.negativeCharge} />
        </div>
      </CircuitTreeProvider>
    );
  } else {
    return (
      <div className={styles.form}>
        <label className={styles.number}>
          Number of circuits generated:
          <input
            type="number"
            defaultValue={circuitAmount}
            onChange={(e) => {
              setCircuitAmount(Number(e.target.value));
            }}
            min={3}
          />
        </label>
        <label className={styles.number}>
          Max children of circuit:
          <input
            type="number"
            defaultValue={maxChildren}
            onChange={(e) => {
              setMaxChildren(Number(e.target.value));
            }}
            min={2}
          />
        </label>
        <label className={styles.checkbox}>
          Enable highlights:
          <input
            type="checkbox"
            defaultChecked={highlight}
            onChange={(e) => {
              setHighlight(Boolean(e.target.checked));
            }}
          />
        </label>
        <button onClick={submitHandler}>Start</button>
      </div>
    );
  }
}

export default App;
