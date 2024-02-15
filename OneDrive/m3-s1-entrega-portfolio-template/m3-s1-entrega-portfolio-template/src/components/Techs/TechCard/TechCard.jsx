import styles from "./styles.module.css";

export default function TechCard({ tech }) {
  return (
    <div className={styles.card}>
      <img src={tech.img} alt={tech.name} />
      <h3 className={styles.name}>{tech.name}</h3>
    </div>
  );
}
