import useCircuitNode from '../../hooks/useCircuitNode';
import classNames from 'classnames';
import {
  type CircuitNodeId,
  ResistorCircuit,
  SerialCircuit,
  ParallelCircuit,
} from '../../util/CircuitTree';
import Resistor from '../Resistor/Resistor';
import styles from './Circuit.module.css';

interface CircuitProps {
  nodeId: CircuitNodeId;
}

const { round } = Math;

export default function Circuit({ nodeId }: CircuitProps): JSX.Element {
  const { node, rerenderTree } = useCircuitNode(nodeId);

  function clickHandler(): void {
    console.log(
      'expected',
      (round(node.getResistance() * 100) / 100).toString()
    );
    if (
      prompt('Enter the resistance rounded to two decimal places:') ===
      (round(node.getResistance() * 100) / 100).toString()
    ) {
      node.setSimplified(true);
      rerenderTree();
    }
  }

  if (node instanceof ResistorCircuit || node.isSimplified()) {
    return <Resistor resistance={node.getResistance()} />;
  } else if (node instanceof SerialCircuit || node instanceof ParallelCircuit) {
    return (
      <div
        className={classNames(styles.outline, {
          [styles.simplified]: node
            .getChildren()
            .every((child) => child.isSimplified()),
          [styles.highlight]: (window as any).highlight,
        })}
        style={{
          borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
        }}
        {...(node.getChildren().every((child) => child.isSimplified())
          ? { onClick: clickHandler }
          : {})}
      >
        <div className={styles.wire} />
        <div
          className={classNames({
            [styles.serial]: node instanceof SerialCircuit,
            [styles.parallel]: node instanceof ParallelCircuit,
          })}
        >
          {node.getChildren().map((child, i) => (
            <Circuit key={i} nodeId={child.getId()} />
          ))}
        </div>
        <div className={styles.wire} />
      </div>
    );
  } else throw new Error('Unknown circuit type');
}
