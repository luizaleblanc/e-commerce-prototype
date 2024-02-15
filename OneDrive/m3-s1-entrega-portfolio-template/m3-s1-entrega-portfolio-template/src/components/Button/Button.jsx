import styles from "./styles.module.css";

export default function Button({ label }) {
  return <button className={styles.button}>{label}</button>;
}
