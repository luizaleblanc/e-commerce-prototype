import styles from "./styles.module.css";

export default function ProjectCard({ project }) {
  return (
    <a className={styles.card} href={project.link} target="_blank" rel="noopener noreferrer">
      <h3 className={styles.name}>{project.name}</h3>
      <img className={styles.gitLogo} src="src/assets/github-icon.svg" alt="github" />
      <span className={styles.description}>{project.description}</span>
      <span className={styles.link}>Saiba mais</span>
    </a>
  );
}
