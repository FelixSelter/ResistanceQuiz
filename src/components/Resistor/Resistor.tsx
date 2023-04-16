import styles from './Resistor.module.css';

interface ResistorProps {
  resistance: number;
}

export default function Resistor({ resistance }: ResistorProps): JSX.Element {
  return (
    <div className={styles.resistor}>
      <div className={styles.wire} />
      <span>{Math.round(resistance * 100) / 100}Ω</span>
      <div className={styles.wire} />
    </div>
  );
}
